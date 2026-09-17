import { FinalCta } from "~/components/FinalCta";
import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import { notFound } from "next/navigation";
import { DestinationHero } from "~/components/destination/DestinationHero";
import { guideComponents } from "~/components/destination/GuideBlocks";
import { GuideLinkPanel } from "~/components/destination/GuideLinkPanel";
import { FaqSection } from "~/components/FaqSection";
import { JsonLd } from "~/components/JsonLd";
import { getAllDestinations, getDestination } from "~/lib/destinations";
import { SITE, absoluteUrl } from "~/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  const path = `/destinations/${d.slug}`;
  return {
    title: d.seoTitle,
    description: d.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: d.seoTitle,
      description: d.description,
      url: absoluteUrl(path),
      images: [{ url: d.hero, alt: d.heroAlt }],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  // Only this guide's MDX module is imported.
  const { default: Body } = (await import(
    `~/content/destinations/${slug}.mdx`
  )) as { default: MDXContent };
  const url = absoluteUrl(`/destinations/${d.slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: d.title,
            description: d.description,
            url,
            image: absoluteUrl(d.hero),
            publisher: { "@id": absoluteUrl("/#organization") },
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
                name: "Destinations",
                item: absoluteUrl("/destinations"),
              },
              { "@type": "ListItem", position: 3, name: d.title, item: url },
            ],
          },
        ]}
      />

      <DestinationHero
        title={d.title}
        tagline={d.tagline}
        image={d.hero}
        imageAlt={d.heroAlt}
      />

      <article className="DestinationBody bg-n1 px-6 pt-6 pb-16 md:px-10 md:pt-20 lg:pb-20">
        <div className="DestinationBodyInner mx-auto flex max-w-260 flex-col gap-16">
          <Body components={guideComponents} />
          {d.guide.href && (
            <GuideLinkPanel
              title={d.guide.title}
              body={d.guide.body}
              label={d.guide.label}
              href={d.guide.href}
            />
          )}
        </div>
      </article>

      {d.faqs.length > 0 && <FaqSection title="FAQs" items={d.faqs} />}

      <FinalCta
        variant="shade"
        title={d.cta.title}
        body={d.cta.body}
        image={d.cta.image}
        primary={{ href: d.cta.href, label: d.cta.label }}
      />
    </>
  );
}
