# Miles & Memories design system

The library's rules (`design-system.library.md`, copied from
`dns-component-library`) apply except where §0 says otherwise.
`css-organization.md` is binding as written.

## 0. Where this project deviates from the library, and why

The first pass is a faithful rebuild of the live Framer site, so where the
library's defaults would visibly change the brand, the live measurement wins.
Every deviation below was measured with `scripts/element-probe.mjs` against
www.milesandmemories.net.

| Area | Library | This site | Why |
|---|---|---|---|
| Type scale | golden-ratio φ^(n/4), `--text-scale` factor | fixed per-breakpoint values in `--fs-*` (see `globals.css`) | Matches live at 390 / 810 / 1440. The live ratios aren't a single factor, so a scale factor can't reproduce them |
| Body floor | 16px | 16px on phones (live used 14px) | Accessibility; the one place we deliberately differ from live |
| Heading fonts | display face for h1 to h6 | Playfair for h1/h2; DM Sans for h3 and below | Live sets card and list titles in DM Sans semibold |
| Fonts | max two | two. Live loaded EB Garamond only for the "How It Works" numerals; those now use Playfair | A third face for four digits |
| Section padding | 120px desktop | 80px desktop (`py-20`) | Live rhythm |
| Button | 9 variants, 19px label, 24/12 padding | 3 variants (primary / light / dark), 20px label, 52px pill with arrow circle | Live has exactly these three |
| Card surface | gradient `CardWrapper` | white card with an inset top-left shadow (why-choose), white card with 4px drop (testimonials) | Live treatments |
| Accent ramp `s*` | a second brand hue | wine near-blacks for photo overlays | Live has a single hue (pink) |

## 0.1 Colour roles

| Role | Token |
|---|---|
| Page background | `n1` (cream), `n0` (white sections) |
| Raised band | 150° gradient `n1` → `n2` + 4px drop |
| Headings | `g5` on light, `n0`/`n1` on dark |
| Body | `g3` |
| Secondary text | `g2` |
| Muted (step descriptions, "View More" on photos) | `g1` (fails AA on light at body size: use only as live does, and prefer `g2` for anything new) |
| CTA fill, highlight words, stats | `p3` |
| Pink on dark | `p2` |
| Footer | `g4` |
| Dark band / nav solid | `g5` |

## 0.2 Contrast, measured

| Pair | Ratio | Verdict |
|---|---|---|
| `g3` #3a3a3a on `n1` | 11.1:1 | body ✅ |
| `g2` #535353 on `n1` | 7.5:1 | secondary ✅ |
| `g1` #858481 on `n1` | 3.6:1 | ❌ body; large text only |
| `n0` on `p3` #e62462 | 4.4:1 | CTA label ⚠️ just under AA, accepted for the brighter fill (2026-09-17); keep labels 20px medium or larger |
| `p3` on `n0` | 4.3:1 | highlight words ⚠️ large text only (hero subtitle, stats) |
| `g0` #e0e0e0 on `g4` #262626 | 11.5:1 | footer text ✅ |
| `p3` on `g4` | 3.5:1 | ❌ small text: the footer's "Travelmation.net" link, carried from live. Candidate fix: `p2` (5.7:1) |
