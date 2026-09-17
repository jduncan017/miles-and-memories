import { FinalCta } from "~/components/FinalCta";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articleProse } from "~/components/article/ArticleProse";
import { Button } from "~/components/Button";
import { JsonLd } from "~/components/JsonLd";
import { PRIMARY_CTA, SITE, absoluteUrl } from "~/lib/site";
import {
  formatTipDate,
  getAllTravelTips,
  getTravelTip,
} from "~/lib/travel-tips";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTravelTips().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/travel-tips/[slug]">): Promise<Metadata> {
  const tip = getTravelTip((await params).slug);
  if (!tip) return {};
  const path = `/travel-tips/${tip.slug}`;
  return {
    title: tip.seoTitle,
    description: tip.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: tip.seoTitle,
      description: tip.description,
      url: absoluteUrl(path),
      publishedTime: tip.date,
      authors: [SITE.founder],
      images: [{ url: tip.hero, alt: tip.heroAlt }],
    },
  };
}

export default async function TravelTipPage({
  params,
}: PageProps<"/travel-tips/[slug]">) {
  const tip = getTravelTip((await params).slug);
  if (!tip) notFound();

  // Only this post's MDX module is imported.
  const { default: Body } = await import(
    `~/content/travel-tips/${tip.file}.mdx`
  );
  const url = absoluteUrl(`/travel-tips/${tip.slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: tip.title,
            description: tip.description,
            datePublished: tip.date,
            dateModified: tip.date,
            image: absoluteUrl(tip.hero),
            author: {
              "@type": "Person",
              name: SITE.founder,
              url: absoluteUrl("/about"),
            },
            publisher: { "@id": absoluteUrl("/#organization") },
            mainEntityOfPage: url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Travel Tips",
                item: absoluteUrl("/travel-tips"),
              },
              { "@type": "ListItem", position: 3, name: tip.title, item: url },
            ],
          },
        ]}
      />

      {/*
       * Live: a 960px white card on the n2 band, 80px clear of the fixed bar on
       * desktop; on phones the card runs edge to edge straight under the bar.
       */}
      <div className="TravelTipBand bg-n2 pt-19 md:px-10 md:pt-35 md:pb-20 lg:px-20 lg:pt-45">
        <article className="TravelTipCard mx-auto flex max-w-240 flex-col gap-10 bg-n0 px-6 pt-10 pb-25 shadow-[0.5rem_0.5rem_0.5rem_rgb(0_0_0/0.25)] md:rounded-2xl md:px-10">
          <Image
            src={tip.hero}
            alt={tip.heroAlt}
            width={880}
            height={520}
            priority
            sizes="(min-width: 64rem) 55rem, (min-width: 48rem) calc(100vw - 10rem), 100vw"
            className="TravelTipHero aspect-[880/520] w-full rounded-2xl object-cover"
          />

          <header className="TravelTipHeader mx-auto flex w-full max-w-200 flex-col gap-4 border-b border-g1 pb-6 md:gap-6 md:text-center">
            <h1 className="TravelTipTitle capitalize">{tip.title}</h1>
            <p className="TravelTipMeta flex flex-wrap items-center gap-x-2 gap-y-2 text-lg text-g2 md:justify-center">
              <span>{tip.readingMinutes} min. read</span>
              <span aria-hidden="true" className="h-7.5 w-0.5 bg-g1" />
              <time dateTime={tip.date}>{formatTipDate(tip.date)}</time>
              <span aria-hidden="true" className="h-7.5 w-0.5 bg-g1" />
              <span>Written by {SITE.founder}</span>
            </p>
          </header>

          <div className="TravelTipBody mx-auto w-full max-w-170">
            <Body components={articleProse} />
          </div>

          <aside className="TravelTipGuide flex flex-col items-center gap-4 border-t border-g0 pt-10 text-center">
            <h2 className="TravelTipGuideTitle text-xl font-normal tracking-[0.03em] capitalize md:text-[1.75rem] lg:text-[2rem]">
              Want the Complete Planning Guide?
            </h2>
            <p className="TravelTipGuideBody max-w-180 text-lg text-g2">
              {tip.guide.body}
            </p>
            <Button href={tip.guide.href} className="mt-2 md:mt-6">
              Destination Overview
            </Button>
          </aside>
        </article>
      </div>

      <FinalCta
        variant="shade"
        title={tip.cta.title}
        body={tip.cta.body}
        image={tip.cta.image}
        primary={{ href: PRIMARY_CTA.href, label: tip.cta.label }}
      />
    </>
  );
}
