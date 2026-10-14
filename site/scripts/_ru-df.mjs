import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290';
const [cw, ch] = (process.env.VP || '1440x900').split('x').map(Number); const dark = process.env.DARK === '1'; const m = cw < 800;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: m, isMobile: m, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (x) => { if (x.type() === 'error' && !/Failed to load/.test(x.text())) errs.push(x.text().slice(0, 150)); });
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForSelector('#diferentes');
const top = await p.evaluate(() => document.getElementById('diferentes').getBoundingClientRect().top + scrollY);
const H = await p.evaluate(() => document.getElementById('diferentes').offsetHeight);
console.log('section height', H);
const stops = (process.env.ST || '0,0.25,0.5,0.75,0.95').split(',').map(Number);
for (const f of stops) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top + f * (H - ch) - 40); await p.waitForTimeout(1400); await p.screenshot({ path: `test-results/ronda-usuario/df-${cw}${dark ? 'd' : 'l'}-${f}.png` }); }
console.log('errors', errs);
await browser.close();
