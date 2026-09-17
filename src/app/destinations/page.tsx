import type { Metadata } from "next";
import { Button } from "~/components/Button";
import { ImageTile } from "~/components/ImageTile";
import { JsonLd } from "~/components/JsonLd";
import { PageHero } from "~/components/PageHero";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import { getAllDestinations } from "~/lib/destinations";
import { SITE, absoluteUrl } from "~/lib/site";

// Live reused the homepage title and description here; these are page-specific.
export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Destination guides from Miles & Memories: Banff, Belize, Cancun and the Riviera Maya, Costa Rica and Isla Holbox, with where to stay, what to do and who each trip suits.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Destinations",
            itemListElement: destinations.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.title,
              url: absoluteUrl(`/destinations/${d.slug}`),
            })),
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
            ],
          },
        ]}
      />

      <PageHero
        image="/images/woman-looking-over-a-beautiful-mountainous-lake.webp"
        imageAlt="Woman looking over a beautiful mountainous lake"
        title="Explore Destinations"
        subtitle="Some of our favorite destinations handpicked for unforgettable experiences."
        italicSubtitle
        actions={
          <Button href="/booking" fullOnMobile>
            Book Your Appointment
          </Button>
        }
      />

      <SectionWrapper tone="page">
        <SectionHeader title="Where Will Your Next Story Happen?" />
        {/*
         * Two 480px squares 20px apart; an odd last card sits centred on its
         * own row at the same width.
         */}
        <ul className="DestinationGrid mx-auto mt-10 grid max-w-245 gap-5 md:grid-cols-2">
          {destinations.map((d) => (
            <li
              key={d.slug}
              className="md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.625rem)]"
            >
              <ImageTile
                href={`/destinations/${d.slug}`}
                title={d.title}
                image={d.card}
                imageAlt={d.cardAlt}
                description={d.tagline}
                mobileCta="View Guide"
                desktopRatio="md:aspect-square"
                sizes="(min-width: 64rem) 30rem, (min-width: 48rem) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </>
  );
}
