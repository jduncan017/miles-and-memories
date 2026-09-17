/*
 * Whole-site smoke check against a running server: every sitemap page loads,
 * every internal link on it resolves, no page overflows horizontally at 390,
 * and no console errors.
 *
 *   BASE=http://localhost:3002 node scripts/site-check.mjs
 */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3002";
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
pages.push("/booking");
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
p.on("console", (m) => m.type() === "error" && errors.push(`${p.url()}: ${m.text().slice(0, 160)}`));
const links = new Set();
for (const path of pages) {
  const r = await p.goto(BASE + path, { waitUntil: "load" });
  const info = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: document.querySelectorAll("h1").length,
    hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    title: document.title,
  }));
  info.hrefs.filter((h) => h.startsWith("/")).forEach((h) => links.add(h.split("#")[0]));
  console.log(`${r.status()} ${path}  overflow=${info.overflow} h1=${info.h1}  "${info.title}"`);
}
const bad = [];
for (const l of links) {
  const r = await fetch(BASE + l);
  if (r.status !== 200) bad.push(`${r.status} ${l}`);
}
console.log(`\n${links.size} internal links checked; broken: ${bad.length ? "\n" + bad.join("\n") : "none"}`);
console.log(`console errors: ${errors.length ? "\n" + errors.join("\n") : "none"}`);
await b.close();
