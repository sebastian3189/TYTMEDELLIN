// Comprobación de que el bloque «Itinerario» antiguo (línea que se enciende) ya no está y de que el ritmo entre secciones es continuo: recorta desde
// «El espíritu del recorrido» hasta el inicio de la historia por paradas, en 3 experiencias, 390 y 1440, ES y EN. Uso: node scripts/capture-sin-itinerario-viejo.mjs
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/itinerarios';
await mkdir(out, { recursive: true });
const b = await chromium.launch({ channel: 'msedge', headless: true });
for (const slug of ['guatape-piedra-del-penol', 'tour-del-cafe-medellin', 'santa-fe-de-antioquia']) for (const en of [false, true]) for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 800, hasTouch: w < 800, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  await p.goto(`${base}${en ? '/en' : ''}/experiencias/${slug}`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const info = await p.evaluate(() => { const top = (e) => Math.round(e.getBoundingClientRect().top + scrollY); const q = (s) => document.querySelector(s); return { esencia: top(q('#esencia')), detalles: top(q('#detalles')), it: top(q('.it')), fotos: top(q('#fotos')), preparar: top(q('#preparar')), viejo: document.querySelectorAll('.td-route,.td-steps').length, bg: ['#esencia', '#detalles', '.it', '#fotos', '#preparar'].map((s) => getComputedStyle(q(s)).backgroundColor) }; });
  console.log(slug, en ? 'EN' : 'ES', w, JSON.stringify(info));
  await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.max(0, info.esencia - 160)); await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/sinviejo-${slug}-${en ? 'en' : 'es'}-${w}.png`, fullPage: true, clip: { x: 0, y: Math.max(0, info.esencia - 160), width: w, height: Math.min(2400, info.it - info.esencia + 700) } });
  await ctx.close();
}
await b.close();
