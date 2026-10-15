// Capturas y comprobaciones de «La experiencia» por paradas (SPECS/anexos/instrucciones_scroll_experiencias_TT.md, ronda 2026-10-15).
// Uso: node scripts/serve-static.mjs dist 4417 &  node scripts/check-itinerarios.mjs [capturas|medidas|todo]
// - capturas: 3 paradas por tour a 1440 (claro) y 2 a 390; oscuro en 2 tours; 390/768/1024/1440/844x390 en 2 tours.
// - medidas: en 320…2560 (ES y EN, claro/oscuro) comprueba desbordamiento horizontal de la página, texto recortado en el panel, indicador dentro de su
//   contenedor, objetivos táctiles ≥44 px y errores de consola, parada por parada.
import { chromium, webkit, devices } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
const enDict = JSON.parse(await readFile('src/locales/en.json', 'utf8'));
const UI_ES = ['Desliza para seguir la historia', 'Foto pendiente', 'En la visita', 'Opcional', 'Parada ', 'La experiencia'];
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/itinerarios', mode = process.argv[2] || 'todo';
await mkdir(out, { recursive: true });
const TOURS = ['city-tour-comuna-13', 'guatape-piedra-del-penol', 'tour-nocturno-medellin', 'tour-miradores', 'tour-del-cafe-medellin', 'vuelta-a-oriente', 'santa-fe-de-antioquia', 'hacienda-napoles', 'tour-de-compras', 'salto-del-buey', 'jardin-antioquia', 'traslados-aeropuerto-jmc'];
let browser = await chromium.launch({ channel: 'msedge', headless: true });

async function open(w, h, { theme = 'light', mobile = w < 800, en = false, slug, dpr = 1, b = browser } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const page = await ctx.newPage(); page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.errors.push(m.text().slice(0, 160)); });
  await page.goto(`${base}${en ? '/en' : ''}/experiencias/${slug}`, { waitUntil: 'load' });
  await page.waitForSelector('.it'); await page.waitForTimeout(600);
  return { ctx, page };
}
const info = (page) => page.evaluate(() => { const s = document.querySelector('.it'); return { sticky: s.classList.contains('it-sticky'), n: s.querySelectorAll(s.classList.contains('it-sticky') ? '.it-art' : '.it-card').length }; });
// Lleva la parada i a la vista (sticky: punto medio de su tramo; estática: tarjeta bajo el encabezado).
async function showStop(page, i) {
  await page.evaluate((i) => {
    const s = document.querySelector('.it');
    if (s.classList.contains('it-sticky')) { const inner = s.querySelector('.it-inner'), n = s.querySelectorAll('.it-art').length, stick = parseFloat(getComputedStyle(inner).top) || 0, total = s.offsetHeight - inner.offsetHeight; scrollTo({ top: s.getBoundingClientRect().top + scrollY - stick + total * ((i + .5) / n), behavior: 'instant' }); }
    else { const c = s.querySelectorAll('.it-card')[i]; scrollTo({ top: c.getBoundingClientRect().top + scrollY - 96, behavior: 'instant' }); }
  }, i);
  await page.waitForTimeout(450);
}

