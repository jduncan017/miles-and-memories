import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "~/components/Button";
import { FadeIn } from "~/components/FadeIn";
import { FinalCta } from "~/components/FinalCta";
import { ImageTile } from "~/components/ImageTile";
import { PageHero } from "~/components/PageHero";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import { StatRow } from "~/components/StatRow";
import { TestimonialMarquee } from "~/components/TestimonialMarquee";
import { TESTIMONIALS } from "~/content/testimonials";
import { SERVICES_NAV } from "~/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Miles & Memories - Travelmation | Stress-Free Travel Planning",
  },
  description:
    "Expert travel planning for corporate events, Greek life trips, family getaways and luxury vacations. Complimentary service with no hidden fees. Free consultation today.",
  alternates: { canonical: "/" },
};

const REASONS = [
  {
    icon: "/images/icon-dollar.svg",
    title: "$0 Planning Fees",
    body: "Our expert planning services are completely complimentary, funded by our industry partnerships. You get five-star service without the five-star price tag.",
  },
  {
    icon: "/images/icon-magic-wand.svg",
    title: "Detail Obsessed",
    body: "From corporate incentive trips to friends and family getaways, we obsess over every detail to craft an experience that is uniquely yours.",
  },
  {
    icon: "/images/icon-travel-partner.svg",
    title: "Your Travel Partner",
    body: "We're more than planners; available before, during, and after your trip. Think of us as your travel-savvy friend who happens to have industry connections!",
  },
];

// Descriptions are the live site's mobile card copy (it only showed them on
// phones); the cards now reveal them on hover at every width.
const SERVICE_TILES = [
  {
    image: "/images/cliffside-retreat-near-the-ocean.webp",
    alt: "Cliffside retreat near the ocean",
    description:
      "Zero-investment planning for conferences, incentive trips, and business travel. We work with your existing event teams and handle everything from budget management to on-site support.",
  },
  {
    image: "/images/four-people-enjoying-a-sunset.webp",
    alt: "Four people enjoying a sunset",
    description:
      "Spring break, formals, and group reunions made simple. Send us your group list, and we handle payment plans, itineraries, and even packing lists for groups up to 100+.",
  },
  {
    image: "/images/family-enjoying-the-sun-in-a-lake.webp",
    alt: "Family enjoying the sun in a lake",
    description:
      "Work with experts who know every Disney & Universal Skip-the-Line hack, cruise specialists who book the perfect cabin, and itinerary masters for overseas adventures with grandparents and toddlers alike.",
  },
  {
    image: "/images/woman-enjoying-beautiful-private-oceanside-pool.webp",
    alt: "Woman enjoying a private oceanside pool",
    description:
      "Private jets, exclusive resorts, African safaris, and door-to-door concierge service for travelers who want extraordinary without the hassle.",
  },
];

