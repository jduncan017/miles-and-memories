import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/*
 * Policy pages: `src/content/legal/<slug>.mdx`. Frontmatter is read with fs, as
 * in lib/travel-tips.ts, so metadata never depends on importing the body.
 */

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

export type LegalSlug = "privacy" | "terms-and-conditions";

export type LegalMeta = {
  slug: LegalSlug;
  /** Hero h1. */
  title: string;
  /** The heading over the policy text (live repeats or renames the h1). */
  heading: string;
  seoTitle: string;
  description: string;
  hero: string;
  heroAlt: string;
};

export function getLegalPage(slug: LegalSlug): LegalMeta {
  const { data } = matter(
    fs.readFileSync(path.join(LEGAL_DIR, `${slug}.mdx`), "utf8"),
  );
  const str = (v: unknown) => (v == null ? "" : String(v));
  return {
    slug,
    title: str(data.title),
    heading: str(data.heading) || str(data.title),
    seoTitle: str(data.seoTitle) || str(data.title),
    description: str(data.description),
    hero: str(data.hero),
    heroAlt: str(data.heroAlt),
  };
}
