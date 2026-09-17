import { FadeIn } from "~/components/FadeIn";
import { SectionWrapper } from "~/components/SectionWrapper";

/*
 * Three numbered cards on the cream band ("What sets us apart…"). Measured off
 * live: left-aligned 800px heading, 384px cards with a 24px gutter, a 150°
 * n0 → n1 fill with an inset 4px drop, 16px radius, 40px padding (24px on
 * phones), and the number set in p3 inside the title.
 */
export function NumberedCards({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <SectionWrapper tone="cream">
      <h2 className="NumberedCardsTitle max-w-200 capitalize">{title}</h2>
      <ol className="NumberedCardsList mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title}>
            <FadeIn delay={i * 120} className="h-full">
              <div className="NumberedCard flex h-full flex-col gap-4 rounded-2xl bg-linear-150 from-n0 to-n1 p-6 shadow-[inset_0_0.25rem_0.5rem_rgb(0_0_0/0.25)] lg:p-10">
                <h3 className="NumberedCardTitle text-g4">
                  <span className="text-p3">{i + 1}.</span> {item.title}
                </h3>
                <p className="NumberedCardBody text-g2">{item.body}</p>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