if (mode === 'capturas' || mode === 'todo') {
  for (const slug of TOURS) {
    let { ctx, page } = await open(1440, 900, { slug }); const { n } = await info(page);
    for (const i of [0, Math.floor(n / 2), n - 1]) { await showStop(page, i); await page.screenshot({ path: `${out}/${slug}-1440-p${i + 1}.png` }); }
    if (page.errors.length) console.log(slug, '1440 ERRORES', page.errors.slice(0, 3)); await ctx.close();
    ({ ctx, page } = await open(390, 844, { slug, dpr: 2 }));
    for (const i of [0, Math.min(n - 1, 3)]) { await showStop(page, i); await page.screenshot({ path: `${out}/${slug}-390-p${i + 1}.png` }); }
    if (page.errors.length) console.log(slug, '390 ERRORES', page.errors.slice(0, 3)); await ctx.close();
  }
  for (const slug of ['guatape-piedra-del-penol', 'salto-del-buey']) {
    for (const [w, h, tag] of [[390, 844, '390'], [768, 1024, '768'], [1024, 768, '1024'], [1440, 900, '1440'], [844, 390, '844x390']]) {
      const { ctx, page } = await open(w, h, { slug, dpr: w < 800 ? 2 : 1, theme: 'dark' }); const { n } = await info(page);
      await showStop(page, 2); await page.screenshot({ path: `${out}/dev-${slug}-${tag}-dark.png` });
      await ctx.close();
    }
    for (const theme of ['light', 'dark']) { const { ctx, page } = await open(1440, 900, { slug, theme }); await showStop(page, 1); await page.screenshot({ path: `${out}/tema-${slug}-${theme}.png` }); await ctx.close(); }
  }
  const { ctx, page } = await open(1440, 900, { slug: 'tour-de-compras', en: true }); await showStop(page, 1); await page.screenshot({ path: `${out}/en-tour-de-compras-1440.png` }); await ctx.close();
}

