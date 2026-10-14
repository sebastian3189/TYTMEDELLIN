import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290'; const tag = process.env.TAG || 'a9'; const dark = process.env.DARK !== '0';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(1500);
const g = await p.evaluate(() => { const t = document.querySelector('.scrub-track'); return { bottom: t.getBoundingClientRect().bottom + scrollY, h: innerHeight }; });
for (const d of (process.env.D || '-250,-120,0,60,120,200').split(',').map(Number)) {
  await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.bottom - g.h + d); await p.waitForTimeout(900);
  const info = await p.evaluate(() => ({ fin: getComputedStyle(document.querySelector('.th-stage') || document.body).opacity }));
  await p.screenshot({ path: `test-results/ronda-usuario/e2-${dark ? 'd' : 'l'}-${d}-${tag}.png` }); console.log(d, JSON.stringify(info));
}
await browser.close();
