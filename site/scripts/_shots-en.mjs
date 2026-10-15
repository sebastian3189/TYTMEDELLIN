import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:w<800, hasTouch:w<800, deviceScaleFactor: w<800?2:1 }); const p = await ctx.newPage();
  const out='test-results/itinerarios/en-';
  await p.goto('http://127.0.0.1:4417/en'); await p.waitForTimeout(1500); await p.screenshot({path:`${out}home-${w}.png`});
  for (const [name, sel] of [['different','.different, [aria-labelledby*="different"], #diferentes'],['faq','.faq, #faq, details']]) { const el=p.locator(sel).first(); if (await el.count()) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); await p.screenshot({path:`${out}${name}-${w}.png`}); } else console.log('no',name); }
  await p.goto('http://127.0.0.1:4417/en/experiencias/hacienda-napoles'); await p.waitForSelector('.it'); await p.waitForTimeout(800);
  await p.evaluate(()=>{const s=document.querySelector('.it');if(s.classList.contains('it-sticky')){const i=s.querySelector('.it-inner'),n=s.querySelectorAll('.it-art').length,st=parseFloat(getComputedStyle(i).top)||0,t=s.offsetHeight-i.offsetHeight;scrollTo({top:s.getBoundingClientRect().top+scrollY-st+t*((5+.5)/n),behavior:'instant'})}else{scrollTo({top:s.querySelectorAll('.it-card')[5].getBoundingClientRect().top+scrollY-96,behavior:'instant'})}});
  await p.waitForTimeout(1000); await p.screenshot({path:`${out}hacienda-${w}.png`});
  await ctx.close();
}
await b.close();
