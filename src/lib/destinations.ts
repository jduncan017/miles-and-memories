import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Faq } from "~/components/FaqSection";

/*
 * Destination guides: `src/content/destinations/<slug>.mdx`.
 *
 * Same split as the travel-tips and digitalnova article pipelines:
 *
 *  - Everything that lists or describes a guide (the index grid, metadata,
 *    JSON-LD, the hero, FAQs, closing CTA) reads frontmatter off disk with fs,
 *    so the index never pulls five MDX bodies into its bundle.
 *  - The guide route imports the one MDX module it renders. The body holds the
 *    long prose and its photos, laid out with the template components in
 *    `components/destination/` (Intro, Panel, Split).
 *
 * The file name is the URL slug; every live slug is file-name safe.
 */

const DIR = path.join(process.cwd(), "src/content/destinations");

export type DestinationMeta = {
  slug: string;
  /** Index order, ascending. */
  order: number;
  /** The h1 in the caption bar, and the card title on the index. */
  title: string;
  /** Uppercase line under the h1. */
  tagline: string;
  /** `<title>` without the site suffix. */
  seoTitle: string;
  description: string;
  hero: string;
  heroAlt: string;
  /** Index card photo; falls back to the hero. */
  card: string;
  cardAlt: string;
  /** The bordered "read the story" panel after the guide body. */
  guide: { title: string; body: string; label: string; href: string };
  faqs: Faq[];
  /** The closing photo band. */
  cta: {
    title: string;
    body: string;
    label: string;
    href: string;
    image: string;
    imageAlt: string;
  };
};

const str = (v: unknown) => (v == null ? "" : String(v));

function read(slug: string): DestinationMeta {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(raw);
  const hero = str(data.hero);
  const heroAlt = str(data.heroAlt);
  return {
    slug,
    order: Number(data.order ?? 99),
    title: str(data.title),
    tagline: str(data.tagline),
    seoTitle: str(data.seoTitle) || str(data.title),
    description: str(data.description),
    hero,
    heroAlt,
    card: str(data.card) || hero,
    cardAlt: str(data.cardAlt) || heroAlt,
    guide: {
      title: str(data.guide?.title),
      body: str(data.guide?.body),
      label: str(data.guide?.label) || "Read Our Guide",
      href: str(data.guide?.href),
    },
    faqs: Array.isArray(data.faqs)
      ? data.faqs.map((f: { q?: unknown; a?: unknown }) => ({
          q: str(f.q),
          a: str(f.a),
        }))
      : [],
    cta: {
      title: str(data.cta?.title),
      body: str(data.cta?.body),
      label: str(data.cta?.label) || "Start Planning Your Trip",
      href: str(data.cta?.href) || "/contact",
      image: str(data.cta?.image) || hero,
      imageAlt: str(data.cta?.imageAlt),
    },
  };
}

export function getAllDestinations(): DestinationMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => read(f.replace(/\.mdx$/, "")))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getDestination(slug: string): DestinationMeta | undefined {
  return getAllDestinations().find((d) => d.slug === slug);
}
