import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290';
const [cw, ch] = (process.env.VP || '390x844').split('x').map(Number); const dark = process.env.DARK === '1';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: true, isMobile: true, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load/.test(m.text())) errs.push(m.text().slice(0, 150)); });
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.layout === 'flow', null, { timeout: 15000 });
for (const i of (process.env.IDX || '1,6,7').split(',').map(Number)) {
  await p.evaluate((i) => { const el = document.getElementById('th-f-' + i); scrollTo({ top: el.getBoundingClientRect().top + scrollY - 140, behavior: 'instant' }); }, i); await p.waitForTimeout(1300);
  await p.screenshot({ path: `test-results/ronda-usuario/flow-${cw}${dark ? 'd' : 'l'}-${i}a.png` });
  await p.evaluate(() => scrollBy({ top: 520, behavior: 'instant' })); await p.waitForTimeout(900);
  await p.screenshot({ path: `test-results/ronda-usuario/flow-${cw}${dark ? 'd' : 'l'}-${i}b.png` });
}
console.log('errors', errs);
await browser.close();
