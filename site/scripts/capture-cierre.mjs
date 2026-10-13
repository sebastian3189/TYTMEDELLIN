// Capturas de la ronda de cierre (test-results/ronda-cierre/): rutas clave en 390 y 1440 y el último fotograma móvil de la película (grupo completo).
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/capture-cierre.mjs
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const out = 'test-results/ronda-cierre';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const routes = [['inicio', '/'], ['ficha', '/experiencias/guatape-piedra-del-penol'], ['vehiculos', '/vehiculos'], ['contacto', '/contacto'], ['cotizar', '/cotizar']];
for (const [width, height, mobile] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
  const page = await ctx.newPage();
  for (const [name, route] of routes) {
    await page.goto(base + route, { waitUntil: 'load' }); await page.waitForTimeout(2200);
    await page.screenshot({ path: `${out}/${name}-${width}-pantalla.png` });
    if (name !== 'inicio') await page.screenshot({ path: `${out}/${name}-${width}-completa.png`, fullPage: true });
  }
  await ctx.close();
}
// Película móvil: último fotograma del clip (grupo completo) y fotogramas previos del tramo final.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1500);
  // Espera a que los fotogramas estén cargados (el último incluido) y recorre el tramo final del clip.
  await page.waitForFunction(() => Number(document.querySelector('.scrub-hero')?.dataset.loaded || 0) >= 100, null, { timeout: 90000 }).catch(() => {});
  for (const f of [0.66, 0.72, 0.76, 0.774]) {
    await page.evaluate((frac) => { const t = document.querySelector('.scrub-track'), s = document.querySelector('.scrub-stage'); const span = t.offsetHeight - s.offsetHeight; scrollTo({ top: t.getBoundingClientRect().top + scrollY - 76 + span * frac, behavior: 'instant' }); }, f);
    await page.waitForTimeout(1200);
    const frame = await page.evaluate(() => document.querySelector('.scrub-hero').dataset.frame);
    await page.screenshot({ path: `${out}/pelicula-movil-f${String(frame).padStart(3, '0')}-${Math.round(f * 100)}.png` });
    console.log(`progreso ${f} → fotograma ${frame}`);
  }
  await ctx.close();
}
await browser.close();
