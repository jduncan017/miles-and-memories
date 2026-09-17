import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { cx } from "~/lib/cx";

/*
 * Element map for travel tip bodies, passed as `<Body components={...} />` so
 * the global mdx-components.tsx stays empty.
 *
 * Measured off the live post template: a 680px column, 20px/30px DM Sans body
 * in g3 with 8px between paragraphs, Playfair h2 at 28/36px regular weight with
 * 40px above, DM Sans semibold h3 in g4 with 40px above, and bulleted lists
 * 16px below their lead-in.
 */
export const articleProse: MDXComponents = {
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cx("ArticleP mt-2 text-lg text-g3 first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cx(
        "ArticleH2 mt-10 scroll-mt-32 text-[1.75rem] font-normal text-g5 capitalize first:mt-0 md:text-[2rem] lg:text-[2.25rem]",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cx(
        "ArticleH3 mt-10 scroll-mt-32 text-2xl text-g4 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cx(
        "ArticleList mt-4 list-disc pl-7 marker:text-g3",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cx(
        "ArticleList mt-4 list-decimal pl-7 marker:text-g3",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cx("ArticleLi text-lg text-g3", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cx("font-bold", className)} {...props} />
  ),
  a: ({ href = "", className, ...props }: ComponentPropsWithoutRef<"a">) => {
    const classes = cx(
      "ArticleLink rounded-xs text-p3 underline underline-offset-2 transition-colors hover:text-p4 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none",
      className,
    );
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...props} />
    ) : (
      <a href={href} className={classes} {...props} />
    );
  },
};