if (mode === 'medidas' || mode === 'todo') {
  const VPS = [[320, 568], [360, 740], [390, 844], [412, 915], [430, 932], [768, 1024], [1024, 768], [820, 1180], [1024, 1366], [1280, 700], [1366, 768], [1440, 900], [1920, 1080], [2560, 1440], [844, 390]];
  const bad = []; let checks = 0;
  for (const slug of TOURS) for (const [w, h] of VPS) for (const en of [false, true]) {
    if (en && ![390, 1366, 1440, 844].includes(w)) continue;
    const theme = (w + (en ? 1 : 0)) % 2 ? 'dark' : 'light';
    let ctx, page, n, sticky;
    try { ({ ctx, page } = await open(w, h, { slug, en, theme })); ({ n, sticky } = await info(page)); } catch (e) { bad.push(`${slug} ${w}x${h}${en ? ' EN' : ''}: fallo de apertura ${e.message.slice(0, 60)}`); try { await browser.close(); } catch {} browser = await chromium.launch({ channel: 'msedge', headless: true }); continue; }
    const longest = await page.evaluate(() => { const L = [...document.querySelectorAll('.it-art, .it-card')].map((e) => e.innerText.length); return L.indexOf(Math.max(...L)); });
    const stops = [...new Set([longest, 0, n - 1])];
    try { for (const i of stops) {
      await showStop(page, i);
      const r = await page.evaluate(({ i, sticky }) => {
        const s = document.querySelector('.it'), prob = [];
        if (document.documentElement.scrollWidth > innerWidth + 1) prob.push('desborde horizontal de página ' + document.documentElement.scrollWidth);
        const scope = sticky ? s.querySelectorAll('.it-art')[i] : s.querySelectorAll('.it-card')[i];
        const box = sticky ? s.querySelector('.it-inner') : s.querySelector('.it-list');
        const bb = box.getBoundingClientRect();
        for (const el of scope.querySelectorAll('*')) { const rr = el.getBoundingClientRect(); if (rr.width && (rr.right > bb.right + 1 || rr.left < bb.left - 1)) { prob.push('fuera horizontal: ' + el.className + ' ' + el.textContent.slice(0, 20)); break; } if (sticky && rr.height && (rr.bottom > bb.bottom + 1 || rr.top < bb.top - 1)) { prob.push('fuera vertical: ' + (el.className || el.tagName) + ' ' + el.textContent.slice(0, 20)); break; } }
        if (sticky) {
          const pan = s.querySelector('.it-panel'); const pr = pan.getBoundingClientRect();
          const last = [...pan.children].map((c) => c.getBoundingClientRect().bottom); if (Math.max(...last) > pr.bottom + 1 || pan.scrollHeight > pan.clientHeight + 1) prob.push(`panel recortado ${pan.scrollHeight}>${pan.clientHeight}`);
          const act = s.querySelector('.it-art.is-active'); if (!act || act !== s.querySelectorAll('.it-art')[i]) prob.push('escena activa distinta ' + (act ? [...s.querySelectorAll('.it-art')].indexOf(act) : 'ninguna') + ' esperada ' + i);
          const ctl = s.querySelector('.it-controls').getBoundingClientRect(); for (const b of s.querySelectorAll('.it-controls button')) { const br = b.getBoundingClientRect(); if (br.right > ctl.right + 1 || br.left < ctl.left - 1) { prob.push('indicador fuera de su contenedor'); break; } if (br.height < 43.5 || br.width < 8) { prob.push('objetivo táctil pequeño ' + Math.round(br.width) + 'x' + Math.round(br.height)); break; } if (br.top < bb.top - 1 || br.bottom > bb.bottom + 1) { prob.push('indicador fuera del encuadre'); break; } }
          const m = s.querySelector('.it-media').getBoundingClientRect(); if (m.width < 280 || m.height < 280) prob.push('foto diminuta ' + Math.round(m.width) + 'x' + Math.round(m.height));
        } else {
          const im = scope.querySelector('.it-media').getBoundingClientRect(); if (im.width < 200 || im.height < 120) prob.push('foto diminuta');
          const t = scope.querySelector('.it-text'); if (t.scrollWidth > t.clientWidth + 1) prob.push('texto desborda su caja');
        }
        return prob;
      }, { i, sticky });
      const txt = await page.$eval('.it', (e) => e.innerText);
      const stopTxt = await page.evaluate(({ i, sticky }) => { const s = document.querySelector('.it'); return (sticky ? s.querySelectorAll('.it-art')[i] : s.querySelectorAll('.it-card')[i]).innerText + ' ' + s.querySelector('.it-head').innerText + (sticky ? s.querySelector('.it-hint').innerText : ''); }, { i, sticky });
      if (en) { for (const k of UI_ES) if (stopTxt.includes(k)) r.push('texto en español en EN: ' + k); }
      else { for (const k of ['Scroll to follow the story', 'Photo pending', 'On the visit', 'Optional', 'Stop 0', 'The experience']) if (stopTxt.includes(k)) r.push('texto en inglés en ES: ' + k); }
      checks++; if (r.length) bad.push(`${slug} ${w}x${h}${en ? ' EN' : ''} ${sticky ? 'sticky' : 'estatico'} parada ${i + 1}: ${r.join('; ')}`);
    }
    } catch (e) { bad.push(`${slug} ${w}x${h}${en ? ' EN' : ''}: fallo ${e.message.slice(0, 60)}`); try { await browser.close(); } catch {} browser = await chromium.launch({ channel: 'msedge', headless: true }); continue; }
    if (page.errors.length) bad.push(`${slug} ${w}x${h} consola: ${page.errors.slice(0, 2).join(' | ')}`);
    await ctx.close();
  }
  // Móvil real con WebKit (iPhone 13) en 2 tours
  try {
    const wk = await webkit.launch();
    for (const slug of ['guatape-piedra-del-penol', 'tour-de-compras']) {
      const ctx = await wk.newContext({ ...devices['iPhone 13'] }); const page = await ctx.newPage(); page.errors = []; page.on('pageerror', (e) => page.errors.push(e.message));
      await page.goto(`${base}/experiencias/${slug}`, { waitUntil: 'load' }); await page.waitForSelector('.it'); await page.waitForTimeout(800);
      await showStop(page, 2); await page.screenshot({ path: `${out}/webkit-iphone13-${slug}.png` });
      const ov = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1); if (ov || page.errors.length) bad.push(`webkit ${slug}: desborde=${ov} errores=${page.errors.slice(0, 2)}`);
      await ctx.close();
    }
    await wk.close();
  } catch (e) { bad.push('webkit no disponible: ' + e.message.slice(0, 80)); }
  console.log(`comprobaciones: ${checks}; problemas: ${bad.length}`); for (const b of bad.slice(0, 80)) console.log(' -', b);
}
await browser.close();
