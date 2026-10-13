import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:320,height:900}});
await page.goto('http://127.0.0.1:4173/contacto',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
console.log(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,nodes:[...document.querySelectorAll('body *')].filter(n=>n.scrollWidth>n.clientWidth+2||n.getBoundingClientRect().right>innerWidth+1).map(n=>({tag:n.tagName,class:n.className,width:n.clientWidth,scroll:n.scrollWidth,right:n.getBoundingClientRect().right})).slice(0,30)})));
await browser.close();
