<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Project conventions

This site is a rebuild of the Framer site at www.milesandmemories.net, on
`dns-component-library` (clone-and-own, one directory up) and the pattern used
for `digitalnova-studio`. Goal of the first pass: **match the live site** in
layout, copy and imagery, while fixing what Framer did badly (SEO, a11y, closed
FAQ answers missing from HTML).

## Reference material (read before building a page)

- `extraction/content/<slug>.md` — the live copy in DOM order, with image URLs,
  rendered sizes and y positions. `<slug>` is the path with `/` → `__`.
- `extraction/live/<slug>.json` — type scale, colours, media, links per page.
- `extraction/assets/manifest.json` — Framer URL → local `public/` path. Every
  image is already downloaded and converted; never hotlink framerusercontent.
- `docs/screenshots/<slug>-{1440,390}.png` — full-page captures of live.
- `docs/www.milesandmemories.net/` — the raw HTML download.

## Measuring (do not eyeball)

Dev server: `http://localhost:3002`. Probes in `scripts/`:

- `node scripts/element-probe.mjs <path> <depth> "<exact text>"...` — computed
  styles of an element and its ancestors on LIVE (`BASE=http://localhost:3002`
  for ours, `VW=390` for mobile).
- `node scripts/section-probe.mjs "<heading text>" <path>` — a section subtree.
- `node scripts/shoot.mjs --w=1440,390 /path` → `/tmp/shots/`, reports
  horizontal overflow. `node scripts/slice.mjs <png>` cuts it into viewable parts.
- Closed accordions on live are not in the DOM: click them open with Playwright
  to read the answers.

Layout claims get checked in a real browser before they are reported done.
`scrollWidth > clientWidth` on `documentElement` is what overflow means.

## Design system

`src/styles/globals.css` holds the tokens; `docs/reference/css-organization.md`
is binding. Ramps (0 lightest → 5 darkest):

- `n*` warm creams — `n0` white, `n1` page cream, `n2` band gradient end
- `p*` brand pink — `p3` is the CTA fill and highlight text, `p2` on dark
- `g*` greys — `g5` near-black headings/dark bands, `g4` footer, `g3` body,
  `g2` secondary, `g1` muted (NOT for body text on light: fails AA), `g0` light text on dark
- `s*` wine — dark photo-overlay tones only

Never hardcode a hex or use Tailwind palette colours (`bg-gray-500`) in a
component. Never add a colour token.

Type: `h1`/`h2` are Playfair (base layer sizes them), `h3`–`h6` are DM Sans.
Size tokens: `text-sm base lg xl 2xl 3xl 4xl stat`, which step at md and lg to
the live values. No other font sizes unless a measurement demands it.

## Shared components (`src/components/`) — reuse, do not fork

`Button` (primary / light / dark; `href` makes it a link) · `PageHero` ·
`SectionWrapper` (tone white / cream / page / dark) · `SectionHeader` ·
`ImageTile` (photo card: stacked on phones, hover-reveal from md) ·
`FinalCta` (photo / shade / parallax) · `FaqSection` (+ FAQPage JSON-LD) ·
`StatRow` (inline / columns) · `TestimonialMarquee` · `BookingEmbed` (Cal.com) ·
`FadeIn` · `JsonLd` · `PageTransition` · `layout/Navbar` · `layout/Footer`.
Site constants in `src/lib/site.ts`.

## Images

`public/images` holds Framer's original webp files byte for byte (jpg/png
sources converted once at q90 / lossless). Do not re-encode them. next/image
resizes per viewport at quality 90 (`images.qualities` in next.config.ts).

## Page transition

`PageTransition` drives the View Transitions API directly for internal link
clicks; the animation is CSS on the `root` snapshot in globals.css. Do not add
React `<ViewTransition>` boundaries without reading that component's comment,
and never put a `transform` on an ancestor of the parallax `FinalCta`.

- Every `className` starts with a PascalCase label (`className="ServiceCard flex ..."`).
- Hover, active and focus-visible on everything clickable.
- `next/image` for every raster, with honest `width`/`height` ratios or `fill` + `sizes`.
- One h1 per page; don't skip heading levels.
- Copy: keep the live wording. Headings in Capital Case. No em or en dashes in
  user-facing text (rephrase with a comma, colon or period).
- Each page exports `metadata` with the live title/description (fix obvious
  duplicates) and a canonical.

## Before shipping

```bash
npx tsc --noEmit
npx eslint src --max-warnings=0
npm run build
```

## What costs money

`images.minimumCacheTTL` is set to 31 days and `deviceSizes` trimmed in
`next.config.ts`. Every public route must build as static (`○`/`●`): check the
build output for `ƒ`.
