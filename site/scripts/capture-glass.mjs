// Capturas del lote «vidrio líquido»: selector, botones naranja, insignia de Google, compartir (menú abierto), resplandor al pasar el cursor y flota con equipamiento.
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417', out = 'test-results/ronda-j';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const tag = `${w}-${theme}`, mobile = w < 800, ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); } catch { /* */ } }, theme);
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/experiencias', { waitUntil: 'load' }); await page.waitForTimeout(1500);
  await page.locator('.catalog-tools').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/glass-selector-${tag}.png` });
  await page.getByRole('button', { name: 'Naturaleza y café' }).click().catch(async () => { await page.locator('.filters button').nth(3).click(); }); await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/glass-selector-activo-${tag}.png` });
  await page.locator('.filters button').first().click(); await page.waitForTimeout(500);
  const card = page.locator('.tour-card').first(); await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  if (!mobile) { await card.hover(); await page.waitForTimeout(450); }
  await page.screenshot({ path: `${out}/glass-tarjeta-${mobile ? 'tactil' : 'hover'}-${tag}.png` });
  await page.locator('.tour-card-share').first().click(); await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/glass-compartir-${tag}.png` });
  await page.getByRole('menuitem', { name: 'Copiar enlace' }).click().catch(() => {}); await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/glass-compartir-copiado-${tag}.png` });
  await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  await page.goto(base + '/vehiculos', { waitUntil: 'load' }); await page.waitForTimeout(1200);
  await page.locator('.fleet-grid').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/flota-${tag}.png` });
  if (!mobile) { await page.locator('.vehicle').nth(1).hover(); await page.waitForTimeout(450); await page.screenshot({ path: `${out}/flota-hover-${tag}.png` }); }
  await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1200);
  await page.locator('.home-close').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/boton-naranja-${tag}.png` });
  if (errors.length) console.log(tag, 'ERRORES', errors.slice(0, 2));
  await ctx.close();
}
await browser.close();
console.log('listo');
