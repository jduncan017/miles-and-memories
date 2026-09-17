import type { Metadata } from "next";
import Image from "next/image";
import { CoreBeliefs } from "~/components/about/CoreBeliefs";
import { FinalCta } from "~/components/FinalCta";
import { PageHero } from "~/components/PageHero";
import { SectionWrapper } from "~/components/SectionWrapper";
import { StatRow } from "~/components/StatRow";
import { SITE } from "~/lib/site";

// Live reused the homepage title and description here; these are page-specific.
export const metadata: Metadata = {
  title: "About Mandy Gonzales",
  description:
    "Meet Mandy Gonzales, the travel planner behind Miles & Memories. 5+ years, 250+ clients and 1000+ trips planned through Travelmation's network, with no planning fees.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [
      {
        url: "/images/high-end-spanish-style-hotel-pool-near-the-ocean.webp",
        alt: "A high end Spanish style hotel pool near the ocean",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/high-end-spanish-style-hotel-pool-near-the-ocean.webp"
        imageAlt="High end Spanish style hotel pool near the ocean"
        title="The Powerhouse Behind Your Perfect Trip"
        subtitle="Your partner in professional, stress-free travel planning."
        italicSubtitle
      />

      <SectionWrapper
        tone="white"
        width="wide"
        innerClassName="flex flex-col items-center gap-10"
      >
        {/* ── Statement band ── */}
        <div className="AboutStatement flex max-w-250 flex-col items-center gap-3.5 text-center">
          <h2 className="AboutStatementTitle max-w-[40rem] font-body text-xl font-bold tracking-[0.09em] text-g5 uppercase md:text-2xl lg:text-[2rem]">
            Experience Travel Planning That Actually Excites You
          </h2>
          <p className="AboutStatementBody max-w-text font-heading text-lg tracking-[0.02em] text-g3 capitalize lg:text-[1.375rem]">
            All at no cost to you: Miles &amp; Memories is fully complimentary,
            with no hidden fees or surprises.
          </p>
        </div>
        <StatRow
          layout="columns"
          className="AboutStats w-full max-w-250 lg:px-10"
          stats={[
            {
              value: "5+",
              label: "Years turning travel stress into excitement",
            },
            { value: "250+", label: "Clients who now call us for every trip" },
            {
              value: "1000+",
              label: "Trips planned without a single planning fee charged",
            },
          ]}
        />
        <div aria-hidden="true" className="AboutRule h-px w-full bg-g1" />

        {/* ── Story ── */}
        <div className="AboutStory flex w-full flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-10">
          {/*
           * Two independent columns on desktop. On phones `contents` dissolves
           * them so the pieces reorder: photo, story, beliefs (the airplane
           * photo is desktop-only, as on live).
           */}
          <div className="AboutStoryRight contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-10">
            <div className="AboutWhy order-2 flex flex-col gap-6 lg:order-none">
              <h2 className="text-g4">Why I Do This (And Why It Matters)</h2>
              <div className="AboutWhyCopy flex flex-col gap-3 text-g2 [&_p]:text-lg">
                <p className="font-bold text-g3">
                  Hi, I&rsquo;m Mandy, and I used to hate planning trips.
                </p>
                <p>
                  Despite loving travel, I watched too many friends spend weeks
                  researching hotels only to pick the wrong one, or miss out on
                  experiences because they didn&rsquo;t know what was possible.
                </p>
                <p>
                  The final straw? Watching a colleague spend months planning a
                  corporate retreat that still went sideways because of one
                  overlooked detail.
                </p>
                <p className="font-bold text-g3">
                  That&rsquo;s when I realized travel planning isn&rsquo;t just
                  about booking flights. It&rsquo;s about understanding what
                  makes each trip special and having the connections to make it
                  happen.
                </p>
                <p>
                  Working through Travelmation&rsquo;s network gives me access
                  to deals and insider knowledge that Google can&rsquo;t
                  provide. Whether it&rsquo;s securing group rates for 100+
                  fraternity brothers or knowing which Disney Lightning Lane to
                  book first, experience matters.
                </p>
                <p className="font-bold text-g3">
                  My job isn&rsquo;t to impress you with how much I know about
                  travel; it&rsquo;s to use that knowledge so you don&rsquo;t
                  have to become a travel expert yourself.
                </p>
              </div>
            </div>
            <Image
              src="/images/view-from-airplane-looking-at-sunset.webp"
              alt="View from an airplane window looking at the sunset"
              width={640}
              height={360}
              sizes="37rem"
              className="AboutAirplane hidden aspect-[588/503] w-full rounded-lg object-cover shadow-theme-sm lg:block"
            />
          </div>

          <div className="AboutStoryLeft contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-10">
            <Image
              src="/images/mandy-gonzales-pointing-at-pink-suitcase.webp"
              alt="Mandy Gonzales pointing at a pink suitcase"
              width={800}
              height={534}
              sizes="(min-width: 64rem) 37rem, 100vw"
              className="AboutMandy order-1 aspect-[588/553] w-full rounded-md object-cover shadow-theme-sm lg:order-none"
            />
            <div className="order-3 border-b border-g1 pb-10 lg:order-none lg:border-0 lg:pb-0">
              <CoreBeliefs />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Travelmation partnership ── */}
      <SectionWrapper tone="white" padding="none" className="pb-16 lg:pb-20">
        <div className="AboutPartner flex flex-col gap-10 md:flex-row md:items-center lg:gap-16 lg:px-20">
          <a
            href={SITE.hostAgency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="AboutPartnerCard flex aspect-[448/397] w-full shrink-0 items-center justify-center rounded-xl border border-n3 bg-n0 p-6 shadow-theme-sm transition-shadow hover:shadow-theme focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none md:aspect-auto md:w-1/2 md:self-stretch lg:aspect-[448/397] lg:self-auto lg:p-10"
          >
            <Image
              src="/images/travelmation-logo-color.webp"
              alt="Travelmation, visit travelmation.net"
              width={896}
              height={378}
              sizes="(min-width: 48rem) 28rem, 90vw"
              className="h-auto w-full max-w-md"
            />
          </a>
          <div className="AboutPartnerCopy flex flex-col gap-6">
            <h2 className="text-g4">Personal Service, Global Connections</h2>
            <div className="flex flex-col gap-3 text-g2 [&_p]:text-lg">
              <p>
                I built Miles &amp; Memories on the belief that travel planning
                should be deeply personal. So in order to give my clients the
                best possible experience, I knew I needed to pair my service
                with the power of a global network.
              </p>
              <p>
                That&rsquo;s why I chose to partner with{" "}
                <strong className="font-bold text-g3">Travelmation</strong>.
                This partnership gives me the connections of an industry giant,
                which means I can secure exclusive rates, VIP amenities, and
                special access that would otherwise be out of reach. It&rsquo;s
                really the best of both worlds!
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <FinalCta
        image="/images/two-people-standing-in-the-distance-at-the-edge-of-tropical-.webp"
        title="Ready to Experience the Difference?"
        body="Let's turn your next trip from a project into pure anticipation. Your consultation is completely free, because great travel planning should start with trust, not a transaction."
        primary={{ href: "/contact", label: "Book My Free Consultation" }}
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
