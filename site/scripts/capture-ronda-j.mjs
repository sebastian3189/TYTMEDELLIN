// Capturas de la ronda J (Spec 03 §J5): inicio, espacios de video, baraja, redes, libro (5 fases del giro), formulario y cabecera/botones en oscuro.
// Uso: TYT_TEST_URL=http://127.0.0.1:<puerto> node scripts/capture-ronda-j.mjs [--only=inicio,libro,...]
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const out = 'test-results/ronda-j';
await mkdir(out, { recursive: true });
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1]?.split(',');
const want = (name) => !only || only.includes(name);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const sizes = [[1440, 900, 1], [390, 844, 2]];
try {
  for (const theme of ['light', 'dark']) for (const [w, h, dpr] of sizes) {
    const tag = `${w}-${theme}`;
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 800, colorScheme: theme });
    await context.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* sin almacenamiento */ } }, theme);
    const page = await context.newPage();
    const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true');
    await page.waitForTimeout(800);
    if (want('hero')) await page.screenshot({ path: `${out}/hero-${tag}.png` });
    if (want('inicio')) await page.screenshot({ path: `${out}/inicio-completo-${tag}.png`, fullPage: true });
    const shot = async (sel, name, pad = 0) => { const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await page.screenshot({ path: `${out}/${name}-${tag}.png` }); };
    if (want('historia')) await shot('.home-story', 'historia');
    if (want('baraja')) {
      const top = await page.evaluate(() => document.querySelector('.scrub-hero').getBoundingClientRect().top + scrollY);
      await page.evaluate((t) => scrollTo(0, t), top); await page.waitForTimeout(700); await page.screenshot({ path: `${out}/baraja-inicio-${tag}.png` });
      const total = await page.evaluate(() => document.querySelector('.scrub-track').offsetHeight);
      await page.evaluate((t) => scrollTo(0, t), top + total * 0.35); await page.waitForTimeout(1500); await page.screenshot({ path: `${out}/baraja-pelicula-${tag}.png` });
    }
    if (want('redes')) await shot('.home-social', 'redes');
    if (want('cierre')) await shot('.home-close', 'cierre');
    if (want('aliados')) await shot('.allies', 'aliados');
    if (want('libro')) {
      const book = page.locator('.ft-book'); await book.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
      const clip = async (name) => { const box = await book.locator('.ft-main').boundingBox(); await page.screenshot({ path: `${out}/libro-${name}-${tag}.png`, clip: box }); };
      await clip('reposo');
      for (const dir of ['next', 'prev']) {
        if (dir === 'prev') { await book.getByRole('button', { name: 'Nota siguiente' }).click(); await page.waitForTimeout(1200); }
        await book.getByRole('button', { name: dir === 'next' ? 'Nota siguiente' : 'Nota anterior' }).click();
        await page.waitForTimeout(40);
        const dur = w < 800 ? 700 : 850;
        for (const pct of [0.25, 0.5, 0.75]) {
          await page.evaluate(({ pct, dur }) => { document.querySelector('.ft-turn-window')?.getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = pct * dur; }); }, { pct, dur });
          await page.waitForTimeout(80);
          await clip(`${dir}-${Math.round(pct * 100)}`);
        }
        await page.waitForTimeout(1200);
      }
    }
    if (want('cabecera')) { await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300); await page.screenshot({ path: `${out}/cabecera-hero-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 140 } }); await page.evaluate(() => scrollTo(0, 1400)); await page.waitForTimeout(500); await page.screenshot({ path: `${out}/cabecera-solida-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 140 } }); }
    if (errors.length) console.log(tag, 'ERRORES', errors.slice(0, 3));
    await context.close();
  }
  if (want('formulario')) for (const theme of ['light', 'dark']) for (const [w, h, dpr] of sizes) {
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 800, colorScheme: theme });
    await context.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* sin almacenamiento */ } }, theme);
    const page = await context.newPage();
    await page.goto(base + '/cotizar', { waitUntil: 'load' }); await page.waitForSelector('.quote-form form, form.quote-form, .quote-form input'); await page.waitForTimeout(800);
    await page.locator('.quote-form').first().scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Preparar mi consulta/ }).click(); await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/formulario-${w}-${theme}.png` });
    await context.close();
  }
} finally { await browser.close(); }
console.log('capturas en', out);
