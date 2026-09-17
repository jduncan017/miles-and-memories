/*
 * Renders a JSON-LD <script>. Serializes with the `<` / `>` / `&` and line-
 * separator escapes that keep CMS-authored strings (FAQ answers, bios, titles)
 * from breaking out of the <script> element — a literal `</script>` in the data
 * can no longer close the tag. Use this for ALL structured data; never hand-roll
 * `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}`.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | unknown[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

// Escapes both the tag-breakout characters and U+2028/U+2029 (valid in JSON but
// they break an inline <script>). Built from char codes so the source stays
// ASCII-clean (no invisible separator literals).
const UNSAFE = [0x3c, 0x3e, 0x26, 0x2028, 0x2029];
const UNSAFE_RE = new RegExp(
  `[${UNSAFE.map((c) => `\\u${c.toString(16).padStart(4, "0")}`).join("")}]`,
  "g",
);

function serialize(data: unknown): string {
  return JSON.stringify(data).replace(
    UNSAFE_RE,
    (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
