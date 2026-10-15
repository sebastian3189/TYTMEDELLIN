// Capturas de la ronda PT (selector, aviso de cookies, diálogo, bienvenida, página PT-BR). Uso: TYT_TEST_URL=http://127.0.0.1:4417 node scripts/capture-ronda-pt.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-pt';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const log = [];
const open = async (w, { theme = 'light', path = '/', consent = false, reduce = false } = {}) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage(); page.on('pageerror', (e) => log.push(`pageerror ${path} ${e.message.slice(0, 100)}`)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load/.test(m.text())) log.push(`console ${m.text().slice(0, 100)}`); });
  if (consent) await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
  await page.goto(base + path, { waitUntil: "load" }); await page.waitForTimeout(3000); return [ctx, page];
};
// 1 · selector a 320/390/1440 (cerrado y abierto)
for (const w of [320, 390, 1440]) {
  const [ctx, page] = await open(w, { consent: true, path: '/pt-br' });
  await page.screenshot({ path: `${out}/selector-${w}-cerrado.png`, clip: { x: 0, y: 0, width: w, height: 120 } });
  await page.click('.language-toggle'); await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/selector-${w}-abierto.png`, clip: { x: 0, y: 0, width: w, height: 300 } });
  const m = await page.evaluate(() => { const r = (s) => document.querySelector(s)?.getBoundingClientRect(); const t = r('.language-toggle'), h = r('.site-header'); return { toggle: [Math.round(t.x), Math.round(t.width), Math.round(t.height)], right: Math.round(t.right), vw: innerWidth, scrollW: document.documentElement.scrollWidth, items: [...document.querySelectorAll('.language-list a')].map((a) => Math.round(a.getBoundingClientRect().height)), menuRight: Math.round(document.querySelector('.language-list').getBoundingClientRect().right), menuLeft: Math.round(document.querySelector('.language-list').getBoundingClientRect().left) }; });
  log.push(`selector ${w}: ${JSON.stringify(m)}`); await ctx.close();
}
// 2 · aviso de cookies + diálogo
for (const w of [390, 1440]) for (const theme of ['light', 'dark']) {
  const [ctx, page] = await open(w, { theme }); await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/cookies-${w}-${theme}.png` });
  const m = await page.evaluate(() => { const b = document.querySelector('.consent-banner').getBoundingClientRect(), f = document.querySelector('.wa-fab').getBoundingClientRect(); return { banner: [b.x, b.y, b.width, b.height].map(Math.round), fab: [f.x, f.y, f.width, f.height].map(Math.round), overlap: !(b.right <= f.left || f.right <= b.left || b.bottom <= f.top || f.bottom <= b.top) }; });
  log.push(`cookies ${w} ${theme}: ${JSON.stringify(m)}`);
  await page.click('.consent-actions button:nth-child(3)'); await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/cookies-dialogo-${w}-${theme}.png` }); await ctx.close();
}
// 3 · bienvenida (tras resolver cookies)
for (const [lang, path] of [['es', '/'], ['en', '/en'], ['pt', '/pt-br']]) for (const w of [390, 1440]) for (const theme of ['light', 'dark']) {
  const [ctx, page] = await open(w, { theme, path });
  const early = await page.locator('.welcome').count();
  await page.click('.consent-actions button:nth-child(1)'); await page.waitForTimeout(4800);
  const shown = await page.locator('.welcome').count();
  await page.screenshot({ path: `${out}/bienvenida-${lang}-${w}-${theme}.png` });
  const m = await page.evaluate(() => { const c = document.querySelector('.welcome')?.getBoundingClientRect(), f = document.querySelector('.wa-fab').getBoundingClientRect(); return c ? { card: [c.x, c.y, c.width, c.height].map(Math.round), overlapFab: !(c.right <= f.left || f.right <= c.left || c.bottom <= f.top || f.bottom <= c.top), href: document.querySelector('.welcome-cta')?.getAttribute('href'), focusInCard: document.querySelector('.welcome')?.contains(document.activeElement) } : null; });
  log.push(`bienvenida ${lang} ${w} ${theme}: antes-de-resolver=${early} mostrada=${shown} ${JSON.stringify(m)}`); await ctx.close();
}
// 4 · página PT-BR completa (escritorio)
{ const [ctx, page] = await open(1440, { consent: true, path: '/pt-br' }); await page.screenshot({ path: `${out}/pagina-pt-br-home-1440.png` });
  await page.goto(base + '/pt-br/experiencias', { waitUntil: 'load' }); await page.waitForTimeout(1500); await page.screenshot({ path: `${out}/pagina-pt-br-experiencias-1440-full.png`, fullPage: true }); await ctx.close(); }
await browser.close(); console.log(log.join('\n'));
