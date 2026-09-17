import { FadeIn } from "~/components/FadeIn";
import { JsonLd } from "~/components/JsonLd";
import { cx } from "~/lib/cx";
import { SectionWrapper, type SectionTone } from "~/components/SectionWrapper";

export type Faq = { q: string; a: string };

/*
 * FAQ list on native <details>, so it needs no client JS and every answer is in
 * the served HTML (the Framer build rendered closed answers client-side only,
 * so Google never saw them). Emits FAQPage JSON-LD from the same data.
 *
 * Measured off the live build: 800px column, white 16px-radius cards with a
 * 2px drop, a pink plus (two bars, 24px on desktop and 16px on phones) that
 * turns into an x, the whole card going p3 with white text on hover, the open
 * question row going g2, and the cards sliding in from the left on scroll.
 */
export function FaqSection({
  title = "Frequently Asked Questions",
  items,
  tone = "creamDeep",
}: {
  title?: string;
  items: Faq[];
  tone?: SectionTone;
}) {
  return (
    <SectionWrapper tone={tone} className="lg:pb-35">
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
        {items.map((f, i) => (
          <FadeIn key={f.q} from="left" delay={i * 90}>
            <details className="FaqItem group overflow-hidden rounded-2xl bg-n0 shadow-[0.125rem_0.125rem_0.25rem_rgb(0_0_0/0.25)] transition-colors duration-300 hover:bg-p3 open:hover:bg-g2">
              <summary className="FaqQuestion flex cursor-pointer list-none items-center gap-4 px-4 py-6 text-xl font-semibold text-g5 transition-colors duration-300 group-open:bg-g2 group-open:text-n0 group-hover:text-n0 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none focus-visible:ring-inset md:gap-6 md:px-6 [&::-webkit-details-marker]:hidden">
                <PlusIcon />
                {f.q}
              </summary>
              <p className="FaqAnswer px-4 pt-3.5 pb-3.5 text-lg text-g4 md:px-6 md:pt-4 md:pb-6 md:pl-10">
                {f.a}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}

/** Two bars rather than an icon font: live's plus is a full 24px wide (16 on phones). */
function PlusIcon() {
  const bar =
    "absolute inset-0 m-auto rounded-full bg-p3 transition-colors duration-300 group-hover:bg-n0 group-open:bg-p2";
  return (
    <span
      aria-hidden="true"
      className="FaqPlus relative block size-4 shrink-0 transition-transform duration-300 group-open:rotate-45 md:size-6"
    >
      <span className={cx(bar, "h-0.5 w-full")} />
      <span className={cx(bar, "h-full w-0.5")} />
    </span>
  );
}
