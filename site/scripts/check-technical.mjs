import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
const base=process.env.BASE_URL||'http://127.0.0.1:5173';
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[],errors=[];
const check=(name,value,detail)=>{results.push({name,pass:!!value,detail});};
try {
 for(const prefix of ['','/en','/pt-br']) {
  const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+prefix+'/experiencias');await page.locator('.consent-banner').waitFor();
  check(prefix+' no optional persistence',await page.evaluate(()=>localStorage.getItem('tyt-theme')===null));
  await page.locator('.consent-banner button').nth(2).click();
  check(prefix+' preferences initially off',!(await page.locator('.consent-dialog input').isChecked()));
  await page.locator('.consent-dialog input').check();await page.keyboard.press('Escape');
  check(prefix+' Escape no consent',await page.evaluate(()=>localStorage.getItem('tyt-privacy-v1')===null));
  await page.locator('.consent-banner button').nth(1).click();
  check(prefix+' reject recorded',await page.evaluate(()=>JSON.parse(localStorage.getItem('tyt-privacy-v1')).preferences===false));
  await page.reload();await page.locator('.consent-link').waitFor();await page.waitForTimeout(300);
  check(prefix+' persists reload',await page.locator('.consent-banner').count()===0);
  await page.locator('.consent-link').click();await page.locator('.consent-dialog input').check();await page.locator('.consent-dialog .consent-actions button').first().click();
  check(prefix+' accept preferences',await page.evaluate(()=>JSON.parse(localStorage.getItem('tyt-privacy-v1')).preferences===true));
  const second=await context.newPage();await second.goto(base+prefix+'/vehiculos');await second.locator('.consent-link').click();await second.locator('.consent-dialog .consent-actions button').last().click();await page.waitForTimeout(150);
  await page.locator('.consent-link').click();await page.waitForTimeout(100);check(prefix+' cross tab revoke',!(await page.locator('.consent-dialog input').isChecked()));await page.keyboard.press('Escape');await second.close();
  await page.evaluate(()=>window.scrollTo({top:1200,behavior:'instant'}));await page.waitForTimeout(300);
  check(prefix+' source scroll verified',await page.evaluate(()=>scrollY===1200),await page.evaluate(()=>scrollY));
  await page.locator('.site-header a[href="'+prefix+'/vehiculos"]').first().dispatchEvent('click');await page.waitForTimeout(1000);
  check(prefix+' new route top',await page.evaluate(()=>scrollY===0));
  await page.goBack();await page.waitForTimeout(900);check(prefix+' POP restored',await page.evaluate(()=>Math.abs(scrollY-1200)<4),await page.evaluate(()=>scrollY));
  await page.goForward();await page.waitForTimeout(500);check(prefix+' forward restored top',await page.evaluate(()=>scrollY===0));
  await page.goto(base+prefix+'/experiencias/guatape-piedra-del-penol#consulta');await page.waitForLoadState('networkidle');await page.waitForTimeout(800);
  check(prefix+' direct anchor',await page.evaluate(()=>{const y=document.getElementById('consulta').getBoundingClientRect().top,h=document.querySelector('.site-header').getBoundingClientRect().height;return Math.abs(y-h-16)<6;}),await page.locator('#consulta').evaluate(el=>el.getBoundingClientRect().top));
  await page.goto(base+prefix+'/cotizar?test=1#contenido');await page.locator('.language-toggle').selectOption('pt-BR');await page.waitForURL('**/pt-br/cotizar?test=1#contenido');
  check(prefix+' language preserves query/hash',page.url().endsWith('/pt-br/cotizar?test=1#contenido'));
  await context.close();
 }
 const expired=await browser.newContext();await expired.addInitScript(()=>localStorage.setItem('tyt-privacy-v1',JSON.stringify({version:1,preferences:true,expires:1})));
 const expiredPage=await expired.newPage();await expiredPage.goto(base+'/');await expiredPage.locator('.consent-banner').waitFor();check('expired consent requests choice',true);await expired.close();
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('blocked','SecurityError')}});
 const blockedPage=await blocked.newPage();await blockedPage.goto(base+'/');await blockedPage.locator('.consent-banner button').first().click();await blockedPage.locator('.consent-notice').waitFor();check('blocked storage uses session choice',await blockedPage.locator('.consent-banner').count()===0);await blocked.close();
 const context=await browser.newContext({viewport:{width:320,height:740}}),page=await context.newPage();
 await page.goto(base+'/pt-br/cotizar');await page.locator('.consent-banner').waitFor();
 check('320px no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('.consent-banner button').nth(2).click();await page.keyboard.press('Tab');check('modal traps focus',await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)));
 await page.screenshot({path:'test-results/technical-audit/consent-pt-mobile.png'});await context.close();
 check('no runtime errors',errors.length===0,errors);
} finally {await browser.close();await mkdir('test-results/technical-audit',{recursive:true});await writeFile('test-results/technical-audit/regression.json',JSON.stringify({base,results},null,2));}
console.log(JSON.stringify(results,null,2));assert.ok(results.every(r=>r.pass),'Technical regressions failed');
