import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true }); const errs=[];
for (const [w,h,d] of [[390,844,0],[1440,900,0],[1440,900,1]]) { const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: w<800, hasTouch: w<800, colorScheme: d?'dark':'light' }); const p = await c.newPage(); p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,100)));
 await p.addInitScript((x)=>{try{localStorage.setItem('tyt-tema',x?'dark':'light')}catch{}},d); await p.goto('http://127.0.0.1:5291/experiencias'); await p.waitForTimeout(2000); await p.screenshot({ path: `test-results/ronda-usuario-2/catalogo-${w}${d?'d':'l'}.png` });
 console.log(w, d, await p.evaluate(()=>{const r=document.querySelector('.home-hero').getBoundingClientRect();return [r.width,r.height,document.querySelectorAll('h1').length,document.querySelectorAll('.hs-img').length]})); await c.close(); }
console.log(errs); await b.close();
