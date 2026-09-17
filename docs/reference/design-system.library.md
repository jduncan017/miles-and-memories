# CTS Design System

> Source: DigitalNova Studio core design principles (Josh's article) + the CTS brand guide.
> This is the binding reference for all design work on this site. When a rule here
> conflicts with a quick styling instinct, the rule wins. Implementation lives in
> `src/styles/globals.css` (`@theme` tokens + base layer) and `src/fonts/index.ts`.

---

## 1. Typography

### Fonts (max two per site)
| Role | Font | Weights | Token |
|---|---|---|---|
| Headings (all levels, H1–H6) | **Cormorant Garamond** | 400 / 500 / 600 | `font-heading` |
| Body (everything else) | **Inter** | 300 / 400 / 500 / 600 | `font-body` |

- Inter is the body font because it's designed for screens — never use the display font for body copy.
- **Two heading roles.** *Display* headings use Cormorant (the h1–h6 base default) for page, section, and marketing titles — the big, elegant moments. *Functional* headings use Inter via the `heading-ui` utility (semibold, line-height 1.3) for legibility in compact, app-like contexts: quiz questions, form section titles, dense UI. Rule of thumb: Cormorant for the title that sets the tone, Inter where smaller heading text must stay crisp and readable.
- (`font-mono` / Courier Prime exists only for wireframe labels — not part of the final design.)

### Rules
- **Headings always use Capital Case** (Title Case: capitalize principal words; articles/short prepositions/conjunctions stay lowercase unless first or last). Applies to every H1/H2/H3.
- **Never use em (—) or en (–) dashes in copy. Ever.** Rephrase with a comma, period, colon, or question mark. Applies to all user-facing text including meta descriptions.
- **Never center-align body text** longer than ~2 lines. Left-align paragraphs, always. Centering is fine for short headlines/taglines.
- **Progressive disclosure:** the most important text is the largest. H1 immediately dominant → H2 → H3 → body. Body copy is the smallest text on the page (meta/captions excepted).
- **Large text is short.** Big headlines are punchy, scannable statements — details belong in body copy.
- **Header structure:** one H1 per page. H1 → H2 → H3 in sequence, never skip a level for size reasons — adjust the size, not the hierarchy.
- **Line height:** headings **1.2** · large text (`text-lg` and up) **1.4** · normal body text **1.6**. All set in the base layer / type tokens.
- **Heading weights:** H1 & H2 regular (400) · H3 medium (500) · H4–H6 semibold (600). Set in the base layer.
- **Text colors:** H1/H2 are `g4`; body is `g3` (the global default on `body`). H3–H6 default to `g4` but may take accent colors for emphasis. On dark backgrounds: **white** headings, `n1` body.

### Type scale (responsive golden ratio)
**Copy size floor:** real content never goes below `text-base`. `text-sm` (14px) is reserved for decorative/peripheral text only: meta lines, chips/tags, eyebrows, legal fine print. `text-xs` is banned.

Base font size is responsive: **16px mobile · 17px tablet (≥768px) · 18px desktop (≥1024px)** at normal browser settings. Implemented via a `--text-scale` factor (1 / 1.0625 / 1.125) on the rem-based tokens — **the root font size is never overridden**, so user font-size preferences scale everything (rem for accessibility). All sizes are golden-ratio quarter steps (φ^(n/4)) from the base. Don't invent ad-hoc sizes. Px values below are at normal settings:

| Token | Heading | @16px | @17px | @18px |
|---|---|---|---|---|
| `text-sm` | — | 14 | ~15 | ~16 |
| `text-base` | body | 16 | 17 | 18 |
| `text-lg` | h6 | 23 | ~24 | ~26 |
| `text-xl` | h5 | 26 | ~28 | ~29 |
| `text-2xl` | h4 | 29 | ~31 | ~33 |
| `text-3xl` | h3 | 33 | ~35 | ~37 |
| `text-4xl` | h2 | 37 | ~39 | ~42 |
| `text-5xl` | h1 | 42 | ~45 | ~47 |

Heading elements get these sizes automatically from the base layer. Sizing a heading *down* with a utility (e.g. card `h3` at `text-xl`) is fine — never skip heading *levels* for size.

**Button Text** — named type for buttons and nav links: **19px** (at normal rems; fixed, doesn't scale with `--text-scale`), weight 500 (medium), line-height 1.4, loose tracking (`--tracking-loose: 0.05em`), **labels written in Capital Case and never wrapped** (`whitespace-nowrap`). Utility: `button-text`.

---

## 2. Layout & Spacing

### Width constraints (theme tokens → utilities)
| Constraint | Value | Utility |
|---|---|---|
| Standard section content | 1200px | `max-w-section` |
| Wide sections (nav, footer, visual bands) | 1400px | `max-w-section-wide` |
| Body text / prose | **720px max** (400–600px sweet spot) | `max-w-text` |

Every section gets a max width — no full-bleed text on large monitors. Within a section, paragraphs get their own `max-w-text` constraint. (Use `max-w-text`, **not** Tailwind's built-in `max-w-prose` — that's a static 65ch that can't be overridden by our token.)

### Section padding (`.section-pad`)
| Breakpoint | Top/Bottom | Left/Right |
|---|---|---|
| Mobile | 64px | 24px |
| Tablet (≥768px) | 80px | 64px |
| Desktop (≥1024px) | 120px | 80px |

Gap between sections on desktop ≈ 120px. More breathing room than feels necessary is correct.

### Spacing scale — never invent numbers
All padding / margins / gaps come from:

**1 · 2 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120px**, then +40px increments (160, 200, 240…).

Tailwind mapping (4px base — only use these steps):

| px | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 120 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| class suffix | `1` | `2` | `4` | `6` | `8` | `10` | `12` | `16` | `20` | `24` | `30` |

(e.g. `gap-6` = 24px, `py-30` = 120px.) Exceptions (12px / 72px) are allowed when genuinely needed — as exceptions, not habits.

**Implementation note:** everything is rem-based for accessibility — user browser font-size preferences scale type, spacing, and widths together. Px values throughout this doc are at normal settings (1rem = 16px).

### Cards & internal whitespace (inside sections)
| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| **Large card** padding — top/bottom | 64px | 64px | 64px |
| **Large card** padding — left/right | 64px | 40px | 24px |
| **Small card** padding — top/bottom | 40px | 40px | 40px |
| **Small card** padding — left/right | 40px | 24px | 16px |
| Spacing between cards | 24px | 24px | 24px |
| Spacing between text and images | 64px | 40px | 24px |

Tailwind recipes: large card `py-16 px-6 md:px-10 lg:px-16` · small card `py-10 px-4 md:px-6 lg:px-10` · card grids `gap-6` · text↔image `gap-6 md:gap-10 lg:gap-16`. Gaps *inside* a card (icon↔label, title↔body) are 16px (`gap-4`); compact chips/tags set their own (12–16px x, 4–8px y).

---

## 3. Color

Tokens in `globals.css` — **never hardcode a hex in a component.**

### Palette = 2–3 hues only
Teal (`p0`–`p5`), sage (`s0`–`s2`, `s5`), warm neutrals (`n0`–`n5`), greys (`g0`–`g5`). Variety comes from shades of these hues, never new hues. Convention: **0 = lightest → 5 = darkest** (sage keeps a sparse middle: 0/1/2/5; `n0` = pure white, `g5` = near-black). The light ends (`p0`/`s0`/`g0`) are whisper washes for hover/selected/tints; the dark ends (`p5`/`g5`/`s5`) suit text and dark surfaces.

**Solid tokens for structural color.** Need a lighter or darker shade? Use the solid `0`/`5` token — **never fake one with opacity over an assumed background**. Opacity-as-color only holds where you control what's behind it; it breaks over gradients and tints ("works except when it doesn't"). Reserve transparency for genuine glass/overlay (e.g. a blurred card deliberately sitting over a textured page background) and faint dividers on dark surfaces.

### Distribution (from the brand guide)
- Neutrals/greys: **60–70%** of any layout. `n1` is the page background.
- Primary teal: **20–30%** — navigation, section backgrounds, CTAs.
- Sage accents: **10–15% max** — highlight words, icons, small elements only.

### The CTA color is protected
**`p3` (mid teal) is the primary brand color, and `p3` fills are reserved for calls to action** — book, quiz, contact, submit. Never use `p3` fills decoratively; protecting it keeps it meaning "do something here." (`p3`/`p4` as text colors are fine — the protected use is the filled-surface treatment. `p4` is the deep-teal support shade: headings, hover states, dark accents.)

### Contrast (WCAG AA, 4.5:1 body text) — measured combos
| Foreground on `n1`/`n2`/`n3` | Ratio (on n1) | Verdict |
|---|---|---|
| `g4` | ~10.3:1 | ✅ body text — default |
| `p4` | ~7.6:1 | ✅ body text / headings |
| `g3` | ~5.2:1 | ✅ secondary/meta text |
| `s2` | ~4.8:1 | ✅ highlight words (sparingly) |
| `p3` | ~4.4:1 | ⚠️ large text (≥24px) only |
| `p2`, `p1`, `s1`, `g2`, `g1` | < 3:1 | ❌ never as text on light bg |
| `n1` on `p3` | ~4.4:1 | ⚠️ the standard CTA combo — marginally under strict AA 4.5 for small text. Keep CTA text ≥16px medium; for small-text-on-fill cases needing strict AA, use a `p4` fill |
| `n1` on `p4` | ~7.6:1 | ✅ small text on fill, strict-AA fallback |

Don't guess on new combos. Check them.

### Images
Choose photos whose tones sit naturally with the warm cream + teal + sage palette. No cold blue-tinted stock against this warm base.

---

## 4. Components

- **Centralized styles:** every color and text style comes from the `@theme` tokens. One change updates the whole site.
- **Named elements — every `className` starts with a PascalCase semantic name** before the utilities: `className="NavBar flex items-center px-4"`, `className="HeroSection ..."`, `className="CardWrapper ..."`, `className="Spacer"`. The names carry no styles; they exist so you always know what element you're looking at in the DOM inspector and in long Tailwind strings. In components, put the name first in the template (`` `WireBox ${...}` ``); the Prettier Tailwind plugin keeps unknown classes at the front. Never attach CSS to these names — they are labels, not hooks.
- **Consistency:** shared border-radius scale (`shared-styles.ts` `roundedClasses`), internal spacing from the scale above. Components should feel like one family — never some rounded/some sharp, some heavy-shadowed/some flat.
- **Card surface** (`src/components/CardWrapper.tsx`) — one card treatment for the whole site so every card speaks the same language: a soft `n1→n2` gradient (to the bottom-right), hairline `n4` border, theme shadow, `lg` radius, `lg` padding. Padding / shadow / rounded are typed props with defaults; `className` adds layout (width, flex, margin). Reach for it instead of hand-rolling a bordered, shadowed box.
- **Shadows — exactly three elevation steps**, all 25% black, rem-based (px at normal rems):
  - `shadow-theme-sm` (2px 2px 4px) — buttons (except ghost — text-only stays flat — and the navbar CTA, which sits in an already-shadowed bar: `flat` prop)
  - `shadow-theme` (4px 4px 8px) — cards, images, and the nav bar
  - `shadow-theme-xl` (8px 8px 16px) — the hero/page-header section and every other section after it (alternating; sections in between stay flat)
- **Interactive states — all three, every time:**
  - `hover:` — visual feedback that it's clickable
  - `active:` — confirms the press registered
  - `focus-visible:` — **never skipped**; keyboard/a11y. Standard ring: `focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none`
- **The Button** (`src/components/Button.tsx`) — every button on the site is a variant of this **one** component; its styles live in the same file (no separate styles module, no wrapper button components). Trigger-opens-a-modal is composed at the call site with `useDisclosure` + `Modal`, not a special button. Spec:
  - Button Text type · **24px x / 12px y padding** · pill radius by default
  - `shadow-theme-sm` on every variant except `ghost` (text-only stays flat); the `flat` prop opts out in already-elevated contexts (navbar CTA)
  - All variants transition **300ms** on hover/active, plus the focus ring
  - `primary`: `p3` fill, `n1` text → hover `p4` (the protected CTA treatment)
  - `secondary`: `p3` outline/text → hover fills `p3`
  - `ghost`: text-only → hover tints `p1`
  - Renders as `button`, `a`, or Next `link` via the `as` prop; supports `loading`/`disabled`

---

## 5. Images & Performance

- **WebP** for all raster images.
- **Export at display size** — never a 4000px image in a 600px container. (`next/image` with correct `sizes` handles responsive variants; still start from a sanely-sized source.)
- **Lazy load below the fold** — `next/image` default. Only above-the-fold/LCP images get `priority`.

---

## The short version
1. Left-align body text; progressive disclosure for hierarchy. Headings in Capital Case. No em/en dashes in copy, ever.
2. Sections max 1200px (1400px wide variant); body text max 720px.
3. Inter for body; Cormorant Garamond for every heading.
4. 2–3 hues; `p3` fill = CTA only, protected.
5. Check contrast — don't guess (table above).
6. Generous section padding (64/80/120) — more than feels needed.
7. Spacing only from the scale: 1·2·4·8·16·24·32·40·48·64·80·96·120.
8. WebP, display-sized, lazy-loaded images.
