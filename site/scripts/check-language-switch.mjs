// Prueba del SELECTOR de idioma (ES/EN/PT-BR) en cada ruta, sin recargar el documento: carga la ruta en español, abre el menú de idioma, elige EN, comprueba URL /en…,
// <html lang>, título y que NO queda español; navega dentro del sitio (enlace del menú) y comprueba que se mantiene en inglés; elige PT-BR (URL /pt-br…, sin español ni inglés)
// y vuelve a ES (sin inglés). Marca `window.__nr` para demostrar que ninguna de las conmutaciones recarga la página. También recoge errores de consola (incluidos desajustes de hidratación).
// Uso: node scripts/serve-static.mjs dist 4417 &  node scripts/check-language-switch.mjs [--w=1440]
import { chromium } from '@playwright/test';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { verdict, verdictPt } from './_i18n-verdict.mjs';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const W = Number((process.argv.find((a) => a.startsWith('--w=')) || '').split('=')[1] || 1440);
const walk = (d, rel = '') => readdirSync(d).flatMap((f) => { const p = join(d, f), r = rel + '/' + f; return statSync(p).isDirectory() ? (f === 'assets' || f === 'media' ? [] : walk(p, r)) : f === 'index.html' ? [rel || '/'] : []; });
const routes = [...new Set(walk('dist/en', '/en').map((r) => r.replace(/\/index\.html$/, '').replace(/^\/en/, '') || '/'))].sort().filter((r) => !['/flota', '/site'].includes(r)).concat(['/no-existe']);
const grab = (page) => page.evaluate(() => { const out = new Set(), add = (s) => { s = (s || '').replace(/\s+/g, ' ').trim(); if (s && s.length > 1) out.add(s); };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const p = w.currentNode.parentElement; if (p && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) add(w.currentNode.nodeValue); }
  for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder']) add(el.getAttribute(a));
  add(document.title); add(document.querySelector('meta[name=description]')?.content); return [...out]; });
const ALLOW = new Set(['ES', 'EN', 'PT', 'Blog', 'Español', 'English', 'Português (Brasil)', 'Leer esta página en español', 'Read this page in English']);
const pick = async (page, code) => { await page.click('.language-toggle'); await page.click(`.language-list a[hreflang="${code}"]`); };
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: W < 800 ? 844 : 900 }, isMobile: W < 800, hasTouch: W < 800 });
const bad = []; let n = 0;
for (const r of routes) {
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', (e) => errs.push(e.message.slice(0, 120))); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text().slice(0, 120)); });
  try {
    await page.goto(base + r, { waitUntil: 'load' }); await page.waitForTimeout(900);
    await page.evaluate(() => { window.__nr = 1; });
    // ES → EN
    await pick(page, 'en'); await page.waitForURL(/\/en(\/|$)/, { timeout: 8000 }); await page.waitForTimeout(1100); n++;
    const url = new URL(page.url()).pathname; if (url.replace(/^\/en/, '') !== (r === '/' ? '' : r) && !(r === '/' && url === '/en/')) bad.push(`${r}: URL EN inesperada ${url}`);
    if (await page.evaluate(() => window.__nr) !== 1) bad.push(`${r}: el cambio a EN recargó la página`);
    if (await page.evaluate(() => document.documentElement.lang) !== 'en') bad.push(`${r}: html lang no es en`);
    for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).sp) bad.push(`${r} [EN]: ${s.slice(0, 120)}`);
    // navegación interna dentro de EN
    const link = page.locator('header nav a[href*="/en/"]').nth(1); if (await link.count()) { const href = await link.getAttribute('href'); await link.click(); await page.waitForTimeout(1200);
      if (!/^\/en(\/|$)/.test(new URL(page.url()).pathname)) bad.push(`${r}: navegación interna salió de /en → ${page.url()}`);
      for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).sp) bad.push(`${r} → ${href} [EN]: ${s.slice(0, 120)}`);
      await page.goBack().catch(() => {}); await page.waitForTimeout(700); }
    // EN → PT-BR
    await pick(page, 'pt-BR'); await page.waitForURL(/\/pt-br(\/|$)/, { timeout: 8000 }); await page.waitForTimeout(1100); n++;
    if (await page.evaluate(() => window.__nr) !== 1) bad.push(`${r}: el cambio a PT-BR recargó la página`);
    if (await page.evaluate(() => document.documentElement.lang) !== 'pt-BR') bad.push(`${r}: html lang no es pt-BR`);
    for (const s of await grab(page)) if (!ALLOW.has(s) && (verdictPt(s).bad)) bad.push(`${r} [PT]: ${s.slice(0, 120)}`);
    const ptLink = page.locator('header nav a[href*="/pt-br/"]').nth(1); if (await ptLink.count()) { const href = await ptLink.getAttribute('href'); await ptLink.click(); await page.waitForTimeout(1200);
      if (!/^\/pt-br(\/|$)/.test(new URL(page.url()).pathname)) bad.push(`${r}: navegación interna salió de /pt-br → ${page.url()}`);
      for (const s of await grab(page)) if (!ALLOW.has(s) && verdictPt(s).bad) bad.push(`${r} → ${href} [PT]: ${s.slice(0, 120)}`); }
    // PT-BR → ES
    await pick(page, 'es-CO'); await page.waitForURL((u) => !/^\/(en|pt-br)(\/|$)/.test(u.pathname), { timeout: 8000 }); await page.waitForTimeout(1100); n++;
    if (await page.evaluate(() => window.__nr) !== 1) bad.push(`${r}: el cambio a ES recargó la página`);
    if (!/^es/.test(await page.evaluate(() => document.documentElement.lang))) bad.push(`${r}: html lang no es es`);
    for (const s of await grab(page)) if (!ALLOW.has(s) && verdict(s).en) bad.push(`${r} [ES]: ${s.slice(0, 120)}`);
  } catch (e) { bad.push(`${r}: fallo ${e.message.slice(0, 100)}`); }
  if (errs.length) bad.push(`${r}: consola ${errs.slice(0, 2).join(' | ')}`);
  await page.close();
}
await browser.close();
console.log(`rutas ${routes.length}, cambios de idioma con el selector ${n}, problemas ${bad.length}`); for (const b of bad.slice(0, 120)) console.log(' -', b);