const STEPS = [
  {
    image: "/images/man-on-phone-at-hotel.webp",
    title: "Free Discovery Call",
    body: "Tell us your vision, budget, and must-haves. No sales pitch, just us getting to know what makes you tick.",
  },
  {
    image: "/images/holding-up-a-lightbulb-to-the-sunset.webp",
    title: "We Handle It All",
    body: "Flights, hotels, activities, payment plans, dining reservations: everything you'd rather not think about.",
  },
  {
    image: "/images/woman-on-a-laptop-in-bed.webp",
    title: "Review & Approve",
    body: "We present your complete itinerary with options. You choose what works, and we book it all.",
  },
  {
    image: "/images/woman-lying-on-a-beach.webp",
    title: "Travel Worry-Free",
    body: "Enjoy your trip knowing we're a text away if anything needs adjusting.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        height="home"
        image="/images/home-hero-ocean-poster.webp"
        video="/video/home-hero-ocean.mp4"
        title={
          <>
            You Have a Destination in Mind.
            <br className="hidden md:block" /> We Build the Bridge to Get You
            There.
          </>
        }
        subtitle={
          <>
            Stress-free travel planning with <span className="text-p3">$0</span>{" "}
            in fees.
          </>
        }
        actions={
          <>
            <Button href="/contact" fullOnMobile>
              Start Booking
            </Button>
            <Button href="/services" variant="light" fullOnMobile>
              Explore Services
            </Button>
          </>
        }
      />

      {/* ── Why choose ── */}
      <SectionWrapper tone="cream" width="wide">
        <SectionHeader
          title="Why Choose Miles & Memories?"
          description="While others charge fees and leave you to figure out the details, we handle everything from flights to fine dining reservations, all at no cost to you."
        />
        <ul className="ReasonGrid mt-10 grid gap-8 md:grid-cols-3">
          {REASONS.map((r, i) => (
            <li key={r.title}>
              <FadeIn delay={i * 120} className="h-full">
                <div className="ReasonCard flex h-full flex-col items-start gap-6 rounded-lg bg-n0 p-8 shadow-[inset_0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)] md:items-center md:p-10 md:text-center">
                  <Image
                    src={r.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16"
                  />
                  <div className="flex flex-col gap-4">
                    <h3>{r.title}</h3>
                    <p className="text-g3">{r.body}</p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ── Services ── */}
      <SectionWrapper tone="white">
        <div className="ServicesHeader flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2>Our Services</h2>
          <p className="max-w-[30rem] text-lg text-g3">
            We offer comprehensive travel planning for every occasion and
            budget.
          </p>
        </div>
        <ul className="ServicesGrid mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES_NAV.map((s, i) => (
            <li key={s.href}>
              <ImageTile
                href={s.href}
                title={s.label}
                image={SERVICE_TILES[i].image}
                imageAlt={SERVICE_TILES[i].alt}
                description={SERVICE_TILES[i].description}
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ── How it works ── */}
      <SectionWrapper tone="cream" width="wide">
        <SectionHeader
          title="How It Works"
          description="Just four simple steps to your best trip ever."
        />
        <ol className="StepGrid mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="Step flex flex-col items-center gap-4 text-center"
            >
              <div className="StepMedia relative size-46 overflow-hidden rounded-full border-4 border-n0 shadow-theme">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="11.5rem"
                  className="object-cover blur-[2px]"
                />
                <span
                  aria-hidden="true"
                  className="StepNumber absolute inset-0 flex items-center justify-center font-heading text-[4.875rem] leading-none font-semibold text-n0 [text-shadow:0_0.125rem_0.5rem_rgb(0_0_0/0.35)]"
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="StepTitle text-2xl capitalize">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="StepBody max-w-[16rem] text-g1">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <Button href="/contact">Start Booking</Button>
        </div>
      </SectionWrapper>

      {/* ── Meet Mandy ── */}
      <SectionWrapper tone="white">
        <div className="MeetMandy grid items-start gap-10 lg:grid-cols-[28.5rem_1fr] lg:gap-16">
          <figure className="MeetMandyMedia flex flex-col gap-6">
            <Image
              src="/images/mandy-gonzales-in-a-pink-suit-with-a-globe.webp"
              alt="Mandy Gonzales in a pink suit with a globe"
              width={912}
              height={912}
              sizes="(min-width: 64rem) 28.5rem, 100vw"
              className="aspect-square w-full rounded-lg object-cover shadow-theme"
            />
            <blockquote className="flex flex-col gap-4">
              <p className="text-g2">
                &ldquo;I want people to see me as a powerhouse within the
                industry who is just as comfortable planning a family&rsquo;s
                magical Disney vacation as she is orchestrating a Fortune 500
                corporate retreat in a Pink Power Suit.&rdquo;
              </p>
              <figcaption className="font-heading text-lg font-bold text-g5 italic">
                Mandy
              </figcaption>
            </blockquote>
          </figure>
          <div className="MeetMandyCopy flex flex-col gap-6">
            <h2>Meet Mandy: Your Travel Powerhouse</h2>
            <p className="max-w-[37.5rem] text-g3">
              After watching too many friends stress over vacation planning and
              companies waste money on poorly planned corporate events, Mandy
              created Miles &amp; Memories to be the travel partner she wished
              existed.
            </p>
            <p className="max-w-[37.5rem] text-g3">
              Working through Travelmation&rsquo;s network, she brings industry
              connections and insider knowledge to every trip, whether
              it&rsquo;s a Disney vacation with three generations or a
              200-person corporate retreat.
            </p>
            <div>
              <Button href="/about" variant="dark">
                Learn More About Mandy
              </Button>
            </div>
            <StatRow
              align="left"
              stats={[
                { value: "5+", label: "Years Experience" },
                { value: "250+", label: "Clients Served" },
                { value: "1000+", label: "Trips Planned" },
              ]}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Testimonials ── */}
      <SectionWrapper
        tone="cream"
        width="full"
        innerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          title="Real Travelers, Real Stories"
          description="From stress-free family vacations to flawless corporate events, here's what happens when you let the experts handle the details."
        />
        <div className="-mx-6 md:-mx-10">
          <TestimonialMarquee items={TESTIMONIALS} />
        </div>
      </SectionWrapper>

      <FinalCta
        variant="parallax"
        image="/images/paddleboat-in-a-lake-near-mountains.webp"
        title="Your Dream Trip Is One Conversation Away"
        body="Join 250+ travelers who chose stress-free planning over sleepless nights researching hotels. Let's start planning your next adventure."
        primary={{ href: "/contact", label: "Get Started, It's Free!" }}
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </>
  );
}
