import { Plus } from "lucide-react";
import { JsonLd } from "~/components/JsonLd";
import { SectionWrapper, type SectionTone } from "~/components/SectionWrapper";

export type Faq = { q: string; a: string };

/*
 * FAQ list on native <details>, so it needs no client JS and every answer is in
 * the served HTML (the Framer build rendered closed answers client-side only,
 * so Google never saw them). Emits FAQPage JSON-LD from the same data.
 *
 * Measured off the live build: 800px column, white 16px-radius cards with a
 * 2px drop, 24px padding, a pink plus that turns into an x, and the open
 * question row going g2 with white text.
 */
export function FaqSection({
  title = "Frequently Asked Questions",
  items,
  tone = "cream",
}: {
  title?: string;
  items: Faq[];
  tone?: SectionTone;
}) {
  return (
    <SectionWrapper tone={tone}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <h2 className="FaqTitle text-center capitalize">{title}</h2>
      <div className="FaqList mx-auto mt-10 flex max-w-200 flex-col gap-4">
        {items.map((f) => (
          <details
            key={f.q}
            className="FaqItem group overflow-hidden rounded-2xl bg-n0 shadow-[0.125rem_0.125rem_0.25rem_rgb(0_0_0/0.25)]"
          >
            <summary className="FaqQuestion flex cursor-pointer list-none items-center gap-6 p-6 text-xl font-semibold text-g5 transition-colors group-open:bg-g2 group-open:text-n0 hover:bg-n2 group-open:hover:bg-g3 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
              <Plus
                aria-hidden="true"
                strokeWidth={2.5}
                className="size-6 shrink-0 text-p3 transition-transform duration-300 group-open:rotate-45 group-open:text-p2"
              />
              {f.q}
            </summary>
            <p className="FaqAnswer px-6 pt-4 pb-6 text-g3 md:pl-[4.5rem]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
