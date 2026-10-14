// Capturas del índice de «La mano de viaje» a 1440 y 390, claro y oscuro (separación, sin etiquetas de grupo, sin solaparse con fotos).
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(1200);
  const g = await p.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight, layout: document.querySelector('.th').dataset.layout }; });
  const seg = g.layout === 'wide' ? 30 : 80, y = g.top - g.hh + ((34 + 3.56 * seg) / g.total) * g.span;
  await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(1800);
  await p.screenshot({ path: `test-results/ronda-j/indice-${w}-${theme}.png` });
  const m = await p.evaluate(() => { const tabs = [...document.querySelectorAll('.th-index [role=tab]')].map((e) => e.getBoundingClientRect()); const gaps = tabs.slice(1).map((r, i) => Math.round((tabs[i].bottom <= r.top ? r.top - tabs[i].bottom : r.left - tabs[i].right))); const idx = document.querySelector('.th-index').getBoundingClientRect(); const imgs = [...document.querySelectorAll('.th-photo')].filter((im) => getComputedStyle(im).visibility !== 'hidden' && Number(getComputedStyle(im).opacity) > 0.1).map((im) => im.getBoundingClientRect()); const overlap = imgs.filter((r) => !(r.right <= idx.left || r.left >= idx.right || r.bottom <= idx.top || r.top >= idx.bottom)).length; return { minGap: Math.min(...gaps), labels: document.querySelectorAll('.th-group-label').length, overlap, indexBottom: Math.round(idx.bottom), scrolls: document.querySelector('.th-index').scrollHeight > document.querySelector('.th-index').clientHeight + 1 }; });
  console.log(w, theme, JSON.stringify(m));
  await ctx.close();
}
await browser.close();
