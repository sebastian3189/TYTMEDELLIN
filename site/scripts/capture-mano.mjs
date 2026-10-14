// Capturas de «La mano de viaje» (Spec 03 §K11): relevo desde la película, 3 tours consecutivos, título gigante, móvil. Claro y oscuro, 1440 y 390.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-j';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const tag = `${w}-${theme}`, ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text().slice(0, 140)); });
  await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true');
  const info = await page.evaluate(() => { const sh = document.querySelector('.scrub-hero'), th = document.querySelector('.th'); return { shTop: sh.getBoundingClientRect().top + scrollY, shH: sh.offsetHeight, thTop: th.getBoundingClientRect().top + scrollY, thH: th.offsetHeight, mode: th.className, hh: document.querySelector('.site-header').offsetHeight, ih: innerHeight }; });
  console.log(tag, JSON.stringify(info));
  const goto = async (y, wait = 1200) => { await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(wait); };
  // Pista de ScrubHero: relevo = últimos 34 svh de su recorrido.
  const sh = await page.evaluate(() => { const t = document.querySelector('.scrub-track'), s = document.querySelector('.scrub-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--total')) || 0, hh: document.querySelector('.site-header').offsetHeight }; });
  const svh = h / 100, u2y = (u) => sh.top - sh.hh + u * svh;
  const T = w < 800 ? { t4: 24 + 40 + 140 + 24 + 48 } : { t4: 305 }; const t5 = T.t4 + 30, total = t5 + 4;
  await goto(u2y(T.t4 - 2)); await page.screenshot({ path: `${out}/mano-relevo-0-${tag}.png` });
  await goto(u2y(T.t4 + 15)); await page.screenshot({ path: `${out}/mano-relevo-50-${tag}.png` });
  await goto(u2y(total - 0.5)); await page.screenshot({ path: `${out}/mano-relevo-100-${tag}.png` });
  const th = await page.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight, layout: document.querySelector('.th').dataset.layout }; });
  const seg = th.layout === 'wide' ? 30 : 80, thu = (u) => th.top - th.hh + (u / th.total) * th.span;
  for (const [i, s] of [[0, 0.1], [0, 0.55], [1, 0.55], [2, 0.3], [2, 0.55]]) { await goto(thu(34 + (i + s) * seg), 1600); await page.screenshot({ path: `${out}/mano-tour${i + 1}-${String(Math.round(s * 100)).padStart(2, '0')}-${tag}.png` }); }
  await goto(thu(34 + 5 * seg + 0.55 * seg), 1600); await page.screenshot({ path: `${out}/mano-jardin-${tag}.png` });
  if (errors.length) console.log(tag, 'ERRORES', errors.slice(0, 3));
  await ctx.close();
}
await browser.close();
