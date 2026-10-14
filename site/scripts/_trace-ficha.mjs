// Traza de scroll en móvil: agrega la duración por tipo de evento (Layout, UpdateLayoutTree, Paint, FunctionCall...) y los scripts más pesados.
import { chromium } from '@playwright/test'; import { writeFileSync } from 'node:fs';
const base = process.env.B || 'http://127.0.0.1:5291', slug = process.env.SLUG || 'city-tour-comuna-13', cpu = Number(process.env.CPU || 4);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
await page.goto(`${base}/experiencias/${slug}`, { waitUntil: 'load' }); await page.waitForTimeout(2500);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
const events = []; cdp.on('Tracing.dataCollected', (d) => events.push(...d.value));
await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline,v8.execute', transferMode: 'ReportEvents' });
const H = await page.evaluate(() => document.documentElement.scrollHeight);
await page.evaluate(({ to, step }) => new Promise((resolve) => { let y = 0; const tick = () => { y += step; scrollTo({ top: y, behavior: 'instant' }); if (y < to) requestAnimationFrame(tick); else setTimeout(resolve, 300); }; requestAnimationFrame(tick); }), { to: H - 844, step: 30 });
const done = new Promise((r) => cdp.once('Tracing.tracingComplete', r)); await cdp.send('Tracing.end'); await done;
const agg = {}; const fns = {};
for (const e of events) { if (e.ph !== 'X' || !e.dur) continue; agg[e.name] = (agg[e.name] || 0) + e.dur / 1000; if (e.name === 'FunctionCall' || e.name === 'EvaluateScript') { const u = (e.args?.data?.url || '').split('/').pop().split('?')[0] + ':' + (e.args?.data?.functionName || ''); fns[u] = (fns[u] || 0) + e.dur / 1000; } }
const top = Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 16).map(([k, v]) => `${k}=${v.toFixed(0)}ms`); console.log(top.join('\n'));
console.log('--- funciones'); console.log(Object.entries(fns).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `${k}=${v.toFixed(0)}ms`).join('\n'));
await browser.close();
