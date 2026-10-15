import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [w,h] of [[1100,800],[1280,700],[1280,720],[1366,768]]) {
  const p = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto('http://127.0.0.1:5291/', { waitUntil: 'load' }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const m = document.getElementById('th-inicio'); scrollTo({ top: m.getBoundingClientRect().top + scrollY + 10, behavior: 'instant' }); }); await p.waitForTimeout(1200);
  console.log(w,h, await p.evaluate(() => { const r = (s) => { const b = document.querySelector(s).getBoundingClientRect(); return [b.left,b.top,b.right,b.bottom].map(Math.round); }; return { panel: r('.th-panel'), stage: r('.th-stage'), title: r('.th-title-host'), deck: r('.th-deck'), head: r('.th-head'), hand: r('.th-hand'), ver: r('.th-row') }; }));
}
await browser.close();
