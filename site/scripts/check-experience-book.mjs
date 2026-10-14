// Libro del inicio (Spec 03 §J4): dirección del giro, contenido real en ambas caras, curvatura, duraciones 850/700 ms, controles fuera de las páginas,
// clics múltiples (salto al último destino), móvil de una página con deslizamiento, reducido/ahorro de datos (fundido), sin desborde, claro y oscuro.
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/check-experience-book.mjs
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4173';
const out = 'test-results/experience-book';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const evidence = [], errors = [];
const wait = (page, ms) => page.waitForTimeout(ms);
const state = (book) => book.evaluate((el) => ({
  left: el.querySelector('.bk-page--photo .ft-media')?.getAttribute('aria-label'),
  leftImg: el.querySelector('.bk-page--photo img')?.getAttribute('src'),
  right: el.querySelector('.bk-page--text .ft-name')?.textContent,
  count: el.querySelector('.ft-count')?.textContent.trim(),
  turning: el.dataset.turning,
  leaves: el.querySelectorAll('.ft-leaf').length,
}));
// El ángulo (grados) de rotateY de un elemento 3D a partir de su matriz: signo positivo = hacia −X (giro de avance).
const angleOf = (el) => { const m = new DOMMatrix(getComputedStyle(el).transform); return Math.round(Math.atan2(m.m13, m.m11) * 180 / Math.PI); };
try {
  for (const [width, theme] of [[1440, 'light'], [1440, 'dark'], [390, 'light'], [390, 'dark'], [320, 'light']]) {
    const mobile = width < 800;
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: mobile, isMobile: mobile, colorScheme: theme });
    await context.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* sin almacenamiento */ } }, theme);
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(`${width} ${error.message}`));
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`${width} ${m.text().slice(0, 160)}`); });
    await page.goto(base, { waitUntil: 'load' });
    await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true');
    const book = page.locator('.ft-book');
    await book.scrollIntoViewIfNeeded(); await wait(page, 400);
    const thumbs = book.locator('.ft-thumb');
    assert.equal(await thumbs.count(), 3);
    const next = book.getByRole('button', { name: 'Nota siguiente', exact: true }), prev = book.getByRole('button', { name: 'Nota anterior', exact: true });
    assert(await prev.isDisabled(), 'anterior deshabilitado al inicio');
    const s0 = await state(book);
    assert.equal(s0.count, '01 / 03');

    // Materiales (J4): cubierta, página y reverso por tema.
    const mats = await book.evaluate((el) => ({ cover: getComputedStyle(el.querySelector('.ft-main')).backgroundColor, text: getComputedStyle(el.querySelector('.bk-page--text')).backgroundColor, photo: getComputedStyle(el.querySelector('.bk-page--photo')).backgroundColor }));
    const want = theme === 'dark' ? { cover: 'rgb(16, 19, 17)', text: 'rgb(31, 36, 33)', photo: 'rgb(26, 30, 27)' } : { cover: 'rgb(30, 32, 29)', text: 'rgb(255, 254, 250)', photo: 'rgb(247, 245, 239)' };
    assert.deepEqual(mats, want, `materiales ${theme}`);

    // Controles FUERA de las páginas: contador y flechas bajo el libro, nunca dentro de .ft-main.
    const ctl = await book.evaluate((el) => {
      const main = el.querySelector('.ft-main').getBoundingClientRect(), strip = el.querySelector('.ft-strip').getBoundingClientRect(), nav = el.querySelector('.ft-nav').getBoundingClientRect(), count = el.querySelector('.ft-count').getBoundingClientRect();
      return { below: nav.top >= main.bottom - 1 && count.top >= main.bottom - 1, insideMain: el.querySelectorAll('.ft-main .ft-nav, .ft-main .ft-count, .ft-main button').length, rightOfStrip: mobileCheck(strip, nav) };
      function mobileCheck(a, b) { return b.right >= a.right - 2 || b.top >= a.bottom - 2; }
    });
    assert(ctl.below && ctl.insideMain === 0 && ctl.rightOfStrip, `controles fuera del libro ${JSON.stringify(ctl)}`);

    // 1) Avanzar: dirección, contenido y duración.
    await next.click(); await wait(page, 30);
    const t1 = await book.evaluate((el, mob) => {
      const w = el.querySelector('.ft-turn-window'), leaf = w.querySelector('.ft-leaf'), a = leaf.getAnimations()[0];
      const faces = [...leaf.querySelectorAll('.bk-seg--a .bk-face')];
      return {
        direction: leaf.dataset.direction, inert: w.inert, hidden: w.getAttribute('aria-hidden'), links: w.querySelectorAll('a,button').length, perspective: getComputedStyle(w).perspective, clip: getComputedStyle(w).overflow,
        duration: a.effect.getTiming().duration, easing: a.effect.getTiming().easing, segs: leaf.querySelectorAll('.bk-seg').length, anims: w.getAnimations({ subtree: true }).length,
        front: faces[0].querySelector('.ft-name, img')?.textContent || faces[0].querySelector('img')?.getAttribute('src'), backImg: faces[1].querySelector('img')?.getAttribute('src'),
        frontText: faces[0].querySelector('.ft-name')?.textContent, backHasContent: Boolean(faces[1].querySelector('img') || faces[1].querySelector('.ft-name')),
        originLeaf: getComputedStyle(leaf).transformOrigin,
      };
    }, mobile);
    const s1 = await state(book);
    assert.equal(t1.direction, 'next'); assert(t1.inert && t1.hidden === 'true' && t1.links === 0, 'hoja decorativa: inert, aria-hidden, sin enlaces');
    assert.equal(t1.duration, mobile ? 700 : 850, 'duración'); assert.match(t1.easing, /0\.77, 0, 0\.175, 1/);
    assert.notEqual(t1.perspective, 'none'); assert.equal(t1.clip, 'hidden');
    assert(t1.backHasContent, 'reverso con contenido real');
    if (!mobile) {
      assert.equal(t1.segs, 2, 'dos segmentos'); assert.equal(t1.frontText, s0.right, 'anverso = copia del texto actual');
      assert.equal(s1.right !== s0.right, true, 'debajo, a la derecha, ya está el texto siguiente');
      assert.equal(s1.left, s1.left); assert.equal(s1.leftImg, s0.leftImg, 'a la izquierda sigue la foto actual hasta que la hoja la cubre');
      assert(t1.originLeaf.startsWith('0px'), `eje en el lomo (origen izquierdo) ${t1.originLeaf}`);
    } else assert.equal(t1.segs, 1, 'móvil: un segmento');
    // Curvatura, ángulo y sombra por fase (animaciones pausadas con currentTime).
    const dur = mobile ? 700 : 850, phases = [];
    for (const pct of [0, 0.25, 0.5, 0.75, 1]) {
      const r = await book.evaluate((el, [pct, dur]) => {
        const w = el.querySelector('.ft-turn-window'); if (!w) return null;
        w.getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = pct * dur; });
        const leaf = w.querySelector('.ft-leaf'), b = w.querySelector('.bk-seg--b');
        const m = new DOMMatrix(getComputedStyle(leaf).transform);
        const bm = b ? new DOMMatrix(getComputedStyle(b).transform) : null;
        return { leaf: Math.round(Math.atan2(m.m13, m.m11) * 180 / Math.PI), z: +m.m43.toFixed(1), b: bm ? Math.round(Math.atan2(bm.m13, bm.m11) * 180 / Math.PI) : null, shade: Math.max(...[...w.querySelectorAll('.bk-shade')].map((x) => +getComputedStyle(x).opacity)), cast: +getComputedStyle(w.querySelector('.bk-cast')).opacity, op: +getComputedStyle(leaf).opacity, rect: (() => { const r = leaf.getBoundingClientRect(), box = el.querySelector('.ft-main').getBoundingClientRect(); return { inside: r.left >= box.left - 0.5 && r.right <= box.right + 0.5 }; })() };
      }, [pct, dur]);
      phases.push({ pct, ...r }); await wait(page, 60);
      if (pct === 0.5 || pct === 0.25 || pct === 0.75) await book.locator('.ft-main').screenshot({ path: `${out}/${width}-${theme}-next-${Math.round(pct * 100)}.png` });
    }
    const fwd = phases.find((p) => p.pct === 0.5);
    assert(phases[0].leaf === 0 && Math.abs(phases[4].leaf) >= 179, `ángulo 0 → ±180 ${JSON.stringify(phases.map((p) => p.leaf))}`);
    assert(phases[2].leaf !== 0 && phases[2].leaf < 179, 'a mitad del giro la hoja está inclinada');
    assert(phases.every((p, i) => i === 0 || i === 4 || p.leaf > 0), `avanzar: rotateY negativo (matriz con m13>0) ${JSON.stringify(phases.map((p) => p.leaf))}`);
    assert(phases[0].cast === 0 && phases[4].cast === 0 && phases[2].cast > 0.9, `sombra proyectada 0 → máx → 0 ${JSON.stringify(phases.map((p) => p.cast))}`);
    assert(phases[0].shade === 0 && phases[4].shade === 0 && phases[2].shade > 0.3, `sombreado de la hoja ${JSON.stringify(phases.map((p) => p.shade))}`);
    if (!mobile) assert(phases.some((p) => p.b !== null && Math.abs(p.b) >= 1 && p.pct > 0 && p.pct < 1), `segmento exterior desfasado ${JSON.stringify(phases.map((p) => p.b))}`);
    assert(phases.every((p) => p.z <= 25.5), `elevación ≤ 24 px ${JSON.stringify(phases.map((p) => p.z))}`);
    if (mobile) assert(phases[2].op < 1 && phases[4].op === 0, `móvil: se funde de 100° a 160° ${JSON.stringify(phases.map((p) => p.op))}`);
    await book.evaluate((el) => el.querySelectorAll('.ft-turn-window').forEach((w) => w.getAnimations({ subtree: true }).forEach((a) => a.finish())));
    await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 2000 });
    const s2 = await state(book);
    assert.equal(s2.count, '02 / 03'); assert.notEqual(s2.leftImg, s0.leftImg, 'al terminar, la foto de la izquierda es la nueva'); assert.equal(s2.right, s1.right);

    // 2) Retroceder: simétrico (hoja = página izquierda, giro a +180°).
    await prev.click(); await wait(page, 30);
    const tb = await book.evaluate((el) => { const leaf = el.querySelector('.ft-leaf'); return { direction: leaf.dataset.direction, origin: getComputedStyle(leaf).transformOrigin, back: leaf.querySelector('.bk-seg--a .bk-face--back .ft-name')?.textContent }; });
    assert.equal(tb.direction, 'previous');
    if (!mobile) { assert(/^[0-9.]+px/.test(tb.origin) && parseFloat(tb.origin) > 100, `eje en el lomo (borde derecho) ${tb.origin}`); assert.equal(tb.back, s0.right, 'reverso = texto anterior'); }
    const back50 = await book.evaluate((el, dur) => { const w = el.querySelector('.ft-turn-window'); w.getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = 0.4 * dur; }); return Math.round(Math.atan2(new DOMMatrix(getComputedStyle(w.querySelector('.ft-leaf')).transform).m13, new DOMMatrix(getComputedStyle(w.querySelector('.ft-leaf')).transform).m11) * 180 / Math.PI); }, dur);
    if (!mobile) assert(back50 < 0, `retroceder: rotateY positivo (m13<0) ${back50}`);
    await book.locator('.ft-main').screenshot({ path: `${out}/${width}-${theme}-prev-40.png` });
    await book.evaluate((el) => el.querySelectorAll('.ft-turn-window').forEach((w) => w.getAnimations({ subtree: true }).forEach((a) => a.finish())));
    await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 2000 });
    assert.equal((await state(book)).count, '01 / 03');

    // 3) Clics rápidos y salto: se termina el giro en curso y solo se gira hacia el último destino (un único giro directo).
    await next.click(); await wait(page, 60); await next.click(); await wait(page, 60);
    const rapid = await state(book);
    assert.equal(rapid.leaves, 1, 'una sola hoja');
    assert.equal(rapid.count, '03 / 03'); assert(await next.isDisabled(), 'siguiente deshabilitado en el extremo');
    await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 2500 });
    const fin = await state(book);
    assert.equal(fin.right, (await thumbs.nth(2).getAttribute('aria-label')));
    await thumbs.nth(0).click(); await wait(page, 40);
    const jump = await book.evaluate((el) => ({ leaves: el.querySelectorAll('.ft-leaf').length, anims: el.querySelector('.ft-turn-window').getAnimations({ subtree: true }).length > 0 }));
    assert(jump.leaves === 1 && jump.anims, 'salto de más de una nota = un único giro');
    await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 2500 });
    assert.equal((await state(book)).count, '01 / 03');

    // 4) Teclado en el índice.
    await thumbs.nth(1).focus(); await page.keyboard.press('End'); await wait(page, 120);
    assert(await next.isDisabled()); await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); await wait(page, 1000);
    assert.equal(await thumbs.nth(1).getAttribute('aria-pressed'), 'true');

    // 5) Móvil: deslizar horizontal ≥ 48 px dispara el giro; el scroll vertical no se bloquea.
    if (mobile) {
      const before = (await state(book)).count;
      await book.locator('.ft-main').evaluate((el) => {
        const mk = (type, x, y) => { const t = new Touch({ identifier: 1, target: el, clientX: x, clientY: y }); el.dispatchEvent(new TouchEvent(type, { touches: type === 'touchend' ? [] : [t], changedTouches: [t], bubbles: true, cancelable: true })); };
        const r = el.getBoundingClientRect(), y = r.top + r.height / 2; mk('touchstart', r.left + 250, y); mk('touchend', r.left + 150, y);
      });
      await wait(page, 60);
      const after = await state(book);
      assert.notEqual(after.count, before, 'deslizar a la izquierda avanza');
      await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 2500 });
      const small = (await state(book)).count;
      await book.locator('.ft-main').evaluate((el) => {
        const mk = (type, x, y) => { const t = new Touch({ identifier: 1, target: el, clientX: x, clientY: y }); el.dispatchEvent(new TouchEvent(type, { touches: type === 'touchend' ? [] : [t], changedTouches: [t], bubbles: true, cancelable: true })); };
        const r = el.getBoundingClientRect(), y = r.top + r.height / 2; mk('touchstart', r.left + 200, y); mk('touchend', r.left + 170, y);
      });
      await wait(page, 100);
      assert.equal((await state(book)).count, small, 'un deslizamiento < 48 px no cambia de nota');
      assert.equal(await book.locator('.ft-main').evaluate((el) => getComputedStyle(el).touchAction), 'pan-y');
    }

    // 6) Sin desborde.
    const geo = await book.evaluate((el) => ({ overflow: document.documentElement.scrollWidth > innerWidth, width: el.getBoundingClientRect().width, main: el.querySelector('.ft-main').getBoundingClientRect().toJSON() }));
    assert(!geo.overflow, `desborde horizontal a ${width}`);
    await book.screenshot({ path: `${out}/${width}-${theme}-reposo.png` });
    evidence.push({ width, theme, durationMs: t1.duration, phases: phases.map((p) => ({ pct: p.pct, leaf: p.leaf, b: p.b, cast: p.cast, shade: p.shade })), passed: true });
    await context.close();
  }

  // Reducido (sistema) y ahorro de datos: sin 3D, fundido de 150 ms; y cambio dinámico a mitad de giro.
  for (const [width, mode] of [[1440, 'reduced'], [390, 'reduced'], [1440, 'saveData']]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    if (mode === 'saveData') await context.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: Object.assign(new EventTarget(), { saveData: true, effectiveType: '4g' }), configurable: true }));
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(`${mode} ${error.message}`));
    await page.goto(base, { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true');
    const book = page.locator('.ft-book'); await book.scrollIntoViewIfNeeded(); await wait(page, 300);
    const before = await state(book);
    // El fundido dura 150 ms: se comprueba en el mismo evaluate que hace el clic (sin carreras con la carga del equipo).
    const fading = await book.evaluate((el) => new Promise((resolve) => { el.querySelector('button[aria-label="Nota siguiente"]').click(); requestAnimationFrame(() => requestAnimationFrame(() => resolve({ turn: el.querySelectorAll('.ft-turn-window').length, fade: [...el.querySelectorAll('.bk-fade')].some((f) => f.getAnimations().some((a) => a.effect.getTiming().duration === 150)) }))); }));
    assert.equal(fading.turn, 0, `${mode}: sin hoja`); assert(fading.fade, `${mode}: fundido de 150 ms`);
    await wait(page, 300);
    const after = await state(book);
    assert.notEqual(after.right, before.right); assert.equal(after.count, '02 / 03'); assert.equal(after.turning, 'false');
    await book.screenshot({ path: `${out}/${width}-${mode}.png` });
    await context.close();
  }
  { // Preferencia que cambia a mitad de giro: la hoja desaparece de inmediato.
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }), page = await context.newPage();
    await page.goto(base, { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true');
    const book = page.locator('.ft-book'); await book.scrollIntoViewIfNeeded(); await wait(page, 300);
    await book.getByRole('button', { name: 'Nota siguiente', exact: true }).click(); await wait(page, 120);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('.ft-turn-window'), null, { timeout: 1000 });
    const s = await state(book); assert.equal(s.turning, 'false'); assert.equal(s.count, '02 / 03');
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(`${out}/checks.json`, JSON.stringify({ evidence, errors }, null, 2));
  console.log(JSON.stringify({ passed: evidence.length + 4, errors }));
} finally { await browser.close(); }
