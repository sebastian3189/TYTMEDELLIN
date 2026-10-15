import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(`http://127.0.0.1:4417/en/experiencias/hacienda-napoles`); await p.waitForSelector('.it'); await p.waitForTimeout(1000);
console.log(await p.$eval('.it', e=>e.innerText.slice(0,900)));
console.log(await p.evaluate(()=>[...document.querySelectorAll('.it-art')].slice(0,2).map(a=>a.innerText)));
await b.close();
