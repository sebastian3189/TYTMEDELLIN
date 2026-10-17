// Ronda de textos: movimiento tipográfico, transición entre páginas y capturas. Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/check-text-motion.mjs
import { chromium } from '@playwright/test'; import { mkdirSync } from 'node:fs';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391'; mkdirSync('test-results/ronda-textos', { recursive: true });
const b = await chromium.launch({ channel: 'msedge' }); let bad = 0;
for (const [name, w, h, mob] of [['1440', 1440, 900, false], ['390', 390, 844, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mob ? 2 : 1, isMobile: mob, hasTouch: mob }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await p.goto(base + '/'); await p.getByRole('button', { name: 'Rechazar' }).first().click({ timeout: 3000 }).catch(() => {});
  // navegación interna con transición
  const pages = ['/experiencias', '/vehiculos', '/nosotros', '/servicios', '/blog', '/contacto', '/cotizar', '/experiencias/tour-de-compras', '/experiencias/vuelta-a-oriente', '/experiencias/hacienda-napoles'];
  for (const path of pages) {
    await p.goto(base + '/'); await p.waitForTimeout(2500);
    const real = path.startsWith('/experiencias/');
    if (real) { await p.goto(base + '/experiencias'); await p.waitForTimeout(2500); await p.locator(`a[href="${path}"]`).first().scrollIntoViewIfNeeded(); await p.locator(`a[href="${path}"]`).first().click(); }
    else { if (mob) { await p.click('.menu-toggle'); await p.waitForTimeout(300); } await p.locator(`.site-header nav a[href="${path}"]`).first().click(); }
    await p.waitForTimeout(150);
    await p.waitForFunction((pp) => location.pathname === pp, path, { timeout: 5000 }).catch(() => { bad++; console.log('NAV FALLÓ', path); });
    await p.waitForTimeout(500);
    // scroll por la página para disparar revelados
    const info = await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < Math.min(H, 9000); y += 500) { scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 90)); } await new Promise((r) => setTimeout(r, 900)); scrollTo({ top: 0, behavior: 'instant' });
      const hs = [...document.querySelectorAll('main h1,main h2')], hidden = [...document.querySelectorAll('[data-tx]:not(.tx-in)')].filter((e) => e.offsetParent && e.getBoundingClientRect().top < scrollY + innerHeight && e.getBoundingClientRect().bottom > 0);
      return { h: hs.length, split: document.querySelectorAll('[data-tx=h]').length, tx: document.querySelectorAll('[data-tx]').length, stuckVisible: hidden.length, cls: +window.__cls.toFixed(4), vt: typeof document.startViewTransition }; });
    console.log(name, path, JSON.stringify(info));
    if (info.stuckVisible || info.cls > 0.1) bad++;
  }
  console.log(name, 'errores consola:', errs.length, errs.slice(0, 3)); if (errs.length) bad++;
  // capturas: navbar y 2 páginas con animación en curso
  if (name === '1440' || name === '390') {
    await p.goto(base + '/'); await p.waitForTimeout(1200); await p.screenshot({ path: `test-results/ronda-textos/navbar-${name}.png`, clip: { x: 0, y: 0, width: w, height: mob ? 130 : 110 } });
    if (mob) { await p.click('.menu-toggle'); await p.waitForTimeout(400); await p.screenshot({ path: 'test-results/ronda-textos/navbar-390-menu.png' }); }
    for (const [slug, path] of [['nosotros', '/nosotros'], ['vehiculos', '/vehiculos']]) {
      await p.goto(base + path); await p.waitForTimeout(500); await p.evaluate(() => scrollTo(0, innerHeight * 0.55)); await p.waitForTimeout(200);
      await p.screenshot({ path: `test-results/ronda-textos/texto-${slug}-${name}.png` });
    }
    if (!mob) for (const slug of ['vuelta-a-oriente', 'hacienda-napoles', 'tour-de-compras']) {
      await p.goto(base + '/experiencias/' + slug); await p.waitForTimeout(1200);
      await p.evaluate(() => document.querySelector('.it')?.scrollIntoView({ block: 'start' })); await p.waitForTimeout(1500);
      await p.screenshot({ path: `test-results/ronda-textos/${slug}.png` });
    }
  }
  await ctx.close();
}
await b.close(); console.log(bad ? 'FALLOS ' + bad : 'TODO OK');
