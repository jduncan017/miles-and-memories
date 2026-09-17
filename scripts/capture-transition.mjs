/*
 * Captures a client-side navigation at screen refresh rate (CDP screencast)
 * and writes a labelled contact sheet, so a page transition can be compared
 * frame by frame between live and local.
 *
 *   BASE=http://localhost:3002 node scripts/capture-transition.mjs [from] [linkText] [name]
 *   → /tmp/transition-<name>.png
 */
import { chromium } from "playwright";
import sharp from "sharp";
const BASE = process.env.BASE ?? "https://www.milesandmemories.net";
const [from = "/about", linkText = "Destinations", name = "capture"] = process.argv.slice(2);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE + from, { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(1500);
const link = p.getByRole("link", { name: linkText, exact: true }).filter({ visible: true }).first();
await link.hover(); // lets Next prefetch, as a real pointer would
await p.waitForTimeout(1200);

const cdp = await p.context().newCDPSession(p);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ t: f.metadata.timestamp, data: Buffer.from(f.data, "base64") });
  await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: 720, maxHeight: 450 });
await p.waitForTimeout(300);
const t0 = Date.now() / 1000;
await link.click();
await p.waitForTimeout(2000);
await cdp.send("Page.stopScreencast");
console.log(`${frames.length} frames, now at ${new URL(p.url()).pathname}`);
await b.close();

// Sample ~24 frames evenly by time across the changing window.
const moving = frames.filter((f) => f.t >= t0 - 0.05);
const pick = moving.filter((_, i) => i % Math.max(1, Math.ceil(moving.length / 24)) === 0).slice(0, 24);
const W = 300, H = 188, cols = 4;
const comps = [];
for (const [k, f] of pick.entries()) {
  const x = (k % cols) * (W + 6), y = Math.floor(k / cols) * (H + 22);
  comps.push({ input: await sharp(f.data).resize(W, H, { fit: "fill" }).toBuffer(), left: x, top: y + 18 });
  comps.push({ input: Buffer.from(`<svg width="120" height="18"><text x="0" y="14" font-size="14" fill="red">${Math.round((f.t - t0) * 1000)}ms</text></svg>`), left: x, top: y });
}
await sharp({ create: { width: cols * (W + 6), height: Math.ceil(pick.length / cols) * (H + 22), channels: 3, background: "#fff" } })
  .composite(comps).png().toFile(`/tmp/transition-${name}.png`);
console.log(`/tmp/transition-${name}.png`);
