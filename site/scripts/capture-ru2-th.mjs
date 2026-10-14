// Capturas de «La mano de viaje» en móvil (Spec 03 §K7, ronda usuario 2): B=url VP=390x844 DARK=0|1 TOURS=0,5,9 TL=0.4 node scripts/capture-ru2-th.mjs
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', [cw, ch] = (process.env.VP || '390x844').split('x').map(Number), dark = process.env.DARK === '1';
const tours = (process.env.TOURS || '0,5,9').split(',').map(Number), tls = (process.env.TL || '0.4').split(',').map(Number), out = process.env.OUT || 'test-results/ronda-usuario-2';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: cw < 800, isMobile: cw < 800, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage(); const errs = [];
p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(m.text().slice(0, 140)); }); p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(800);
const geo = () => p.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight, layout: document.querySelector('.th').dataset.layout }; });
let g = await geo(); const RELAY = 34, LC = 232;
const goTl = async (tl) => { g = await geo(); const u = RELAY + tl * LC; await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.top - g.hh + (u / g.total) * g.span); await p.waitForTimeout(1300); };
await goTl(0.3);
for (const i of tours) {
  const chip = p.locator(`#th-tab-${i}`); await chip.scrollIntoViewIfNeeded().catch(() => {}); await chip.click(); await p.waitForTimeout(1200);
  for (const tl of tls) { await goTl(tl); await p.screenshot({ path: `${out}/th-${cw}${dark ? 'd' : 'l'}-t${i}-tl${tl}.png` });
    const m = await p.evaluate(() => { const r = (e) => e.getBoundingClientRect(); const cta = r(document.querySelector('.th-panel .button')), line = r(document.querySelector('.th-line')), ph = [...document.querySelectorAll('.th-group[style*="visible"] .th-photo')].filter((e) => Number(e.style.opacity) > 0.05).map((e) => r(e)); const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)); const front = [...document.querySelectorAll('.th-photo')].filter((e) => e.style.zIndex === '30').map(r)[0]; return { ctaTop: Math.round(cta.top), ctaBottom: Math.round(cta.bottom), overlapCTA: Math.round(ph.reduce((s, b) => s + inter(b, cta), 0)), overlapText: Math.round(ph.reduce((s, b) => s + inter(b, line), 0)), front: front && { w: Math.round(front.width), h: Math.round(front.height), top: Math.round(front.top) }, name: document.querySelector('.th-title')?.textContent, scrollY: Math.round(scrollY) }; });
    console.log(JSON.stringify({ tour: i, tl, ...m })); }
}
console.log('console:', JSON.stringify(errs.slice(0, 5))); await browser.close();
