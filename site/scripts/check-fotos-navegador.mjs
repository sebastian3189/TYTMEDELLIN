// Verificación en navegador de la selección fotográfica 2026-10-23 (imágenes cargadas, consola limpia, rotación de cabeceras, capturas).
// Uso: (con el servidor de desarrollo o `node scripts/serve-static.mjs dist 4417`)  TYT_TEST_URL=http://127.0.0.1:5173 node scripts/check-fotos-navegador.mjs [rapido]
// Salida: capturas en test-results/ronda-fotos-2026-10-23/ y un resumen por página (naturalWidth>0 por zona, errores de consola).
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:5173', out = 'test-results/ronda-fotos-2026-10-23', quick = process.argv[2] === 'rapido';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const problems = [];
async function open(path, w = 1440, h = 900) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 800, hasTouch: w < 800 });
  const page = await ctx.newPage(); page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message.slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text().slice(0, 160)); });
  page.on('response', (r) => { if (r.status() >= 400) page.errors.push(`HTTP ${r.status()} ${r.url().slice(0, 140)}`); });
  await page.goto(base + path, { waitUntil: 'load' }); await page.waitForTimeout(1200);
  return { ctx, page };
}
// Desplaza por toda la página para que las imágenes diferidas se pidan.
async function scrollAll(page) {
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 700) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(120); }
  await page.waitForTimeout(800); await page.evaluate(() => scrollTo(0, 0));
}
const zones = (page) => page.evaluate(() => {
  const z = {}; const add = (name, sel) => { const imgs = [...document.querySelectorAll(sel)].filter((i) => i.tagName === 'IMG'); z[name] = { n: imgs.length, rotas: imgs.filter((i) => i.complete && i.naturalWidth === 0).length, sinCargar: imgs.filter((i) => !i.complete).length }; };
  add('cabecera', 'section.home-hero img'); add('paradas', '.it img'); add('archivo/mano', '.ta img, .gallery img'); add('pila', '.cs img'); add('rail', 'section.tp-band:last-of-type img, .rail img, .tour-card img');
  add('todas', 'img'); return z;
});
async function rotation(page, seconds) {
  const seen = new Set(); const t0 = Date.now(); let darkSamples = 0, samples = 0;
  while (Date.now() - t0 < seconds * 1000) {
    const s = await page.evaluate(() => { const on = document.querySelector('.hero-slides .hs-img.is-on'); return on ? { src: on.currentSrc || on.src, ok: on.complete && on.naturalWidth > 0, op: getComputedStyle(on).opacity } : null; });
    samples++; if (!s || !s.ok || Number(s.op) < 0.5) darkSamples++; else seen.add(s.src.split('/').pop());
    await page.waitForTimeout(700);
  }
  return { distintas: seen.size, muestras: samples, oscuras: darkSamples };
}
const pages = quick ? ['/experiencias/guatape-piedra-del-penol'] : ['/experiencias/guatape-piedra-del-penol', '/experiencias/santa-fe-de-antioquia', '/experiencias/jardin-antioquia', '/experiencias/city-tour-comuna-13', '/experiencias/tour-miradores', '/experiencias', '/', '/nosotros'];
for (const path of pages) {
  const name = path === '/' ? 'inicio' : path.slice(1).replace(/\//g, '_');
  const { ctx, page } = await open(path); await scrollAll(page);
  const z = await zones(page); const rot = (path.startsWith('/experiencias')) ? await rotation(page, path === '/experiencias' ? 48 : 20) : null;
  await page.screenshot({ path: `${out}/${name}-1440.png` });
  await page.evaluate(() => { const t = document.querySelector('.ta, .gallery, .th-hand'); t?.scrollIntoView({ block: 'center' }); }); await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${name}-1440-archivo.png` });
  console.log(path, JSON.stringify(z), rot ? 'rotación ' + JSON.stringify(rot) : '', page.errors.length ? 'ERRORES ' + JSON.stringify(page.errors.slice(0, 5)) : 'consola limpia');
  if (z.todas.rotas || page.errors.length) problems.push(path);
  await ctx.close();
  const m = await open(path, 390, 844); await scrollAll(m.page); const zm = await m.page.evaluate(() => [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length);
  await m.page.screenshot({ path: `${out}/${name}-390.png` });
  console.log('  móvil 390: imágenes rotas', zm, m.page.errors.length ? 'ERRORES ' + JSON.stringify(m.page.errors.slice(0, 3)) : 'consola limpia');
  if (zm || m.page.errors.length) problems.push(path + ' (390)');
  await m.ctx.close();
}
await browser.close();
console.log(problems.length ? 'PROBLEMAS: ' + problems.join(', ') : 'OK: sin imágenes rotas ni errores de consola');
process.exit(problems.length ? 1 : 0);
