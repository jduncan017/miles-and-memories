/*
 * Full-page screenshots of the local build, frozen for comparison against
 * docs/screenshots/<slug>-<width>.png (the live captures).
 *
 *   BASE=http://localhost:3002 node scripts/shoot.mjs [--w=1440,390] /path [/path...]
 *   → /tmp/shots/<slug>-<width>.png
 *
 * Scrolls the page so reveals and lazy images fire, then pauses animation so
 * the marquee does not differ run to run.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3002";
const args = process.argv.slice(2);
const widths = (args.find((a) => a.startsWith("--w="))?.slice(4) ?? "1440,390").split(",").map(Number);
const paths = args.filter((a) => !a.startsWith("--"));
mkdirSync("/tmp/shots", { recursive: true });
const slugOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "__"));

const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 800 ? 844 : 1000 } });
  for (const p of paths.length ? paths : ["/"]) {
    await page.goto(BASE + p, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 300));
      // Lazy images near the bottom need the scroll to settle before they request.
      document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
      window.scrollTo(0, 0);
    });
    await page.addStyleTag({ content: "*,*::before,*::after{animation-play-state:paused!important}" });
    await page.waitForTimeout(1200);
    const file = `/tmp/shots/${slugOf(p)}-${w}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`${file}  height=${await page.evaluate(() => document.body.scrollHeight)}  overflowX=${overflow}`);
  }
  await page.close();
}
await browser.close();
