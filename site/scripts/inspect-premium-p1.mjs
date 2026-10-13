import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('test-results/p1-corrections',{recursive:true});
const b=await chromium.launch({channel:'msedge',headless:true});
const p=await b.newPage();
for(const width of [1440,390])for(const route of ['experiencias','nosotros']){await p.setViewportSize({width,height:900});await p.goto('http://127.0.0.1:4181/'+route);await p.waitForTimeout(600);await p.screenshot({path:`test-results/p1-corrections/${route}-${width}.png`,fullPage:false})}
await b.close();
