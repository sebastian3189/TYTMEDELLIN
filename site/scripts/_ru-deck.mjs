import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290'; const tag = process.env.TAG;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const dark of [false, true]) {
  const c = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
  await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const top = await p.evaluate(() => document.querySelector('.scrub-track').getBoundingClientRect().top + scrollY - 76);
  for (const d of [0, 120, 260]) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top + d); await p.waitForTimeout(900); await p.screenshot({ path: `test-results/ronda-usuario/deck-${dark ? 'd' : 'l'}-${d}-${tag}.png` }); }
  await c.close();
}
await browser.close();
