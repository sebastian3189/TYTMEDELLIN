import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
for (const u of ['/', '/experiencias/guatape-piedra-del-penol', '/en', '/en/experiencias/hacienda-napoles']) { const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage(); const e=[]; p.on('pageerror',x=>e.push(x.message.slice(0,120))); p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))e.push(m.text().slice(0,120))}); await p.goto('http://127.0.0.1:5173'+u,{waitUntil:'load'}); await p.waitForTimeout(2500); console.log(u, 'errores:', e.length, e.slice(0,2), 'sticky:', await p.locator('.it').count()); }
await b.close();
