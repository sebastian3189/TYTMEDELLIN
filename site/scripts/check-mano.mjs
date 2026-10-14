// «La mano de viaje» (Spec 03 §K): una sola sección de experiencias tras la película. Reemplaza a check-formas.mjs (ExperienceExplorer retirado).
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/check-mano.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const NAMES = ['City Tour & Comuna 13', 'Tour de Compras', 'Guatapé & Piedra del Peñol', 'Vuelta a Oriente', 'Santa Fe de Antioquia', 'Jardín', 'Tour del Café', 'Salto del Buey', 'Noche en Medellín', 'Tour Miradores', 'Hacienda Nápoles'];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const findings = [], checks = [];
const soft = (c, m) => { if (!c) findings.push(m); return c; };
async function trackGeo(page) { return page.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight }; }); }
try {
  // 1) Escritorio 1440×900.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }), page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text().slice(0, 120)); });
  await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true');
  soft(await page.locator('.th-title').count() === 1 && await page.locator('#formas-de-viajar h2').count() === 1, 'un título gigante y un h2');
  soft((await page.locator('#formas-de-viajar h2').innerText()).replace(/\s+/g, ' ') === 'Un lugar para cada forma de viajar.', 'h2 «Un lugar para cada forma de viajar.»');
  soft((await page.locator('#formas-de-viajar .eyebrow').textContent()) === 'Elige tu próximo recuerdo', 'eyebrow «Elige tu próximo recuerdo»');
  soft(await page.locator('.scrub-hero a[href^="/experiencias"], .sc-list').count() === 0, 'ScrubHero ya no repite experiencias');
  soft(await page.locator('.bd-nav, .scrub-strip, .bd-mq, .bd-cap, .bd-plan, .ft-card').count() === 0, 'tramo de cartas de la película eliminado');
  soft(await page.locator('.experience-explorer').count() === 0, 'ExperienceExplorer retirado');
  const tabs = await page.locator('.th-index [role=tab]').allInnerTexts(); soft(JSON.stringify(tabs.map((t) => t.replace(/^\d+\s*/, '').trim())) === JSON.stringify(NAMES), `índice ${tabs}`);
  const geo = await trackGeo(page), seg = 30, thu = (u) => geo.top - geo.hh + (u / geo.total) * geo.span;
  soft(Math.abs(geo.total - (34 + 11 * seg + 20)) < 0.5, `pista ${geo.total} svh (≈384)`);
  const go = async (u, wait = 1500) => { await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), thu(u)); await page.waitForTimeout(wait); };
  const rows = [];
  for (let i = 0; i < 11; i++) {
    await go(34 + (i + 0.56) * seg);
    const r = await page.evaluate(() => {
      const stage = document.querySelector('.th-stage').getBoundingClientRect(), host = document.querySelector('.th-title-host').getBoundingClientRect(), title = document.querySelector('.th-title');
      const tr = title.getBoundingClientRect(), hand = document.querySelector('.th-hand').getBoundingClientRect();
      const imgs = [...document.querySelectorAll('.th-group[data-i]')].flatMap((g) => [...g.querySelectorAll('.th-photo')].map((im) => { const r = im.getBoundingClientRect(), cs = getComputedStyle(im); return { r: { left: r.left, right: r.right, top: Math.max(r.top, hand.top), bottom: Math.min(r.bottom, hand.bottom) }, o: cs.visibility === 'hidden' ? 0 : Number(cs.opacity) }; }));
      const over = imgs.filter((im) => im.o > 0.12 && !(im.r.bottom <= tr.top + 1 || im.r.top >= tr.bottom - 1 || im.r.right <= tr.left + 1 || im.r.left >= tr.right - 1)).length;
      const act = [...document.querySelectorAll('.th-group')].find((g) => !g.getAttribute('aria-hidden'));
      return { name: title.textContent, fits: tr.right <= host.right + 1 && tr.left >= host.left - 1, size: parseFloat(getComputedStyle(title).fontSize), weight: getComputedStyle(title).fontWeight, handW: hand.width / stage.width, handH: hand.height / stage.height, over, n: act ? act.querySelectorAll('.th-photo').length : 0, panel: document.querySelector('.th-panel .th-count')?.textContent };
    });
    rows.push(r);
    soft(r.fits && r.size <= 128.5 && r.weight === '800', `título ${i}: ${JSON.stringify([r.name, r.fits, r.size, r.weight])}`);
    soft(r.over === 0, `título ${i}: ${r.over} fotos tocan el título`);
    soft(r.handW >= 0.6 && r.handH >= 0.7, `mano ${i}: ${(r.handW * 100).toFixed(0)} % × ${(r.handH * 100).toFixed(0)} %`);
    soft(r.n >= (i === 1 ? 4 : 5) && r.n <= 8, `fotos tour ${i}: ${r.n}`);
    soft(/^(\d\d) \/ 11/.test(r.panel || ''), `panel ${i}: ${r.panel}`);
  }
  checks.push(`11 tours: título gigante entero (≤128 px, 800), sin fotos encima, mano ${(Math.min(...rows.map((r) => r.handW)) * 100).toFixed(0)} % × ${(Math.min(...rows.map((r) => r.handH)) * 100).toFixed(0)} % del escenario, fotos ${Math.min(...rows.map((r) => r.n))}–${Math.max(...rows.map((r) => r.n))}`);
  // Selección: índice (clic y teclado), ‹ › y teclado de la mano.
  await page.locator('.th-index [role=tab]').nth(5).click(); await page.waitForTimeout(1500);
  soft(await page.locator('.th-index [role=tab][aria-selected=true]').innerText().then((t) => /Jardín/.test(t)), 'el índice salta a Jardín');
  const cap = () => page.locator('.th-cap').innerText();
  const c0 = await cap(); await page.getByRole('button', { name: 'Fotografía siguiente' }).click(); await page.waitForTimeout(300);
  soft((await cap()) !== c0 && /02 DE/i.test(await cap()), `› cambia de foto: ${await cap()}`);
  await page.locator('.th-hand').focus(); await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(300); soft(/01 DE/i.test(await cap()), '← en la mano');
  soft((await page.locator('.th p.sr-only').innerText()).startsWith('Foto 1 de'), 'aria-live solo ante acción del usuario');
  await page.locator('.th-index [role=tab][aria-selected=true]').focus(); await page.keyboard.press('ArrowDown'); await page.waitForTimeout(1500);
  soft(await page.locator('.th-index [role=tab][aria-selected=true]').innerText().then((t) => /Café/.test(t)), '↓ en el índice avanza una experiencia');
  checks.push('selección por índice (clic, ↓), ‹ › y ←/→ en la mano con aria-live');
  await go(34 + 3.56 * seg); const t1 = await page.locator('.th-title').innerText(); await go(34 + 6.56 * seg); await go(34 + 3.56 * seg); soft((await page.locator('.th-title').innerText()) === t1, 'simetría al subir');
  const sh = await page.evaluate(() => { const t = document.querySelector('.scrub-track'); return { top: t.getBoundingClientRect().top + scrollY, hh: document.querySelector('.site-header').offsetHeight }; });
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), sh.top - sh.hh + 338.5 * 9); await page.waitForTimeout(1200);
  const rel = await page.evaluate(() => ({ sc: Number(getComputedStyle(document.querySelector('.scrub-stage')).opacity), th: Number(getComputedStyle(document.querySelector('.th-stage')).opacity) }));
  soft(rel.sc < 0.2 && rel.th > 0.8, `relevo: la película se funde (${rel.sc}) y la mano aparece (${rel.th})`);
  checks.push(`relevo: película ${rel.sc.toFixed(2)} → mano ${rel.th.toFixed(2)} al final del tramo`);
  soft(errors.length === 0, `errores de consola: ${errors.slice(0, 2).join(' | ')}`);
  await ctx.close();

  // 2) Móvil 390×844.
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }), mp = await mctx.newPage();
  await mp.goto(base + '/', { waitUntil: 'load' }); await mp.waitForFunction(() => document.querySelector('.th')?.dataset.layout === 'compact');
  const mg = await trackGeo(mp), mthu = (u) => mg.top - mg.hh + (u / mg.total) * mg.span;
  await mp.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), mthu(34 + 2.56 * 80)); await mp.waitForTimeout(1600);
  const m = await mp.evaluate(() => { const st = document.querySelector('.th-stage').getBoundingClientRect(), hand = document.querySelector('.th-hand').getBoundingClientRect(), title = document.querySelector('.th-title'), host = document.querySelector('.th-title-host').getBoundingClientRect(); return { handW: hand.width / st.width, handH: hand.height / st.height, lines: title.querySelectorAll('span').length, fits: title.getBoundingClientRect().right <= host.right + 1, overflow: document.documentElement.scrollWidth > innerWidth, tab: document.querySelector('.th-index [role=tab][aria-selected=true]')?.getBoundingClientRect().height }; });
  soft(m.handW >= 0.8 && m.handH >= 0.4 && !m.overflow && m.fits && m.lines <= 2 && m.tab >= 44, `móvil ${JSON.stringify(m)}`);
  await mctx.close();
  // Colisiones en móvil (390×844 y 360×800): ninguna foto toca texto, enlaces, CTA, flechas, puntos ni el botón de WhatsApp, en cada tour y posición.
  for (const [cw, ch] of [[390, 844], [360, 800]]) {
    const cc = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 }), cp = await cc.newPage();
    await cp.goto(base + '/', { waitUntil: 'load' }); await cp.waitForFunction(() => document.querySelector('.th')?.dataset.layout === 'compact');
    const g = await trackGeo(cp), gu = (u) => g.top - g.hh + (u / g.total) * g.span; let bad = 0, samples = 0, worst = '';
    for (let i = 0; i < 11; i++) for (const sf of [0.12, 0.4, 0.56, 0.8, 0.95]) {
      await cp.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), gu(34 + (i + sf) * 80)); await cp.waitForTimeout(450);
      const r = await cp.evaluate(() => {
        const hand = document.querySelector('.th-hand').getBoundingClientRect();
        const photos = [...document.querySelectorAll('.th-photo')].filter((im) => getComputedStyle(im).visibility !== 'hidden' && Number(getComputedStyle(im).opacity) > 0.05).map((im) => { const q = im.getBoundingClientRect(); return { left: Math.max(q.left, hand.left), right: Math.min(q.right, hand.right), top: Math.max(q.top, hand.top), bottom: Math.min(q.bottom, hand.bottom) }; }).filter((q) => q.right > q.left && q.bottom > q.top);
        const ctl = [...document.querySelectorAll('.th-panel p, .th-panel a, .th-arrows button, .th-dots button, .th-title, .th-index [role=tab], .th-head, .wa-fab')].filter((e) => getComputedStyle(e).visibility !== 'hidden' && Number(getComputedStyle(e).opacity) > 0.05 && e.getBoundingClientRect().width > 0 && !(e.classList.contains('wa-fab') && e.dataset.hidden === 'true'));
        let area = 0, what = ''; for (const c of ctl) { const q = c.getBoundingClientRect(); for (const p of photos) { const w = Math.min(q.right, p.right) - Math.max(q.left, p.left), h = Math.min(q.bottom, p.bottom) - Math.max(q.top, p.top); if (w > 0 && h > 0) { area += w * h; what = c.className || c.tagName; } } }
        const out = [...document.querySelectorAll('.th-arrows button, .th-panel .button')].filter((e) => { const q = e.getBoundingClientRect(); return q.left < 0 || q.right > innerWidth + 0.5 || q.bottom > innerHeight + 0.5; }).length;
        const cta = document.querySelector('.th-panel .button'), lh = parseFloat(getComputedStyle(cta).lineHeight) || 20;
        return { area: Math.round(area), what, out, ctaLines: Math.round(cta.getBoundingClientRect().height / (parseFloat(getComputedStyle(cta).fontSize) * 1.3)), ctaH: cta.getBoundingClientRect().height };
      });
      samples++; if (r.area > 0 || r.out > 0 || r.ctaH > 60) { bad++; worst = `${i}@${sf}: ${JSON.stringify(r)}`; }
    }
    soft(bad === 0, `colisiones móvil ${cw}×${ch}: ${bad}/${samples} muestras con solape o desborde (${worst})`);
    checks.push(`móvil ${cw}×${ch}: 0 px² de solape foto–controles en ${samples} posiciones (11 tours), CTA en una línea, flechas dentro de la ventana`);
    await cc.close();
  }
  const mctx2 = null; void mctx2;
  checks.push(`móvil 390: mano ${(m.handW * 100).toFixed(0)} % × ${(m.handH * 100).toFixed(0)} %, título ${m.lines} líneas, chips ≥44 px, sin desborde`);

  // 3) Reducido, sin JS y 360×640: lista estática de 11 experiencias.
  for (const [label, opts, js] of [['reducido', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, true], ['sin JS', { viewport: { width: 390, height: 844 }, javaScriptEnabled: false }, false], ['360×640', { viewport: { width: 360, height: 640 }, isMobile: true, hasTouch: true }, true]]) {
    const c = await browser.newContext(opts), p = await c.newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(js ? 1500 : 200);
    const r = await p.evaluate(() => ({ cards: [...document.querySelectorAll('.th-card')].map((a) => a.getAttribute('href')), pinned: Boolean(document.querySelector('.th-stage')) }));
    soft(r.cards.length === 11 && !r.pinned, `${label}: ${r.cards.length} cartas, pin ${r.pinned}`);
    await c.close();
  }
  checks.push('reducido, sin JS y 360×640: lista estática de 11 experiencias, sin pin');
} finally { await browser.close(); }
console.log(checks.map((c) => '- ' + c).join('\n'));
if (findings.length) { console.log('\nHALLAZGOS:\n- ' + findings.join('\n- ')); process.exitCode = 1; } else console.log('\nPASS check-mano');
