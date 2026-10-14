import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', slug = process.env.SLUG || 'city-tour-comuna-13';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
await page.goto(`${base}/experiencias/${slug}`, { waitUntil: 'load' }); await page.waitForTimeout(2500);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
const H = await page.evaluate(() => document.documentElement.scrollHeight);
const res = await page.evaluate(({ to, step }) => new Promise((resolve) => { const fr = []; let last = performance.now(), y = 0; scrollTo(0, 0); const tick = (now) => { fr.push([y, now - last]); last = now; y += step; scrollTo({ top: y, behavior: 'instant' }); if (y < to) requestAnimationFrame(tick); else setTimeout(() => resolve(fr), 300); }; requestAnimationFrame(tick); }), { to: H - 844, step: 30 });
const bins = {}; for (const [y, d] of res.slice(3)) { const b = Math.floor(y / 1000); (bins[b] ||= []).push(d); }
const secs = await page.evaluate(() => [...document.querySelectorAll('.tour-page > *')].map((e) => [e.className.toString().slice(0, 28) || e.tagName, Math.round(e.getBoundingClientRect().top + scrollY)]));
console.log(secs.map((s) => s.join('@')).join(' | '));
for (const [b, a] of Object.entries(bins)) console.log(`${b}k: n=${a.length} avg=${(a.reduce((s, x) => s + x, 0) / a.length).toFixed(1)} max=${Math.max(...a).toFixed(0)} >33=${a.filter((x) => x > 33).length}`);
await browser.close();
