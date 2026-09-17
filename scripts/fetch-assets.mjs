/*
 * Downloads every Framer-hosted image and video referenced by the extracted
 * copy, and writes web-ready versions into public/.
 *
 *   extraction/assets/<framer-id>.<ext>      the original, untouched
 *   public/images/<name>.webp                raster: webp originals copied untouched,
 *                                            jpg/png converted once (q90 / lossless)
 *   public/images/<name>.svg | public/video/<name>.mp4   copied as-is
 *   extraction/assets/manifest.json          url -> public path, alts, pages, rendered size
 *
 * <name> comes from the alt text so the files are readable; the Framer id is
 * appended only when two different images share an alt.
 *
 *   node scripts/fetch-assets.mjs
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from "node:fs";

mkdirSync("extraction/assets", { recursive: true });
mkdirSync("public/images", { recursive: true });
mkdirSync("public/video", { recursive: true });

const refs = new Map(); // url -> { alts:Set, pages:Set, maxW, maxH, kind }
for (const file of readdirSync("extraction/content")) {
  const page = file.replace(/\.md$/, "");
  const md = readFileSync(`extraction/content/${file}`, "utf8");
  for (const m of md.matchAll(/!\[([^\]]*)\]\((https:\/\/framerusercontent\.com\/[^)\s]+)\)(?:\s*<!-- (\d+)x(\d+))?/g)) {
    const r = refs.get(m[2]) ?? { alts: new Set(), pages: new Set(), maxW: 0, maxH: 0, kind: "image" };
    if (m[1] && m[1] !== "bg") r.alts.add(m[1]);
    r.pages.add(page);
    r.maxW = Math.max(r.maxW, Number(m[3] ?? 0));
    r.maxH = Math.max(r.maxH, Number(m[4] ?? 0));
    refs.set(m[2], r);
  }
  for (const m of md.matchAll(/\[video\]\((https:\/\/framerusercontent\.com\/[^)\s]+)\)/g)) {
    const r = refs.get(m[1]) ?? { alts: new Set(), pages: new Set(), maxW: 0, maxH: 0, kind: "video" };
    r.pages.add(page);
    refs.set(m[1], r);
  }
}
// Rendered sizes from the JSON too (covers images the markdown walker skipped).
for (const file of readdirSync("extraction/live")) {
  const d = JSON.parse(readFileSync(`extraction/live/${file}`, "utf8"));
  for (const m of d.media) {
    const r = refs.get(m.src);
    if (!r) continue;
    r.maxW = Math.max(r.maxW, m.w);
    r.maxH = Math.max(r.maxH, m.h);
  }
}

const slug = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const usedNames = new Map();
const manifest = [];
for (const [url, r] of refs) {
  const id = url.split("/").pop().split(".")[0];
  const ext = url.split(".").pop().toLowerCase();
  const orig = `extraction/assets/${id}.${ext}`;
  if (!existsSync(orig)) {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`FAILED ${res.status} ${url}`);
      continue;
    }
    writeFileSync(orig, Buffer.from(await res.arrayBuffer()));
  }

  const alt = [...r.alts][0] ?? "";
  let base = slug(alt) || id.toLowerCase();
  if (usedNames.has(base) && usedNames.get(base) !== url) base = `${base}-${id.slice(0, 6).toLowerCase()}`;
  usedNames.set(base, url);

  let publicPath;
  let natural = null;
  if (r.kind === "video" || ext === "mp4") {
    publicPath = `/video/${base}.mp4`;
    copyFileSync(orig, `public${publicPath}`);
  } else if (ext === "svg") {
    publicPath = `/images/${base}.svg`;
    copyFileSync(orig, `public${publicPath}`);
  } else {
    const meta = await sharp(orig).metadata();
    natural = `${meta.width}x${meta.height}`;
    publicPath = `/images/${base}.webp`;
    if (ext === "webp" && meta.width <= 2560) {
      // Framer's originals are already efficient webp. Re-encoding them only
      // loses detail, so they are copied byte for byte; next/image does the
      // per-viewport resizing.
      copyFileSync(orig, `public${publicPath}`);
    } else {
      // jpg/png sources (and anything oversized) get one conversion, at a
      // quality high enough that the second pass in next/image is the only
      // visible one. PNGs are logos and icons: lossless keeps their edges.
      await sharp(orig)
        .resize({ width: 2560, withoutEnlargement: true })
        .webp(ext === "png" ? { lossless: true } : { quality: 90 })
        .toFile(`public${publicPath}`);
    }
  }

  manifest.push({
    url,
    public: publicPath,
    alt,
    alts: [...r.alts],
    pages: [...r.pages],
    rendered: `${r.maxW}x${r.maxH}`,
    natural,
  });
  console.log(`${publicPath}  <- ${id}.${ext}`);
}

writeFileSync("extraction/assets/manifest.json", JSON.stringify(manifest, null, 1));
console.log(`\n${manifest.length} assets`);
