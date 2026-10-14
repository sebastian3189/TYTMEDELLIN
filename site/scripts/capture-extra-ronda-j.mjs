// Capturas sueltas de la ronda J: pista del libro en móvil (esquina levantada + «Desliza para pasar la página» + giro de pista), «La mano de viaje» a 390 en tres
// experiencias (con Salto del Buey), flechas SVG en varios botones y la ficha móvil sin barra duplicada. Uso: TYT_TEST_URL=... node scripts/capture-extra-ronda-j.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-j';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); sessionStorage.removeItem('tyt-libro-gesto'); } catch { /* */ } }, theme);
  const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true'); await p.waitForTimeout(800);
  // Libro: la pista aparece al entrar en pantalla.
  await p.evaluate(() => document.querySelector('.ft-book').scrollIntoView({ block: 'center' })); await p.waitForTimeout(350);
  await p.screenshot({ path: `${out}/libro-pista-reposo-390-${theme}.png` });
  await p.waitForTimeout(450); await p.screenshot({ path: `${out}/libro-pista-giro-390-${theme}.png` });
  await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/libro-pista-texto-390-${theme}.png` });
  // La mano en tres experiencias (índices 0, 7 = Salto del Buey, 9).
  const g = await p.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight }; });
  for (const [i, name] of [[1, 'compras'], [7, 'salto-del-buey'], [9, 'miradores']]) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.top - g.hh + ((34 + (i + 0.56) * 80) / g.total) * g.span); await p.waitForTimeout(1800); await p.screenshot({ path: `${out}/mano-movil-${name}-390-${theme}.png` }); }
  await ctx.close();
}
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage(); await p.goto(base + '/experiencias/hacienda-napoles', { waitUntil: 'load' }); await p.waitForTimeout(1200);
await p.evaluate(() => scrollTo({ top: 1700, behavior: 'instant' })); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/ficha-movil-sin-barra-390.png` });
await ctx.close(); await browser.close(); console.log('listo');
