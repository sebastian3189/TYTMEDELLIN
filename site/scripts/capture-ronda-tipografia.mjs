// Capturas de la ronda de tipografía/naranja. Uso: TYT_TEST_URL=http://127.0.0.1:5199 node scripts/capture-ronda-tipografia.mjs [full]
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:5199', out = 'test-results/ronda-tipografia';
const full = process.argv[2] === 'full';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const pages = [['inicio', ''], ['experiencia', '/experiencias/guatape-piedra-del-penol'], ['nosotros', '/nosotros'], ['vehiculos', '/vehiculos']];
const log = [];
const env = (k, d) => (process.env[k] ? process.env[k].split(',') : d);
for (const lang of env('LANGS', ['es', 'pt'])) for (const [name, p] of pages.filter(([n]) => env('PAGES', [n]).includes(n))) for (const w of env('WIDTHS', [1440, 390]).map(Number)) for (const theme of env('THEMES', ['light', 'dark'])) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme });
  const page = await ctx.newPage(); page.on('pageerror', (e) => log.push(`pageerror ${name} ${e.message.slice(0, 100)}`));
  await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
  const path = (lang === 'pt' ? '/pt-br' : '') + p;
  await page.goto(base + (path || '/'), { waitUntil: 'load' }); await page.waitForTimeout(2500);
  const f = `${out}/${name}-${lang}-${w}-${theme}`;
  await page.screenshot({ path: `${f}-arriba.png` });
  if (full) { await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }); await page.waitForTimeout(600); await page.screenshot({ path: `${f}-pagina.png`, fullPage: true }); }
  await ctx.close();
}
console.log(log.join('\n') || 'ok'); await browser.close();
