/*
 * For each text needle, finds the smallest visible element whose text equals it
 * and prints it plus N ancestors with the styles that decide a treatment.
 * Built for buttons, nav bars and cards, where the section probe is too coarse.
 *
 *   BASE=http://localhost:3000 node scripts/element-probe.mjs <path> <depth> "<text>" ["<text>"...]
 */
import { chromium } from "playwright";
const [path = "/", depth = "4", ...needles] = process.argv.slice(2);
const vw = Number(process.env.VW ?? 1440);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: vw, height: 1000 } });
await p.goto((process.env.BASE ?? "https://www.milesandmemories.net") + path, { waitUntil: "networkidle", timeout: 90000 });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
await p.waitForTimeout(1200);
console.log(await p.evaluate(({ needles, depth }) => {
  const out = [];
  const desc = (el) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const bits = [`${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} @(${Math.round(r.left)},${Math.round(r.top + scrollY)})`];
    const add = (k, v, d) => { if (v && v !== d) bits.push(`${k}=${v}`); };
    add("font", `${cs.fontFamily.split(",")[0]} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls${cs.letterSpacing} ${cs.color} ${cs.textTransform}`, "");
    add("bg", cs.backgroundColor, "rgba(0, 0, 0, 0)");
    add("bgimg", cs.backgroundImage.slice(0, 140), "none");
    add("pad", cs.padding, "0px"); add("gap", cs.gap, "normal");
    add("radius", cs.borderRadius, "0px"); add("shadow", cs.boxShadow, "none");
    add("border", cs.borderTopWidth !== "0px" ? `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` : "", "");
    add("backdrop", cs.backdropFilter, "none"); add("opacity", cs.opacity, "1"); add("filter", cs.filter, "none");
    add("transform", cs.transform, "none"); add("transition", cs.transition, "all 0s ease 0s");
    return bits.join("  ");
  };
  for (const n of needles) {
    const cands = [...document.querySelectorAll("body *")].filter(el => el.getClientRects().length && (el.textContent || "").trim() === n);
    cands.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
    const el = cands[0];
    out.push(`### "${n}"` + (el ? "" : " not found"));
    if (!el) continue;
    let cur = el;
    for (let i = 0; i <= depth && cur; i++, cur = cur.parentElement) out.push("  ".repeat(i) + desc(cur));
    // the sibling svg/img inside the button, if any
    const host = el.closest("a,button") || el.parentElement?.parentElement;
    host?.querySelectorAll("svg,img,div").forEach((c) => { if (c.getBoundingClientRect().width < 60 && c.getBoundingClientRect().width > 8) out.push("    · child " + desc(c)); });
  }
  return out.join("\n");
}, { needles, depth: Number(depth) }));
await b.close();
