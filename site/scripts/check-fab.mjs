// Botón flotante de WhatsApp: presente en todas las rutas (también /en), posición/tamaño, enlace sin datos personales, sin solaparse con controles,
// sin barra de cotizar duplicada en la ficha móvil, oculto con el menú abierto, foco visible. Capturas en test-results/ronda-j/fab-*.png.
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/check-fab.mjs
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-j';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const BL = 'a,button,input,select,textarea,label,summary,[role=tab],.site-footer';
const findings = [];
try {
  for (const [w, h, theme] of [[1440, 900, 'light'], [1280, 800, 'dark'], [390, 844, 'light'], [360, 740, 'dark']]) {
    const mobile = w < 800;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
    await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
    const page = await ctx.newPage();
    for (const route of ['/', '/experiencias', '/experiencias/hacienda-napoles', '/cotizar', '/contacto', '/en/', '/en/cotizar']) {
      await page.goto(base + route, { waitUntil: 'load' }); await page.waitForTimeout(700);
      const info = await page.evaluate(() => { const f = document.querySelector('.wa-fab'); if (!f) return null; const r = f.getBoundingClientRect(), cs = getComputedStyle(f); return { w: r.width, right: innerWidth - r.right, bottom: innerHeight - r.bottom, href: f.href, label: f.getAttribute('aria-label'), bg: cs.backgroundColor, z: cs.zIndex, pos: cs.position, lang: document.documentElement.lang }; });
      assert(info, `${route} ${w}: sin botón`);
      assert.equal(info.pos, 'fixed'); assert.equal(info.w, mobile ? 52 : 56); assert.equal(info.bg, 'rgb(37, 211, 102)');
      assert(info.right >= 16 && info.bottom >= 16 - 1, `posición ${JSON.stringify(info)}`);
      assert(/^https:\/\/wa\.me\/573044961698\?text=[^&]*$/.test(info.href) && !/\d{7,}.*\d{7,}/.test(decodeURIComponent(info.href.split('text=')[1])), 'URL sin datos personales');
      assert.equal(info.label, route.startsWith('/en') ? 'Message us on WhatsApp' : 'Escribir por WhatsApp');
      // Barrido de scroll: cuando está visible no cubre ningún control, campo ni el pie.
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += Math.round(h * 0.45)) {
        await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(260);
        const r = await page.evaluate((BL) => {
          const f = document.querySelector('.wa-fab'); const b = f.getBoundingClientRect(); const hidden = f.dataset.hidden === 'true';
          const pts = [[b.left + b.width / 2, b.top + b.height / 2]], R = b.width / 2 - 1; for (let k = 0; k < 8; k++) pts.push([b.left + b.width / 2 + R * Math.cos(k * Math.PI / 4), b.top + b.height / 2 + R * Math.sin(k * Math.PI / 4)]);
          const hits = new Set(); for (const [x, y] of pts) for (const e of document.elementsFromPoint(x, y)) { if (e.closest('.wa-fab')) continue; const c = e.closest(BL); if (c) hits.add(c.tagName + '.' + String(c.className).slice(0, 30)); }
          return { hidden, hits: [...hits], menu: Boolean(document.querySelector('.menu-open')) };
        }, BL);
        if (!r.hidden && r.hits.length) findings.push(`${route} ${w}×${h} y=${y}: cubre ${r.hits.join(', ')}`);
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    }
    // Capturas y estados especiales.
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(800);
    await page.screenshot({ path: `${out}/fab-hero-${w}-${theme}.png` });
    await page.evaluate(() => document.querySelector('.home-story').scrollIntoView()); await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/fab-historia-${w}-${theme}.png` });
    await page.evaluate(() => document.querySelector('.blog-book').scrollIntoView()); await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/fab-libro-${w}-${theme}.png` });
    if (mobile) {
      // Ficha en móvil: solo el botón flotante de WhatsApp (la barra de cotizar se retiró): ningún otro enlace wa.me ni .quote-bar.
      await page.goto(base + '/experiencias/hacienda-napoles', { waitUntil: 'load' }); await page.waitForTimeout(600);
      await page.evaluate(() => scrollTo({ top: 1800, behavior: 'instant' })); await page.waitForTimeout(700);
      const dup = await page.evaluate(() => ({ bars: document.querySelectorAll('.quote-bar').length, fixedWa: [...document.querySelectorAll('a[href*="wa.me"]')].filter((a) => getComputedStyle(a).position === 'fixed' || getComputedStyle(a.parentElement).position === 'fixed').length, fabs: document.querySelectorAll('.wa-fab').length }));
      assert.deepEqual(dup, { bars: 0, fixedWa: 1, fabs: 1 }, `ficha móvil sin duplicados ${JSON.stringify(dup)}`);
      await page.screenshot({ path: `${out}/fab-ficha-${w}-${theme}.png` });
      await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(500);
      await page.getByRole('button', { name: /Menú/ }).first().click(); await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => document.querySelector('.wa-fab').dataset.hidden), 'true', 'oculto con el menú abierto');
      await page.screenshot({ path: `${out}/fab-menu-${w}-${theme}.png` });
    }
    await page.keyboard.press('Tab');
    await ctx.close();
  }
  // Foco visible.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }), page = await ctx.newPage();
  await page.goto(base + '/vehiculos', { waitUntil: 'load' }); await page.waitForTimeout(500);
  await page.locator('.wa-fab').focus(); await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.querySelector('.wa-fab')).outlineStyle);
  assert.equal(outline, 'solid');
  await page.screenshot({ path: `${out}/fab-foco-1440.png`, clip: { x: 0, y: 760, width: 300, height: 140 } });
  await ctx.close();
} finally { await browser.close(); }
if (findings.length) { console.log('HALLAZGOS:\n- ' + [...new Set(findings)].slice(0, 25).join('\n- ')); process.exitCode = 1; } else console.log('PASS check-fab');
