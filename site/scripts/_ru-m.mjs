import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [w,h] of [[390,844],[360,800],[412,915]]) {
const c = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true }); const p = await c.newPage();
await p.goto('http://127.0.0.1:5290/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.layout === 'compact');
console.log(w, h, JSON.stringify(await p.evaluate(() => ['.th-stage','.th-head','.th-index','.th-title-host','.th-panel','.th-hand','.th-foot'].map((s) => [s, Math.round(document.querySelector(s).getBoundingClientRect().height)]))));
await c.close(); }
await browser.close();
