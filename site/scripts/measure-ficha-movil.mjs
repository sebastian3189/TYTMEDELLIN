// Fluidez del scroll de las fichas en móvil (Spec 03 §M6): recorre toda la ficha a 390×844 con CPU×4 desplazando 30 px por fotograma
// (≈1800 px/s) y mide fotogramas perdidos (intervalo rAF > 25 ms; > 50 ms = grave) y tareas largas (> 50 ms).
// Uso: B=http://127.0.0.1:<puerto> SLUG=city-tour-comuna-13 node scripts/measure-ficha-movil.mjs [cpu=4]
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:4291', slug = process.env.SLUG || 'city-tour-comuna-13', cpu = Number(process.env.CPU || 4), w = Number(process.env.W || 390);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page); const errors = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(m.text().slice(0, 160)); }); page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 160)));
await page.goto(`${base}${process.env.RUTA ? "/" + process.env.RUTA : "/experiencias/" + slug}`, { waitUntil: 'load' }); await page.waitForTimeout(2500); if (process.env.CSS) await page.addStyleTag({ content: process.env.CSS });
await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
const H = await page.evaluate(() => document.documentElement.scrollHeight);
const res = await page.evaluate(({ to, step }) => new Promise((resolve) => {
  const frames = [], longs = []; let last = performance.now(), y = 0; scrollTo(0, 0);
  try { new PerformanceObserver((l) => l.getEntries().forEach((e) => longs.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: false }); } catch {}
  const tick = (now) => { frames.push(now - last); last = now; y += step; scrollTo({ top: y, behavior: 'instant' }); if (y < to) requestAnimationFrame(tick); else setTimeout(() => resolve({ frames, longs }), 400); };
  requestAnimationFrame(tick);
}), { to: H - 844, step: 30 });
const f = res.frames.slice(3), s = [...f].sort((a, b) => a - b), p = (q) => s[Math.floor(q * (s.length - 1))];
console.log(JSON.stringify({ slug, w, cpu, pageH: H, frames: f.length, medianMs: +p(0.5).toFixed(1), p95Ms: +p(0.95).toFixed(1), maxMs: +Math.max(...f).toFixed(1), over25: f.filter((x) => x > 25).length, over50: f.filter((x) => x > 50).length, longTasks: res.longs.length, longestTask: Math.max(0, ...res.longs), errors: errors.slice(0, 5) }));
await browser.close();
