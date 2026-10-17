// Capturas de encuadre. Uso: node scripts/capture-encuadre.mjs <etiqueta> (antes|despues)
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:5199', out = 'test-results/ronda-webp-encuadre', tag = process.argv[2] || 'antes';
const cases = [
  ['tarjetas-experiencias', '/experiencias', '.tour-grid', 1440], ['tarjetas-experiencias', '/experiencias', '.tour-grid', 390],
  ['itinerario-guatape', '/experiencias/guatape-piedra-del-penol', '.it', 1440], ['itinerario-guatape', '/experiencias/guatape-piedra-del-penol', '.it', 390],
  ['nosotros-galeria', '/nosotros', '.gallery-feature', 1440], ['nosotros-galeria', '/nosotros', '.gallery-feature', 390],
  ['baraja-inicio', '/', '.th', 1440], ['vehiculos', '/vehiculos', '.fleet-grid', 1440], ['vehiculos', '/vehiculos', '.fleet-grid', 390],
];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [name, p, sel, w] of cases) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800 });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
  await page.goto(base + p, { waitUntil: 'load' }); await page.waitForTimeout(1200);
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel); await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/${name}-${w}-${tag}.png` }); await ctx.close();
}
await browser.close(); console.log('ok');
