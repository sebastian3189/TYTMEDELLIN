import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290';
const [cw, ch] = (process.env.VP || '390x844').split('x').map(Number); const dark = process.env.DARK === '1'; const tag = process.env.TAG || '';
const which = (process.env.IDX || '1,7,2').split(',').map(Number);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: cw < 800, isMobile: cw < 800, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true');
const g = await p.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight }; });
const gu = (u) => g.top - g.hh + (u / g.total) * g.span;
for (const i of which) for (const sf of [0.3, 0.56, 0.85]) {
  await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), gu(34 + (i + sf) * (cw < 1100 ? 80 : 30))); await p.waitForTimeout(900);
  await p.screenshot({ path: `test-results/ronda-usuario/th-${cw}${dark ? 'd' : 'l'}-${i}-${sf}${tag}.png` });
}
await browser.close();
