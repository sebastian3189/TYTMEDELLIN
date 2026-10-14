import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

import { rawTours } from '../src/tours-text.js';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[]; page.on('pageerror',e=>errors.push(e.stack));
 await page.goto((process.env.TYT_TEST_URL||'http://127.0.0.1:4417'));await page.waitForSelector('[data-hydrated=true]');
 await context.close();
 const small=await browser.newContext({viewport:{width:360,height:640},isMobile:true,hasTouch:true});
 const tourPage=await small.newPage();tourPage.on('pageerror',e=>errors.push(e.stack));
 for(const [slug] of rawTours){
  await tourPage.goto((process.env.TYT_TEST_URL||'http://127.0.0.1:4417')+'/experiencias/'+slug);
  await tourPage.waitForSelector('.story:not(.story-static)');
  await tourPage.evaluate(()=>{const el=document.querySelector('.story'),st=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(st).top)+60,behavior:'instant'})});
  await tourPage.waitForTimeout(350);
  const hit=await tourPage.locator('.chapter-controls button').first().evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))});
  assert(hit,'chapter controls covered: '+slug);
  const fits=await tourPage.locator('.story-inner').evaluate(el=>el.scrollHeight<=el.clientHeight+2);
  assert(fits,'story overflow: '+slug);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: all 12 tour stories fit 360x640 with touchable chapter controls; no route errors');
 await small.close();
}finally{await browser.close();}
