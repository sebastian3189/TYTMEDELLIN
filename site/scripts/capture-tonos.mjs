// Antes/después de las escalas tonales (Spec 03 §I.2): inicio y una ficha, 1440×900 y 390×844, claro y oscuro. Uso: node scripts/capture-tonos.mjs <antes|despues>
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', label = process.argv[2] || 'despues', out = 'test-results/ronda-j';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const tag = `${label}-${w}-${theme}`, mobile = w < 800, ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(1200);
  for (const [name, sel] of [['inicio-historia', '.home-story'], ['inicio-servicios', '.service-band'], ['inicio-resenas', '.reviews-g'], ['inicio-equipo', '.about-preview'], ['inicio-cierre', '.home-close'], ['inicio-pie', '.site-footer']]) {
    await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/tonos-${name}-${tag}.png` });
  }
  await p.screenshot({ path: `${out}/tonos-inicio-hero-${tag}.png`, clip: { x: 0, y: 0, width: w, height: h } }).catch(() => {});
  await p.goto(base + '/experiencias/guatape-piedra-del-penol', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/tonos-ficha-arriba-${tag}.png` });
  await p.evaluate(() => scrollTo({ top: innerHeight * 3, behavior: 'instant' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/tonos-ficha-medio-${tag}.png` });
  await p.locator('.site-footer').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/tonos-ficha-pie-${tag}.png` });
  await ctx.close();
}
await browser.close(); console.log('listo', label);
