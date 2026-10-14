import { chromium } from '@playwright/test';
import { mkdir, readdir, rm } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

// Sección «Un lugar para cada forma de viajar.» del inicio (Spec 03 §I.1). Solo lee el DOM; no modifica componentes.
// Requiere `npm run build` + `npx vite preview --port <libre>` y TYT_TEST_URL.
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4173';
const out = 'test-results/formas';
await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (f.endsWith('.png')) await rm(path.join(out, f), { force: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const checks = [], findings = [], errors = [], metrics = {};
const watch = (page, label) => { page.on('pageerror', (e) => errors.push(`${label} pageerror: ${e.message}`)); page.on('console', (m) => { if (m.type() === 'error') errors.push(`${label} console: ${m.text()}`); }); };
const soft = (cond, msg) => { if (!cond) findings.push(msg); return cond; };
const clsInit = () => { window.__cls = 0; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); } catch {} };
const NAMES = ['City Tour & Comuna 13', 'Tour de Compras', 'Guatapé & Piedra del Peñol', 'Vuelta a Oriente', 'Santa Fe de Antioquia', 'Jardín', 'Tour del Café', 'Salto del Buey', 'Noche en Medellín', 'Tour Miradores', 'Hacienda Nápoles'];
const GROUPS = ['Ciudad', 'Pueblos', 'Naturaleza', 'Noche', 'Familia'];
const lum = (c) => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const trackBytes = (page) => { const state = { bytes: 0, urls: [] }; page.on('response', async (r) => { const u = r.url(); if (/\/media\/(oficial|exploracion)\/.+\.(webp|jpg|avif)$/.test(u)) { const len = Number(r.headers()['content-length'] || 0) || (await r.body().then((b) => b.length).catch(() => 0)); state.bytes += len; state.urls.push(u.split('/').slice(-2).join('/')); } }); return state; };
const sectionState = (page) => page.evaluate(() => {
  const root = document.querySelector('#formas-de-viajar'), cs = (e) => getComputedStyle(e);
  const live = [...root.querySelectorAll('[aria-live]')].map((e) => e.textContent.trim());
  return { live, caption: root.querySelector('.explorer-caption')?.textContent.trim(), h3: root.querySelector('.explorer-copy h3')?.textContent, tabs: root.querySelectorAll('[role=tab]').length, selected: [...root.querySelectorAll('[role=tab]')].findIndex((t) => t.getAttribute('aria-selected') === 'true'), pinned: !!root.querySelector('.explorer-track.is-pinned'), light: root.classList.contains('explorer-light') };
});
const textOverPhotos = (page) => page.evaluate(() => {
  const root = document.querySelector('#formas-de-viajar'), imgs = [...root.querySelectorAll('img')].filter((i) => { const r = i.getBoundingClientRect(); return r.width > 20 && r.bottom > 0 && r.top < innerHeight && getComputedStyle(i).visibility !== 'hidden'; }).map((i) => i.getBoundingClientRect());
  const bad = [];
  for (const el of root.querySelectorAll('h2,h3,p,a,span,b,button[role=tab]')) {
    if (el.closest('button.fan-photo') || el.querySelector('img')) continue;
    const r = document.createRange(); r.selectNodeContents(el); const rr = [...r.getClientRects()].filter((q) => q.width > 4 && q.height > 4 && q.bottom > 0 && q.top < innerHeight);
    if (!el.textContent.trim()) continue;
    for (const q of rr) for (const p of imgs) { const w = Math.min(q.right, p.right) - Math.max(q.left, p.left), h = Math.min(q.bottom, p.bottom) - Math.max(q.top, p.top); if (w > 6 && h > 6) bad.push(`${el.tagName}:${el.textContent.trim().slice(0, 24)}`); }
  }
  return [...new Set(bad)];
});
const colors = (page) => page.evaluate(() => {
  const root = document.querySelector('#formas-de-viajar'), out = [];
  for (const el of root.querySelectorAll('h2,h3,p,a,span,b,button')) { if (!el.textContent.trim() || el.closest('.fan-photo') || el.children.length > 3) continue; const r = el.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) continue; const cs = getComputedStyle(el); out.push({ t: el.textContent.trim().slice(0, 30), color: cs.color, bg: cs.backgroundColor, fs: parseFloat(cs.fontSize), tag: el.tagName, cls: el.className }); }
  return out;
});
const goSection = async (page, frac = 0) => page.evaluate((f) => { const r = document.querySelector('.explorer-track'), s = r.getBoundingClientRect().top + scrollY; const span = Math.max(0, r.offsetHeight - document.querySelector('.explorer-stage').offsetHeight); scrollTo({ top: s - 108 + span * f + (f === 0 ? 0 : 0), behavior: 'instant' }); }, frac);

