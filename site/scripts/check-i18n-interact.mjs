// Barrido i18n de estados interactivos en /en (errores de formulario, menú móvil, compartir, visor, 404, FAB). Uso: node scripts/check-i18n-interact.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
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
  for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder']) add(el.getAttribute(a)); return [...out]; });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const bad = new Map(), note = (tag, strs) => { for (const s of strs) { const v = verdict(s); if (v.sp) bad.set(s, tag); } };
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 800, hasTouch: w < 800 });
  const page = await ctx.newPage();
  for (const path of ['/en/cotizar', '/en/contacto']) { await page.goto(base + path, { waitUntil: 'load' }); await page.waitForTimeout(800);
    const btn = page.locator('form button[type=submit]').first(); if (await btn.count()) { await btn.click({ force: true }).catch(() => {}); await page.waitForTimeout(500); }
    note(`${w} ${path} errores`, await grab(page)); }
  await page.goto(base + '/en', { waitUntil: 'load' }); await page.waitForTimeout(800);
  const menu = page.locator('.menu-toggle, [aria-label*="enu"]').first(); if (await menu.count() && w < 1100) { await menu.click().catch(() => {}); await page.waitForTimeout(500); note(`${w} menú`, await grab(page)); }
  await page.goto(base + '/en/experiencias/guatape-piedra-del-penol', { waitUntil: 'load' }); await page.waitForTimeout(900);
  for (const sel of ['button[aria-label*="hare"]', '.ta-photo, .th-photo, .gallery-feature, button[aria-label*="nlarge"]', '.tour-bar button']) { const el = page.locator(sel).first(); if (await el.count()) { await el.click({ force: true }).catch(() => {}); await page.waitForTimeout(500); note(`${w} ${sel}`, await grab(page)); await page.keyboard.press('Escape'); } }
  await page.goto(base + '/en/no-existe', { waitUntil: 'load' }); await page.waitForTimeout(500); note(`${w} 404`, await grab(page));
  await ctx.close();
}
await browser.close();
console.log('interactivos sospechosos:', bad.size); for (const [s, tag] of bad) console.log('-', s.slice(0, 160), ' [' + tag + ']');
