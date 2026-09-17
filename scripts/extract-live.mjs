/*
 * Reads the LIVE Framer site in a real browser and writes what the rebuild
 * needs, per page:
 *
 *   extraction/content/<slug>.md    the visible copy in DOM order, with links and images
 *   extraction/live/<slug>.json     meta, type scale, colours, fonts, media, forms
 *   docs/screenshots/<slug>-{1440,390}.png
 *
 * Framer renders every breakpoint variant into the DOM and hides the inactive
 * ones, so only elements with a client rect are read.
 *
 *   node scripts/extract-live.mjs [path...]     (defaults to the sitemap + /booking)
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ORIGIN = "https://www.milesandmemories.net";
mkdirSync("extraction/content", { recursive: true });
mkdirSync("extraction/live", { recursive: true });
mkdirSync("docs/screenshots", { recursive: true });

let paths = process.argv.slice(2);
if (!paths.length) {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  paths.push("/booking");
}

const slugOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "__"));

const settle = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
};

const browser = await chromium.launch();

for (const path of paths) {
  const slug = slugOf(path);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const resp = await page.goto(ORIGIN + path, { waitUntil: "networkidle", timeout: 90000 });
  await settle(page);

  const data = await page.evaluate(() => {
    const visible = (el) => {
      // `display: contents` wrappers have no box of their own but do render children.
      if (!el.getClientRects().length && getComputedStyle(el).display !== "contents") return false;
      // Opacity is deliberately ignored: Framer's appear effects park content at 0.
      return getComputedStyle(el).visibility !== "hidden";
    };
    const abs = (u) => {
      try {
        return new URL(u, location.href).href;
      } catch {
        return u;
      }
    };
    const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
    const y = (el) => Math.round(el.getBoundingClientRect().top + scrollY);

    // ── Copy, in DOM order ──
    const md = [];
    const seen = new Set();
    const inlineText = (el) => {
      let out = "";
      for (const n of el.childNodes) {
        if (n.nodeType === 3) out += n.textContent;
        else if (n.nodeType === 1) {
          const t = n.tagName;
          const inner = inlineText(n);
          if (t === "A" && n.getAttribute("href")) out += `[${clean(inner)}](${n.getAttribute("href")})`;
          else if (t === "STRONG" || t === "B") out += clean(inner) ? `**${clean(inner)}**` : "";
          else if (t === "EM" || t === "I") out += clean(inner) ? `*${clean(inner)}*` : "";
          else if (t === "BR") out += "\n";
          else out += inner;
        }
      }
      return out;
    };
    const walk = (el) => {
      if (el.nodeType !== 1 || !visible(el)) return;
      const t = el.tagName;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "svg", "TEMPLATE"].includes(t)) return;
      const push = (line) => {
        if (!line.trim()) return;
        md.push(line);
      };
      if (/^H[1-6]$/.test(t)) return push(`${"#".repeat(+t[1])} ${clean(inlineText(el))}  <!-- y${y(el)} -->`);
      if (t === "P") return push(clean(inlineText(el)));
      if (t === "LI") return push(`- ${clean(inlineText(el))}`);
      if (t === "BLOCKQUOTE") return push(`> ${clean(inlineText(el))}`);
      if (t === "IMG") {
        const r = el.getBoundingClientRect();
        if (r.width < 24) return;
        const src = abs(el.currentSrc || el.src).split("?")[0];
        return push(`![${el.alt}](${src})  <!-- ${Math.round(r.width)}x${Math.round(r.height)} y${y(el)} -->`);
      }
      if (t === "VIDEO") return push(`[video](${abs(el.currentSrc || el.src)})`);
      if (t === "IFRAME") return push(`[iframe](${el.src})`);
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT")
        return push(`[${t.toLowerCase()} type=${el.type} name=${el.name} placeholder="${el.placeholder || ""}"${el.required ? " required" : ""}]`);
      if (t === "BUTTON") return push(`[button: ${clean(el.textContent)}]`);
      // A link with no block children is a button/nav link
      if (t === "A" && !el.querySelector("p,h1,h2,h3,h4,h5,h6,img,li")) {
        const txt = clean(el.textContent);
        if (txt) return push(`[link: ${txt}](${el.getAttribute("href")})`);
      }
      // Text sitting directly in a div (Framer does this for some labels)
      if (!el.children.length && clean(el.textContent) && !seen.has(el)) {
        seen.add(el);
        return push(clean(el.textContent));
      }
      // Background images on divs
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.startsWith("url(")) push(`![bg](${bg.slice(5, -2)})`);
      for (const c of el.children) walk(c);
    };
    walk(document.body);

    // ── Type scale ──
    const type = new Map();
    for (const el of document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,li,span,button,label,input")) {
      if (!visible(el)) continue;
      const txt = clean(el.textContent);
      if (el.tagName !== "INPUT" && (!txt || [...el.children].some((c) => clean(c.textContent).length > 2))) continue;
      const cs = getComputedStyle(el);
      const key = [el.tagName, cs.fontFamily, cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing, cs.color, cs.textTransform].join("|");
      const cur = type.get(key);
      if (cur) cur.count++;
      else
        type.set(key, {
          tag: el.tagName,
          font: cs.fontFamily.split(",")[0].replace(/"/g, ""),
          size: cs.fontSize,
          weight: cs.fontWeight,
          lh: cs.lineHeight,
          tracking: cs.letterSpacing,
          color: cs.color,
          transform: cs.textTransform,
          y: y(el),
          sample: txt.slice(0, 50),
          count: 1,
        });
    }

    // ── Colours in use ──
    const tally = (prop) => {
      const m = {};
      for (const el of document.querySelectorAll("body *")) {
        if (!visible(el)) continue;
        const v = getComputedStyle(el)[prop];
        if (!v || v === "rgba(0, 0, 0, 0)" || v === "none") continue;
        m[v] = (m[v] || 0) + 1;
      }
      return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 30);
    };

    const media = [...document.querySelectorAll("img,video")]
      .filter(visible)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          src: abs(el.currentSrc || el.src).split("?")[0],
          alt: el.alt ?? null,
          w: Math.round(r.width),
          h: Math.round(r.height),
          y: y(el),
          natural: el.naturalWidth ? `${el.naturalWidth}x${el.naturalHeight}` : null,
          objectFit: getComputedStyle(el).objectFit,
          radius: getComputedStyle(el).borderRadius,
        };
      })
      .filter((m) => m.w >= 16);

    const bgImages = [...document.querySelectorAll("body *")]
      .filter(visible)
      .map((el) => getComputedStyle(el).backgroundImage)
      .filter((b) => b.includes("url("));

    const meta = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      lang: document.documentElement.lang,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    };

    const fonts = [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight} ${f.style}`);

    const links = [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")))];

    return {
      meta,
      height: document.body.scrollHeight,
      markdown: md.join("\n\n"),
      type: [...type.values()].sort((a, b) => a.y - b.y),
      colors: tally("color"),
      backgrounds: tally("backgroundColor"),
      bgImages: [...new Set(bgImages)],
      media,
      fonts: [...new Set(fonts)],
      links,
      iframes: [...document.querySelectorAll("iframe")].map((f) => f.src),
    };
  });

  const { markdown, ...rest } = data;
  const header = `---\npath: ${path}\nstatus: ${resp?.status()}\ntitle: ${data.meta.title}\ndescription: ${data.meta.description}\n---\n\n`;
  writeFileSync(`extraction/content/${slug}.md`, header + markdown + "\n");
  writeFileSync(`extraction/live/${slug}.json`, JSON.stringify({ path, status: resp?.status(), ...rest }, null, 1));
  await page.screenshot({ path: `docs/screenshots/${slug}-1440.png`, fullPage: true });
  await page.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto(ORIGIN + path, { waitUntil: "networkidle", timeout: 90000 });
  await settle(mobile);
  await mobile.screenshot({ path: `docs/screenshots/${slug}-390.png`, fullPage: true });
  await mobile.close();

  console.log(`${resp?.status()} ${path}  ${data.height}px  ${data.media.length} media`);
}

await browser.close();
