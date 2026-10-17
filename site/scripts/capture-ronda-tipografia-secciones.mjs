// Capturas por sección (home/experiencia/nosotros/vehículos) y comprobación de desborde horizontal. Uso: node scripts/capture-ronda-tipografia-secciones.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:5199', out = 'test-results/ronda-tipografia';
const env = (k, d) => (process.env[k] ? process.env[k].split(',') : d);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const sets = { inicio: ['', ['.home-story', '.service-band', '.df', '.faq-page', '.home-close']], experiencia: ['/experiencias/guatape-piedra-del-penol', ['.tour-intro', '.faq-page,.faq', '.quote-section']], nosotros: ['/nosotros', ['.about-hero,.page-title', '.timeline', '.quote-section,.contact-place']], vehiculos: ['/vehiculos', ['.page-title', '.vehicle']] };
const log = [];
for (const lang of env('LANGS', ['es'])) for (const w of env('WIDTHS', [1440]).map(Number)) for (const theme of env('THEMES', ['light', 'dark'])) for (const [name, [p, sels]] of Object.entries(sets).filter(([n]) => env('PAGES', [n]).includes(n))) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800, colorScheme: theme });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
  await page.goto(base + (lang === 'pt' ? '/pt-br' : '') + p, { waitUntil: 'load' }); await page.waitForTimeout(1500);
  for (const [i, s] of sels.entries()) {
    const el = page.locator(s).first(); if (!(await el.count())) { log.push(`sin ${s} en ${name}`); continue; }
    await el.scrollIntoViewIfNeeded(); await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), s.split(',')[0]); await page.waitForTimeout(1300);
    await page.screenshot({ path: `${out}/${name}-s${i}-${lang}-${w}-${theme}.png` });
  }
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 0) log.push(`DESBORDE ${name} ${lang} ${w} ${theme}: ${ov}px`);
  await ctx.close();
}
console.log(log.join('\n') || 'ok'); await browser.close();
