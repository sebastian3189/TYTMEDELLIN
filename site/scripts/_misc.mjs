import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true }); const errs = []; const o = 'test-results/ronda-usuario-2/';
for (const [w, h] of [[320, 640], [360, 740], [390, 844]]) for (const pre of ['', '/en']) {
  const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true }); const p = await c.newPage(); p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 100)));
  await p.goto(`http://127.0.0.1:5291${pre}/experiencias/city-tour-comuna-13`); await p.waitForTimeout(1800);
  await p.evaluate(() => scrollTo({ top: document.querySelector('.tn-sentinel').getBoundingClientRect().top + scrollY + 300, behavior: 'instant' })); await p.waitForTimeout(900);
  const m = await p.evaluate(() => { const n = document.querySelector('.tn-pill'), r = n.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), vw: innerWidth, sw: n.scrollWidth, cw: n.clientWidth, h: document.documentElement.scrollWidth }; });
  console.log(w, pre || 'es', JSON.stringify(m)); await p.screenshot({ path: `${o}tabs-${w}${pre ? 'en' : 'es'}.png`, clip: { x: 0, y: 0, width: w, height: 260 } }); await c.close(); }
for (const [w, h] of [[390, 844], [1440, 900]]) { const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 800, hasTouch: w < 800 }); const p = await c.newPage(); p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('http://127.0.0.1:5291/politica-de-tratamiento-de-datos'); await p.waitForTimeout(1500); await p.screenshot({ path: `${o}politica-${w}.png` });
  await p.goto('http://127.0.0.1:5291/privacidad'); await p.waitForTimeout(800); console.log('privacidad link', await p.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /tratamiento/i.test(a.textContent)).map((a) => a.getAttribute('href'))));
  await p.goto('http://127.0.0.1:5291/nosotros'); await p.waitForTimeout(800); await p.screenshot({ path: `${o}logo-${w}.png`, clip: { x: 0, y: 0, width: Math.min(w, 600), height: 100 } }); await c.close(); }
console.log(errs); await b.close();
