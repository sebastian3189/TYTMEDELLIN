// Revelado de títulos (Spec 03 §I, Spec 05): en carga directa, cada h1/h2 con movimiento de texto debe verse al llegar a él, sea cual sea el motor.
// Uso: npm run build && node scripts/serve-static.mjs dist 4402 &  TYT_TEST_URL=http://127.0.0.1:4402 node scripts/check-revelado-titulos.mjs [--webkit] [--muestra]
import { chromium, webkit } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const sitemap = readFileSync(fileURLToPath(new URL('../dist/sitemap.xml', import.meta.url)), 'utf8');
const rutas = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const MUESTRA = ['/', '/nosotros', '/transporte', '/en', '/pt-br/nosotros', '/en/tours/cafe-medellin'];
const soloMuestra = process.argv.includes('--muestra');
const motores = [['edge', () => chromium.launch({ channel: 'msedge', headless: true })], ...(process.argv.includes('--webkit') ? [['webkit', () => webkit.launch({ headless: true })]] : [])];
const hallazgos = [];
let medidos = 0;

for (const [motor, abrir] of motores) {
  const browser = await abrir();
  for (const [ancho, alto] of [[1440, 900], [390, 844]]) {
    const contexto = await browser.newContext({ viewport: { width: ancho, height: alto } });
    // Todas las rutas en Edge a 1440; en móvil, las de español; en WebKit, los casos que fallaban.
    const lista = soloMuestra || motor === 'webkit' ? MUESTRA : ancho === 1440 ? rutas : rutas.filter((r) => !/^\/(en|pt-br)(\/|$)/.test(r));
    for (const ruta of lista) {
      const page = await contexto.newPage();
      await page.goto(base + ruta, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(600);
      const total = await page.evaluate(() => document.querySelectorAll('main h1,main h2').length);
      for (let i = 0; i < total; i++) {
        const tipo = await page.evaluate((n) => { const el = document.querySelectorAll('main h1,main h2')[n]; if (!el?.dataset.tx) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); return el.dataset.tx; }, i);
        if (!tipo) continue;
        medidos++;
        const visto = await page.waitForFunction((n) => { const el = document.querySelectorAll('main h1,main h2')[n]; return el.classList.contains('tx-in') && +getComputedStyle(el).opacity > 0.99; }, i, { timeout: 2500 }).then(() => true).catch(() => false);
        if (!visto) hallazgos.push(`${motor} ${ancho} ${ruta}: «${await page.evaluate((n) => { const el = document.querySelectorAll('main h1,main h2')[n]; return `${el.textContent.trim().slice(0, 48)}» tipo=${el.dataset.tx} tx-in=${el.classList.contains('tx-in')} opacidad=${getComputedStyle(el).opacity}`; }, i)}`);
      }
      await page.close();
    }
    await contexto.close();
  }
  await browser.close();
}
if (hallazgos.length) { console.error(`FALLA: ${hallazgos.length} títulos sin revelar de ${medidos}\n- ` + hallazgos.join('\n- ')); process.exit(1); }
console.log(`PASS check-revelado-titulos: ${medidos} títulos revelados al llegar a ellos (${motores.map(([m]) => m).join(', ')}; 1440 y 390${soloMuestra ? '; muestra' : ''}).`);