try {
  // 1) Escritorio 1440×900.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(clsInit);
  const page = await ctx.newPage(); watch(page, 'desktop');
  const net = trackBytes(page);
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true'); // hidratación terminada (Spec 04): sin carreras con el efecto de diseño
  const order = await page.evaluate(() => { const ids = ['.home-hero', '.home-story', '.scrub-hero', '#formas-de-viajar', '.service-band', '.reviews-g', '.about-preview', '.blog-book', '.home-close', '.home-social']; const tops = ids.map((s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY : -1; }); return { ids, tops, text: document.body.innerText }; });
  assert.ok(order.tops.every((t) => t >= 0) && order.tops.every((t, i) => i === 0 || t > order.tops[i - 1]), `orden del inicio ${JSON.stringify(order.tops)}`);
  assert.ok(!/La ciudad en tres encuentros/i.test(order.text), 'sin «La ciudad en tres encuentros»');
  assert.equal(await page.locator('.rail-shell').count(), 0, 'sin el carril de 4 tarjetas');
  assert.equal(await page.locator('#formas-de-viajar h2').count(), 1);
  assert.match((await page.locator('#formas-de-viajar h2').innerText()).replace(/\s+/g, ' '), /^Un lugar para cada forma de viajar\.$/);
  checks.push('orden del inicio (§J1): hero → historia → baraja → #formas-de-viajar → Nos encargamos del camino → reseñas → equipo → libro → cierre → redes; sin «La ciudad en tres encuentros» ni carril de 4 tarjetas; h2 «Un lugar para cada forma de viajar.»');
  // Índice: 10 tours en orden por grupo con rótulo.
  const idx = await page.evaluate(() => ({ names: [...document.querySelectorAll('#formas-de-viajar [role=tab]')].map((t) => t.textContent.replace(/^\d+/, '').trim()), groups: [...document.querySelectorAll('.explorer-group')].map((g) => g.textContent.trim()), tabindex: [...document.querySelectorAll('#formas-de-viajar [role=tab]')].map((t) => t.tabIndex), listAria: document.querySelector('[role=tablist]').getAttribute('aria-orientation') }));
  assert.deepEqual(idx.names, NAMES); assert.deepEqual(idx.groups, GROUPS); assert.equal(idx.tabindex.filter((x) => x === 0).length, 1, 'tabindex itinerante'); assert.equal(idx.listAria, 'vertical');
  checks.push(`índice: 11 tours en orden por grupo (${GROUPS.join(' · ')}), tablist vertical con tabindex itinerante`);

  // Pin 220vh y fases por scroll.
  await goSection(page, 0); await page.waitForTimeout(700);
  const st0 = await sectionState(page);
  const geo = await page.evaluate(() => { const t = document.querySelector('.explorer-track'), s = document.querySelector('.explorer-stage'); return { vh: t.offsetHeight / innerHeight, stickyTop: getComputedStyle(s).position, stageH: s.offsetHeight / innerHeight }; });
  soft(st0.pinned, 'el pin no se activa a 1440×900'); soft(Math.abs(geo.vh - 2.2) < 0.15, `altura de la sección fijada ${geo.vh.toFixed(2)}vh (spec 220vh)`);
  const caps = [];
  for (const f of [0.02, 0.3, 0.55, 0.9]) { await goSection(page, f); await page.waitForTimeout(900); caps.push((await sectionState(page)).caption); await page.screenshot({ path: `${out}/1440-fase-${String(Math.round(f * 100)).padStart(2, '0')}.png` }); }
  soft(new Set(caps).size >= 3, `el scroll cambia de foto: ${caps.join(' | ')}`);
  await goSection(page, 0.02); await page.waitForTimeout(900); const back = (await sectionState(page)).caption; soft(back === caps[0], `simetría al subir: ${back} vs ${caps[0]}`);
  checks.push(`escritorio: pin ${geo.pinnedInfo ?? ''}${geo.vh.toFixed(2)}vh; leyenda por fase ${JSON.stringify(caps)}; al subir vuelve a ${back}`);

  // Selección de tour, botones, aria-live, contador.
  const tabs = page.locator('#formas-de-viajar [role=tab]');
  await tabs.nth(4).click(); await page.waitForTimeout(700);
  let s = await sectionState(page); assert.equal(s.h3, NAMES[4]); assert.equal(s.selected, 4);
  soft(/^Foto \d+ de \d+, Santa Fe de Antioquia$/.test(s.live[0] || ''), `aria-live ${JSON.stringify(s.live)}`);
  const cap1 = (await sectionState(page)).caption;
  await page.getByRole('button', { name: 'Fotografía siguiente' }).click(); await page.waitForTimeout(800);
  const cap2 = (await sectionState(page)).caption; assert.notEqual(cap1, cap2, 'botón siguiente cambia de foto');
  await page.getByRole('button', { name: 'Fotografía anterior' }).click(); await page.waitForTimeout(800); assert.equal((await sectionState(page)).caption, cap1, 'botón anterior');
  await tabs.nth(4).focus(); await page.keyboard.press('ArrowDown'); await page.waitForTimeout(500);
  s = await sectionState(page); assert.equal(s.selected, 5, 'flecha ↓ en el índice');
  await page.keyboard.press('End'); await page.waitForTimeout(400); assert.equal((await sectionState(page)).selected, 10, 'Fin'); await page.keyboard.press('Home'); await page.waitForTimeout(400); assert.equal((await sectionState(page)).selected, 0, 'Inicio');
  const photosPerTour = []; for (let i = 0; i < 11; i++) { await tabs.nth(i).click(); await page.waitForTimeout(250); const c = (await sectionState(page)).caption; photosPerTour.push(Number(c.match(/de (\d+)/)[1])); }
  assert.ok(photosPerTour.every((n) => n >= 3) && photosPerTour.length === 11 && photosPerTour[1] === 3, `fotos por tour ${photosPerTour}`); // fotos oficiales de Medellín (ronda 2026-10-12): 4 por tour, la portada se excluye
  checks.push(`selección: clic, ←/→ de foto, ↑/↓/Inicio/Fin en el índice, aria-live «Foto n de m, tour»; fotos por tour ${photosPerTour.join(',')} (oficiales)`);
  await tabs.nth(0).click(); await goSection(page, 0.3); await page.waitForTimeout(900); await page.screenshot({ path: `${out}/1440-tras-cambiar-tour.png` });
  await tabs.nth(7).click(); await page.waitForTimeout(900); await page.screenshot({ path: `${out}/1440-tour-salto-del-buey.png` });

  // Sin texto sobre fotos, contraste, una acción naranja.
  for (const f of [0.02, 0.55]) { await goSection(page, f); await page.waitForTimeout(700); soft((await textOverPhotos(page)).length === 0, `texto sobre fotos en fase ${f}: ${JSON.stringify(await textOverPhotos(page))}`); }
  const cols = await colors(page); const bg = 'rgb(250, 248, 245)'; const low = cols.filter((c) => { const bgc = /rgba?\(0, 0, 0, 0\)|transparent/.test(c.bg) ? bg : c.bg; return ratio(c.color, bgc) < 4.5; });
  soft(low.length === 0, `texto con contraste <4,5:1: ${JSON.stringify(low.slice(0, 5))}`); soft(cols.every((c) => c.fs >= 13), `texto <13 px: ${JSON.stringify(cols.filter((c) => c.fs < 13).slice(0, 3))}`);
  const orange = await page.evaluate(() => [...document.querySelectorAll('a,button')].filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > 92 && r.top < innerHeight && getComputedStyle(e).backgroundColor === 'rgb(255, 127, 9)'; }).map((e) => e.textContent.trim().slice(0, 30)));
  soft(orange.length <= 1, `acciones naranjas visibles a la vez: ${JSON.stringify(orange)}`);
  checks.push(`legibilidad: texto sobre fotos y contraste revisados; acciones naranjas visibles: ${orange.length}`);

  // Teclado: sin trampas, región con flechas, foco visible.
  await page.evaluate(() => document.querySelector('#formas-de-viajar').focus({ preventScroll: true }));
  const kinds = []; for (let i = 0; i < 24; i++) { await page.keyboard.press('Tab'); const k = await page.evaluate(() => { const e = document.activeElement; if (!e || !e.closest('#formas-de-viajar')) return null; const cs = getComputedStyle(e); return `${e.getAttribute('role') || e.tagName}:${(e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 22)}|${cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2}`; }); if (!k) { if (kinds.length) break; continue; } kinds.push(k); }
  soft(kinds.length > 0 && kinds.every((k) => k.endsWith('|true')), `foco visible (contorno ≥2 px) en cada parada: ${kinds.filter((k) => !k.endsWith('|true')).join(', ')}`);
  checks.push(`teclado: ${kinds.length} paradas dentro de la sección y salida del orden sin trampa`);

  // Cumplimiento de reglas globales sobre el código (lectura).
  const src = await (await import('node:fs/promises')).readFile('src/ExperienceExplorer.jsx', 'utf8');
  soft(!/on(Wheel|Touch\w*|Scroll|PointerMove)=\{[^}]*preventDefault/.test(src) && !/addEventListener\('(wheel|touch\w*)'/.test(src), 'ExperienceExplorer.jsx cancela rueda/gesto/scroll (regla: nunca). preventDefault de flechas dentro del tablist y del carrusel es el patrón ARIA y se acepta.');
  metrics.clsDesktop = await page.evaluate(() => window.__cls); soft(metrics.clsDesktop < 0.1, `CLS ${metrics.clsDesktop}`);
  await ctx.close();

  // 2) Carga: bytes de fotos del tour al llegar (sin interacción).
  for (const [w, h, label, limit, mobile] of [[1440, 900, 'escritorio', 300_000, false], [390, 844, 'móvil', 220_000, true]]) {
    const c = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: mobile, isMobile: mobile, deviceScaleFactor: mobile ? 3 : 1 }); const p = await c.newPage(); watch(p, `arrival-${label}`);
    const n2 = trackBytes(p); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(800);
    await p.evaluate(() => { const y = document.querySelector('#formas-de-viajar').getBoundingClientRect().top + scrollY - 108; scrollTo({ top: y, behavior: 'instant' }); }); await p.waitForTimeout(2500);
    metrics[`llegada_${label}`] = `${Math.round(n2.bytes / 1024)} KB en ${n2.urls.length} fotos`;
    soft(n2.bytes <= limit, `carga al llegar (${label}): ${Math.round(n2.bytes / 1024)} KB > ${Math.round(limit / 1024)} KB (${n2.urls.length} fotos)`);
    await c.close();
  }
  checks.push(`carga al llegar: ${JSON.stringify({ escritorio: metrics.llegada_escritorio, móvil: metrics.llegada_móvil })} (límites 300 / 220 KB)`);

  // 3) Móvil 390×844: sin pin, chips deslizables, carrusel con scroll-snap, deslizar.
  {
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }); await c.addInitScript(clsInit);
    const p = await c.newPage(); watch(p, 'mobile'); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(800);
    const go = async (dy = 0) => { await p.evaluate((d) => { const y = document.querySelector('#formas-de-viajar').getBoundingClientRect().top + scrollY - 76 + d; scrollTo({ top: y, behavior: 'instant' }); }, dy); await p.waitForTimeout(900); };
    await go(); await p.screenshot({ path: `${out}/390-entrada.png` });
    const m = await p.evaluate(() => { const r = document.querySelector('#formas-de-viajar'), t = document.querySelector('.explorer-track'), mob = document.querySelector('.explorer-mobile'), tl = document.querySelector('[role=tablist]'); return { pinned: !!r.querySelector('.is-pinned'), sticky: getComputedStyle(document.querySelector('.explorer-stage')).position, snap: getComputedStyle(mob).scrollSnapType, tabsScroll: tl.scrollWidth > tl.clientWidth, tabH: Math.min(...[...document.querySelectorAll('[role=tab]')].map((x) => x.getBoundingClientRect().height)), overflow: document.documentElement.scrollWidth > innerWidth + 1 }; });
    soft(!m.pinned && m.sticky !== 'sticky', `móvil sin pin ${JSON.stringify(m)}`); soft(/x/.test(m.snap), `carrusel móvil con scroll-snap: ${m.snap}`); soft(m.tabsScroll, 'los nombres de tour no son un carril deslizable en móvil'); soft(m.tabH >= 44, `objetivo de los nombres ${m.tabH}px <44`); soft(!m.overflow, 'desbordamiento horizontal');
    await go(500); await p.screenshot({ path: `${out}/390-carrusel.png` });
    const box = await p.locator('.explorer-mobile').boundingBox(); const cdp = await c.newCDPSession(p);
    if (box) { const x0 = Math.round(box.x + box.width * 0.8), y0 = Math.round(box.y + Math.min(box.height / 2, 300)); await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0 }] }); for (let k = 1; k <= 12; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 - k * 22, y: y0 }] }); await p.waitForTimeout(16); } await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); }
    await p.waitForTimeout(900); const cap = (await sectionState(p)).caption; soft(/02 de/.test(cap || ''), `deslizar cambia de foto: ${cap}`);
    await p.screenshot({ path: `${out}/390-tras-deslizar.png` });
    await p.locator('#formas-de-viajar [role=tab]').nth(5).tap(); await p.waitForTimeout(800); await p.screenshot({ path: `${out}/390-tras-elegir.png` });
    soft((await sectionState(p)).h3 === NAMES[5], 'tocar un nombre cambia de tour');
    metrics.clsMobile = await p.evaluate(() => window.__cls); soft(metrics.clsMobile < 0.1, `CLS móvil ${metrics.clsMobile}`);
    checks.push(`móvil 390: ${JSON.stringify(m)}; CLS ${metrics.clsMobile?.toFixed(4)}`);
    await c.close();
  }

  // 4) Movimiento reducido: rejilla 2×2, sin pin.
  {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await c.newPage(); watch(p, 'reduced');
    await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(800);
    await p.evaluate(() => { scrollTo({ top: document.querySelector('#formas-de-viajar').getBoundingClientRect().top + scrollY - 108, behavior: 'instant' }); }); await p.waitForTimeout(1200);
    const r = await p.evaluate(() => { const root = document.querySelector('#formas-de-viajar'); const f = root.querySelector('.explorer-fan'), pos = [...root.querySelectorAll('.fan-photo')].map((e) => e.getBoundingClientRect()); return { pinned: !!root.querySelector('.is-pinned'), light: root.classList.contains('explorer-light'), cols: getComputedStyle(f).gridTemplateColumns, n: pos.length, distinct: new Set(pos.map((q) => Math.round(q.left))).size }; });
    soft(!r.pinned && r.light, `reducido sin pin ${JSON.stringify(r)}`); soft(r.distinct === 2 && r.n >= 3, `reducido: rejilla 2×2 (columnas distintas ${r.distinct}, fotos ${r.n})`);
    await p.screenshot({ path: `${out}/1440-reducido.png` }); checks.push(`reducido: ${JSON.stringify(r)}`); await c.close();
  }

  const real = errors; soft(real.length === 0, `errores de consola: ${JSON.stringify(real.slice(0, 3))}`);
  console.log('Comprobaciones directas OK:\n- ' + checks.join('\n- '));
  console.log('\nMétricas:', JSON.stringify(metrics));
  if (findings.length) { console.log('\nHALLAZGOS (incumplen §I.1):\n- ' + findings.join('\n- ')); process.exitCode = 1; } else console.log('\nPASS check-formas');
} catch (error) {
  console.error('FAIL check-formas:', error.message, String(error.stack || '').split('\n').filter((l) => l.includes('check-formas.mjs')).slice(0, 2).join(' | '), '\nPasaron:', checks, '\nHallazgos previos:', findings);
  process.exitCode = 1;
} finally { await browser.close(); }
