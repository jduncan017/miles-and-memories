import type { Metadata } from "next";
import { Button } from "~/components/Button";
import { FadeIn } from "~/components/FadeIn";
import { FinalCta } from "~/components/FinalCta";
import { PageHero } from "~/components/PageHero";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import { ServiceCard } from "~/components/service/ServiceCard";
import { SERVICES } from "~/content/services";

export const metadata: Metadata = {
  title: {
    absolute: "Travel Planning Services | Corporate, Greek Life & Group Travel",
  },
  description:
    "Expert travel planning services for corporate events, Greek life trips, family groups & luxury travel. Complimentary consultation and full-service planning. View all services.",
  alternates: { canonical: "/services" },
  openGraph: {
    images: [
      { url: "/images/beautiful-secluded-beach.webp", alt: "A secluded beach" },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/beautiful-secluded-beach.webp"
        imageAlt="Secluded palm-lined beach"
        title="Travel Planning Services: From Vision to Vacation"
        subtitle={
          <>
            We Handle Everything In Between. Professional travel planning that{" "}
            <span className="text-p3">costs you nothing</span> but delivers
            everything you dreamed of.
          </>
        }
        actions={<Button href="/contact">Book My Free Consultation</Button>}
      />

      <SectionWrapper tone="white">
        <SectionHeader
          title="Complete Travel Solutions for Every Journey"
          description="Whether you're planning a corporate retreat or a family reunion, we eliminate the overwhelm and deliver experiences that exceed expectations."
        />
        <ul className="ServiceCardGrid mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <FadeIn delay={(i % 2) * 120} className="h-full">
                <ServiceCard
                  href={`/services/${s.slug}`}
                  title={s.card.title}
                  body={s.card.body}
                  image={s.card.image}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <FinalCta
        variant="parallax"
        image="/images/beautiful-canal-city-with-pink-skies.webp"
        title="Stop Planning, Start Anticipating"
        body="Ready to experience what travel planning should feel like? Over 250 clients have discovered the difference between booking a trip and crafting an experience."
        primary={{ href: "/contact", label: "Get Started, It's Free!" }}
      />
    </>
  );
}
