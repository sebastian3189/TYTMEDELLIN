// Capturas del hero y de la ficha: B=url VP=390x844 DARK=0|1 SLUGS=a,b MODE=hero|full node scripts/capture-ru2-ficha.mjs
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', [cw, ch] = (process.env.VP || '390x844').split('x').map(Number), dark = process.env.DARK === '1', out = process.env.OUT || 'test-results/ronda-usuario-2';
const slugs = (process.env.SLUGS || 'city-tour-comuna-13,guatape-piedra-del-penol,traslados-aeropuerto-jmc').split(','), mode = process.env.MODE || 'hero', reduce = process.env.REDUCE === '1';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: cw < 800, isMobile: cw < 800, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light', reducedMotion: reduce ? 'reduce' : 'no-preference' });
const errs = [];
for (const slug of slugs) {
  const p = await c.newPage(); p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(slug + ': ' + m.text().slice(0, 140)); }); p.on('pageerror', (e) => errs.push(slug + ': PAGEERROR ' + e.message));
  await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
  await p.goto(`${base}/experiencias/${slug}`, { waitUntil: 'load' }); await p.waitForTimeout(1800);
  const tag = `${cw}${dark ? 'd' : 'l'}${reduce ? 'r' : ''}`;
  if (mode === 'hero') {
    await p.screenshot({ path: `${out}/hero-${slug}-${tag}-a.png` });
    const m = await p.evaluate(() => { const h = document.querySelector('.home-hero').getBoundingClientRect(), v = getComputedStyle(document.querySelector('.hero-shade') || document.body).backgroundColor, h1 = document.querySelectorAll('h1').length; return { w: Math.round(h.width), h: Math.round(h.height), top: Math.round(h.top), vh: innerHeight, h1, slides: document.querySelectorAll('.hs-img').length, on: document.querySelectorAll('.hs-img.is-on').length, headerBg: getComputedStyle(document.querySelector('.site-header')).backgroundColor }; });
    console.log(slug, JSON.stringify(m));
    if (!reduce) { await p.waitForTimeout(6200); await p.screenshot({ path: `${out}/hero-${slug}-${tag}-b.png` }); }
  } else {
    const H = await p.evaluate(() => document.documentElement.scrollHeight); const n = Number(process.env.N || 12);
    for (let i = 0; i < n; i++) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.min(H - ch, i * (H / n))); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/ficha-${slug}-${tag}-${String(i).padStart(2, '0')}.png` }); }
  }
  await p.close();
}
console.log('console:', JSON.stringify(errs.slice(0, 6))); await browser.close();
