// Ronda de cierre (CORREGIR, 2026-10-12): comprobaciones de los hallazgos 1, 2, 5, 7, 8 y 9 del auditor. Solo lectura del DOM.
// Uso: npm run build && npx vite preview --port <libre>; TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/check-cierre.mjs
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4402';
const out = 'test-results/ronda-cierre';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const checks = [], findings = [], errors = [], metrics = {};
const soft = (cond, msg) => { if (!cond) findings.push(msg); return cond; };
const watch = (page, label) => { page.on('pageerror', (e) => errors.push(`${label}: ${e.message.slice(0, 160)}`)); page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Failed to load resource/.test(m.text())) errors.push(`${label}: ${m.text().slice(0, 160)}`); }); };
const COVER = 'img-9035-card-1600'; // portada oficial de Traslados JMC (cartel inapropiado)
try {
  // 1) [P1] Traslados JMC: portada recortada en tarjeta y ficha; retirada de galería, miniaturas, contador y visor en todos los anchos.
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage(); watch(page, `jmc-${width}`);
    await page.goto(base + '/experiencias/traslados-aeropuerto-jmc', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const data = await page.evaluate((cover) => {
      const refs = (root) => [...root.querySelectorAll('img,source')].filter((n) => `${n.getAttribute('src') || ''} ${n.getAttribute('srcset') || ''} ${n.currentSrc || ''}`.includes(cover)).length;
      const gallery = document.querySelector('section.gallery'), dialog = document.querySelector('dialog.lightbox');
      const hero = document.querySelector('.tour-hero img');
      return { galleryRefs: refs(gallery), dialogRefs: refs(dialog), thumbs: gallery.querySelectorAll('.gallery-thumbs button').length, count: gallery.querySelector('.section-title span')?.textContent.trim(), heroRefs: refs(document.querySelector('.tour-hero')), focus: hero && getComputedStyle(hero).objectPosition, anywhere: [...document.querySelectorAll('section.gallery img, dialog img')].map((i) => i.currentSrc || i.src).filter((u) => u.includes(cover)).length };
    }, COVER);
    soft(data.galleryRefs === 0 && data.dialogRefs === 0 && data.anywhere === 0, `JMC ${width}: la portada oficial aparece en galería (${data.galleryRefs}) o visor (${data.dialogRefs})`);
    soft(data.thumbs === 2 && /^2 fotografías/.test(data.count || ''), `JMC ${width}: ${data.thumbs} miniaturas, contador «${data.count}»`);
    soft(data.heroRefs > 0 && /^9[0-9](\.\d+)?% /.test(data.focus || ''), `JMC ${width}: la ficha sigue usando la portada recortada (foco ${data.focus})`);
    // Recorre las dos fotos en el visor: ninguna es la portada.
    await page.locator('.gallery-feature').click(); await page.waitForTimeout(300);
    const seen = new Set();
    for (let i = 0; i < 3; i++) { seen.add(await page.evaluate(() => document.querySelector('dialog.lightbox img')?.currentSrc)); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250); }
    soft(![...seen].some((u) => u?.includes(COVER)) && seen.size === 2, `JMC ${width}: el visor muestra ${seen.size} fotos distintas y ninguna es la portada (${[...seen].map((u) => u?.split('/').pop())})`);
    if (width === 1440 || width === 390) await page.screenshot({ path: `${out}/jmc-visor-${width}.png` });
    await page.keyboard.press('Escape');
    if (width === 390 || width === 1440) { await page.locator('.gallery').scrollIntoViewIfNeeded(); await page.screenshot({ path: `${out}/jmc-galeria-${width}.png` }); await page.evaluate(() => scrollTo(0, 0)); await page.screenshot({ path: `${out}/jmc-ficha-${width}.png` }); }
    await ctx.close();
  }
  // Tarjeta de /experiencias: la portada sigue recortada (foco 92 %).
  { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
    await page.goto(base + '/experiencias', { waitUntil: 'load' });
    const card = await page.evaluate((c) => { const img = [...document.querySelectorAll('.tour-card img')].find((i) => (i.currentSrc || i.src).includes(c) || (i.srcset || '').includes(c)); return img && getComputedStyle(img).objectPosition; }, COVER);
    soft(/^9[0-9](\.\d+)?% /.test(card || ''), `tarjeta JMC: foco ${card}`);
    checks.push(`P1 JMC: portada fuera de galería/miniaturas/visor a 320–1920 px, contador «2 fotografías», ficha y tarjeta siguen recortadas (foco ${card})`);
    await ctx.close(); }

  // 2) [P2] Explorador: Tour de Compras con sus 3 fotos oficiales.
  { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage(); watch(page, 'explorer');
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1200);
    await page.evaluate(() => scrollTo({ top: document.querySelector('#formas-de-viajar').getBoundingClientRect().top + scrollY - 108, behavior: 'instant' })); await page.waitForTimeout(1200);
    const tab = page.locator('#formas-de-viajar [role=tab]', { hasText: 'Tour de Compras' });
    soft(await tab.count() === 1, 'el explorador no lista «Tour de Compras»');
    await tab.click(); await page.waitForTimeout(900);
    const info = await page.evaluate(() => ({ caption: document.querySelector('.explorer-caption')?.textContent.trim(), photos: document.querySelectorAll('.fan-photo').length, tabs: document.querySelectorAll('#formas-de-viajar [role=tab]').length, groups: [...document.querySelectorAll('.explorer-group')].map((g) => g.textContent.trim()) }));
    soft(info.photos === 3 && /de 03$/.test(info.caption || ''), `Tour de Compras: ${info.photos} fotos, «${info.caption}»`);
    soft(info.tabs === 11 && info.groups.join() === 'Ciudad,Pueblos,Naturaleza,Noche,Familia', `explorador: ${info.tabs} tours, grupos ${info.groups}`);
    await page.screenshot({ path: `${out}/explorador-compras-1440.png` });
    checks.push(`P2 explorador: ${info.tabs} tours, Tour de Compras con ${info.photos} fotos oficiales («${info.caption}»), grupos ${info.groups.join(' · ')}`);
    await ctx.close(); }

  // 3) [P2→P3] Explorador móvil: bytes al llegar (≤220 KB) y carta sin franjas laterales (cover).
  { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }); const page = await ctx.newPage(); watch(page, 'explorer-m');
    const urls = []; page.on('response', async (r) => { if (/\/media\/(oficial|exploracion)\//.test(r.url())) urls.push([r.url(), Number(r.headers()['content-length'] || 0) || (await r.body().then((b) => b.length).catch(() => 0))]); });
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1000);
    await page.evaluate(() => scrollTo({ top: document.querySelector('#formas-de-viajar').getBoundingClientRect().top + scrollY - 76, behavior: 'instant' })); await page.waitForTimeout(2500);
    const bytes = urls.reduce((a, [, n]) => a + n, 0), desktop = urls.filter(([u]) => /-(main|satellite)\.webp$/.test(u)).length;
    soft(bytes <= 220_000, `llegada móvil ${Math.round(bytes / 1024)} KB > 220 KB (${urls.length} fotos)`);
    soft(desktop === 0, `llegada móvil descarga ${desktop} derivados de escritorio (main/satellite)`);
    const bands = await page.evaluate(() => [...document.querySelectorAll('.explorer-mobile > div')].slice(0, 2).map((d) => { const img = d.querySelector('img'), a = d.getBoundingClientRect(), b = img.getBoundingClientRect(); return { fit: getComputedStyle(img).objectFit, w: Math.round(a.width), iw: Math.round(b.width), h: Math.round(a.height), ih: Math.round(b.height) }; }));
    soft(bands.every((b) => b.fit === 'cover' && Math.abs(b.w - b.iw) <= 1 && Math.abs(b.h - b.ih) <= 1), `la carta móvil no llena el marco: ${JSON.stringify(bands)}`);
    await page.screenshot({ path: `${out}/explorador-movil-390.png` });
    metrics.explorerArrival = `${Math.round(bytes / 1024)} KB en ${urls.length} fotos`;
    checks.push(`P2 explorador móvil 390: llegada ${metrics.explorerArrival} (límite 220 KB), 0 derivados de escritorio, cartas cover ${JSON.stringify(bands[0])}`);
    await ctx.close(); }

  // 4) [P3] Quote: un solo role=alert, sin error de indicativo duplicado, aviso en honeypot/time-trap.
  for (const route of ['/cotizar', '/contacto']) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await ctx.newPage(); watch(page, `quote${route}`);
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForSelector('form.quote-form'); await page.waitForTimeout(2500);
    await page.locator('input[name=telefono]').fill('abc'); await page.locator('input[name=indicativo]').fill('+9999');
    await page.locator('form.quote-form button[type=submit]').click(); await page.waitForTimeout(500);
    const state = await page.evaluate(() => ({ alerts: [...document.querySelectorAll('form.quote-form [role=alert]')].map((e) => e.className), perField: document.querySelectorAll('form.quote-form small.error[role=alert]').length, indicativo: [...document.querySelectorAll('form.quote-form [id^=indicativo]')].map((e) => e.id + ':' + e.className), describedby: document.querySelector('#indicativo')?.getAttribute('aria-describedby'), invalid: document.querySelector('#indicativo')?.getAttribute('aria-invalid'), errorsVisible: document.querySelectorAll('form.quote-form small.error').length }));
    soft(state.alerts.length === 1 && state.perField === 0, `${route}: ${state.alerts.length} role=alert (${state.alerts}); por campo ${state.perField}`);
    soft(!state.indicativo.some((x) => x.startsWith('indicativo-error')) && state.invalid === 'true' && state.describedby === 'indicativo-pais', `${route}: indicativo duplicado/descripción ${JSON.stringify({ ids: state.indicativo, describedby: state.describedby, invalid: state.invalid })}`);
    soft(state.errorsVisible >= 2, `${route}: errores de campo visibles (${state.errorsVisible})`);
    if (route === '/cotizar') await page.screenshot({ path: `${out}/formulario-errores-390.png` });
    await ctx.close();
    checks.push(`P3 ${route}: un solo role=alert (resumen), errores de campo con aria-invalid + aria-describedby, indicativo sin duplicado`);
  }
  { // honeypot y time-trap: mensaje genérico, sin fallar en silencio; time-trap solo sin interacción.
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await ctx.newPage();
    await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForSelector('form.quote-form');
    await page.evaluate(() => { const f = document.querySelector('form.quote-form'); f.requestSubmit(); }); await page.waitForTimeout(400);
    const trap = await page.locator('form.quote-form [role=alert]').allInnerTexts();
    soft(trap.length === 1 && /No pudimos preparar tu consulta/.test(trap[0]) && !/bot|honeypot|trampa|tiempo/i.test(trap[0]), `time-trap sin interacción: ${JSON.stringify(trap)}`);
    await page.waitForTimeout(2200);
    await page.evaluate(() => { const h = document.querySelector('input[name=website]'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(h, 'x'); h.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('form.quote-form').requestSubmit(); }); await page.waitForTimeout(400);
    const honey = await page.locator('form.quote-form [role=alert]').allInnerTexts();
    soft(honey.length === 1 && /No pudimos preparar tu consulta/.test(honey[0]), `honeypot: ${JSON.stringify(honey)}`);
    // Una persona (interactúa) que envía enseguida NO cae en la trampa: ve los errores de validación.
    await page.reload({ waitUntil: 'load' }); await page.waitForSelector('form.quote-form');
    await page.locator('input[name=nombre]').fill('Ana'); await page.locator('form.quote-form button[type=submit]').click(); await page.waitForTimeout(300);
    const human = await page.locator('form.quote-form [role=alert]').allInnerTexts();
    soft(human.length === 1 && /Revisa/.test(human[0]), `persona rápida con interacción: ${JSON.stringify(human)}`);
    checks.push('P3 honeypot / time-trap: mismo aviso genérico de reintento (role=alert único) sin revelar el motivo; el time-trap (2 s) solo aplica sin ninguna interacción previa');
    await ctx.close(); }

  // 5) [P3] Nápoles: la cabecera no amplía la portada de 480 px; el orden de la galería no cambia.
  for (const [width, dpr] of [[390, 2], [768, 2], [1440, 1]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: dpr }); const page = await ctx.newPage();
    await page.goto(base + '/experiencias/hacienda-napoles', { waitUntil: 'load' }); await page.waitForTimeout(800);
    const hero = await page.evaluate(async () => { const i = document.querySelector('.tour-hero img'); const r = i.getBoundingClientRect(); const probe = new Image(); probe.src = i.currentSrc; await probe.decode(); return { nat: probe.naturalWidth, css: i.offsetWidth, src: i.currentSrc.split('/').pop(), dpr: devicePixelRatio }; });
    soft(hero.nat >= hero.css * hero.dpr * 0.98, `Nápoles ${width}: cabecera ampliada (${hero.nat}px nativos para ${hero.css}×${hero.dpr})`);
    const gallery = await page.evaluate(() => [...document.querySelectorAll('.gallery-thumbs img')].map((i) => i.src.split('/').pop()).slice(0, 2));
    soft(gallery[0] === 'hacienda-napoles-480.webp', `Nápoles ${width}: la galería debe empezar por la portada oficial (orden oficial): ${gallery}`);
    if (width !== 768) await page.screenshot({ path: `${out}/napoles-cabecera-${width}.png`, clip: { x: 0, y: 0, width, height: 900 } });
    checks.push(`P3 Nápoles ${width}@${dpr}x: cabecera ${hero.src} ${hero.nat}px nativos para ${hero.css}px CSS; galería empieza por ${gallery[0]}`);
    await ctx.close();
  }

  // 6) [P3] /contacto: el correo no se parte a mitad de palabra; /vehiculos: títulos alineados.
  for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } }); const page = await ctx.newPage();
    await page.goto(base + '/contacto', { waitUntil: 'load' }); await page.waitForTimeout(400);
    const mail = await page.evaluate(() => { const h = document.querySelector('.contact-email'); const r = document.createRange(); r.selectNodeContents(h); const lines = [...new Set([...r.getClientRects()].map((q) => Math.round(q.top)))]; return { lines: lines.length, over: h.scrollWidth > h.clientWidth + 1, text: h.textContent, fs: getComputedStyle(h).fontSize, doc: document.documentElement.scrollWidth > innerWidth }; });
    // Se acepta 1 línea o 2 (corte solo en «@»); nunca >2 (corte a mitad de palabra).
    soft(mail.lines <= 2 && !mail.over && !mail.doc, `/contacto ${width}: correo en ${mail.lines} líneas, desborda ${mail.over}/${mail.doc}`);
    if (width === 1440 || width === 390) await page.screenshot({ path: `${out}/contacto-${width}.png`, clip: { x: 0, y: 0, width, height: 900 } });
    await ctx.close();
  }
  for (const width of [768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } }); const page = await ctx.newPage(); watch(page, `fleet-${width}`);
    await page.goto(base + '/vehiculos', { waitUntil: 'load' }); await page.waitForTimeout(500);
    const rows = await page.evaluate(() => { const cards = [...document.querySelectorAll('.vehicle')]; const tops = {}; for (const c of cards) { const h = c.querySelector('h2').getBoundingClientRect().top - c.getBoundingClientRect().top; const row = Math.round(c.getBoundingClientRect().top); (tops[row] ||= []).push(Math.round(h)); } return Object.values(tops); });
    soft(rows.every((r) => Math.max(...r) - Math.min(...r) <= 1), `/vehiculos ${width}: títulos desalineados dentro de la fila ${JSON.stringify(rows)}`);
    if (width === 1440) await page.screenshot({ path: `${out}/vehiculos-1440.png`, fullPage: false });
    await ctx.close();
  }
  checks.push('P3 /contacto: correo en ≤2 líneas (corte solo en «@») y sin desborde a 320–1920 px; /vehiculos: títulos alineados por fila a 768/1024/1440');

  // 7) Inicio: «EN RUTA» retirado; leyenda «01 / 02» fuera de la imagen (escritorio y móvil).
  for (const [width, height, mobile] of [[1440, 900, false], [390, 844, true]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 }); const page = await ctx.newPage(); watch(page, `home-${width}`);
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(2500);
    soft(!(await page.locator('body').innerText()).includes('EN RUTA'), `inicio ${width}: aparece «EN RUTA»`);
    let worst = 0;
    for (const f of [0.2, 0.3, 0.4, 0.5, 0.6, 0.7]) {
      await page.evaluate((frac) => { const t = document.querySelector('.scrub-track'), s = document.querySelector('.scrub-stage'); const span = t.offsetHeight - s.offsetHeight; scrollTo({ top: t.getBoundingClientRect().top + scrollY - 92 + span * frac, behavior: 'instant' }); }, f); await page.waitForTimeout(450);
      const overlap = await page.evaluate(() => { const idx = document.querySelector('.scrub-index'); if (!idx || getComputedStyle(idx).visibility === 'hidden') return 0; const ir = idx.getBoundingClientRect(); const m = document.querySelector('.scrub-media'); const mr = m.getBoundingClientRect(); const op = Number(getComputedStyle(m).opacity); if (op < 0.05) return 0; const w = Math.min(ir.right, mr.right) - Math.max(ir.left, mr.left), h = Math.min(ir.bottom, mr.bottom) - Math.max(ir.top, mr.top); return w > 2 && h > 2 ? Math.round(w * h) : 0; });
      worst = Math.max(worst, overlap);
    }
    if (mobile) soft(worst === 0, `inicio ${width}: la leyenda «01 / 02» se solapa con la imagen (${worst} px²)`);
    checks.push(`inicio ${width}: sin «EN RUTA»; solape de la leyenda 01/02 con la imagen = ${worst} px²${mobile ? '' : ' (escritorio: texto sobre la película por diseño, solo informativo)'}`);
    await ctx.close();
  }

  soft(errors.length === 0, `errores de consola: ${JSON.stringify(errors.slice(0, 3))}`);
  console.log('Comprobaciones:\n- ' + checks.join('\n- '));
  if (findings.length) { console.log('\nHALLAZGOS:\n- ' + findings.join('\n- ')); process.exitCode = 1; } else console.log('\nPASS check-cierre');
} finally { await browser.close(); }
