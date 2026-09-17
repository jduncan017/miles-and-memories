import type { Metadata } from "next";
import { BookingEmbed } from "~/components/BookingEmbed";
import { ContactRow } from "~/components/contact/ContactRow";
import { FeaturedTestimonial } from "~/components/contact/FeaturedTestimonial";
import { NextSteps } from "~/components/contact/NextSteps";
import { FaqSection, type Faq } from "~/components/FaqSection";
import { PageHero } from "~/components/PageHero";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Miles & Memories | Free Travel Planning Consultation",
  },
  description:
    "Ready to start planning your stress-free trip? Contact Miles & Memories for your complimentary consultation. Corporate travel, Greek life, family & luxury trips.",
  alternates: { canonical: "/contact" },
};

// Answers 2 and 3 were closed on live (client-rendered only); captured by
// opening each one. Dashes rephrased per the house copy rules.
const FAQS: Faq[] = [
  {
    q: "Is your travel planning service really free?",
    a: "Yes! Our services are 100% complimentary. We're paid by trusted travel suppliers, not by you. That means you get expert planning, access to exclusive perks, and full support, all at no extra cost.",
  },
  {
    q: "Why use Miles & Memories instead of planning it myself online?",
    a: "We save you time, reduce stress, and add creative touches you won't find on DIY booking sites. We handle every detail, solve any issues, and use our insider connections to get you the best value and unique experiences.",
  },
  {
    q: "How soon should I reach out before my trip?",
    a: "The sooner, the better, especially for groups or unique destinations. But we're experts at solving last-minute challenges, too. No matter your timeline, we're here to help.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/airplane-flying-overhead-against-the-background-of-a-pink-sk.webp"
        imageAlt="Airplane flying overhead against a pink sky"
        title="Every Journey Starts With a Conversation"
        subtitle="Reach out and discover why our clients say the planning process was as enjoyable as the trip itself."
        italicSubtitle
      />

      <SectionWrapper tone="page" innerClassName="flex flex-col gap-10">
        <SectionHeader
          title="Ready to Plan Your Next Retreat?"
          description="Book a free 15-minute consultation and get a custom venue shortlist within 48 hours."
        />
        <NextSteps />
        <BookingEmbed />
        <ContactRow />
      </SectionWrapper>

      <SectionWrapper tone="page" padding="lg">
        <FeaturedTestimonial />
      </SectionWrapper>

      {/* Live sets the FAQ band as a 1200px card on the page cream. */}
      <div className="ContactFaq mx-auto max-w-section">
        <FaqSection items={FAQS} />
      </div>
    </>
  );
}
