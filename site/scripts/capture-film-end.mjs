// Final de la película del inicio en móvil (390): captura el último fotograma («02 / 02 · Plaza Botero») y lo que viene justo después. Uso: node scripts/capture-film-end.mjs <etiqueta>
import { chromium, webkit, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const tag = process.argv[2] || 'x', base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/film';
await mkdir(out, { recursive: true });
async function run(name, launch, ctxOpts) {
  const b = await launch(); const ctx = await b.newContext(ctxOpts); const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const m = await p.evaluate(() => { const t = document.querySelector('.scrub-track'); if (!t) return null; const r = t.getBoundingClientRect(), total = Number(getComputedStyle(t).getPropertyValue('--total')), svh = innerHeight / 100; return { top: r.top + scrollY, h: t.offsetHeight, total, svh, ih: innerHeight, hh: document.querySelector('.site-header')?.offsetHeight || 76 }; });
  console.log(name, JSON.stringify(m));
  const y = (u) => m.top - m.hh + u * m.svh;
  const go = async (yy, ms = 2500) => { await p.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), yy); await p.waitForTimeout(ms); };
  await go(y(m.total - 2), 4000); await p.screenshot({ path: `${out}/${tag}-${name}-fin-pelicula.png` });
  await go(y(m.total + 20), 2500); await p.screenshot({ path: `${out}/${tag}-${name}-despues-20.png` });
  await go(y(m.total + 60), 2500); await p.screenshot({ path: `${out}/${tag}-${name}-despues-60.png` });
  const gap = await p.evaluate(() => { const t = document.querySelector('.scrub-track'), n = t.nextElementSibling; return { trackBottom: Math.round(t.getBoundingClientRect().bottom + scrollY), nextTop: n ? Math.round(n.getBoundingClientRect().top + scrollY) : null, nextCls: n?.className }; });
  console.log(name, 'siguiente sección', JSON.stringify(gap), 'errores', errs.slice(0, 2));
  await b.close();
}
await run('chromium', () => chromium.launch({ channel: 'msedge', headless: true }), { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await run('webkit', () => webkit.launch(), { ...devices['iPhone 13'] });
