import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const p = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const logs=[]; p.on('console', m => ['error','warning'].includes(m.type()) && logs.push(m.text())); p.on('pageerror', e => logs.push(e.message));
await p.goto('http://127.0.0.1:5291/en/politica-de-tratamiento-de-datos', { waitUntil: 'load' }); await p.waitForTimeout(1500);
await p.screenshot({ path: 'test-results/ronda-usuario-3/politica-en-1440.png' });
console.log(await p.evaluate(() => ({ title: document.title, h1: document.querySelector('h1').textContent, es: /[áéíóú¿ñ]/.test(document.querySelector('.policy-body').textContent), lang: document.documentElement.lang })), logs);
await browser.close();
