import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true }); const c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const p = await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('http://127.0.0.1:5291/'); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(500);
const top = await p.evaluate(() => document.querySelector('.th').getBoundingClientRect().top + scrollY);
const out = 'test-results/ronda-usuario-2/';
for (const [n, d] of [['a', 0], ['b', 350], ['c', 900]]) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top - 76 + d); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}th-nopin-${n}.png` }); console.log(n, await p.evaluate(() => [Math.round(document.querySelector('.th-stage').getBoundingClientRect().top), document.querySelector('.th-title')?.textContent])); }
await p.locator('#th-tab-4').click(); await p.waitForTimeout(1200); await p.screenshot({ path: `${out}th-nopin-d.png` });
await p.locator('.th-arrows--in button').nth(1).click(); await p.waitForTimeout(900); await p.screenshot({ path: `${out}th-nopin-e.png` });
console.log(errs); await b.close();
