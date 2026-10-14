// Fluidez del scroll de «La mano de viaje» en móvil (Spec 03 §K): recorre toda la sección a 390×844 con CPU×4 desplazando 28 px por fotograma
// (≈1700 px/s, un gesto rápido) y mide fotogramas perdidos (intervalo rAF > 25 ms; > 50 ms = perdido grave) y tareas largas (> 50 ms).
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/measure-scroll-mano.mjs [--cpu=4] [--w=390]
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const cpu = Number(arg('cpu', 4)), w = Number(arg('w', 390)), h = w < 800 ? 844 : 900;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 800 ? 2 : 1, isMobile: w < 800, hasTouch: w < 800 });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await page.waitForTimeout(1500);
const geo = await page.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight, layout: document.querySelector('.th').dataset.layout }; });
const px = (u) => geo.top - geo.hh + (u / geo.total) * geo.span;
// Tres posiciones de captura.
const seg = geo.layout === 'wide' ? 30 : 80;
for (const [name, u] of [['inicio', 34 + 0.2 * seg], ['tour3', 34 + 2.56 * seg], ['tour8', 34 + 7.5 * seg]]) { await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), px(u)); await page.waitForTimeout(1500); await page.screenshot({ path: `test-results/ronda-j/scroll-mano-${name}-${w}.png` }); }
await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), px(30)); await page.waitForTimeout(1200);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
const res = await page.evaluate(({ from, to, step }) => new Promise((resolve) => {
  const frames = [], longs = []; let last = performance.now(), y = from;
  try { new PerformanceObserver((l) => l.getEntries().forEach((e) => longs.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: false }); } catch { /* sin soporte */ }
  const tick = (now) => { frames.push(now - last); last = now; y += step; scrollTo({ top: y, behavior: 'instant' }); if (y < to) requestAnimationFrame(tick); else setTimeout(() => resolve({ frames, longs }), 300); };
  requestAnimationFrame(tick);
}), { from: px(30), to: px(34 + 11 * seg + 10), step: 28 });
const f = res.frames.slice(2), sorted = [...f].sort((a, b) => a - b), p = (q) => sorted[Math.floor(q * (sorted.length - 1))];
console.log(JSON.stringify({ w, cpu, layout: geo.layout, frames: f.length, medianMs: +p(0.5).toFixed(1), p95Ms: +p(0.95).toFixed(1), maxMs: +Math.max(...f).toFixed(1), over25: f.filter((x) => x > 25).length, over50: f.filter((x) => x > 50).length, longTasks: res.longs.length, longestTask: Math.max(0, ...res.longs) }));
await browser.close();
