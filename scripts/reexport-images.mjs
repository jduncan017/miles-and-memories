/*
 * Rewrites every public/images raster from its untouched original in
 * extraction/assets, keeping the current public file names (several were
 * renamed after the first fetch). Same rule as fetch-assets.mjs: webp copied
 * byte for byte, jpg/png converted once at q90 / lossless.
 *
 *   node scripts/reexport-images.mjs
 */
import sharp from "sharp";
import { copyFileSync, existsSync, readFileSync, statSync } from "node:fs";

const manifest = JSON.parse(readFileSync("extraction/assets/manifest.json", "utf8"));
let before = 0, after = 0;
for (const a of manifest) {
  if (!a.public.startsWith("/images/") || !a.public.endsWith(".webp")) continue;
  const id = a.url.split("/").pop();
  const orig = `extraction/assets/${id}`;
  const out = `public${a.public}`;
  if (!existsSync(orig) || !existsSync(out)) {
    console.warn(`skip ${a.public} (missing ${existsSync(orig) ? "public file" : "original"})`);
    continue;
  }
  before += statSync(out).size;
  const ext = id.split(".").pop().toLowerCase();
  const { width } = await sharp(orig).metadata();
  if (ext === "webp" && width <= 2560) copyFileSync(orig, out);
  else
    await sharp(orig)
      .resize({ width: 2560, withoutEnlargement: true })
      .webp(ext === "png" ? { lossless: true } : { quality: 90 })
      .toFile(out + ".tmp.webp")
      .then(() => copyFileSync(out + ".tmp.webp", out));
  after += statSync(out).size;
}
console.log(`public/images: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB`);
