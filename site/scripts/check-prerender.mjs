// Prerender (Spec 04/05): cada ruta devuelve su HTML (un h1, título propio, contenido y enlaces) SIN JavaScript, y con JavaScript se hidrata sin
// errores de consola ni desajustes de hidratación (React los reporta con console.error, error #418/#423/#425). Las rutas desconocidas dan 404 real.
// Uso: npm run build && node scripts/serve-static.mjs dist <puerto> (servidor estático tipo producción); TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/check-prerender.mjs
// Además: canonical absoluto único por ruta, sitemap.xml y robots.txt, y despliegue con reescritura SPA (todo → index.html; se levanta serve-static en modo `spa`
// en TYT_SPA_PORT, por defecto 4418): ninguna ruta debe dar errores de hidratación (React #418) ni mostrar el contenido de otra.
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const content = await readFile(new URL('../src/tours-text.js', import.meta.url), 'utf8');
const slugs = [...content.matchAll(/^\s*\['([a-z0-9-]+)',/gm)].map((m) => m[1]);
const paths = ['/', '/experiencias', '/servicios', '/vehiculos', '/nosotros', '/blog', '/contacto', '/cotizar', '/calificaciones', '/privacidad',
  ...slugs.map((s) => `/experiencias/${s}`), '/blog/preparar-tu-recorrido', '/blog/elegir-tu-experiencia', '/blog/viajar-en-grupo'];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const findings = [], rows = [];
const soft = (cond, msg) => { if (!cond) findings.push(msg); return cond; };
try {
  // 1) Sin JavaScript: el HTML del servidor es legible.
  const bare = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  for (const path of paths) {
    const page = await bare.newPage();
    const response = await page.goto(base + path, { waitUntil: 'load' });
    const data = await page.evaluate(() => ({
      status: 0, title: document.title, h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()), main: document.querySelector('main')?.innerText.length || 0,
      links: document.querySelectorAll('a[href]').length, root: document.querySelector('#root')?.children.length || 0,
      canonical: [...document.querySelectorAll('link[rel=canonical]')].map((l) => l.getAttribute('href')),
    }));
    soft(response.status() === 200, `${path}: estado ${response.status()}`);
    soft(data.h1.length === 1, `${path}: h1 = ${JSON.stringify(data.h1)}`);
    soft(/\| T&T Medellín$/.test(data.title), `${path}: título «${data.title}»`);
    soft(data.main > (path === '/cotizar' ? 40 : 200), `${path}: main casi vacío (${data.main})`);
    soft(data.links > 8, `${path}: enlaces reales en el HTML sin JS: ${data.links}`);
    soft(data.canonical.length === 1 && /^https?:\/\/[^/]+\//.test(data.canonical[0] + '/') && new URL(data.canonical[0]).pathname.replace(/\/$/, '') === path.replace(/\/$/, ''), `${path}: canonical ${JSON.stringify(data.canonical)}`);
    rows.push(`${path} h1=«${data.h1[0]?.slice(0, 30)}» main=${data.main}ch enlaces=${data.links}`);
    await page.close();
  }
  const titles = new Set(); for (const row of rows) titles.add(row.split(' ')[0]);
  await bare.close();
  // 2) Con JavaScript: hidratación limpia (consola sin errores) y la ruta sigue navegable.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
  for (const path of paths) {
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror ${e.message.slice(0, 160)}`));
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Failed to load resource/.test(m.text())) errors.push(`${m.type()} ${m.text().slice(0, 200)}`); });
    await page.goto(base + path, { waitUntil: 'load' });
    await page.waitForTimeout(path === '/' ? 1800 : 700);
    const state = await page.evaluate(() => ({ h1: document.querySelectorAll('h1').length, boot: Boolean(document.getElementById('boot')), cls: document.documentElement.className, links: document.querySelectorAll('a[href]').length }));
    soft(errors.length === 0, `${path} (JS): ${errors.slice(0, 2).join(' | ')}`);
    soft(state.h1 === 1, `${path} (JS): ${state.h1} h1 tras hidratar`);
    soft(!state.boot && !/boot-scrub/.test(state.cls), `${path} (JS): póster de arranque o clase boot-scrub siguen presentes (${state.cls})`);
    await page.close();
  }
  await ctx.close();
  // 3) Navegación cliente entre rutas y 404 real.
  const nav = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await nav.newPage();
  await page.goto(base + '/vehiculos', { waitUntil: 'load' });
  await page.getByRole('link', { name: 'Experiencias', exact: true }).first().click();
  await page.waitForURL('**/experiencias'); await page.waitForSelector('h1');
  soft(/Experiencias \| T&T/.test(await page.title()), `título tras navegar: ${await page.title()}`);
  await page.locator('.tour-card').first().click(); await page.waitForURL('**/experiencias/**'); await page.waitForSelector('.tour-hero h1');
  soft(/\| T&T Medellín$/.test(await page.title()), `título de la ficha tras navegar: ${await page.title()}`);
  const missing = await nav.request.get(base + '/experiencias/no-existe', { headers: { accept: 'text/html' } });
  soft(missing.status() === 404, `ficha inexistente: estado ${missing.status()}`);
  const missing2 = await nav.request.get(base + '/ruta-inexistente', { headers: { accept: 'text/html' } });
  soft(missing2.status() === 404, `ruta inexistente: estado ${missing2.status()}`);
  const notFound = await nav.newPage(); await notFound.goto(base + '/ruta-inexistente', { waitUntil: 'load' }); await notFound.waitForSelector('h1');
  soft(/Este recorrido/.test(await notFound.locator('h1').innerText()), '404: el cliente pinta la página «Este recorrido no está aquí»');
  for (const p of ['/site', '/flota']) { const q = await nav.newPage(); await q.goto(base + p, { waitUntil: 'load' }); await q.waitForTimeout(800); soft(new URL(q.url()).pathname === (p === '/site' ? '/' : '/vehiculos'), `${p} redirige a ${new URL(q.url()).pathname}`); await q.close(); }
  await nav.close();
  // 4) sitemap.xml y robots.txt.
  const sitemap = await (await fetch(base + '/sitemap.xml')).text(), robots = await (await fetch(base + '/robots.txt')).text();
  soft((sitemap.match(/<url>/g) || []).length === paths.length * 2, `sitemap: ${(sitemap.match(/<url>/g) || []).length} URLs (se esperaban ${paths.length * 2}: es + en)`);
  soft(!/\/(site|flota|404)</.test(sitemap), 'sitemap incluye /site, /flota o 404');
  soft(/^User-agent: \*/m.test(robots) && /Sitemap: /.test(robots), 'robots.txt sin User-agent o Sitemap');
  // 5) Reescritura SPA: cualquier ruta devuelve el mismo HTML; el cliente no debe hidratar el HTML de otra ruta (React #418).
  const spaPort = process.env.TYT_SPA_PORT || '4418', dist = fileURLToPath(new URL('../dist', import.meta.url)), server = spawn(process.execPath, [fileURLToPath(new URL('./serve-static.mjs', import.meta.url)), dist, spaPort, 'spa'], { stdio: 'ignore' });
  try {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const spa = await browser.newContext({ viewport: { width: 390, height: 844 } });
    for (const [path, h1] of [['/contacto', /escuchemos|plan/i], ['/experiencias/hacienda-napoles', /Hacienda N/], ['/cotizar', /tiempos/], ['/en/contacto', /./], ['/experiencias', /historia/i], ['/', /nivel/]]) {
      const page = await spa.newPage(), errors = [];
      page.on('pageerror', (e) => errors.push(e.message.slice(0, 120))); page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Failed to load resource/.test(m.text())) errors.push(m.text().slice(0, 160)); });
      await page.goto(`http://127.0.0.1:${spaPort}${path}`, { waitUntil: 'load' }); await page.waitForTimeout(1400);
      const state = await page.evaluate(() => ({ h1: [...document.querySelectorAll('h1')].map((x) => x.textContent) }));
      soft(errors.length === 0, `SPA ${path}: ${errors.slice(0, 2).join(' | ')}`);
      soft(state.h1.length === 1 && h1.test(state.h1[0]), `SPA ${path}: h1 ${JSON.stringify(state.h1)}`);
      await page.close();
    }
    await spa.close();
  } finally { server.kill(); }
  console.log(rows.join('\n'));
  if (findings.length) { console.log('\nHALLAZGOS:\n- ' + findings.join('\n- ')); process.exitCode = 1; } else console.log(`\nPASS check-prerender (${paths.length} rutas sin JS y con JS; 404 real)`);
} finally { await browser.close(); }
