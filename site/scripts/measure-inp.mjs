// INP de laboratorio a 390×844 con CPU×4 (Spec 05): menú móvil, foco de un campo del formulario y envío con errores. Mide la duración de los eventos
// (Event Timing, durationThreshold 16 ms) de cada interacción; mediana de N pasadas. Uso: TYT_TEST_URL=... node scripts/measure-inp.mjs [--runs=3]
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const runs = Number((process.argv.find((a) => a.startsWith('--runs=')) || '').split('=')[1] || 3);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const median = (l) => [...l].sort((a, b) => a - b)[Math.floor(l.length / 2)];
const res = { menu: [], foco: [], envio: [] };
for (let r = 0; r < runs; r++) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage(), cdp = await ctx.newCDPSession(page);
  await page.addInitScript(() => { window.__ev = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__ev.push([e.name, Math.round(e.duration), e.interactionId || 0]))).observe({ type: 'event', durationThreshold: 16, buffered: true }); });
  await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForSelector('form.quote-form'); await page.waitForTimeout(2500);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const last = async (names) => { await page.waitForTimeout(700); return page.evaluate((n) => { const e = window.__ev.filter((x) => n.includes(x[0]) && x[2]); return e.length ? Math.max(...e.map((x) => x[1])) : 0; }, names); };
  await page.evaluate(() => { window.__ev.length = 0; });
  await page.locator('.menu-toggle').tap(); res.menu.push(await last(['pointerup', 'click', 'pointerdown']));
  await page.locator('.menu-toggle').tap(); await page.waitForTimeout(400); await page.evaluate(() => { window.__ev.length = 0; });
  await page.locator('input[name=nombre]').tap(); res.foco.push(await last(['pointerup', 'click', 'pointerdown', 'focusin']));
  await page.evaluate(() => { window.__ev.length = 0; });
  await page.locator('form.quote-form button[type=submit]').tap(); res.envio.push(await last(['pointerup', 'click', 'pointerdown']));
  await ctx.close();
}
console.log(JSON.stringify({ cpu: 4, runs, menuMs: median(res.menu), focoMs: median(res.foco), envioMs: median(res.envio), all: res }));
await browser.close();
