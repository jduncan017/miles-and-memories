import { chromium } from "playwright";
const b = await chromium.launch();
for (const vw of [390, 810]) {
const p = await b.newPage({ viewport: { width: vw, height: 900 } });
await p.goto("https://www.milesandmemories.net/", { waitUntil: "networkidle" });
const rows = await p.evaluate(() => {
  const out = new Map();
  for (const el of document.querySelectorAll("h1,h2,h3,h4,p,a,span")) {
    if (!el.getClientRects().length) continue;
    const t = (el.textContent||"").trim(); if (!t || [...el.children].some(c => (c.textContent||"").trim().length>2)) continue;
    const cs = getComputedStyle(el);
    const k = [el.tagName, cs.fontFamily.split(",")[0], cs.fontSize, cs.fontWeight, cs.lineHeight].join(" ");
    if (!out.has(k)) out.set(k, t.slice(0,40));
  }
  return [...out].map(([k,v]) => k + "  | " + v);
});
console.log("== " + vw); console.log(rows.join("\n"));
}
await b.close();
