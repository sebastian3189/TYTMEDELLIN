import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
await p.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
await p.goto('http://127.0.0.1:5199/experiencias', { waitUntil: 'load' }); await p.waitForTimeout(1500);
const els = await p.locator('.tour-card-image').all();
for (let i = 0; i < els.length; i++) { await els[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(250); }
await p.evaluate(() => scrollTo(0, 0));
// contact sheet: clone images into a grid
await p.evaluate(() => { const g = document.createElement('div'); g.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#222;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:6px;overflow:auto'; document.querySelectorAll('.tour-card').forEach((c) => { const w = document.createElement('div'); w.style.cssText = 'position:relative'; const im = c.querySelector('.tour-card-image'); const cl = im.cloneNode(true); cl.style.width = '100%'; w.append(cl); const n = document.createElement('div'); n.textContent = c.querySelector('h3')?.textContent; n.style.cssText = 'color:#fff;font:12px Arial'; w.append(n); g.append(w); }); document.body.append(g); });
await p.waitForTimeout(800); await p.screenshot({ path: 'test-results/ronda-webp-encuadre/_hoja-tarjetas.png' }); await b.close();
