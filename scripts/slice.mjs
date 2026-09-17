/*
 * Cuts a full-page screenshot into viewable slices (a tall PNG is unreadable
 * scaled down to one image).
 *
 *   node scripts/slice.mjs <png> [sliceHeight=1600] [outWidth=900]
 *   → /tmp/slices/<name>-<n>.png
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { basename } from "node:path";

const [file, sh = "1600", ow = "900"] = process.argv.slice(2);
const sliceH = Number(sh);
const outW = Number(ow);
mkdirSync("/tmp/slices", { recursive: true });

const { width, height } = await sharp(file).metadata();
const name = basename(file, ".png");
for (let n = 0, top = 0; top < height; n++, top += sliceH) {
  const h = Math.min(sliceH, height - top);
  const out = `/tmp/slices/${name}-${n}.png`;
  await sharp(file).extract({ left: 0, top, width, height: h }).resize({ width: Math.min(outW, width) }).toFile(out);
  console.log(out);
}
