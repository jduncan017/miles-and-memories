/*
 * Compares how dark a page's photo header is, row band by row band, live vs
 * local: mean luminance (0-255) of 10 horizontal bands across the header.
 *
 *   node scripts/hero-luma.mjs <path> [viewportWidth]
 */
import { chromium } from "playwright";
import sharp from "sharp";
const [pth = "/", vw = "390"] = process.argv.slice(2);
const b = await chromium.launch();
const rows = {};
const shots = [];
for (const [name, base] of [["live", "https://www.milesandmemories.net"], ["local", process.env.BASE ?? "http://localhost:3002"]]) {
  const p = await b.newPage({ viewport: { width: Number(vw), height: 900 } });
  await p.goto(base + pth, { waitUntil: "networkidle", timeout: 90000 });
  await p.waitForTimeout(2500);
  const h = await p.evaluate(() => {
    const h1 = document.querySelector("h1");
    let el = h1; while (el.parentElement && el.getBoundingClientRect().width < innerWidth - 2) el = el.parentElement;
    while (el.parentElement && el.parentElement.getBoundingClientRect().height === el.getBoundingClientRect().height) el = el.parentElement;
    return Math.round(el.getBoundingClientRect().height);
  });
  // Hide the text so it does not skew the photo's luminance.
  await p.addStyleTag({ content: "h1,h1 ~ *,p,a,.PageHeroCopy{visibility:hidden!important}" });
  const buf = await p.screenshot({ clip: { x: 0, y: 0, width: Number(vw), height: h } });
  shots.push(buf);
  const { data, info } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true });
  const bands = [];
  for (let i = 0; i < 10; i++) {
    const y0 = Math.floor((i / 10) * info.height), y1 = Math.floor(((i + 1) / 10) * info.height);
    let sum = 0, n = 0;
    for (let y = y0; y < y1; y++) for (let x = 0; x < info.width; x++) { sum += data[y * info.width + x]; n++; }
    bands.push(Math.round(sum / n));
  }
  rows[name] = { height: h, bands };
  await p.close();
}
await b.close();
console.log(`${pth} @${vw}`);
for (const [k, v] of Object.entries(rows)) console.log(`${k.padEnd(6)} h=${v.height}  ${v.bands.map((x) => String(x).padStart(4)).join("")}`);
const w = Number(vw) > 800 ? 700 : 390;
const imgs = await Promise.all(shots.map((s) => sharp(s).resize({ width: w }).toBuffer()));
const hs = await Promise.all(imgs.map(async (i) => (await sharp(i).metadata()).height));
await sharp({ create: { width: w * 2 + 10, height: Math.max(...hs), channels: 3, background: "#f00" } })
  .composite([{ input: imgs[0], left: 0, top: 0 }, { input: imgs[1], left: w + 10, top: 0 }]).png().toFile("/tmp/hero-compare.png");
