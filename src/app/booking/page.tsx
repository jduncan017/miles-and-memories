import type { Metadata } from "next";
import { BookingEmbed } from "~/components/BookingEmbed";
import { SectionWrapper } from "~/components/SectionWrapper";

/*
 * The bare scheduler page the footer's "Book a Meeting" links to. Live serves
 * it with `noindex` (it duplicates /contact's scheduler), so it stays out of
 * the index here too; links on it are still followed.
 */
export const metadata: Metadata = {
  title: "Book Your Free Consultation",
  description:
    "Pick a time for a free consultation with Mandy Gonzales of Miles & Memories. Complimentary travel planning with no hidden fees.",
  alternates: { canonical: "/booking" },
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  return (
    <SectionWrapper
      tone="cream"
      padding="none"
      width="full"
      className="min-h-[50rem] pt-28 pb-16 md:pt-40 lg:pt-52 lg:pb-20"
      innerClassName="flex max-w-250 flex-col gap-8 md:gap-10"
    >
      <h1 className="BookingTitle text-center text-3xl font-medium tracking-normal">
        Book Your Free Consultation
      </h1>
      <BookingEmbed />
    </SectionWrapper>
  );
}
