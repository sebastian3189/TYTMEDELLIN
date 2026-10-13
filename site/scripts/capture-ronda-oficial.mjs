// Capturas de la ronda oficial (2026-10-12) en test-results/ronda-oficial a 1440 y 390.
// Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/capture-ronda-oficial.mjs
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391';
const out = 'test-results/ronda-oficial';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const log = [];
for (const [label, width, height, mobile] of [['1440', 1440, 900, false], ['390', 390, 844, true]]) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  const shot = async (name, locator) => { const file = `${out}/${name}-${label}.png`; if (locator) await locator.screenshot({ path: file }); else await page.screenshot({ path: file }); };
  const go = async (path) => { await page.goto(base + path, { waitUntil: 'load' }); await page.waitForTimeout(900); };
  const scrollTo = async (selector, offset = 0) => { await page.evaluate(([sel, off]) => { const el = document.querySelector(sel); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - off); }, [selector, offset]); await page.waitForTimeout(900); };

  // Inicio (la baraja y la película no cambian; solo el encuadre final móvil).
  await go('/'); await shot('inicio-0');
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (mobile) { // fotograma final del clip en móvil (encuadre por fotograma)
    for (const frac of [.2, .26, .3]) { await page.evaluate((y) => window.scrollTo(0, y), total * frac); await page.waitForTimeout(1500); await shot(`inicio-clip-${Math.round(frac * 100)}`); }
  } else { await page.evaluate((y) => window.scrollTo(0, y), total * .22); await page.waitForTimeout(1500); await shot('inicio-clip'); }

  // §I.1 exploración por tour (fotos oficiales).
  await go('/'); await scrollTo('#formas-de-viajar', 100); await page.waitForTimeout(1200); await shot('explorador-a');
  await page.getByRole('tab', { name: /Guatapé/ }).click(); await page.waitForTimeout(1200); await shot('explorador-guatape');
  await page.getByRole('tab', { name: /Jardín/ }).click(); await page.waitForTimeout(1200); await shot('explorador-jardin');

  // Catálogo.
  await go('/experiencias'); await page.waitForTimeout(1200); await shot('catalogo-arriba');
  await scrollTo('.tour-grid', 100); await page.waitForTimeout(1000); await shot('catalogo-tarjetas');

  // Fichas con sus galerías oficiales.
  for (const slug of ['guatape-piedra-del-penol', 'city-tour-comuna-13', 'jardin-antioquia']) {
    await go(`/experiencias/${slug}`); await shot(`ficha-${slug}-arriba`);
    await scrollTo('#fotos .gallery', 80); await page.waitForTimeout(1200); await shot(`ficha-${slug}-galeria`);
    const count = await page.locator('.gallery-thumbs button').count();
    log.push({ viewport: label, slug, thumbs: count });
  }
  // Visor ampliado de una galería.
  await page.locator('.gallery-feature').click(); await page.waitForTimeout(900); await shot('ficha-visor'); await page.keyboard.press('Escape');

  // Barra móvil de cotizar (ficha, tras pasar el CTA) y formulario en la ficha.
  await go('/experiencias/salto-del-buey');
  if (mobile) { await page.evaluate(() => window.scrollTo(0, 1400)); await page.waitForTimeout(900); await shot('barra-movil'); log.push({ barraVisible: await page.locator('.quote-bar.is-visible').count() }); }
  await scrollTo('#consulta', 80); await page.waitForTimeout(900); await shot('ficha-formulario');
  if (mobile) log.push({ barraEnFormulario: await page.locator('.quote-bar.is-visible').count() });

  // /cotizar con errores de validación.
  await go('/cotizar'); await page.waitForTimeout(1500); await page.waitForSelector('form.quote-form');
  await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(800);
  await scrollTo('.quote-form', 20); await shot('cotizar-errores');
  await page.locator('.form-errors').scrollIntoViewIfNeeded(); await shot('cotizar-errores-resumen');
  // Envío válido (resumen).
  await page.getByLabel('Nombre *').fill('Prueba de la ronda'); await page.getByLabel('Número').fill('300 000 0000');
  await page.getByLabel('Fecha del recorrido *').fill('2030-01-15'); await page.getByLabel('Personas *').fill('4');
  await page.getByLabel(/He leído el/).check(); await page.waitForTimeout(1100);
  await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(900);
  await shot('cotizar-resumen', page.locator('.summary'));

  // /contacto con mapa.
  await go('/contacto'); await shot('contacto-arriba'); await scrollTo('.contact-place', 90); await shot('contacto-mapa-fachada');
  await page.getByRole('button', { name: /Cargar mapa/ }).click(); await page.waitForTimeout(1800); await shot('contacto-mapa-cargado');
  await scrollTo('.quote-form', 60); await shot('contacto-formulario');

  // Vehículos y reseñas.
  await go('/vehiculos'); await shot('vehiculos-arriba'); await scrollTo('.fleet-grid', 80); await shot('vehiculos-tarjetas');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('.fleet-grid .vehicle:nth-child(4)').getBoundingClientRect().top + scrollY - 80)); await page.waitForTimeout(700); await shot('vehiculos-van-master');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('.fleet-grid .vehicle:nth-child(5)').getBoundingClientRect().top + scrollY - 80)); await page.waitForTimeout(700); await shot('vehiculos-sprinter');
  await go('/calificaciones'); await scrollTo('.reviews-g', 40); await shot('resenas-estrellas');
  // Pie con redes.
  await go('/nosotros'); await scrollTo('.site-footer', 0); await shot('pie-redes');
  log.push({ viewport: label, consoleErrors: errors });
  await context.close();
}
await browser.close();
console.log(JSON.stringify(log, null, 1));
