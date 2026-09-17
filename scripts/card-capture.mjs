/*
 * Screenshots one card on LIVE at rest and hovered (desktop) and at 390, and
 * dumps its hover-state styles. For matching card interactions.
 *
 *   node scripts/card-capture.mjs <path> "<card title text>" <name>
 *   → /tmp/cards/<name>-{rest,hover,390}.png
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const [path, title, name] = process.argv.slice(2);
const BASE = process.env.BASE ?? "https://www.milesandmemories.net";
mkdirSync("/tmp/cards", { recursive: true });
const b = await chromium.launch();
const findCard = async (p) => {
  const h = p.getByText(title, { exact: true }).filter({ visible: true }).first();
  await h.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
  return h.locator("xpath=ancestor::a[1]");
};
for (const vw of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: vw, height: 1000 } });
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  const card = await findCard(p);
  if (vw === 1440) {
    await card.screenshot({ path: `/tmp/cards/${name}-rest.png` });
    await card.hover();
    await p.waitForTimeout(900);
    await card.screenshot({ path: `/tmp/cards/${name}-hover.png` });
    console.log(await card.evaluate((el) => [...el.querySelectorAll("*")].filter((c) => c.getClientRects().length).map((c) => {
      const cs = getComputedStyle(c), r = c.getBoundingClientRect();
      const t = c.children.length ? "" : (c.textContent || "").trim().slice(0, 40);
      return `${c.tagName} ${Math.round(r.width)}x${Math.round(r.height)} op=${cs.opacity} bg=${cs.backgroundColor} bgi=${cs.backgroundImage.slice(0, 80)} font=${cs.fontSize}/${cs.fontWeight} ${cs.color} tr=${cs.transform} "${t}"`;
    }).filter((l) => !l.includes('bg=rgba(0, 0, 0, 0) bgi=none') || l.includes('"') && !l.endsWith('""')).join("\n")));
  } else {
    await card.screenshot({ path: `/tmp/cards/${name}-390.png` });
    console.log(await card.evaluate((el) => (el.innerText || "").replace(/\n+/g, " | ")));
  }
  await p.close();
}
await b.close();
