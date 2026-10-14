import { chromium } from '@playwright/test';
const base = process.env.B || 'http://127.0.0.1:5290'; const tag = process.env.TAG || 'after';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [cw, ch] of [[390, 844], [360, 800]]) for (const dark of [false, true]) {
  const c = await browser.newContext({ viewport: { width: cw, height: ch }, hasTouch: true, isMobile: true, colorScheme: dark ? 'dark' : 'light' }); const p = await c.newPage();
  await p.addInitScript((d) => { try { localStorage.setItem('tyt-tema', d ? 'dark' : 'light'); } catch {} }, dark);
  await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const g = await p.evaluate(() => { const t = document.querySelector('.scrub-track'); const r = t.getBoundingClientRect(); const th = document.querySelector('.th'); return { bottom: r.bottom + scrollY, h: innerHeight, thTop: th.getBoundingClientRect().top + scrollY, trackH: t.offsetHeight }; });
  console.log(cw, dark, JSON.stringify(g));
  const info = [];
  for (const off of [-0.9, -0.6, -0.3, 0, 0.3]) {
    await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), g.bottom - g.h + off * g.h); await p.waitForTimeout(800);
    await p.screenshot({ path: `test-results/ronda-usuario/end-${cw}${dark ? 'd' : 'l'}-${String(off).replace('-', 'm')}-${tag}.png` });
  }
  await c.close();
}
await browser.close();
