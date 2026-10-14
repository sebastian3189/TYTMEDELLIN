// Solape (px²) entre fotos de «La mano de viaje» y texto/CTA/enlace/flechas/chips/título a muchos anchos; flechas dentro de la ventana.
// B=url TOURS=0,7 node scripts/check-ru2-overlap.mjs   → imprime una línea por ancho y tour; SHOT=1 guarda capturas en 380x844, 768x1024, 1024x768
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', tours = (process.env.TOURS || '0,7,10').split(',').map(Number);
const sizes = [[360, 740], [380, 844], [390, 844], [480, 900], [600, 900], [768, 1024], [820, 1180], [900, 800], [1024, 768], [1100, 800], [1280, 800], [1280, 700], [1440, 900]];
const b = await chromium.launch({ channel: 'msedge', headless: true }); let bad = 0;
for (const [w, h] of sizes) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 800, isMobile: w < 800 }); const p = await c.newPage();
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(500);
  const mode = await p.evaluate(() => document.querySelector('.th').className + '|' + document.querySelector('.th').dataset.layout);
  if (mode.includes('static')) { console.log(w + 'x' + h, 'ESTÁTICO (lista), sin mano'); await c.close(); continue; }
  for (const i of tours) {
    await p.evaluate(() => scrollTo({ top: document.querySelector('.th').getBoundingClientRect().top + scrollY - 40, behavior: 'instant' })); await p.waitForTimeout(500);
    await p.locator(`#th-tab-${i}`).click({ force: true }).catch(() => {}); await p.waitForTimeout(1600);
    const m = await p.evaluate(() => {
      const R = (e) => e.getBoundingClientRect(), inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const ph = [...document.querySelectorAll('.th-photo')].filter((e) => getComputedStyle(e).visibility !== 'hidden' && e.closest('.th-group').style.visibility !== 'hidden' && Number(e.style.opacity) > 0.05).map(R);
      const targets = { cta: '.th-panel .button', linea: '.th-line', enlace: '.th-panel .text-link', titulo: '.th-title', chips: '[role=tablist]', head: '.th-head', fab: '.wa-fab', flechas: '.th-panel .th-arrows' };
      const ov = {}; for (const [k, s] of Object.entries(targets)) { const el = document.querySelector(s); if (!el) continue; const r = R(el); ov[k] = Math.round(ph.reduce((a, x) => a + inter(x, r), 0)); }
      const ar = [...document.querySelectorAll('.th-arrows button')].filter((e) => R(e).width > 0).map(R); const inside = ar.every((r) => r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight);
      return { ov, inside, nPhotos: ph.length };
    });
    const solape = Object.entries(m.ov).filter(([k, v]) => v > 0 && k !== 'fab'); const fab = m.ov.fab || 0;
    if (solape.length || !m.inside) bad++;
    console.log(`${w}x${h} t${i} ${mode.split('|')[1]} fotos=${m.nPhotos} solape=${JSON.stringify(solape)} fab=${fab} flechasDentro=${m.inside}`);
    if (process.env.SHOT && i === 7 && [[380, 844], [768, 1024], [1024, 768]].some(([a, d]) => a === w && d === h)) await p.screenshot({ path: `test-results/ronda-usuario-2/ancho-${w}x${h}.png` });
  }
  await c.close();
}
console.log('FALLAS:', bad); await b.close();
