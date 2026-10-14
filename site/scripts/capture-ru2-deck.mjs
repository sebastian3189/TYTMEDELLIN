// Baraja previa a la película (escritorio): B=url DARK=0|1 U=2,15,45 node scripts/capture-ru2-deck.mjs  (u en svh dentro de la pista; t0=30, t1=80)
import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291', dark = process.env.DARK === '1', us = (process.env.U || '2,15,45').split(',').map(Number), out = process.env.OUT || 'test-results/ronda-usuario-2';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage(); const errs = [];
p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(m.text().slice(0, 140)); }); p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.hydrated === 'true'); await p.waitForTimeout(800);
const g = await p.evaluate(() => { const t = document.querySelector('.scrub-track'), s = document.querySelector('.scrub-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--total')), hh: document.querySelector('.site-header').offsetHeight }; });
for (const u of us) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.top - g.hh + (u / g.total) * g.span); await p.waitForTimeout(1600); await p.screenshot({ path: `${out}/deck-1440${dark ? 'd' : 'l'}-u${u}.png` });
  const m = await p.evaluate(() => { const c = [...document.querySelectorAll('.bd-card')].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0); const top = [...document.querySelectorAll('.bd-card')].sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0]?.querySelector('.bd-tilt').getBoundingClientRect(); return { topCard: top && { w: Math.round(top.width), h: Math.round(top.height) } }; }); console.log(u, JSON.stringify(m)); }
console.log('console:', JSON.stringify(errs.slice(0, 5))); await browser.close();
