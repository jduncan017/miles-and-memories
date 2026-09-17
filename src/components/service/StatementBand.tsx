import { SectionWrapper } from "~/components/SectionWrapper";

/*
 * The uppercase statement that opens every service page under the hero
 * ("YOUR SECRET WEAPON FOR…"): a tracked DM Sans bold line, a Playfair
 * sub-line in capitalised case, then a hairline rule that closes the band.
 * Measured off live: 1000px heading column, 720px sub-line, 100px down to a
 * 1200px g0 rule.
 */
export function StatementBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <SectionWrapper
      tone="white"
      padding="none"
      className="StatementBand pt-10 lg:pt-25"
    >
      <div className="StatementBandCopy mx-auto flex max-w-250 flex-col items-center gap-3 text-center">
        <h2 className="StatementBandTitle font-body text-xl font-bold tracking-[0.09em] uppercase md:text-[2rem]">
          {title}
        </h2>
        <p className="StatementBandBody max-w-text font-heading text-lg font-normal tracking-[0.02em] text-g3 capitalize md:text-[1.375rem]">
          {body}
        </p>
      </div>
      <hr
        aria-hidden="true"
        className="StatementBandRule mt-10 border-0 border-t-2 border-g0 lg:mt-25"
      />
    </SectionWrapper>
  );
}
