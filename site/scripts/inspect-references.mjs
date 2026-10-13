import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results/references',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:960}});
try{
 await page.goto('https://travelnextlvl.de/en',{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForTimeout(1800);
 await page.screenshot({path:'test-results/references/travel-top.png'});
 await page.mouse.wheel(0,1000);await page.waitForTimeout(1800);
 await page.screenshot({path:'test-results/references/travel-scroll.png'});
 console.log('Travel reference captured',await page.title());
}catch(error){console.log('Travel limitation:',error.message)}
try{
 await page.goto('https://www.youtube.com/watch?v=QUI6Ug4cHnE&t=62s',{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForTimeout(1800);
 console.log('YouTube:',await page.title());
 console.log('Video elements:',await page.locator('video').count());
 await page.evaluate(()=>{const video=document.querySelector('video');if(video)video.currentTime=62});
 await page.waitForTimeout(1800);
 await page.screenshot({path:'test-results/references/video-62.png'});
 console.log((await page.locator('body').innerText()).slice(0,1600));
}catch(error){console.log('Video limitation:',error.message)}
await browser.close();
