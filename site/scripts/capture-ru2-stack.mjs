// Baraja interactiva de la ficha en 3 fases de arrastre: B=url VP=1440x900|390x844 DARK=0|1 SLUG=...
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', [cw, ch] = (process.env.VP || '1440x900').split('x').map(Number), dark = process.env.DARK === '1', slug = process.env.SLUG || 'city-tour-comuna-13', out = 'test-results/ronda-usuario-2/', errs = [];
const b = await chromium.launch({ channel: 'msedge', headless: true }); const c = await b.newContext({ viewport: { width: cw, height: ch }, isMobile: cw < 800, hasTouch: cw < 800, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120)));
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(`${base}/experiencias/${slug}`); await p.waitForSelector('.cs-card'); await p.waitForTimeout(1200);
await p.evaluate(() => { const r = document.querySelector('.cs').getBoundingClientRect(); scrollTo({ top: r.top + scrollY - 96, behavior: 'instant' }); }); await p.waitForTimeout(900);
const tag = `${cw}${dark ? 'd' : 'l'}`; await p.screenshot({ path: `${out}stack-${tag}-1-antes.png` });
const r = await p.locator('.cs-card.is-top').boundingBox(); const x = r.x + r.width / 2, y = r.y + r.height / 2;
await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x + 60, y + 10, { steps: 4 }); await p.mouse.move(x + 150, y + 20, { steps: 6 }); await p.waitForTimeout(150); await p.screenshot({ path: `${out}stack-${tag}-2-arrastre.png` });
await p.mouse.move(x + 260, y + 20, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(220); await p.screenshot({ path: `${out}stack-${tag}-3-vuelo.png` }); await p.waitForTimeout(900); await p.screenshot({ path: `${out}stack-${tag}-4-despues.png` });
console.log(await p.evaluate(() => document.querySelector('.cs-count').textContent), errs);
await p.locator('.cs-btns button').nth(1).click(); await p.waitForTimeout(900); console.log(await p.evaluate(() => document.querySelector('.cs-count').textContent));
await p.keyboard.press('Tab'); await b.close();
