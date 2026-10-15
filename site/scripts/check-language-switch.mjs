// Prueba del BOTÓN de idioma (ES/EN) en cada ruta: carga la ruta en español, pulsa «EN», comprueba URL /en…, <html lang>, título y que NO queda español;
// navega dentro del sitio (enlace del menú) y comprueba que se mantiene en inglés; pulsa «ES» y comprueba lo contrario. También recoge errores de consola
// (incluidos desajustes de hidratación). Uso: node scripts/serve-static.mjs dist 4417 &  node scripts/check-language-switch.mjs
import { chromium } from '@playwright/test';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const walk = (d, rel = '') => readdirSync(d).flatMap((f) => { const p = join(d, f), r = rel + '/' + f; return statSync(p).isDirectory() ? (f === 'assets' || f === 'media' ? [] : walk(p, r)) : f === 'index.html' ? [rel || '/'] : []; });
const routes = [...new Set(walk('dist/en', '/en').map((r) => r.replace(/\/index\.html$/, '').replace(/^\/en/, '') || '/'))].sort().concat(['/no-existe']);
// Nombres propios y de marca que se conservan (se eliminan antes de contar palabras).
const PROPER = /Transporte (?:y|&) Turismo Medell[ií]n|Transporte Turismo Medell[ií]n|T&T Medell[ií]n|Medell[ií]n|Guatap[eé]|N[aá]poles|Pe[nñ]ol|Jard[ií]n|C[oó]rdova|Mar[ií]a|Jos[eé]|Alpujarra|Botero|Cisneros|Inflexi[oó]n|Provenza|Comuna 13|Calle de los Recuerdos|Calle de las Sombrillas|Plazoleta de los Z[oó]calos|Parque de las Luces|Plaza de la Libertad|Palacio de la Cultura|Cerro El Picacho|Cerro Nutibara|Mirador La Palma|Puente de Occidente|Santa Fe de Antioquia|San Antonio de Pereira|Salto del Buey|Alto del Chocho|Octava Maravilla|Pueblito Paisa|Valle de Aburr[aá]|El Hueco|El Tesoro|Santaf[eé]|Hacienda|Antioquia|Oriente|Colombia|Instagram|TikTok|WhatsApp|Google|Facebook|T&T|Piedra del|El Retiro|La Ceja|El Poblado|El Salvador|Echeverr[ií]a|Meo[nñ]o|G[aá]rate|S[aã]o Tom[eé]|Pr[ií]ncipe|C[oô]te d.Ivoire|Carrera 79AA|La Alpujarra|La Palma/gi;
const SP = new Set('de del la las los el un una con para por que tu tus su sus en al es se más desde sobre entre como nos te lo este esta estos estas cada hasta antes después también según sin o qué cómo hay ver noche ciudad pueblos naturaleza cuéntanos escríbenos síguenos enlaces rápidos detalle experiencia experiencias lugar forma viajar pausar imágenes toca fotografía fotografías ampliar cotizar cotización política tratamiento datos autorizo enviar solicitud por favor nuestro nuestra viaje viajes aquí donde cuando mi mis pero ya muy todo todos todas otro otra otros día días hora horas precio valor reserva reservas tarifa pasajeros pasajero vehículo vehículos conductor conductores servicio servicios nosotros contacto inicio vehículos nosotros servicios menú blog nuevo nueva abrir cerrar siguiente anterior pestaña nueva abre un golpe realidad razones visitar aprender recibir preguntas sobre elegirnos imperdibles únicos únicas palabras mejor recuerdo'.split(' '));
const EN = new Set('the and your you with from our is are this that scroll stop step photo photos optional choose quote about read view follow enlarge pending welcome skip details'.split(' '));
const verdict = (str) => {
  const words = str.replace(PROPER, ' ').toLowerCase().match(/[a-záéíóúñü]+/g) || [];
  if (/^[A-Z]{2} · /.test(str)) return { sp: false, en: false };
  if (words.length === 1) return { sp: (SP.has(words[0]) && !EN.has(words[0])) || /[áéíóúñ]/.test(words[0]) , en: false };
  if (words.length < 1) return { sp: false, en: false };
  let sp = 0, en = 0; for (const w of words) { if (SP.has(w)) sp++; if (EN.has(w)) en++; }
  const acc = /[áéíóúñ¿¡]/.test(str.replace(PROPER, ' '));
  return { sp: sp >= 1 && sp >= en || (acc && en === 0), en: en >= 1 && sp === 0 && !acc };
};

const grab = (page) => page.evaluate(() => { const out = new Set(), add = (s) => { s = (s || '').replace(/\s+/g, ' ').trim(); if (s && s.length > 1) out.add(s); };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const p = w.currentNode.parentElement; if (p && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) add(w.currentNode.nodeValue); }
  for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder']) add(el.getAttribute(a));
  add(document.title); add(document.querySelector('meta[name=description]')?.content); return [...out]; });
const ALLOW = new Set(['ES', 'Blog', 'Leer esta página en español', 'Read this page in English']);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const bad = []; let n = 0;
for (const r of routes) {
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', (e) => errs.push(e.message.slice(0, 120))); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text().slice(0, 120)); });
  try {
    await page.goto(base + r, { waitUntil: 'load' }); await page.waitForTimeout(700);
    await page.click('.language-toggle'); await page.waitForURL(/\/en(\/|$)/, { timeout: 8000 }); await page.waitForTimeout(1100); n++;
    const url = new URL(page.url()).pathname; if (url.replace(/^\/en/, '') !== (r === '/' ? '' : r) && !(r === '/' && url === '/en/')) bad.push(`${r}: URL EN inesperada ${url}`);
    const lang = await page.evaluate(() => document.documentElement.lang); if (lang !== 'en') bad.push(`${r}: html lang=${lang} en EN`);
    for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).sp) bad.push(`${r} [EN]: ${s.slice(0, 120)}`);
    // navegación interna tras cambiar el idioma (sin recarga completa del documento)
    const link = page.locator('header nav a[href*="/en/"]').nth(1); if (await link.count()) { const href = await link.getAttribute('href'); await link.click(); await page.waitForTimeout(1200);
      if (!/^\/en(\/|$)/.test(new URL(page.url()).pathname)) bad.push(`${r}: navegación interna salió de /en → ${page.url()}`);
      for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).sp) bad.push(`${r} → ${href} [EN]: ${s.slice(0, 120)}`); }
    await page.goBack().catch(() => {}); await page.waitForTimeout(600);
    await page.goto(base + (r === '/' ? '/en' : '/en' + r), { waitUntil: 'load' }); await page.waitForTimeout(600);
    await page.click('.language-toggle'); await page.waitForURL((u) => !/^\/en(\/|$)/.test(u.pathname), { timeout: 8000 }); await page.waitForTimeout(1100); n++;
    const lang2 = await page.evaluate(() => document.documentElement.lang); if (!/^es/.test(lang2)) bad.push(`${r}: html lang=${lang2} en ES`);
    for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).en) bad.push(`${r} [ES]: ${s.slice(0, 120)}`);
  } catch (e) { bad.push(`${r}: fallo ${e.message.slice(0, 100)}`); }
  if (errs.length) bad.push(`${r}: consola ${errs.slice(0, 2).join(' | ')}`);
  await page.close();
}
await browser.close();
console.log(`rutas ${routes.length}, cambios de idioma con botón ${n}, problemas ${bad.length}`); for (const b of bad.slice(0, 120)) console.log(' -', b);
