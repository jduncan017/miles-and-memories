import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/*
 * Travel tip posts: `src/content/travel-tips/*.mdx`.
 *
 * Two paths, as in the digitalnova article pipeline:
 *
 *  - Everything that lists or describes posts (the index, metadata, JSON-LD)
 *    reads frontmatter off disk with fs, so it never pulls five MDX bodies into
 *    a bundle.
 *  - The post route imports the one MDX module it renders, by `file`.
 *
 * The URL slug and the file name are separate on purpose. Live has a slug with
 * parentheses (`isla-holbox-won-me-over-(whale-shark-seasickness-and-all)`),
 * which is legal in a URL but awkward in a file name and a dynamic import. A
 * post sets `slug` in frontmatter when its URL differs from its file name.
 */

const TIPS_DIR = path.join(process.cwd(), "src/content/travel-tips");

export type TravelTipMeta = {
  /** URL segment under /travel-tips. */
  slug: string;
  /** MDX file name without extension. */
  file: string;
  title: string;
  /** `<title>` without the site suffix; falls back to `title`. */
  seoTitle: string;
  /** Meta description. */
  description: string;
  /** Card teaser on the index. */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  hero: string;
  heroAlt: string;
  /** The "Want the complete planning guide?" block at the foot of the card. */
  guide: { href: string; body: string };
  /** The closing photo band. */
  cta: {
    title: string;
    body: string;
    label: string;
    image: string;
    imageAlt: string;
  };
};

function read(file: string): TravelTipMeta {
  const raw = fs.readFileSync(path.join(TIPS_DIR, `${file}.mdx`), "utf8");
  const { data } = matter(raw);
  const str = (v: unknown) => (v == null ? "" : String(v));
  return {
    slug: str(data.slug) || file,
    file,
    title: str(data.title),
    seoTitle: str(data.seoTitle) || str(data.title),
    description: str(data.description),
    excerpt: str(data.excerpt),
    // gray-matter turns an unquoted YAML date into a Date.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : str(data.date),
    readingMinutes: Number(data.readingMinutes ?? 1),
    hero: str(data.hero),
    heroAlt: str(data.heroAlt),
    guide: { href: str(data.guide?.href), body: str(data.guide?.body) },
    cta: {
      title: str(data.cta?.title),
      body: str(data.cta?.body),
      label: str(data.cta?.label) || "Plan Your Trip",
      image: str(data.cta?.image),
      imageAlt: str(data.cta?.imageAlt),
    },
  };
}

/** Newest first. */
export function getAllTravelTips(): TravelTipMeta[] {
  return fs
    .readdirSync(TIPS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => read(f.replace(/\.mdx$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/*
 * Next hands a dynamic segment over still percent-encoded when the request
 * encoded it (some clients send `(` as `%28`), so both forms match.
 */
export function getTravelTip(slug: string): TravelTipMeta | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Malformed escape: fall through with the raw value.
  }
  return getAllTravelTips().find((t) => t.slug === decoded);
}

/** "Dec 6, 2025", the format the live meta row uses. */
export function formatTipDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
