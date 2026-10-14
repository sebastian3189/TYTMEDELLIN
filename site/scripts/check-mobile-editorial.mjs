import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const out='test-results/mobile-editorial'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const [width,height] of [[390,844],[360,640],[320,568],[768,1024],[1440,900]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<800,hasTouch:width<800});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto((process.env.TYT_TEST_URL||'http://127.0.0.1:4417')); await page.waitForSelector('[data-hydrated=true]');
  assert.equal(await page.locator('.scrub-hero .ft-book').count(),0);
  assert(await page.locator('main .blog-book').evaluate(el=>el.nextElementSibling?.classList.contains('home-close')),'book followed by closing section');
  await page.locator('.blog-book').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
  assert.equal(await page.locator('.blog-book .ft-thumb').count(),3);
  await page.locator('.ft-main').screenshot({path:`${out}/${width}-book.png`});
  await page.getByRole('button',{name:'Nota siguiente',exact:true}).click();
  assert.equal(await page.locator('.ft-book').getAttribute('data-turning'),'true');
  await page.waitForTimeout(750);
  assert.match(await page.locator('.ft-plan').getAttribute('href'),/^\/blog\/elegir/);
  await page.getByRole('button',{name:'Nota anterior',exact:true}).click();await page.waitForTimeout(650);
  // (El explorador se retiró, Spec 03 §K: su cobertura vive en check-mano.mjs.)
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.goto((process.env.TYT_TEST_URL||'http://127.0.0.1:4417')+'/experiencias/guatape-piedra-del-penol');
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
  console.log('PASS',width,height,'blog book, story, reduced');
  await context.close();
 }
}finally{await browser.close();}
