import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { timeline,uForCard } from '../src/baraja-geometria.js';
import { rawTours } from '../src/tours-text.js';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[]; page.on('pageerror',e=>errors.push(e.stack));
 await page.goto('http://127.0.0.1:4173');await page.waitForSelector('[data-hydrated=true]');
 const T=timeline(true);
 await page.evaluate(({u,total})=>{const el=document.querySelector('.scrub-track'),st=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(st).top)+(el.offsetHeight-st.offsetHeight)*u/total,behavior:'instant'})},{u:uForCard(T,3),total:T.total});
 await page.waitForTimeout(700);
 const cdp=await context.newCDPSession(page);
 const before=await page.locator('.bd-card').nth(3).boundingBox();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:490}]});
 for(let y=470;y>=290;y-=20){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:195,y}]});await page.waitForTimeout(25);}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await page.waitForTimeout(500);
 const after=await page.locator('.bd-card').nth(3).boundingBox();
 assert(after.y<before.y-20,'vertical finger scroll moves photo vertically');
 assert(Math.abs(after.x+after.width/2-(before.x+before.width/2))<1,'no sideways trajectory');
 await context.close();
 const small=await browser.newContext({viewport:{width:360,height:640},isMobile:true,hasTouch:true});
 const tourPage=await small.newPage();tourPage.on('pageerror',e=>errors.push(e.stack));
 for(const [slug] of rawTours){
  await tourPage.goto('http://127.0.0.1:4173/experiencias/'+slug);
  await tourPage.waitForSelector('.story:not(.story-static)');
  await tourPage.evaluate(()=>{const el=document.querySelector('.story'),st=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(st).top)+60,behavior:'instant'})});
  await tourPage.waitForTimeout(350);
  const hit=await tourPage.locator('.chapter-controls button').first().evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))});
  assert(hit,'chapter controls covered: '+slug);
  const fits=await tourPage.locator('.story-inner').evaluate(el=>el.scrollHeight<=el.clientHeight+2);
  assert(fits,'story overflow: '+slug);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: native touch vertical/reversible axis; all 12 tour stories fit 360x640 with touchable chapter controls; no route errors');
 await small.close();
}finally{await browser.close();}
