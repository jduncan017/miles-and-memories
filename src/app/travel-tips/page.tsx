import type { Metadata } from "next";
import { TipCard } from "~/components/article/TipCard";
import { Button } from "~/components/Button";
import { PageHero } from "~/components/PageHero";
import { SectionWrapper } from "~/components/SectionWrapper";
import { getAllTravelTips } from "~/lib/travel-tips";

/*
 * Live reuses the homepage title and description here; these are written for
 * the page instead.
 */
export const metadata: Metadata = {
  title: "Travel Tips",
  description:
    "Insider travel tips and real trip stories from travel advisor Mandy Gonzales: incentive trips, spring break groups, and destinations she has scouted herself.",
  alternates: { canonical: "/travel-tips" },
};

export default function TravelTipsPage() {
  const tips = getAllTravelTips();

  return (
    <>
      <PageHero
        image="/images/a-beauytiful-beach-with-a-white-stone-landscape.webp"
        imageAlt="A beach below white stone cliffs"
        title="Travel Tips"
        italicSubtitle
        subtitle="Insider tips that turn first-time travelers into confident explorers and makes every trip a little easier."
        actions={
          <Button href="/contact" fullOnMobile>
            Plan Your Trip
          </Button>
        }
      />

      <SectionWrapper tone="cream" width="full" innerClassName="max-w-320">
        <h2 className="TravelTipsTitle text-center capitalize">
          Latest Articles
        </h2>
        <ul className="TravelTipsGrid -mx-6 mt-10 grid gap-5 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <li key={tip.slug}>
              <TipCard
                href={`/travel-tips/${tip.slug}`}
                title={tip.title}
                excerpt={tip.excerpt}
                image={tip.hero}
                imageAlt={tip.heroAlt}
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </>
  );
}
