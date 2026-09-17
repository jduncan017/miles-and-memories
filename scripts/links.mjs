import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const out = {};
for (const path of process.argv.slice(2)) {
  await p.goto("https://www.milesandmemories.net" + path, { waitUntil: "networkidle" });
  out[path] = await p.evaluate(() => [...document.querySelectorAll("a[href]")].filter(a => a.getClientRects().length && !a.closest("header:first-of-type nav") ).map(a => `${(a.textContent||"").trim().replace(/\s+/g," ").slice(0,60)} -> ${a.getAttribute("href")}`).filter((v,i,arr)=>arr.indexOf(v)===i));
}
console.log(JSON.stringify(out, null, 1));
await b.close();
