import { chromium } from '@playwright/test'; import fs from 'node:fs';
const base = process.env.B || 'http://127.0.0.1:5290'; const out = process.argv[2];
const browser = await chromium.launch({ channel: 'msedge', headless: true }); const res = {};
for (const [w, h] of [[1440, 900], [900, 1000]]) {
  const c = await browser.newContext({ viewport: { width: w, height: h } }); const p = await c.newPage();
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true' && document.querySelector('.th-stage'));
  const g = await p.evaluate(() => { const t = document.querySelector('.th-track'), s = document.querySelector('.th-stage'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - s.offsetHeight, total: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight }; });
  const seg = w >= 1100 ? 30 : 80;
  for (const i of [0, 4, 10]) for (const sf of [0.05, 0.2, 0.5, 0.9, 0.97]) {
    const u = 34 + (i + sf) * seg; await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.top - g.hh + (u / g.total) * g.span); await p.waitForTimeout(700);
    res[`${w}-${i}-${sf}`] = await p.evaluate(() => [...document.querySelectorAll('.th-group')].map((gr) => [...gr.querySelectorAll('.th-photo')].map((im) => [im.style.transform, im.style.opacity, im.style.zIndex, im.style.width, im.style.height].join('|')).join(';')).join('\n'));
  }
  await c.close();
}
fs.writeFileSync(out, JSON.stringify(res, null, 1)); await browser.close();
