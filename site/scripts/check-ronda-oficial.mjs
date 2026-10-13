// Verificación de la ronda oficial (2026-10-12): fotos, redes, formulario, contacto/mapa, objetivos táctiles, desbordes y textos retirados.
// Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/check-ronda-oficial.mjs
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391';
const media = JSON.parse(await readFile('src/media.json', 'utf8'));
const fuentes = JSON.parse(await readFile('scripts/oficial-medellin-fuentes.json', 'utf8'));
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// 1) Mismas fotos y misma cantidad que la ficha oficial; archivos WebP existentes; procedencia registrada.
const counts = {};
for (const [slug, v] of Object.entries(fuentes)) {
  const official = [...new Set([v.image, ...v.galeria])];
  ok(media[slug].length === official.length, `${slug}: ${media[slug].length} != ${official.length}`);
  counts[slug] = official.length;
  for (const [i, p] of media[slug].entries()) {
    ok(p.src.endsWith('.webp') && p.source.includes('tnt-colombia-connect'), `${slug}[${i}] procedencia/WebP`);
    ok(p.src.split('/').pop() === official[i].split('/').pop(), `${slug}[${i}] orden oficial`);
    await stat('public' + p.src);
    for (const part of p.srcset.split(', ')) await stat('public' + part.split(' ')[0]);
  }
}
const vehicles = media.vehiculos;
ok(vehicles[4].srcset.includes('400w') && vehicles[4].srcset.includes('533w'), 'Sprinter: variantes distintas');

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = { photosPerTour: counts, overflow: [], smallTargets: [] };

// 2) Desborde horizontal y objetivos táctiles.
const routes = ['/', '/experiencias', '/experiencias/guatape-piedra-del-penol', '/vehiculos', '/cotizar', '/contacto', '/nosotros', '/servicios', '/calificaciones', '/blog', '/privacidad'];
for (const width of [320, 390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: width < 800 ? 800 : 900 }, deviceScaleFactor: 1, isMobile: width < 800 });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'load' }); await page.waitForTimeout(900);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (sw > 1) results.overflow.push({ width, route, sw });
    if (width === 390) {
      const small = await page.evaluate(() => [...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary')].filter((e) => {
        const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
        if (!r.width || !r.height || cs.visibility === 'hidden' || e.closest('[aria-hidden=true],[inert],.honeypot,.sr-only') || e.closest('.scrub-hero')) return false;
        if (e.matches('a') && e.closest('p,li,small,figcaption,label') && !e.closest('.socials,.contact-grid')) return false; // enlaces en línea dentro de texto
        if (e.type === 'radio' || e.type === 'checkbox') return false; // el control grande es su etiqueta
        return Math.min(r.height, 9999) < 43.5 || r.width < 43.5;
      }).map((e) => `${e.tagName.toLowerCase()}[${(e.getAttribute('aria-label') || e.textContent || e.name || '').trim().slice(0, 30)}] ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`).slice(0, 8));
      if (small.length) results.smallTargets.push({ route, small });
    }
  }
  await context.close();
}

// 3) Redes, textos retirados y metadatos.
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(base + '/nosotros', { waitUntil: 'load' }); await page.waitForTimeout(700);
const links = await page.evaluate(() => [...document.querySelectorAll('.footer-socials a, .header-socials a')].map((a) => a.href));
ok(links.some((l) => l === 'https://www.instagram.com/transporteenmedellin') && links.some((l) => l === 'https://www.tiktok.com/@tytmedellin') && links.some((l) => l.startsWith('https://wa.me/573044961698')), `redes: ${links}`);
ok(!links.some((l) => /facebook|tytcolombia|transporteyturismocolombia/.test(l)), 'sin Facebook ni cuentas de Colombia');
await page.goto(base + '/vehiculos', { waitUntil: 'load' }); await page.waitForTimeout(500);
ok(!(await page.locator('body').innerText()).includes('EN RUTA'), 'sin «EN RUTA»');
await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(700);
ok((await page.locator('meta[name=description]').getAttribute('content')).startsWith('Medellín, a otro nivel.'), 'meta description del inicio');
ok(!(await page.locator('meta[name=description]').getAttribute('content')).includes('a tu ritmo'), 'sin «a tu ritmo» en la descripción');
// 4) Contacto: mapa diferido, mismo embed que el oficial, enlaces.
await page.goto(base + '/contacto', { waitUntil: 'load' }); await page.waitForTimeout(700);
ok((await page.locator('.map-frame iframe').count()) === 0, 'el iframe no carga antes del clic');
await page.getByRole('button', { name: /Cargar mapa/ }).click();
const src = await page.locator('.map-frame iframe').getAttribute('src');
ok(src === 'https://www.openstreetmap.org/export/embed.html?bbox=-75.610988%2C6.202569%2C-75.594988%2C6.214569&layer=mapnik&marker=6.2085691%2C-75.602988', `embed: ${src}`);
ok((await page.locator('.map-frame iframe').getAttribute('title')).startsWith('Ubicación de la oficina en Medellín'), 'título del iframe');
ok((await page.locator('a[href*="google.com/maps"]').count()) === 1, 'enlace a Google Maps');
// 5) Formulario: errores asociados, foco al primer error, honeypot.
await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForSelector('form.quote-form'); await page.waitForTimeout(1200);
await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(400);
const focusedId = await page.evaluate(() => document.activeElement.id);
ok(focusedId === 'fecha', `foco al primer error: ${focusedId}`);
const described = await page.evaluate(() => ['fecha', 'personas', 'nombre', 'telefono', 'consentimiento'].map((id) => { const el = document.getElementById(id); const d = el.getAttribute('aria-describedby') || ''; return el.getAttribute('aria-invalid') === 'true' && d.split(' ').some((x) => document.getElementById(x)?.textContent.length > 3 && x.endsWith('-error')); }));
ok(described.every(Boolean), `aria-describedby de errores: ${described}`);
ok((await page.locator('.form-errors[role=alert]').count()) === 1, 'resumen de errores con role=alert');
// honeypot: no genera resumen
await page.evaluate(() => { document.querySelector('input[name=website]').value = 'bot'; });
await page.getByLabel('Nombre *').fill('Prueba'); await page.getByLabel('Número').fill('300 000 0000'); await page.getByLabel('Fecha del recorrido *').fill('2030-01-15'); await page.getByLabel('Personas *').fill('2'); await page.getByLabel(/He leído el/).check(); await page.waitForTimeout(1000);
await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(300);
ok((await page.locator('.summary').count()) === 0, 'honeypot bloquea el resumen');
await page.evaluate(() => { document.querySelector('input[name=website]').value = ''; });
await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(600);
ok((await page.locator('.summary textarea').inputValue()).includes('Teléfono: +57 300 000 0000 (Colombia)'), 'resumen con indicativo y país');
const waHref = await page.locator('.summary a.button').getAttribute('href');
ok(waHref.startsWith('https://wa.me/573044961698?text=') && !decodeURIComponent(waHref).includes('Prueba') && !decodeURIComponent(waHref).includes('300'), 'WhatsApp sin datos personales en la URL');
await browser.close();
console.log(JSON.stringify({ checks, ...results }, null, 1));
if (results.overflow.length) process.exitCode = 1;
