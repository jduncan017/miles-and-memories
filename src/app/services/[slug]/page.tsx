import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "~/components/Button";
import { FaqSection } from "~/components/FaqSection";
import { FinalCta } from "~/components/FinalCta";
import { JsonLd } from "~/components/JsonLd";
import { PageHero } from "~/components/PageHero";
import { Checklist } from "~/components/service/Checklist";
import { FeatureList } from "~/components/service/FeatureList";
import { MemoryGallery } from "~/components/service/MemoryGallery";
import { NumberedCards } from "~/components/service/NumberedCards";
import { ServiceTestimonial } from "~/components/service/ServiceTestimonial";
import { StatementBand } from "~/components/service/StatementBand";
import { StoryRows } from "~/components/service/StoryRows";
import { SERVICES, getService } from "~/content/services";
import { absoluteUrl } from "~/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.meta.title },
    description: service.meta.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: absoluteUrl(`/services/${service.slug}`),
      images: [{ url: service.hero.image.src, alt: service.hero.image.alt }],
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.card.title,
          description: s.meta.description,
          url: absoluteUrl(path),
          serviceType: "Travel planning",
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: { "@type": "Country", name: "United States" },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Complimentary planning consultation",
          },
        }}
      />

      <PageHero
        title={s.hero.title}
        image={s.hero.image.src}
        imageAlt={s.hero.image.alt}
        italicSubtitle
        subtitle={
          <>
            {s.hero.subtitle.before}
            <span className="text-p3">{s.hero.subtitle.highlight}</span>
            {s.hero.subtitle.after}
          </>
        }
        actions={<Button href="/contact">{s.hero.cta}</Button>}
      />

      <StatementBand title={s.statement.title} body={s.statement.body} />
      <FeatureList {...s.features} />
      <NumberedCards {...s.steps} />
      <Checklist {...s.checklist} />
      <StoryRows {...s.story} />
      {s.testimonial && <ServiceTestimonial {...s.testimonial} />}
      {s.gallery && <MemoryGallery {...s.gallery} />}
      {!s.testimonial && !s.gallery && (
        // Live keeps a white gap between the two cream bands.
        <div aria-hidden="true" className="ServiceBandGap h-16 bg-n0 lg:h-25" />
      )}
      <FaqSection title={s.faq.title} items={s.faq.items} />

      <FinalCta
        image={s.finalCta.image}
        title={s.finalCta.title}
        body={s.finalCta.body}
        primary={{ href: "/contact", label: s.finalCta.cta }}
      />
    </>
  );
}
