import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5291'; const out = 'test-results/ronda-usuario-3';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const sizes = (process.env.SIZES || '1440x900').split(',').map((s) => s.split('x').map(Number));
const tours = (process.env.TOURS || '0,8,4').split(',').map(Number);
for (const [w, h] of sizes) {
  const c = await browser.newContext({ viewport: { width: w, height: h } }); const p = await c.newPage();
  const logs = []; p.on('console', (m) => ['error', 'warning'].includes(m.type()) && logs.push(m.text())); p.on('pageerror', (e) => logs.push('PE ' + e.message));
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.waitForSelector('.th-stage'); await p.evaluate(() => { if (innerWidth < 1100) { const st = document.querySelector('.th-stage'); scrollTo({ top: st.getBoundingClientRect().top + scrollY - (document.querySelector('.site-header')?.offsetHeight || 76), behavior: 'instant' }); } else { const m = document.getElementById('th-inicio'); scrollTo({ top: m.getBoundingClientRect().top + scrollY + 10, behavior: 'instant' }); } }); await p.waitForTimeout(1200);
  for (const i of tours) {
    await p.click(`#th-tab-${i}`); await p.waitForTimeout(1600);
    const r = await p.evaluate(() => {
      const box = (e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; };
      const targets = { cta: '.th-panel .button', count: '.th-count', line: '.th-line', arrows: '.th-arrows--in', wa: '.wa-fab', cap: '.th-cap', title: '.th-title-link', title: '.th-title' };
      const tb = {}; for (const [k, s] of Object.entries(targets)) { const e = document.querySelector(s); if (e && e.getBoundingClientRect().width) tb[k] = box(e); }
      const photos = [...document.querySelectorAll('.th-photo')].filter((e) => +e.style.opacity > 0.05 && getComputedStyle(e).visibility !== 'hidden').map((e) => ({ k: e.dataset.k, b: box(e) }));
      const deck = document.querySelector('.th-deck'); const imgs = deck ? [...deck.querySelectorAll('img')].map((e) => ({ k: 'deck', b: box(e) })) : [];
      const ov = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
      const hits = []; for (const ph of [...photos, ...imgs]) for (const [k, b] of Object.entries(tb)) { const o = ov(ph.b, b); if (o > 0 && k !== 'title' && k !== 'cap') hits.push(`${ph.k}->${k}:${Math.round(o)}`); }
      return { hits, deck: imgs.map((d) => d.b.map(Math.round)), wa: tb.wa?.map(Math.round), cta: tb.cta?.map(Math.round), count: tb.count?.map(Math.round) };
    });
    console.log(w + 'x' + h, 'tour', i, JSON.stringify(r));
    await p.screenshot({ path: `${out}/th-${w}x${h}-t${i}.png` });
  }
  if (logs.length) console.log('LOGS', logs); await c.close();
}
await browser.close();
