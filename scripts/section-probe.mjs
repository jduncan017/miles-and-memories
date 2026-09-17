/*
 * Section-by-section spec dump. Finds a section by its heading text, then walks
 * its subtree reporting the styles that decide the treatment, plus any media,
 * filters, and controls inside it.
 *
 *   node scripts/section-probe.mjs "<heading text>" [path] [depth]
 */
import { chromium } from "playwright";
const needle = process.argv[2];
const path = process.argv[3] ?? "/";
const depth = Number(process.argv[4] ?? 7);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(`${process.env.BASE ?? "https://www.milesandmemories.net"}${path}`, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(async () => {
  for (let s = 0; s < document.body.scrollHeight; s += 500) {
    window.scrollTo(0, s); await new Promise(r => setTimeout(r, 70));
  }
});
await page.waitForTimeout(2000);

console.log(await page.evaluate(({ needle, depth }) => {
  // Find the smallest element whose text starts with the needle, then climb to
  // the section-sized ancestor.
  let anchor = null;
  for (const el of document.querySelectorAll("h1,h2,h3,p,span,div")) {
    const t = (el.textContent || "").trim().replace(/\s+/g, " ");
    if (t.toLowerCase().startsWith(needle.toLowerCase()) && t.length < needle.length + 120) {
      if (!anchor || el.getBoundingClientRect().height < anchor.getBoundingClientRect().height) anchor = el;
    }
  }
  if (!anchor) return `no element starting with ${JSON.stringify(needle)}`;
  let sec = anchor;
  const minH = Number(process.env.MINH ?? 260); while (sec.parentElement && sec.getBoundingClientRect().height < minH) sec = sec.parentElement;
  for (let i = 0; i < Number(process.env.UP ?? 2) && sec.parentElement; i++) sec = sec.parentElement;

  const lines = [];
  const walk = (el, d) => {
    if (d > depth) return;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 2 && r.height < 2) return;
    const bits = [];
    const add = (k, v, def) => { if (v && v !== def) bits.push(`${k}: ${String(v).slice(0, 120)}`); };
    add("position", cs.position, "static");
    add("bg", cs.backgroundColor, "rgba(0, 0, 0, 0)");
    add("bg-image", cs.backgroundImage, "none");
    add("backdrop", cs.backdropFilter || cs.webkitBackdropFilter, "none");
    add("filter", cs.filter, "none");
    add("radius", cs.borderRadius, "0px");
    add("opacity", cs.opacity, "1");
    add("overflow", cs.overflow, "visible");
    add("z", cs.zIndex, "auto");
    add("padding", cs.padding, "0px"); add("font", `${cs.fontSize} ${cs.fontWeight} ${cs.fontFamily.split(",")[0]} ${cs.color}`, ""); add("shadow", cs.boxShadow, "none");
    add("gap", cs.gap, "normal");
    add("maxWidth", cs.maxWidth, "none");
    add("justify", cs.justifyContent, "normal");
    add("align", cs.alignItems, "normal");
    ["Top","Right","Bottom","Left"].forEach((s) => {
      if (cs[`border${s}Style`] !== "none" && parseFloat(cs[`border${s}Width`]) > 0)
        bits.push(`border-${s.toLowerCase()}: ${cs[`border${s}Width`]} ${cs[`border${s}Color`]}`);
    });
    const tag = el.tagName.toLowerCase();
    const media = tag === "img" ? ` src=${el.currentSrc.split("/").pop().split("?")[0]} alt="${el.alt}"`
                : tag === "video" ? ` src=${(el.currentSrc||el.src).split("/").pop()}` : "";
    const label = (el.children.length === 0 && el.textContent.trim())
      ? ` "${el.textContent.trim().slice(0, 34)}"` : "";
    lines.push(`${"  ".repeat(d)}<${tag}> ${Math.round(r.width)}x${Math.round(r.height)}${media}${label}` +
      (bits.length ? `\n${"  ".repeat(d)}   ${bits.join(` · `)}` : ""));
    for (const c of el.children) walk(c, d + 1);
  };
  walk(sec, 0);
  return lines.join("\n");
}, { needle, depth }));
await browser.close();
