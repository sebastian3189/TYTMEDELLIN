// Barrido i18n: renderiza cada /en/** (y sus pares ES) desde el servidor estático y lista cadenas que siguen en español (EN) o en inglés (ES).
// Uso: node scripts/serve-static.mjs dist 4417 &  node scripts/check-i18n-sweep.mjs [es]
// Extrae texto de TODOS los nodos (incluidos los ocultos: menús, diálogos, hojas) y aria-label/alt/title/placeholder/value de botones.
import { chromium } from '@playwright/test';
import { readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', lang = process.argv[2] === 'es' ? 'es' : 'en';
const walk = (d, rel = '') => readdirSync(d).flatMap((f) => { const p = join(d, f), r = rel + '/' + f; return statSync(p).isDirectory() ? (f === 'assets' || f === 'media' ? [] : walk(p, r)) : f === 'index.html' ? [rel || '/'] : []; });
let routes = walk('dist/en', '/en').map((r) => r.replace(/\/index\.html$/, ''));
if (lang === 'es') routes = routes.map((r) => r.replace(/^\/en/, '') || '/');
routes = [...new Set(routes)].sort();
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
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const VW = Number(process.env.TYT_W || 1440), ctx = await browser.newContext({ viewport: { width: VW, height: VW < 800 ? 844 : 900 }, isMobile: VW < 800, hasTouch: VW < 800 });
const found = new Map(); let total = 0; const all = {};
for (const r of routes) {
  const page = await ctx.newPage();
  try {
    await page.goto(base + r, { waitUntil: 'load' }); await page.waitForTimeout(900);
    const strs = await page.evaluate(() => {
      const out = new Set(), add = (s) => { s = (s || '').replace(/\s+/g, ' ').trim(); if (s && s.length > 1) out.add(s); };
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) { const p = w.currentNode.parentElement; if (p && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) add(w.currentNode.nodeValue); }
      for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder],[aria-description]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder', 'aria-description']) add(el.getAttribute(a));
      for (const el of document.querySelectorAll('input[type=button],input[type=submit],option')) add(el.tagName === 'OPTION' ? el.textContent : el.value);
      add(document.title); add(document.querySelector('meta[name=description]')?.content);
      return [...out];
    });
    all[r] = strs;
    for (const s of strs) {
      total++;
      const v = verdict(s), bad = lang === 'en' ? v.sp : v.en;
      if (bad) { if (!found.has(s)) found.set(s, []); found.get(s).push(r); }
    }
  } catch (e) { console.log('ERROR', r, e.message.slice(0, 80)); }
  await page.close();
}
await browser.close();
writeFileSync(`test-results/i18n-all-${lang}-${VW}.json`, JSON.stringify(all));
const list = [...found.entries()];
writeFileSync(`test-results/i18n-sweep-${lang}-${VW}.json`, JSON.stringify(list.map(([s, rs]) => ({ s, rutas: rs.slice(0, 3), n: rs.length })), null, 1));
console.log(`${lang}: rutas ${routes.length}, cadenas ${total}, sospechosas ${list.length}`);
for (const [s, rs] of list.slice(0, 400)) console.log('-', s.slice(0, 170), '  [' + rs[0] + (rs.length > 1 ? ' +' + (rs.length - 1) : '') + ']');
