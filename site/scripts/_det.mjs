import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
for (const w of [1440,390]) { const p = await (await b.newContext({viewport:{width:w,height:900}})).newPage(); await p.goto('http://127.0.0.1:4417/experiencias/guatape-piedra-del-penol'); await p.waitForTimeout(1200);
 const y = await p.evaluate(()=>document.querySelector('#detalles').getBoundingClientRect().top+scrollY); await p.evaluate(v=>scrollTo({top:v-120,behavior:'instant'}),y); await p.waitForTimeout(1500);
 const h = await p.evaluate(()=>({h:document.querySelector('#detalles').offsetHeight, it:document.querySelector('.it').getBoundingClientRect().top+scrollY-document.querySelector('#detalles').getBoundingClientRect().top-scrollY}));
 console.log(w,JSON.stringify(h)); await p.screenshot({path:`test-results/itinerarios/detalles-${w}.png`}); }
await b.close();
