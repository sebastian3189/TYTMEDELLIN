// Medición de CLS y LCP por ruta (Spec 05). Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/measure-vitals.mjs [slow4g] [--w=1440]
// Perfil slow4g: DevTools «Slow 4G» (RTT 562,5 ms, 1,6 Mb/s) + CPU×4 opcional con --cpu=4.
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391';
const slow = process.argv.includes('slow4g');
const arg = (name, fallback) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || fallback;
const widths = arg('w', '1440,390').split(',').map(Number);
const routes = (arg('routes', '/,/contacto,/vehiculos,/experiencias/guatape-piedra-del-penol,/cotizar,/experiencias')).split(',');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const out = [];
for (const width of widths) for (const route of routes) {
  const context = await browser.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, deviceScaleFactor: width < 800 ? 2 : 1, isMobile: width < 800 });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  if (slow) {
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 562.5, downloadThroughput: Math.round(1.6 * 1024 * 1024 / 8), uploadThroughput: Math.round(750 * 1024 / 8) });
    const cpu = Number(arg('cpu', 1)); if (cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  }
  await page.addInitScript(() => {
    window.__cls = 0; window.__lcp = null; window.__shifts = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), nodes: e.sources?.map((s) => (s.node?.nodeName || '') + '.' + (s.node?.className || '')).slice(0, 2) }); } }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = { t: Math.round(e.startTime), size: e.size, el: (e.element?.nodeName || '') + '.' + (e.element?.className || '') + ' ' + (e.url || '').split('/').slice(-2).join('/') }; }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(base + route, { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(slow ? 6000 : 3500);
  const load = await page.evaluate(() => ({ cls: window.__cls, lcp: window.__lcp }));
  // desplazamiento completo en pasos (CLS acumulado durante la lectura)
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < Math.min(h, 14000); y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForTimeout(800);
  const total = await page.evaluate(() => ({ cls: window.__cls, shifts: window.__shifts.filter((s) => s.v > 0.002).slice(0, 4) }));
  out.push({ width, route, slow, loadCLS: +load.cls.toFixed(4), totalCLS: +total.cls.toFixed(4), lcp: load.lcp, shifts: total.shifts });
  console.log(JSON.stringify(out.at(-1)));
  await context.close();
}
await browser.close();
