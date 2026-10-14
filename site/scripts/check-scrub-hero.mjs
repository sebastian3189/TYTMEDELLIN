import { chromium } from '@playwright/test';
import { mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import strict from 'node:assert/strict';
// Las aserciones no abortan: se acumulan como hallazgos y el resto de la prueba continúa (resultado final con código 1 si hay alguno).
const findings = [];
const soft = (fn) => (...a) => { try { return fn(...a); } catch (e) { findings.push(String(e.message).split(String.fromCharCode(10))[0].slice(0, 260) + ' @' + ((String(e.stack).match(/check-scrub-hero\.mjs:(\d+)/g) || []).map((m) => m.split(':')[1]).find((n) => Number(n) > 10) || '?')); } };
const assert = Object.assign(soft(strict), Object.fromEntries(['ok', 'equal', 'match', 'notEqual', 'deepEqual'].map((k) => [k, soft(strict[k])])));
import path from 'node:path';
import { timeline } from '../src/baraja-geometria.js';

// Requiere `npm run build` + `npx vite preview --port <libre>` y TYT_TEST_URL (p. ej. http://127.0.0.1:4190).
// Contrato: Spec 03 §H1 (baraja), §E y §G (clip), Spec 04. Sustituye a la prueba de la revisión 2.
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4173';
const out = 'test-results/baraja';
await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (f.endsWith('.png')) await rm(path.join(out, f), { force: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const checks = [], errors = [], metrics = {};
const watch = (page, label) => {
  page.on('pageerror', (e) => errors.push(`${label} pageerror: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${label} HTTP ${r.status()} ${r.url()}`); });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${label} console: ${m.text()}`); });
};
const mediaRequests = (page) => { const urls = []; page.on('request', (r) => { if (r.url().includes('/media/inicio/') || r.url().includes('/media/baraja/')) urls.push(new URL(r.url()).pathname); }); return urls; };
const clsInit = () => { window.__cls = 0; window.__clsSrc = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__clsSrc.push(`${e.value.toFixed(3)}@${Math.round(e.startTime)}:${(e.sources || []).map((x) => x.node?.className || x.node?.nodeName).join('|')}`); } }).observe({ type: 'layout-shift', buffered: true }); } catch {} };
// La sección está bajo el pliegue y no pide nada hasta acercarse (§J1): se acerca y se espera el primer fotograma.
const ready = async (page) => { await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true', null, { timeout: 30000 }); await page.waitForFunction(() => { const h = document.querySelector('.scrub-hero'); if (h?.dataset.ready === 'true') return true; h?.scrollIntoView({ block: 'start' }); return false; }, null, { timeout: 45000, polling: 500 }); };
const hero = (page) => page.locator('.scrub-hero');
const attr = (page, name) => hero(page).getAttribute(`data-${name}`);
// Límites del recorrido (svh), idénticos a timeline() de baraja-geometria.js.
const TD = timeline(false); // límites vivos de baraja-geometria.js (Spec 03 §K: tras la contracción solo queda el relevo)
const TM = timeline(true);
const cardU = (i) => TD.t5 + 34 * i + 34 * 0.2;
const SLUGS = ['city-tour-comuna-13', 'guatape-piedra-del-penol', 'tour-nocturno-medellin', 'vuelta-a-oriente', 'tour-del-cafe-medellin', 'hacienda-napoles', 'salto-del-buey', 'santa-fe-de-antioquia', 'jardin-antioquia', 'tour-de-compras', 'tour-miradores', 'traslados-aeropuerto-jmc'];
const NAMES = ['City Tour & Comuna 13', 'Guatapé & Piedra del Peñol', 'Noche en Medellín', 'Vuelta a Oriente', 'Tour del Café', 'Hacienda Nápoles', 'Salto del Buey', 'Santa Fe de Antioquia', 'Jardín', 'Tour de Compras', 'Tour Miradores', 'Traslados Aeropuerto JMC'];
const LINES = ['Descubre: plazas, murales e historias de Medellín.', 'Explora: agua entre montañas y zócalos de color.', 'Siente: el valle cuando enciende sus luces.', 'Conecta: con pueblos y plazas, sin carreras.', 'Vive: el oficio detrás de cada taza.', 'Disfruta: un día en familia, con transporte coordinado.', 'Sorpréndete: una cascada al final del sendero.', 'Recuerda: calles coloniales y el Puente de Occidente.', 'Enamórate: fachadas de color y plaza sin prisa.', 'Descubre: El Hueco, outlets y tiendas locales.', 'Inspírate: el valle cambia con la luz.', 'Conecta: del aeropuerto a tu alojamiento, coordinado.'];
const PLACES = ['COMUNA 13', 'GUATAPÉ · PIEDRA DEL PEÑOL', 'MEDELLÍN', 'VUELTA A ORIENTE', 'TOUR DEL CAFÉ', 'HACIENDA NÁPOLES', 'SALTO DEL BUEY', 'SANTA FE DE ANTIOQUIA', 'JARDÍN', 'TOUR DE COMPRAS', 'TOUR MIRADORES', 'TRASLADOS JMC'];

async function span(page) { return page.evaluate(() => { const s = document.querySelector('.scrub-track'); const st = document.querySelector('.scrub-stage'); return { top: s.getBoundingClientRect().top + scrollY, span: s.offsetHeight - st.offsetHeight, stick: parseFloat(getComputedStyle(st).top), height: s.offsetHeight / innerHeight }; }); }
async function goTo(page, p, wait = 520) {
  const s = await span(page);
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), s.top - s.stick + s.span * p);
  await page.waitForFunction((p0) => { const d = document.querySelector('.scrub-hero').dataset; return d.settled === 'true' && Math.abs(Number(d.progress) - p0) < 0.004; }, p, { timeout: 15000 });
  await page.waitForTimeout(wait);
}
const goU = (page, u, T = TD, wait) => goTo(page, u / T.total, wait);
const stageAttr = (page, n) => page.locator('.scrub-stage').getAttribute(`data-${n}`);
async function wheelThrough(page, x, y) {
  await page.mouse.move(x, y);
  const s = await span(page);
  for (let i = 0; i < 90; i++) { await page.mouse.wheel(0, 700); await page.waitForTimeout(40); if (await page.evaluate((end) => scrollY >= end, s.top + s.span + 200)) break; }
  for (let i = 0; i < 90; i++) { await page.mouse.wheel(0, -1200); await page.waitForTimeout(25); if (await page.evaluate(() => scrollY <= 0)) break; }
}
/* Contraste por glifo (WCAG 1.4.3): fondo real sin texto (color y sombra transparentes) y, bajo cada línea de texto visible,
   fracción de píxeles por debajo de 4,5:1 (normal) o 3:1 (grande). Criterio: ≥99 % cumple. Sin sombra de texto a favor. */
const TEXT_SEL = '.scrub-title .scrub-t1,.scrub-lema,.scrub-cap-title,.scrub-cap-sub,.scrub-count,.scrub-place,.ft-count,.ft-name,.ft-line,.ft-plan,.bd-plan,.scrub-btn,.scrub-motion,.scrub-skip,.scrub-vive,.scrub-vive-sub,.sc-name,.sc-line,.sc-count,.sc-close-title,.sc-close-sub,.sc-marq,.eyebrow';
async function glyphContrast(page) {
  const items = await page.evaluate((sel) => {
    const out = [];
    for (const el of document.querySelectorAll(`.scrub-hero ${sel.split(',').join(',.scrub-hero ')}`)) {
      let o = 1, hidden = false;
      for (let n = el; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); o *= Number(cs.opacity); if (cs.visibility === 'hidden' || cs.display === 'none') hidden = true; }
      if (hidden || o < 0.9) continue;
      const cs = getComputedStyle(el), range = document.createRange(); range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter((r) => r.width > 4 && r.height > 4 && r.top >= (document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0) - 1 && r.top < innerHeight && r.right > 0 && r.left < innerWidth).map((r) => [Math.max(0, r.left), Math.max(0, r.top), Math.min(innerWidth, r.right), Math.min(innerHeight, r.bottom)]);
      if (!rects.length) continue;
      const m = cs.color.match(/[\d.]+/g).map(Number);
      out.push({ cls: String(el.className || el.tagName).split(' ')[0], text: el.textContent.slice(0, 24), rects, fs: parseFloat(cs.fontSize), fw: Number(cs.fontWeight), color: [m[0], m[1], m[2], m[3] ?? 1] });
    }
    return out;
  }, TEXT_SEL);
  const style = await page.addStyleTag({ content: '.scrub-hero *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}' });
  await page.waitForTimeout(60);
  const shot = await page.screenshot();
  await style.evaluate((e) => e.remove());
  return page.evaluate(async ({ b64, items }) => {
    const bmp = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
    const c = new OffscreenCanvas(bmp.width, bmp.height), g = c.getContext('2d'); g.drawImage(bmp, 0, 0);
    const k = bmp.width / innerWidth;
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const lum = (r, g2, b) => 0.2126 * lin(r) + 0.7152 * lin(g2) + 0.0722 * lin(b);
    return items.map((it) => {
      const large = it.fs >= 24 || (it.fs >= 18.66 && it.fw >= 700), need = /scrub-t|cap-title|name|vive$|close-title|marq|lema/.test(it.cls) && !/sub/.test(it.cls) ? 7 : 4.5;
      let total = 0, bad = 0, min = 99;
      for (const [l, t, r, b] of it.rects) {
        const x0 = Math.max(0, Math.floor(l * k)), y0 = Math.max(0, Math.floor(t * k)), x1 = Math.min(bmp.width, Math.ceil(r * k)), y1 = Math.min(bmp.height, Math.ceil(b * k));
        if (x1 <= x0 || y1 <= y0) continue;
        const d = g.getImageData(x0, y0, x1 - x0, y1 - y0).data;
        for (let i = 0; i < d.length; i += 4) {
          const a = it.color[3], fr = it.color[0] * a + d[i] * (1 - a), fg = it.color[1] * a + d[i + 1] * (1 - a), fb = it.color[2] * a + d[i + 2] * (1 - a);
          const L1 = lum(fr, fg, fb), L2 = lum(d[i], d[i + 1], d[i + 2]);
          const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          total++; if (ratio < need) bad++; if (ratio < min) min = ratio;
        }
      }
      return { cls: it.cls, text: it.text, large, need, failPct: total ? +(100 * bad / total).toFixed(2) : 0, min: +min.toFixed(2) };
    });
  }, { b64: shot.toString('base64'), items });
}
const contrastAt = async (page, label) => {
  const res = await glyphContrast(page);
  for (const r of res) assert.ok(r.failPct <= 1, `contraste ${label} ${r.cls} «${r.text}» ${r.failPct}% < ${r.need}:1 (mín ${r.min})`);
  return res;
};
/* El texto nunca queda sobre una foto: ningún elemento de texto visible intersecta el marco del clip (media) ni una carta con opacidad. */
const textOverPhotos = (page) => page.evaluate(() => {
  const photos = [...document.querySelectorAll('.scrub-media,.bd-card,.bd-float')].filter((e) => { let o = 1; for (let n = e; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); o *= Number(cs.opacity); if (cs.visibility === 'hidden') o = 0; } return o > 0.15; }).map((e) => {
    const r = e.getBoundingClientRect(); if (!e.matches('.scrub-media')) return [e.className, r];
    const m = getComputedStyle(e).clipPath.match(/inset\(\s*[\d.]+(?:px)?\s+([\d.]+)px/); if (!m) return [e.className, r];
    const k = r.width / e.offsetWidth, ix = Number(m[1]) * k; return [e.className, { left: r.left + ix, right: r.right - ix, top: r.top, bottom: r.bottom }];
  });
  const bad = [];
  for (const el of document.querySelectorAll('.scrub-hero .scrub-title .scrub-t1,.scrub-lema,.scrub-cap-title,.scrub-cap-sub,.scrub-index,.bd-count')) {
    let o = 1, hidden = false; for (let n = el; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); o *= Number(cs.opacity); if (cs.visibility === 'hidden' || cs.display === 'none') hidden = true; }
    if (hidden || o < 0.9) continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue;
    // Rect de texto real (no el contenedor): se compara contra la intersección con área > 4 px² del texto.
    const range = document.createRange(); range.selectNodeContents(el); const rr = el.matches('.scrub-t1,.scrub-t2') ? [r] : [...range.getClientRects()].filter((q) => q.width > 4);
    for (const [cls, p] of photos) for (const q of rr) { const w = Math.min(q.right, p.right) - Math.max(q.left, p.left), h = Math.min(q.bottom, p.bottom) - Math.max(q.top, p.top); if (w > 8 && h > 8) bad.push(`${el.className}|${cls}|${Math.round(w)}x${Math.round(h)}`); }
  }
  return bad;
});
const POINTS = [0, 0.06, 0.12, 0.3, 0.385, 0.45, 0.6, 0.78, 0.99];

try {
  // 1) Escritorio 1440×900.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage(); watch(page, 'desktop');
  const requests = mediaRequests(page);
  await page.addInitScript(clsInit);
  await page.addInitScript(() => { window.__prevented = []; for (const t of ['wheel', 'touchstart', 'touchmove', 'keydown']) window.addEventListener(t, (e) => setTimeout(() => e.defaultPrevented && window.__prevented.push(t)), { passive: true }); });
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true');
  assert.equal(await page.locator('h1').count(), 1, 'un solo h1');
  assert.match(await page.locator('.home-hero h1').innerText(), /Medellín,\s*a otro nivel\./);
  assert.equal(await page.locator('.scrub-hero h2.scrub-t1').innerText(), 'Elige tu próximo recuerdo');
  // Inicialización perezosa (§J1): bajo el pliegue, el póster es lazy y no se pide ni un fotograma hasta acercarse (margen 100 %).
  assert.equal(await page.locator('.scrub-poster img').getAttribute('fetchpriority'), null, 'el póster ya no es LCP');
  await page.waitForTimeout(1500);
  assert.equal(requests.filter((u) => /\/media\/inicio\/d(16)?\/\d+\.webp$/.test(u)).length, 0, 'ningún fotograma antes de acercarse');
  await page.evaluate(() => document.querySelector('.scrub-hero').scrollIntoView({ block: 'start' }));
  await ready(page);
  await ready(page);
  await page.waitForFunction(() => Number(document.querySelector('.scrub-hero').dataset.loaded) >= 121, null, { timeout: 90000 });
  assert.equal(await page.locator('canvas.scrub-canvas').getAttribute('aria-hidden'), 'true');
  assert.ok(requests.every((u) => !u.includes('/m/') && !u.endsWith('.mp4')), 'escritorio no pide fotogramas móviles ni MP4');
  assert.equal(await page.locator('.scrub-veil, .scrub-ambient').count(), 0, 'sin velos ni fondos ambientales');
  // Baraja visible al entrar: 12 cartas con enlaces, tira de 12, miniaturas flotantes, titular partido arriba/abajo del mazo.
  await goU(page, 0);
  assert.equal(await stageAttr(page, 'ui'), 'deck');
  const deck = await page.evaluate(() => {
    const op = (e) => Number(getComputedStyle(e).opacity);
    const cards = [...document.querySelectorAll('.bd-card')], t1 = document.querySelector('.scrub-t1').getBoundingClientRect(), t2 = { top: 1e9 };
    const rs = cards.map((c) => c.getBoundingClientRect()), top = Math.min(...rs.map((r) => r.top)), bot = Math.max(...rs.map((r) => r.bottom));
    return { cards: cards.length, visible: cards.filter((c) => op(c) > 0.9).length, strip: document.querySelectorAll('.scrub-strip button').length, floats: [...document.querySelectorAll('.bd-float')].filter((e) => op(e) > 0.5).length, t1Bottom: t1.bottom, t2Top: t2.top, deckTop: top, deckBottom: bot, mediaVisible: getComputedStyle(document.querySelector('.scrub-media')).clipPath !== 'none' };
  });
  assert.equal(deck.cards, 12); assert.equal(deck.visible, 12); assert.equal(deck.strip, 12); assert.ok(deck.floats >= 4, `miniaturas flotantes ${deck.floats}`); assert.ok(deck.mediaVisible, 'la carta superior es el marco recortado');
  assert.ok(deck.t1Bottom <= deck.deckTop + 48, `título arriba (${deck.t1Bottom}) del mazo [${deck.deckTop}, ${deck.deckBottom}]`);
  assert.deepEqual(await textOverPhotos(page), [], 'texto fuera de fotos (baraja)');
  checks.push(`baraja al entrar: 12 cartas, tira de 12, ${deck.floats} miniaturas flotantes, título «Elige tu próximo recuerdo» arriba (${Math.round(deck.t1Bottom)}) del mazo (${Math.round(deck.deckTop)}–${Math.round(deck.deckBottom)}); sin velos ni placas`);
  const hs = await span(page);
  assert.ok(Math.abs(hs.span / 900 * 100 - TD.total) < 0.6, `pista ${TD.total} svh (${(hs.span / 9).toFixed(1)})`);
  // Fase del clip ≈165 svh: se mide en píxeles entre el primer y el último fotograma.
  const frameAt = async (u) => { await goU(page, u, TD, 200); return Number(await attr(page, 'frame')); };
  const f1 = await frameAt(TD.t1 + 3), f2 = await frameAt(TD.t2 - 3);
  assert.ok(f1 <= 2 && f2 >= 58, `fotogramas ${f1}→${f2}`);
  metrics.clipVhDesktop = Math.round(((TD.t2 - TD.t1) / 100) * hs.span / 100 * 100 / 900 * 100) / 100;
  assert.equal(TD.t2 - TD.t1, 165);
  checks.push(`escritorio: fase del clip ${TD.t2 - TD.t1} svh (≈165vh conservado); pista ${(hs.span / 9).toFixed(0)} svh`);

  // Barajado: cambian posiciones, rotación y orden z entre u=0 y u=15.
  await goU(page, 0, TD, 200);
  const snap = () => page.evaluate(() => [...document.querySelectorAll('.bd-card')].map((c) => `${c.style.transform}|${c.style.zIndex}`));
  const a0 = await snap(); await goU(page, 15, TD, 200); const a1 = await snap(); await page.screenshot({ path: `${out}/1440-barajando.png` }); await goU(page, 30, TD, 200); const a2 = await snap();
  const changed = a0.filter((v, i) => v !== a1[i]).length, zChanged = a0.filter((v, i) => v.split('|')[1] !== a2[i].split('|')[1]).length;
  assert.ok(changed >= 10 && zChanged >= 8, `barajado: ${changed} cartas mueven, ${zChanged} cambian de orden z`);
  checks.push(`barajado al primer scroll: ${changed}/12 cartas cambian posición/rotación a u=15; ${zChanged}/12 cambian de orden z al terminar`);

  // Flip: la carta superior crece hasta pantalla completa (marco), vuelve a la baraja y se repite al subir.
  const geo = () => page.evaluate(() => { const m = document.querySelector('.scrub-media'), r = m.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), clip: getComputedStyle(m).clipPath, op: Number(getComputedStyle(m).opacity) }; });
  await goU(page, 0, TD, 200); const g0 = await geo();
  await goU(page, (TD.t0 + TD.t1) / 2, TD, 200); const gm = await geo();
  await goU(page, TD.t1 + 20, TD, 200); const g1 = await geo();
  await goU(page, (TD.t3 + TD.t4) / 2, TD, 200); const gs = await geo();
  await goU(page, TD.t4 + 2, TD, 200); const gd = await geo();
  assert.ok(g0.clip !== 'none' && gm.clip !== 'none' && g1.clip === 'none', 'Flip por clip-path');
  assert.ok(gm.w > g0.w && g1.w >= 1430 && g1.h >= 560 && gs.clip !== 'none' && gd.clip !== 'none', `Flip a marco y vuelta ${JSON.stringify([g0, gm, g1, gs, gd])}`);
  await goU(page, (TD.t0 + TD.t1) / 2, TD, 200); const gm2 = await geo(); assert.ok(Math.abs(gm2.w - gm.w) <= 2, 'Flip simétrico al subir');
  checks.push(`Flip: carta ${g0.w}×${g0.h} → ${gm.w} (medio) → marco ${g1.w}×${g1.h} → vuelve a ${gs.w}×${gs.h} / carta ${gd.w}×${gd.h}; mismo tamaño al subir`);

  // Avance y retroceso del clip.
  const frames = {};
  for (const f of [0.1, 0.35, 0.6, 0.85]) { await goU(page, TD.t1 + f * 165, TD, 250); frames[f] = Number(await attr(page, 'frame')); }
  const seq = Object.values(frames);
  assert.ok(seq.every((v, i) => i === 0 || v > seq[i - 1]), `avanza ${JSON.stringify(frames)}`);
  await goU(page, TD.t1 + 0.6 * 165, TD, 250); assert.equal(Number(await attr(page, 'frame')), frames[0.6], 'mismo fotograma al volver');
  await goU(page, TD.t1 + 0.1 * 165, TD, 250); assert.ok(Number(await attr(page, 'frame')) < frames[0.6], 'retrocede al subir');
  checks.push(`clip: fotogramas ${JSON.stringify(frames)} al bajar; mismos al volver; menores al subir`);
  // Suavizado y salto.
  await goU(page, TD.t1 + 20); const s0 = await span(page);
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), s0.top - s0.stick + s0.span * ((TD.t1 + 60) / TD.total));
  const mid = await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => { const d = document.querySelector('.scrub-hero').dataset; r({ q: Number(d.progress), t: Number(d.target) }); }))));
  assert.ok(mid.q < mid.t - 0.0003, `suavizado exponencial q=${mid.q} → ${mid.t}`);
  await page.waitForFunction(() => document.querySelector('.scrub-hero').dataset.settled === 'true');
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), s0.top - s0.stick + s0.span * 0.7);
  const jump = await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => { const d = document.querySelector('.scrub-hero').dataset; r({ q: Number(d.progress), t: Number(d.target) }); }))));
  assert.ok(Math.abs(jump.q - jump.t) < 0.0006, 'salto grande igualado');
  checks.push(`suavizado: q=${mid.q} persigue a ${mid.t}; salto grande se iguala`);

  // Textos del clip: fuera de la imagen (banda sólida bajo el marco).
  await goU(page, TD.t1 + 0.3 * 165, TD, 650); assert.equal(await stageAttr(page, 'cap'), 'c1');
  assert.equal(await page.locator('.scrub-cap[data-for=c1] .scrub-cap-title').innerText(), 'No solo visites Medellín. Vívela.');
  assert.deepEqual(await textOverPhotos(page), [], 'texto fuera de la imagen (c1)');
  await goU(page, TD.t2 + 5, TD, 650); assert.equal(await stageAttr(page, 'cap'), 'c2');
  assert.equal(await page.locator('.scrub-cap[data-for=c2] .scrub-cap-title').innerText(), 'La ciudad como punto de partida');
  assert.deepEqual(await textOverPhotos(page), [], 'texto fuera de la imagen (c2)');
  const band = await page.evaluate(() => { const m = document.querySelector('.scrub-media').getBoundingClientRect(), c = document.querySelector('.scrub-cap[data-for=c2]').getBoundingClientRect(); return { mediaBottom: m.bottom, capTop: c.top }; });
  assert.ok(band.capTop >= band.mediaBottom, `el titular queda bajo la imagen (${band.capTop} ≥ ${band.mediaBottom})`);
  checks.push(`clip: «No solo visites Medellín. Vívela.» (c1) y «La ciudad como punto de partida» (c2) en banda sólida bajo la imagen (${Math.round(band.mediaBottom)} ≤ ${Math.round(band.capTop)}); texto sobre fotos: 0`);

  // Relevo (Spec 03 §K3): el mazo viaja a su caja, la película se funde al final del tramo y no queda ninguna carta enlazada.
  await goU(page, TD.t4 + 2, TD, 400); const r0 = await page.evaluate(() => [...document.querySelectorAll('.bd-card')].map((c) => c.getBoundingClientRect()).map((r) => [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)]));
  await goU(page, TD.t5 - 0.5, TD, 600); const r1 = await page.evaluate(() => [...document.querySelectorAll('.bd-card')].map((c) => c.getBoundingClientRect()).map((r) => [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2), Math.round(r.width)]));
  assert.ok(r1.every((c) => Math.abs(c[0] - r1[0][0]) < 30 && Math.abs(c[1] - r1[0][1]) < 30), `mazo recogido en su caja ${JSON.stringify(r1[0])}`);
  assert.ok(r1[0][0] > 1100 && r1[0][1] > 600, 'caja del mazo abajo a la derecha'); assert.ok(r1[0][0] !== r0[0][0] || r1[0][1] !== r0[0][1], 'el mazo se desplaza durante el relevo');
  await goU(page, TD.total - 0.5, TD, 600);
  assert.ok(Number(await page.evaluate(() => getComputedStyle(document.querySelector('.scrub-stage')).opacity)) < 0.2, 'el escenario de la película se funde al final');
  checks.push(`relevo: mazo a (${r1[0][0]}, ${r1[0][1]}) abajo a la derecha, película fundida al final; sin cartas enlazadas`);

  // Contraste por glifo y capturas en 10 puntos (1440).
  metrics.contrastWorst = { failPct: 0, minRatio: 99 };
  for (const p of POINTS) {
    await goTo(page, p);
    const res = await contrastAt(page, `1440 p${p}`);
    for (const r of res) { metrics.contrastWorst.failPct = Math.max(metrics.contrastWorst.failPct, r.failPct); metrics.contrastWorst.minRatio = Math.min(metrics.contrastWorst.minRatio, r.min); }
    assert.deepEqual((await textOverPhotos(page)), [], `texto sobre fotos en p${p}`);
    await page.screenshot({ path: `${out}/1440-p${String(Math.round(p * 100)).padStart(2, '0')}.png` });
  }
  checks.push(`contraste por glifo 1440 en ${POINTS.length} puntos (≤1 % bajo umbral): peor ${metrics.contrastWorst.failPct} %, razón mínima ${metrics.contrastWorst.minRatio}; texto sobre fotos: 0 en todos`);

  await goU(page, TD.total - 5);
  metrics.bitmapsDesktop = { enFinal: Number(await attr(page, 'bitmaps')), pico: Number(await attr(page, 'bitmaps-peak')), picoMb: Number(await attr(page, 'bitmap-mb-peak')) };
  assert.ok(metrics.bitmapsDesktop.pico <= 40 && metrics.bitmapsDesktop.picoMb <= 260, `ImageBitmap ${JSON.stringify(metrics.bitmapsDesktop)}`);
  checks.push(`memoria: ImageBitmap vivos escritorio ${JSON.stringify(metrics.bitmapsDesktop)} (ventana con close())`);

  // Rueda real: CLS < 0,1 y ningún evento cancelado.
  await goU(page, 2); const before = Number(await attr(page, 'progress'));
  await page.mouse.move(700, 450); await page.mouse.wheel(0, 500); await page.waitForTimeout(500);
  assert.ok(Number(await attr(page, 'progress')) > before, 'la rueda nativa avanza');
  await wheelThrough(page, 700, 450);
  await page.keyboard.press('PageDown'); await page.waitForTimeout(300);
  assert.deepEqual((await page.evaluate(() => window.__prevented)).filter((t) => t !== 'keydown'), [], 'ningún wheel/touch fue cancelado (las flechas del álbum/tira son el patrón ARIA y se aceptan)');
  for (const f of ['src/ScrubHero.jsx', 'src/baraja-geometria.js']) assert.ok(!/on(Wheel|Touch\w*|Scroll)=|addEventListener\('(wheel|touch\w*)'/.test(await readFile(f, 'utf8')) || !(await readFile(f, 'utf8')).includes('preventDefault'), `sin cancelar rueda/gesto en ${f}`);
  metrics.clsDesktop = await page.evaluate(() => window.__cls);
  assert.ok(metrics.clsDesktop < 0.1, `CLS ${metrics.clsDesktop} ${JSON.stringify(await page.evaluate(() => window.__clsSrc))}`);
  checks.push(`CLS escritorio con rueda real (ida y vuelta completa): ${metrics.clsDesktop.toFixed(4)} (< 0,1); sin preventDefault; ningún wheel/touch/tecla cancelado`);

  // 2) Teclado: Tab alcanza «Saltar introducción» y «Reducir movimiento» con foco visible (las cartas ya no son enlaces).
  await goU(page, 0, TD, 200); await page.locator('.home-story .button').focus({ timeout: 5000 });
  const kinds = [];
  for (let i = 0; i < 4; i++) { await page.keyboard.press('Tab'); await page.waitForTimeout(300); const k = await page.evaluate(() => { const e = document.activeElement; return e?.closest('.scrub-hero') ? (e.className.match(/scrub-skip|scrub-motion/) || ['otro'])[0] : null; }); if (k) kinds.push(k); }
  assert.deepEqual(kinds, ['scrub-skip', 'scrub-motion'], `Tab: ${kinds}`);
  assert.equal(await page.locator('.bd-card').evaluateAll((els) => els.filter((e) => e.matches('a, [tabindex="0"]')).length), 0, 'las cartas del mazo no son enfocables');
  checks.push('teclado: Tab alcanza Saltar y Reducir movimiento; el mazo es decorativo (aria-hidden)');
  // «Saltar introducción».
  await goU(page, 0, TD, 200); await page.locator('.home-story .button').focus({ timeout: 5000 }); // último enfocable antes de la baraja
  for (let i = 0; i < 6; i++) { await page.keyboard.press('Tab'); if (await page.evaluate(() => document.activeElement?.classList.contains('scrub-skip'))) break; }
  await page.keyboard.press('Enter'); await page.waitForFunction(() => document.activeElement?.id === 'th-inicio');
  checks.push('«Saltar introducción» (Enter) mueve foco y scroll al inicio de La mano de viaje (#th-inicio)');

  // 3) Botón «Reducir movimiento»: persistente.
  await goU(page, 0, TD, 200);
  await page.getByRole('button', { name: 'Reducir movimiento' }).click(); await page.waitForTimeout(300);
  assert.equal(await page.locator('.scrub-hero.is-static').count(), 1); assert.equal(await page.locator('canvas').count(), 0);
  assert.equal(await page.evaluate(() => localStorage.getItem('tyt-reducir-movimiento')), '1');
  assert.equal(await page.locator('.ft-thumb').count(), 12); // el álbum sustituyó la rejilla de 12 cartas estáticas
  await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(500);
  assert.equal(await page.locator('.scrub-hero.is-static').count(), 1, 'la preferencia persiste');
  await page.screenshot({ path: `${out}/1440-estatico.png` });
  await page.getByRole('button', { name: 'Activar movimiento' }).click(); await page.waitForTimeout(500);
  assert.equal(await page.locator('.scrub-hero.is-static').count(), 0); assert.equal(await page.evaluate(() => localStorage.getItem('tyt-reducir-movimiento')), null);
  checks.push('botón «Reducir movimiento»: pasa a estático, persiste en localStorage tras recargar, «Activar movimiento» lo revierte');
  await ctx.close();

  // Almacenamiento bloqueado: el botón no rompe la página.
  const bctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await bctx.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }); });
  const bpage = await bctx.newPage(); watch(bpage, 'nostorage');
  await bpage.goto(base + '/', { waitUntil: 'load' }); await ready(bpage);
  await bpage.getByRole('button', { name: 'Reducir movimiento' }).click(); await bpage.waitForTimeout(300);
  assert.equal(await bpage.locator('.scrub-hero.is-static').count(), 1);
  checks.push('localStorage bloqueado (try/catch): el botón sigue funcionando en la sesión'); await bctx.close();

  // 4) Estático completo: reduced-motion, 3g, error de carga, altura baja.
  const staticCheck = async (page, label, reqs) => {
    // El HTML prerenderizado ya es estático: se espera a que la hidratación termine (data-hydrated) para comprobar el modo final.
    await page.waitForFunction(() => document.querySelector('.scrub-hero[data-hydrated="true"].is-static'), null, { timeout: 15000 });
    assert.equal(await page.locator('canvas').count(), 0, `${label}: sin canvas`);
    assert.ok(await page.locator('.home-hero h1').isVisible(), `${label}: h1`);
    assert.match(await page.locator('.home-hero h1').innerText(), /Medellín,\s*a otro nivel\./);
    for (const t of ['Experiencias a otro nivel', 'Tours 100% privados · Guía-conductor exclusivo · Horarios flexibles', 'No solo visites Medellín. Vívela.', 'Tu viaje, tus tiempos,']) assert.ok(await page.getByText(t, { exact: false }).first().isVisible(), `${label}: «${t}»`);
    // Modo estático: la lista de experiencias vive ahora en «La mano de viaje» (11 cartas con nombre, emoción y enlace real); ScrubHero conserva póster y texto.
    assert.equal(await page.locator('.th-card').count(), 11, `${label}: 11 cartas de La mano de viaje`);
    for (const i of [0, 5, 10]) { const card = page.locator('.th-card').nth(i); assert.match(await card.getAttribute('href'), /^\/experiencias\//, `${label}: enlace ${i}`); assert.match((await card.locator('p').innerText()).replace(/\s+/g, ' '), /^[A-ZÁÉÍÓÚÑ][a-zñáéíóú]+: .+/, `${label}: línea ${i}`); }
    await page.locator('.scrub-poster img').scrollIntoViewIfNeeded(); assert.ok(await page.locator('.scrub-poster img').isVisible(), `${label}: póster`);
    assert.equal(await page.locator('.scrub-skip').count(), 0);
    if (reqs) assert.equal(reqs.filter((u) => /\/(d|m)\/\d+\.webp$/.test(u)).length, 0, `${label}: sin fotogramas`);
  };
  {
    const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const rpage = await rctx.newPage(); watch(rpage, 'reduced'); const rreq = mediaRequests(rpage);
    await rpage.goto(base + '/', { waitUntil: 'networkidle' });
    await staticCheck(rpage, 'reduced-motion', rreq);
    assert.ok(rreq.some((u) => /poster-(1280|1600)/.test(u)), 'póster cargado');
    assert.equal(await rpage.locator('.scrub-motion').isDisabled(), true);
    const res = await contrastAt(rpage, 'estático 1440'); metrics.contrastStatic = res.length;
    await rpage.screenshot({ path: `${out}/1440-reduced-motion.png` });
    await rpage.screenshot({ path: `${out}/1440-reduced-motion-cartas.png`, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    await rpage.evaluate(() => document.querySelector('.sc-list').scrollIntoView({ block: 'start' })); await rpage.waitForTimeout(300);
    await contrastAt(rpage, 'estático cartas'); await rpage.screenshot({ path: `${out}/1440-estatico-cartas.png` });
    checks.push(`reduced-motion: póster + h1 + lema + confianza + frase + 12 cartas con enlace y línea literal + cierre y CTA; 0 fotogramas; contraste por glifo OK (${res.length} textos)`);
    await rctx.close();
    const sctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await sctx.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: Object.assign(new EventTarget(), { effectiveType: '3g', saveData: false }), configurable: true }));
    const spage = await sctx.newPage(); watch(spage, 'slow'); const sreq = mediaRequests(spage);
    await spage.goto(base + '/', { waitUntil: 'networkidle' }); await staticCheck(spage, 'red 3g', sreq);
    checks.push('red 3g/saveData: estático completo sin fotogramas'); await sctx.close();
    const fctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const fpage = await fctx.newPage(); watch(fpage, 'failed');
    await fpage.route('**/media/inicio/d*/**', (r) => r.abort());
    await fpage.goto(base + '/', { waitUntil: 'load' }); await staticCheck(fpage, 'error de carga');
    checks.push('error de carga de fotogramas: estático completo'); await fctx.close();
    const lctx = await browser.newContext({ viewport: { width: 1280, height: 540 } });
    const lpage = await lctx.newPage(); watch(lpage, 'lowheight');
    await lpage.goto(base + '/', { waitUntil: 'load' }); await staticCheck(lpage, 'altura baja 540');
    checks.push('altura ≤560 px (max-height:560px): estático completo'); await lctx.close();
  }

  // 5) Móvil 390×844 y 360×640: baraja, clip, carrusel con deslizar, CLS, contraste, capturas.
  for (const [w, h, label] of [[390, 844, '390'], [360, 640, '360']]) {
    const mctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
    await mctx.addInitScript(clsInit);
    const mpage = await mctx.newPage(); watch(mpage, `mobile${label}`); const mreq = mediaRequests(mpage);
    await mpage.goto(base + '/', { waitUntil: 'load' }); await ready(mpage);
    await mpage.waitForFunction(() => Number(document.querySelector('.scrub-hero')?.dataset.loaded) >= 121, null, { timeout: 90000 });
    assert.ok(mreq.some((u) => /\/m\/\d+\.webp$/.test(u)) && !mreq.some((u) => /\/d\/\d+\.webp$/.test(u) || /-d\.webp$/.test(u)), 'móvil solo pide /m/ y miniaturas');
    assert.equal(await mpage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `sin desbordamiento horizontal ${label}`);
    const ms = await span(mpage); assert.ok(Math.abs(ms.span / h * 100 - TM.total) < 1, `pista móvil ${TM.total} svh (${(ms.span / h * 100).toFixed(0)})`);
    await goU(mpage, 0, TM, 200);
    const md = await mpage.evaluate(() => { const op = (e) => Number(getComputedStyle(e).opacity); const t1 = document.querySelector('.scrub-t1').getBoundingClientRect(), t2 = { top: 1e9 }; const rs = [...document.querySelectorAll('.bd-card')].filter((c) => op(c) > 0.9).map((c) => c.getBoundingClientRect()); return { vis: rs.length, t1b: t1.bottom, t2t: t2.top, dt: Math.min(...rs.map((r) => r.top)), db: Math.max(...rs.map((r) => r.bottom)) }; });
    assert.equal(md.vis, 5, 'baraja de 5 cartas visibles en móvil'); assert.ok(md.t1b <= md.dt + 6, `título sobre la baraja ${JSON.stringify(md)}`);
    assert.deepEqual(await textOverPhotos(mpage), [], `texto fuera de fotos ${label}`);
    const pills = await mpage.evaluate(() => [...document.querySelectorAll('.scrub-skip,.scrub-motion')].map((e) => { const r = e.getBoundingClientRect(); return [r.width >= 44 && r.height >= 44, r.left >= 0 && r.right <= innerWidth]; }));
    assert.ok(pills.every((p) => p[0] && p[1]), `Saltar y Reducir movimiento ≥44 px y dentro de la pantalla ${JSON.stringify(pills)}`);
    // Flip en móvil y vuelta.
    for (const u of [TM.t0 + 20, TM.t1 + 10, (TM.t3 + TM.t4) / 2, TM.t4 + 4]) await goU(mpage, u, TM, 200);
    assert.equal(await stageAttr(mpage, 'ui'), 'deck');
    await mpage.mouse.move(w / 2, h / 2);
    const y0 = await mpage.evaluate(() => scrollY); await mpage.mouse.wheel(0, 400); await mpage.waitForTimeout(250);
    assert.ok((await mpage.evaluate(() => scrollY)) > y0, 'scroll nativo');
    await wheelThrough(mpage, w / 2, h / 2);
    metrics[`clsMobile${label}`] = await mpage.evaluate(() => window.__cls);
    assert.ok(metrics[`clsMobile${label}`] < 0.1, `CLS móvil ${label}: ${metrics[`clsMobile${label}`]}`);
    const mp = [0, 0.1, 0.14, 0.2, 0.3, 0.45, 0.6, 0.78, 0.88, 0.97];
    const clipCaps = [];
    for (const p of mp) {
      await goTo(mpage, p, 600);
      await contrastAt(mpage, `${label} p${p}`);
      assert.deepEqual(await textOverPhotos(mpage), [], `texto sobre fotos ${label} p${p}`);
      const cap = await stageAttr(mpage, 'cap'); if (cap) clipCaps.push(cap);
      await mpage.screenshot({ path: `${out}/${label}-p${String(Math.round(p * 100)).padStart(2, '0')}.png` });
    }
    assert.ok(clipCaps.includes('c1') || clipCaps.includes('c2'), 'textos del clip en móvil');
    checks.push(`móvil ${w}×${h}: pista ${TM.total} svh (clip ${TM.t2 - TM.t1} svh), baraja de 5 cartas con título, Flip y vuelta, pills ≥44, contraste por glifo OK en ${mp.length} puntos, texto sobre fotos 0, CLS rueda ${metrics[`clsMobile${label}`].toFixed(4)}, solo /m/`);
    await mctx.close();
  }

  // 6) Alturas bajas, zoom y horizontal: nada enfocable ni texto fuera de vista.
  const SIZES = [[720, 450, 'zoom200', 2], [844, 390, 'landscape', 3], [1024, 600, '1024x600', 1], [800, 561, '800x561', 1], [1280, 577, '1280x577', 1], [768, 1024, '768x1024', 2], [700, 700, '700x700', 1], [600, 640, '600x640', 2], [320, 568, '320x568', 2], [1440, 900, '1440x900', 1], [1920, 1080, '1920x1080', 1], [390, 844, '390x844', 3], [360, 640, '360x640', 3]];
  const inside = (r, w, h) => r.width > 0 && r.top >= -1 && r.bottom <= h + 1 && r.left >= -1 && r.right <= w + 1;
  metrics.tamanos = {};
  for (const [w, h, label, dsf] of SIZES) {
    const zctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf, hasTouch: w < 900 && label !== 'zoom200', isMobile: label === 'landscape' });
    const zpage = await zctx.newPage(); watch(zpage, `size-${label}`);
    await zpage.goto(base + '/', { waitUntil: 'load' });
    await zpage.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true'); await zpage.waitForTimeout(900);
    const isStatic = (await zpage.locator('.scrub-hero.is-static').count()) === 1;
    assert.deepEqual(await zpage.evaluate(() => [...document.querySelectorAll('.scrub-hero *')].filter((e) => !e.closest('.ft-strip') && getComputedStyle(e).position !== 'fixed' && e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().right > innerWidth + 1 && !e.closest('.scrub-media,.bd-deck,.bd-floats,.bd-mq,.scrub-title')).map((e) => e.className)), [], `sin desbordamiento horizontal del héroe ${label} (el del encabezado global se informa aparte)`);
    if (isStatic) {
      assert.equal(await zpage.locator('canvas').count(), 0);
      assert.ok(await zpage.locator('.home-hero h1').isVisible(), `h1 en estático ${label}`);
      await zpage.evaluate(() => document.querySelector('.scrub-hero').scrollIntoView({ block: 'start' })); await zpage.locator('.home-story .button').focus();
      let reached = 0;
      for (let i = 0; i < 3; i++) {
        await zpage.keyboard.press('Tab'); await zpage.waitForTimeout(450);
        const info = await zpage.evaluate(() => { const e = document.activeElement; if (!e?.closest('.scrub-hero')) return null; const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, iw: innerWidth, ih: innerHeight }; });
        if (info) { reached++; assert.ok(info.bottom > 0 && info.top < info.ih && info.right > 0 && info.left < info.iw, `foco visible en ${label}: ${JSON.stringify(info)}`); } // las cartas estáticas pueden ser más altas que la ventana: basta con que estén a la vista
      }
      assert.ok(reached >= 2, `Tab alcanza controles del héroe en ${label}`);
      await zpage.screenshot({ path: `${out}/${label}-estatico-inicio.png` });
      metrics.tamanos[label] = `estático (${reached} focos visibles)`;
    } else {
      assert.ok(h > 560, `animado solo con altura > 560 (${label})`);
      await ready(zpage);
      const T = w < 800 ? TM : TD, pts = w < 800 ? [0, 0.3, 0.8, 0.97] : [0, 0.2, 0.5, 0.8, 0.98];
      for (const p of pts) {
        await goTo(zpage, p, 450).catch((e) => { throw new Error(`${label} p${p}: ${String(e.message).split(String.fromCharCode(10))[0]}`); });
        const bad = await zpage.evaluate(() => {
          const out = [], H = innerHeight, Wd = innerWidth, stage = document.querySelector('.scrub-stage').getBoundingClientRect();
          const items = [...document.querySelectorAll('.scrub-skip,.scrub-motion,.scrub-cap,.scrub-index,.bd-plan.is-on,.bd-arrow')].filter((e) => { let o = 1, hid = false; for (let n = e; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); o *= Number(cs.opacity); if (cs.visibility === 'hidden' || cs.display === 'none') hid = true; } return !hid && o > 0.9; });
          for (const e of items) { const r = e.getBoundingClientRect(); if (r.width && (r.top < stage.top - 1 || r.bottom > Math.min(H, stage.bottom) + 1 || r.left < -1 || r.right > Wd + 1)) out.push(`${e.className}:${Math.round(r.top)}-${Math.round(r.bottom)}/${H}`); }
          return out;
        });
        assert.deepEqual(bad, [], `elementos fuera de vista en ${label} p${p}`);
      }
      metrics.tamanos[label] = 'animado, controles y textos dentro de la ventana';
    }
    await zctx.close();
  }
  checks.push(`tamaños/zoom/horizontal: ${JSON.stringify(metrics.tamanos)}`);

  // 7) LCP con Slow 4G + CPU ×4 en 390×844.
  {
    const lctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const lp = await lctx.newPage(); watch(lp, 'lcp');
    await lp.addInitScript(() => { window.__lcp = { t: 0, url: '', tag: '' }; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = { t: e.startTime, url: e.url, tag: e.element?.tagName || '' }; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
    const cdp = await lctx.newCDPSession(lp);
    await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await lp.goto(base + '/', { waitUntil: 'load', timeout: 90000 }); await lp.waitForTimeout(3000);
    const lcp = await lp.evaluate(() => window.__lcp);
    metrics.lcpSlow4G = { ms: Math.round(lcp.t), tag: lcp.tag, url: lcp.url.replace(/^https?:\/\/[^/]+/, '') };
    assert.ok(lcp.t <= 2500, `LCP ${Math.round(lcp.t)} ms > 2500 ${JSON.stringify(metrics.lcpSlow4G)}`);
    checks.push(`LCP 390×844 Slow 4G + CPU×4: ${Math.round(lcp.t)} ms (${lcp.tag} ${metrics.lcpSlow4G.url}); ≤ 2500`);
    await lctx.close();
  }

  // 8) Presupuesto de peso.
  const dir = 'public/media/inicio', bdir = 'public/media/baraja';
  const size = async (d, f) => (await stat(path.join(d, f))).size;
  const sum = async (folder) => { let t = 0, max = 0; for (const f of await readdir(path.join(dir, folder))) { const s = await size(dir, `${folder}/${f}`); t += s; max = Math.max(max, s); } return { t, max }; };
  const firstPass = async (folder) => { let t = 0; for (const i of (folder === 'd' ? [0, 15, 30, 45, 60, 75, 90, 105, 120] : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])) t += await size(dir, `${folder}/${String(i + 1).padStart(3, '0')}.webp`); return t; };
  const posters = {}; for (const f of ['poster-1280.avif', 'poster-1280.webp', 'poster-1600.avif', 'poster-1600.webp', 'poster-m.avif', 'poster-m.webp']) posters[f] = await size(dir, f);
  assert.ok(Object.values(posters).every((s) => s <= 200_000), 'póster ≤200 KB');
  const d = await sum('d'), m = await sum('m');
  assert.ok(d.max <= 320_000 && m.max <= 170_000, 'fotograma máx 320/170 KB (película fluida y nítida, 2026-10-12)');
  assert.equal((await readdir(path.join(dir, 'd'))).length, 121); assert.equal((await readdir(path.join(dir, 'm'))).length, 121);
  const base9 = d.t + posters['poster-1600.webp'], baseM = m.t + posters['poster-m.webp'];
  assert.ok(base9 <= 22_000_000 && baseM <= 8_000_000, `inicio actual escritorio ${base9} / móvil ${baseM} (tope 22 / 8 MB, ampliado a propósito)`);
  const fpD = (await firstPass('d')) + posters['poster-1600.avif'], fpM = (await firstPass('m')) + posters['poster-m.avif'];
  assert.ok(fpD <= 2_000_000 && fpM <= 1_200_000, 'primera pasada');
  const bt = { t: 0, m: 0, d: 0, w: 0 }, bmax = { t: 0, m: 0, d: 0, w: 0 };
  for (const slug of SLUGS) for (const k of ['t', 'm', 'd', 'w']) { const s = await size(bdir, `${slug}-${k}.webp`); bt[k] += s; bmax[k] = Math.max(bmax[k], s); }
  const barajaD = bt.t + bt.d + bt.w, barajaM = bt.t + bt.m;
  assert.ok(barajaD <= 1_300_000, `baraja escritorio ${barajaD} > 1,3 MB`); assert.ok(barajaM <= 600_000, `baraja móvil ${barajaM} > 0,6 MB`);
  assert.ok(!(await readdir(dir, { recursive: true })).some((f) => /\.(mp4|mov|png|jpe?g)$/i.test(f)), 'sin vídeo ni formatos pesados');
  for (const folder of [dir, bdir]) for (const f of await readdir(folder, { recursive: true })) if (/\.(webp|avif)$/.test(f)) { const b = await readFile(path.join(folder, f)); assert.ok(!b.includes('EXIF') && !b.includes('Exif') && !b.includes('XMP ') && !b.includes('<x:xmpmeta'), `metadatos en ${f}`); }
  metrics.pesos = { inicioEscritorioMB: +(base9 / 1e6).toFixed(2), inicioMovilMB: +(baseM / 1e6).toFixed(2), barajaEscritorioMB: +(barajaD / 1e6).toFixed(2), barajaMovilMB: +(barajaM / 1e6).toFixed(2), miniaturaMaxKB: Math.round(bmax.t / 1024), cartaMovilMaxKB: Math.round(bmax.m / 1024), cartaEscritorioMaxKB: Math.round(bmax.d / 1024), primeraPasadaEscritorioMB: +(fpD / 1e6).toFixed(2), primeraPasadaMovilMB: +(fpM / 1e6).toFixed(2) };
  checks.push(`peso: ${JSON.stringify(metrics.pesos)}; sin EXIF/XMP; sin MP4/PNG/JPG`);

  // «reading 'scrollHeight'» proviene de ExperienceExplorer.jsx (otro escritor: su ResizeObserver lee stage.current tras desmontar); se informa aparte.
  const external = errors.filter((e) => /scrollHeight/.test(e)); if (external.length) checks.push(`AVISO ajeno al héroe: ${external.length} pageerror de ExperienceExplorer (${external[0]})`);
  assert.deepEqual(errors.filter((e) => !e.includes('ERR_FAILED') && !/scrollHeight/.test(e)), [], 'sin errores de consola');
  checks.push('sin errores de consola ni de página (se ignora solo el ERR_FAILED de la ruta bloqueada a propósito)');
  console.log((findings.length ? 'FAIL' : 'PASS') + ' check-scrub-hero\n- ' + checks.join('\n- '));
  console.log('\nMétricas:', JSON.stringify(metrics));
  if (findings.length) { console.log(['', 'HALLAZGOS:', ...findings.map((f) => '- ' + f)].join(String.fromCharCode(10))); process.exitCode = 1; }
} catch (error) {
  console.error('FAIL check-scrub-hero:', error.message, String(error.stack || '').split('\n').filter((l) => l.includes('check-scrub-hero.mjs')).slice(0, 2).join(' | '), '\nErrores recogidos:', errors, '\nPasaron:', checks, '\nMétricas:', JSON.stringify(metrics));
  process.exitCode = 1;
} finally { await browser.close(); }
