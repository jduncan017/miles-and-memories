# Where CSS lives

Binding, alongside the rules in `design-system.md`.

The short version: **`globals.css` is for things that are genuinely global or
that CSS gives no other home. Everything else lives beside the component that
uses it.**

Chasing a class name from a component into a stylesheet to find out what it does
is friction on every single edit, and it grows quietly — one utility at a time,
each individually defensible.

---

## What belongs in `globals.css`

1. **`@theme` tokens** — colours, fonts, the type scale, widths, shadows.
2. **`[data-accent]` scopes** (or equivalent theme scopes). The point of these
   is that they cascade.
3. **`@layer base`** — element defaults: `body`, `h1`–`h6`, `focus-visible`,
   `p`/`li`, `hr`.
4. **`@keyframes`** — CSS has no other home for these.
5. **Text utilities used across many components.** The test is real usage, not
   intent: if it is in one file, it is not a utility, it is that component's
   styling.
6. **Global media queries**, e.g. the blanket `prefers-reduced-motion` rule.

## What does not

Anything scoped to one component. Use Tailwind utilities inline, an inline
`style`, or `cx()` from `lib/cx.ts`.

Audit before shipping. This should return nothing but genuine cross-cutting
utilities:

```bash
# Every custom class in globals, with how many component files use it.
grep -oE '^\s*\.[a-z-]+ \{' src/styles/globals.css | tr -d ' .{' | while read c; do
  echo "$(grep -rl "\b$c\b" src --include='*.tsx' | wc -l) files  $c"
done | sort -n
```

One file means move it. Zero means delete it.

---

## Reach for `cx()`, not `tailwind-merge`

`lib/cx.ts` joins class names and drops falsy values. That is all it does.

Conflicting utilities are deliberately **not** resolved. This kit resolves them
structurally: each design dimension is a typed prop with a single source (see
`CardWrapper`'s `padding` / `shadow` / `rounded`), and `className` is additive
only. Two competing utilities should never reach the same element. Adding a
merger hides that mistake instead of fixing it, and it costs a runtime parse on
every render.

---

## Two gotchas that cost real debugging time

### Do not hand-write vendor prefixes

```css
/* WRONG — Lightning CSS collapses the pair and emits only the -webkit- line,
   so getComputedStyle().backdropFilter reads "none" and nothing renders. */
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);

/* RIGHT — the toolchain prefixes from the browser targets. */
backdrop-filter: blur(10px);
```

### `backdrop-filter` is disabled by several ancestor properties

An ancestor with `transform`, `filter`, `opacity < 1`, `isolation: isolate`,
`will-change`, `perspective`, `contain`, or `mix-blend-mode` becomes the
*backdrop root*, and the filter can then only sample inside it — usually
nothing.

The two that bite in practice:

- A reveal wrapper settling on `scale-100` rather than `transform-none`. An
  identity matrix is still a transform.
- `filter` and `backdrop-filter` on the **same element**. Split them across two
  nested elements: outer filters, inner blurs.

When glass "does not work", walk the ancestor chain before touching the CSS.

---

## Reduced motion

Prefer Tailwind's `motion-reduce:` variant on the element over a rule in
globals. It keeps the behaviour next to the thing it modifies, and it avoids
component-specific selectors leaking into the global sheet.

```tsx
className="transition-all motion-reduce:transform-none motion-reduce:opacity-100"
```

The blanket `prefers-reduced-motion` rule in `globals.css` stays — it is the
safety net for anything that slips through.
