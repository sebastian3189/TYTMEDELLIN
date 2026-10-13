import { chromium } from '@playwright/test';
const base = 'http://127.0.0.1:4402', route = process.argv[2] || '/contacto', width = Number(process.argv[3] || 390);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: width < 800 ? 2 : 1, isMobile: width < 800 });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 562.5, downloadThroughput: Math.round(1.6 * 1024 * 1024 / 8), uploadThroughput: Math.round(750 * 1024 / 8) });
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await browser.startTracing(page, { categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'v8.execute', 'blink.user_timing', 'loading'] });
await page.goto(base + route, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(5000);
const ev = JSON.parse((await browser.stopTracing()).toString()).traceEvents;
const nav = ev.find((e) => e.name === 'navigationStart'), t0 = nav.ts;
const main = ev.filter((e) => e.ph === 'X' && e.pid === nav.pid && e.tid === nav.tid);
for (const e of main.filter((e) => ['Layout', 'UpdateLayoutTree', 'FunctionCall', 'v8.evaluateModule', 'Paint', 'ParseHTML'].includes(e.name) && e.dur > 12000).sort((a, b) => a.ts - b.ts)) {
  const a = e.args?.beginData || e.args?.data || {};
  console.log(String(Math.round((e.ts - t0) / 1000)).padStart(5), String(Math.round(e.dur / 1000)).padStart(4), e.name, a.dirtyObjects !== undefined ? `dirty=${a.dirtyObjects}/${a.totalObjects}` : '', a.url?.split('/').pop() || a.functionName || '');
}
await browser.close();
