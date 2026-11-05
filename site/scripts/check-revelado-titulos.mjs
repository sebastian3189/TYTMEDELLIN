// Revelado de títulos (Spec 03 §I, Spec 05): en carga directa, al recorrer la página, ningún h1/h2 con movimiento de texto puede quedar invisible.
// Uso: npm run build && node scripts/serve-static.mjs dist 4402 &  TYT_TEST_URL=http://127.0.0.1:4402 node scripts/check-revelado-titulos.mjs [--webkit]
import { chromium, webkit } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const sitemap = readFileSync(fileURLToPath(new URL('../dist/sitemap.xml', import.meta.url)), 'utf8');
const rutas = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const motores = [['edge', () => chromium.launch({ channel: 'msedge', headless: true })], ...(process.argv.includes('--webkit') ? [['webkit', () => webkit.launch({ headless: true })]] : [])];
const hallazgos = [];
let medidos = 0;

for (const [motor, abrir] of motores) {
  const browser = await abrir();
  for (const [ancho, alto] of [[1440, 900], [390, 844]]) {
    const contexto = await browser.newContext({ viewport: { width: ancho, height: alto } });
    // Todas las rutas en Edge a 1440; en móvil, las de español; en WebKit, una muestra de los casos que fallaban.
    const lista = motor === 'webkit' ? ['/', '/nosotros', '/transporte', '/en', '/pt-br/nosotros'] : ancho === 1440 ? rutas : rutas.filter((r) => !/^\/(en|pt-br)(\/|$)/.test(r));
    for (const ruta of lista) {
      const page = await contexto.newPage();
      await page.goto(base + ruta, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(700);
      for (let y = 0, total = 1; y < total; y += alto * 0.6) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
        await page.waitForTimeout(110);
        total = await page.evaluate(() => document.documentElement.scrollHeight);
      }
      await page.waitForTimeout(1100);
      const ocultos = await page.evaluate(() => [...document.querySelectorAll('main [data-tx]')].filter((el) => el.matches('h1,h2')).map((el) => ({ texto: el.textContent.trim().slice(0, 48), tipo: el.dataset.tx, revelado: el.classList.contains('tx-in'), opacidad: +getComputedStyle(el).opacity })));
      medidos += ocultos.length;
      for (const h of ocultos) if (!h.revelado || h.opacidad < 0.99) hallazgos.push(`${motor} ${ancho} ${ruta}: «${h.texto}» tipo=${h.tipo} tx-in=${h.revelado} opacidad=${h.opacidad}`);
      await page.close();
    }
    await contexto.close();
  }
  await browser.close();
}
if (hallazgos.length) { console.error(`FALLA: ${hallazgos.length} títulos sin revelar de ${medidos}\n- ` + hallazgos.join('\n- ')); process.exit(1); }
console.log(`PASS check-revelado-titulos: ${medidos} títulos revelados (${motores.map(([m]) => m).join(', ')}; 1440 y 390).`);
