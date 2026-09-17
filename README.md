# milesandmemories.net

The Miles & Memories site (Mandy Gonzales, Travelmation), rebuilt off Framer
onto Next.js.

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 on the design system from `dns-component-library`
- **Content:** TypeScript records and MDX in `src/content`, edited in the repo
- **Every public page is statically generated.**

## Getting started

```bash
npm install
npm run dev
```

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (read the route table: public routes must be `○`/`●`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier with Tailwind class ordering |

## Where content lives

| Content | File |
|---|---|
| Site identity, nav, contact details, Cal.com link | `src/lib/site.ts` |
| Homepage | `src/app/page.tsx` |
| Reviews marquee | `src/content/testimonials.ts` |
| Service pages (4) | `src/content/services.ts` |
| Destination guides | `src/content/destinations/<slug>.mdx` |
| Travel tips posts | `src/content/travel-tips/*.mdx` |
| Privacy, terms | `src/content/legal/*.mdx` |

Adding a guide or a post is adding a file: the index, sitemap and structured
data all read from the same directory.

## Conventions

`AGENTS.md` is the short version; `docs/reference/design-system.md` (§0 lists
where this site deviates from the library, and why) and
`docs/reference/css-organization.md` are binding.

## The old site

- `extraction/`: everything recovered from the live Framer site: copy as
  markdown per page, computed styles, and every original asset with a
  manifest mapping Framer URLs to `public/`. Regenerate with
  `node scripts/extract-live.mjs` and `node scripts/fetch-assets.mjs`.
- `docs/screenshots/`: full-page captures of live at 1440 and 390.
- `docs/www.milesandmemories.net/`: the raw HTML download.

All three can be deleted once the new site is live and verified.

## Before the DNS cutover

- [ ] Client sign-off on the legal pages (placeholders and a wrong phone and domain in the live text)
- [ ] Confirm the GTM container (GTM-T78WCQM7) is not needed beyond GA4
- [ ] Book a test consultation through the Cal.com embed
- [ ] Re-submit `sitemap.xml` in Google Search Console
