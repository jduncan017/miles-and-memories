import { chromium } from "playwright";
const b = await chromium.launch();
for (const [path, vw] of [["/", 390], ["/travel-tips", 390], ["/travel-tips", 1440]]) {
  const p = await b.newPage({ viewport: { width: vw, height: 900 } });
  await p.goto("https://www.milesandmemories.net" + path, { waitUntil: "networkidle" });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } });
  await p.waitForTimeout(1500);
  const cards = await p.evaluate(() => [...document.querySelectorAll("a[href*='services/'], a[href*='travel-tips/']")]
    .filter(a => a.getClientRects().length && a.getBoundingClientRect().height > 150)
    .map(a => { const r = a.getBoundingClientRect(); return { href: a.getAttribute("href"), box: [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)],
      parts: [...a.querySelectorAll("h1,h2,h3,h4,h5,p,img")].filter(e => e.getClientRects().length).map(e => { const cs = getComputedStyle(e), rr = e.getBoundingClientRect();
        return `${e.tagName} ${Math.round(rr.width)}x${Math.round(rr.height)} +${Math.round(rr.top - r.top)} ${cs.fontSize}/${cs.fontWeight} ${cs.color} ${e.tagName === "IMG" ? e.currentSrc.split("/").pop().split("?")[0] : (e.textContent || "").trim()}`; }),
      bgs: [...a.querySelectorAll("*")].map(e => getComputedStyle(e)).filter(cs => cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none").map(cs => cs.backgroundColor + " " + cs.backgroundImage.slice(0, 60) + " r=" + cs.borderRadius).slice(0, 4) }; }));
  console.log(`\n== ${path} @${vw}`); console.log(JSON.stringify(cards, null, 1));
  if (path === "/travel-tips" && vw === 1440) {
    const a = p.locator("a[href*='travel-tips/']").filter({ visible: true }).first();
    await a.scrollIntoViewIfNeeded(); await a.screenshot({ path: "/tmp/cards/tip-rest.png" }); await a.hover(); await p.waitForTimeout(900); await a.screenshot({ path: "/tmp/cards/tip-hover.png" });
  }
  if (vw === 390) { const a = p.locator(path === "/" ? "a[href*='services/']" : "a[href*='travel-tips/']").filter({ visible: true }).nth(path === "/" ? 0 : 0); await a.scrollIntoViewIfNeeded(); await p.waitForTimeout(800); await a.screenshot({ path: `/tmp/cards/m${path.replace(/\//g, "_")}.png` }); }
  await p.close();
}
await b.close();
