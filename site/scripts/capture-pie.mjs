// Pie (silueta de Medellín + columnas) a 1440 y 390 en claro y oscuro, y contraste medido de sus textos sobre su fondo real (WCAG 2.2). Uso: node scripts/capture-pie.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-j';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const p = await ctx.newPage(); await p.goto(base + '/vehiculos', { waitUntil: 'load' }); await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })); await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/pie-${w}-${theme}.png` });
  const rows = await p.evaluate(() => { const foot = document.querySelector('.site-footer'); const bg = (el) => { if (document.documentElement.dataset.theme === 'dark') return el.closest('.pie-bottom') ? 'rgb(168, 76, 0)' : 'rgb(232, 118, 17)'; for (let n = el; n; n = n.parentElement) { const c = getComputedStyle(n).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; } return 'rgb(255,255,255)'; }; return [...foot.querySelectorAll('p,a,span,h2,li')].filter((e) => e.children.length === 0 && e.textContent.trim() && e.getBoundingClientRect().width > 0).map((e) => ({ t: e.textContent.trim().slice(0, 28), fg: getComputedStyle(e).color, bg: bg(e), fs: parseFloat(getComputedStyle(e).fontSize) })); });
  const res = rows.map((r) => { const a = lum(parse(r.fg)), b = lum(parse(r.bg)); return { ...r, ratio: +((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2) }; });
  const worst = res.sort((a, b) => a.ratio - b.ratio)[0];
  console.log(w, theme, 'peor contraste del pie', worst.ratio, JSON.stringify([worst.t, worst.fg, worst.bg]), 'textos', res.length);
  await ctx.close();
}
await browser.close();
