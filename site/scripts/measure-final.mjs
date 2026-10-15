// Medición FINAL (ronda PT): LCP / CLS / TBT / tarea larga + INP de laboratorio (Event Timing de un clic en el botón de tema y, en móvil, en el menú) por ruta, Slow 4G + CPU×4, mediana de N.
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/measure-final.mjs [--w=390,1440] [--routes=...] [--runs=3] [--cpu=4] [--wait=6000]
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/measure-cierre.mjs [--w=390,1440] [--routes=/,/experiencias,...] [--runs=3] [--cpu=4] [--wait=7000]
// TBT = suma de (duración − 50 ms) de las tareas largas entre FCP y el final de la espera; «mount» = momento en que React reemplaza el póster/hidrata.
import { chromium } from '@playwright/test';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const arg = (name, fallback) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || fallback;
const widths = arg('w', '390,1440').split(',').map(Number);
const routes = arg('routes', '/,/experiencias,/experiencias/guatape-piedra-del-penol,/vehiculos,/contacto,/cotizar,/blog').split(',');
const runs = Number(arg('runs', 3)), cpu = Number(arg('cpu', 4)), wait = Number(arg('wait', 6000));
const median = (list) => { const v = list.filter((x) => x != null).sort((a, b) => a - b); return v.length ? v[Math.floor(v.length / 2)] : null; };
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const table = [];
try {
  for (const width of widths) for (const route of routes) {
    const samples = [];
    for (let i = 0; i < runs; i++) {
      const context = await browser.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, deviceScaleFactor: width < 800 ? 2 : 1, isMobile: width < 800 });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 562.5, downloadThroughput: Math.round(1.6 * 1024 * 1024 / 8), uploadThroughput: Math.round(750 * 1024 / 8) });
      if (cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
      await page.addInitScript(() => {
        window.__ev = []; try { new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.interactionId) window.__ev.push(Math.round(e.duration)); })).observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch {}
        window.__m = { cls: 0, lcp: null, lcpEl: '', fcp: null, tasks: [], mount: null };
        const obs = (type, fn) => { try { new PerformanceObserver((l) => l.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch { /* sin soporte */ } };
        obs('layout-shift', (e) => { if (!e.hadRecentInput) window.__m.cls += e.value; });
        obs('largest-contentful-paint', (e) => { window.__m.lcp = Math.round(e.startTime); window.__m.lcpEl = `${e.element?.nodeName || ''}.${(e.element?.className || '').toString().slice(0, 30)} ${(e.url || '').split('/').pop()}`; });
        obs('paint', (e) => { if (e.name === 'first-contentful-paint') window.__m.fcp = Math.round(e.startTime); });
        obs('longtask', (e) => window.__m.tasks.push([Math.round(e.startTime), Math.round(e.duration)]));
        const mo = new MutationObserver(() => { if (window.__m.mount == null && document.documentElement.dataset && !document.getElementById('boot') && document.getElementById('root')?.children.length) window.__m.mount = Math.round(performance.now()); });
        document.addEventListener('DOMContentLoaded', () => { mo.observe(document.documentElement, { childList: true, subtree: true }); }, { once: true });
      });
      await page.goto(base + route, { waitUntil: 'load', timeout: 180000 });
      await page.waitForTimeout(wait);
      const m = await page.evaluate(() => window.__m);
      await page.evaluate(() => { window.__ev.length = 0; });
      const tap = async (sel) => { const el = page.locator(sel).first(); if (await el.count()) { await el.click({ timeout: 4000 }).catch(() => {}); await page.waitForTimeout(500); } };
      await tap('.theme-toggle'); if (width < 800) { await tap('.menu-toggle'); await tap('.menu-toggle'); } else await tap('.language-toggle');
      const inp = Math.max(0, ...(await page.evaluate(() => window.__ev)));
      const after = m.tasks.filter(([t]) => t >= (m.fcp || 0));
      samples.push({ lcp: m.lcp, lcpEl: m.lcpEl, fcp: m.fcp, cls: m.cls, tbt: after.reduce((a, [, d]) => a + Math.max(0, d - 50), 0), longest: Math.max(0, ...m.tasks.map(([, d]) => d)), mount: m.mount, tasks: m.tasks.length, inp });
      await context.close();
    }
    const row = { w: width, route, lcp: median(samples.map((s) => s.lcp)), fcp: median(samples.map((s) => s.fcp)), cls: +median(samples.map((s) => s.cls)).toFixed(4), tbt: median(samples.map((s) => s.tbt)), longest: median(samples.map((s) => s.longest)), mount: median(samples.map((s) => s.mount)), inp: median(samples.map((s) => s.inp)), lcpEl: samples[0].lcpEl, all: samples.map((s) => s.lcp) };
    table.push(row);
    console.log(JSON.stringify(row));
  }
} finally { await browser.close(); }
console.log('\nw     ruta                                       LCP    FCP    CLS     TBT   tarea+larga');
for (const r of table) console.log(`${String(r.w).padEnd(5)} ${r.route.padEnd(42)} ${String(r.lcp).padStart(5)}  ${String(r.fcp).padStart(5)}  ${String(r.cls).padEnd(7)} ${String(r.tbt).padStart(5)}  ${String(r.longest).padStart(5)}  ${String(r.inp).padStart(5)}`);
