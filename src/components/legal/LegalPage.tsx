import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { PageHero } from "~/components/PageHero";
import { SectionWrapper } from "~/components/SectionWrapper";
import { cx } from "~/lib/cx";
import type { LegalMeta } from "~/lib/legal";

/*
 * Shared template for /privacy and /terms-and-conditions.
 *
 * Measured off live: the interior photo hero with the title only, then a white
 * band holding a 700px column: a Playfair h2, and 20px/30px DM Sans text in a
 * near-black with 8px between blocks. Section titles on live are bold
 * paragraphs; here they are h3s styled the same way, so the policy has a real
 * outline for screen readers.
 */
export const legalProse: MDXComponents = {
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cx("LegalP mt-2 text-lg text-g4", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cx(
        "LegalH3 mt-2 scroll-mt-32 text-lg leading-normal font-bold tracking-normal text-g4",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cx("LegalList mt-2 list-disc pl-7 marker:text-g4", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cx("LegalLi text-lg text-g4", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cx("font-bold", className)} {...props} />
  ),
  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={cx(
        "LegalLink rounded-xs break-words text-p3 transition-colors hover:text-p4 hover:underline focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  ),
};

export function LegalPage({
  page,
  children,
}: {
  page: LegalMeta;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero title={page.title} image={page.hero} imageAlt={page.heroAlt} />
      <SectionWrapper tone="white" width="full" innerClassName="max-w-175">
        <article className="LegalBody">
          <h2 className="LegalHeading mb-6 text-g5 capitalize">
            {page.heading}
          </h2>
          {children}
        </article>
      </SectionWrapper>
    </>
  );
}
