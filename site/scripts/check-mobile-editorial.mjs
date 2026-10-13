import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const out='test-results/mobile-editorial'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const [width,height] of [[390,844],[360,640],[320,568],[768,1024],[1440,900]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<800,hasTouch:width<800});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173'); await page.waitForSelector('[data-hydrated=true]');
  assert.equal(await page.locator('.scrub-hero .ft-book').count(),0);
  assert(await page.locator('main .blog-book').evaluate(el=>!el.nextElementSibling),'book last in main');
  await page.locator('.blog-book').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
  assert.equal(await page.locator('.blog-book .ft-thumb').count(),3);
  await page.locator('.ft-main').screenshot({path:`${out}/${width}-book.png`});
  await page.getByRole('button',{name:'Nota siguiente',exact:true}).click();
  assert.equal(await page.locator('.ft-book').getAttribute('data-turning'),'true');
  await page.waitForTimeout(750);
  assert.match(await page.locator('.ft-plan').getAttribute('href'),/^\/blog\/elegir/);
  await page.getByRole('button',{name:'Nota anterior',exact:true}).click();await page.waitForTimeout(650);
  await page.locator('.experience-explorer').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
  assert(await page.locator('.explorer-fan').isVisible());
  assert.equal(await page.locator('.fan-slot-0').count(),1);
  const before=Number((await page.locator('.explorer-caption').textContent()).match(/fotografía (\d+)/)[1]);
  await page.locator('.explorer-visual>.gallery-controls button').last().click();await page.waitForTimeout(650);
  assert(await page.locator('.explorer-caption').textContent().then(t=>t.includes(String(before%4+1).padStart(2,'0'))));
  await page.locator('.explorer-stage').screenshot({path:`${out}/${width}-explorer.png`});
  const pinned=await page.locator('.explorer-track').evaluate(el=>el.classList.contains('is-pinned'));
  if(pinned){
   for(const p of [.08,.4,.68,.94]){
    await page.evaluate(p=>{const el=document.querySelector('.explorer-track'),stage=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(stage).top)+(el.offsetHeight-stage.offsetHeight)*p,behavior:'instant'})},p);
    await page.waitForTimeout(650);
   }
   assert(await page.locator('.explorer-caption').textContent().then(t=>t.includes('04')));
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.goto('http://127.0.0.1:4173/experiencias/guatape-piedra-del-penol');
  await page.waitForTimeout(1100);
  if(height>600){
   assert.equal(await page.locator('.story-static').count(),0);
   for(let i=0;i<3;i++){
    await page.evaluate(i=>{const el=document.querySelector('.story'),stage=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(stage).top)+(el.offsetHeight-stage.offsetHeight)*(i/3+.08),behavior:'instant'})},i);
    await page.waitForTimeout(650);
    assert.equal(await page.locator('.story-articles article.active .chapter').textContent(),`0${i+1}`);
    const box=await page.locator('.story-inner').boundingBox();assert(box.y+box.height<=height+2,JSON.stringify(box));
    await page.screenshot({path:`${out}/${width}-story-${i}.png`});
   }
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
  assert.equal(await page.locator('.story-static').count(),1);
  assert.equal(await page.locator('.story-static .chapter-photo').count(),3);
  assert.deepEqual(errors,[]);
  console.log('PASS',width,height,'blog book, explorer, story, reduced; pinned explorer:',pinned);
  await context.close();
 }
}finally{await browser.close();}
