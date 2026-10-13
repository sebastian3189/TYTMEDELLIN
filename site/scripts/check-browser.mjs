import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const output = path.resolve('test-results');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const issues=[];
page.on('pageerror', error => issues.push(error.message));
const base=process.env.TYT_TEST_URL||'http://127.0.0.1:4173';
await page.goto(base, {waitUntil:'networkidle'});
await page.screenshot({path:path.join(output,'home-desktop.png'),fullPage:false});
// Slugs desde el código fuente (la prueba corre contra el build prerenderizado, no contra el servidor de desarrollo).
const slugs=[...(await fs.readFile(new URL('../src/tours-text.js',import.meta.url),'utf8')).matchAll(/^\s*\['([a-z0-9-]+)',/gm)].map(m=>m[1]);
const routes=['/','/experiencias','/vehiculos','/nosotros','/blog','/contacto','/servicios','/calificaciones','/privacidad','/cotizar',...slugs.map(s=>`/experiencias/${s}`),'/blog/preparar-tu-recorrido','/blog/elegir-tu-experiencia','/blog/viajar-en-grupo'];
const results=[];
for(const route of routes){
 await page.goto(base+route,{waitUntil:'networkidle'});
 const h1=await page.locator('h1').count();
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.getAttribute('src')&&i.complete&&i.naturalWidth===0).map(i=>i.src));
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 if(h1!==1||broken.length||overflow)issues.push(`${route}: h1=${h1}, broken=${broken}, overflow=${overflow}`);
 results.push({route,h1,broken,overflow});
}
await page.goto(base+'/experiencias');
await page.getByRole('button',{name:'Naturaleza',exact:true}).click();
if(await page.locator('.tour-card').count()!==2)issues.push('Nature filter count');
await page.getByRole('button',{name:'Todos',exact:true}).click();
await page.getByPlaceholder('Café, Guatapé, ciudad…').fill('guatape');
if(await page.locator('.tour-card').count()!==1)issues.push('Accent-insensitive search');
await page.goto(base+'/experiencias/guatape-piedra-del-penol');
await page.screenshot({path:path.join(output,'tour-desktop.png')});
if(await page.locator('.journey-line, .scroll-scene, .route-story').count())issues.push('Quedan restos de JourneyLine/ScrollScene en la ficha');
if((await page.locator('header nav a').first().textContent()).trim()!=='Inicio')issues.push('El primer enlace de la navegación no es Inicio');
await page.getByRole('button',{name:'Ampliar fotografía 1 de Guatapé & Piedra del Peñol',exact:true}).click();
if(!await page.locator('dialog').isVisible())issues.push('Lightbox did not open');
await page.keyboard.press('ArrowRight');
if(!(await page.locator('.lightbox .gallery-controls span').textContent()).includes('2 /'))issues.push('Lightbox next failed');
await page.keyboard.press('Escape');
if(await page.locator('dialog').isVisible())issues.push('Lightbox Escape failed');
await page.waitForSelector('form.quote-form');await page.waitForTimeout(1000);
await page.getByRole('button',{name:'Preparar mi consulta'}).click();
if(await page.locator('small.error').count()<5)issues.push('Missing required validation');
await page.getByLabel('Nombre *',{exact:true}).fill('Prueba de interfaz');
await page.locator('#telefono').fill('300 000 0000');
await page.getByLabel('Fecha del recorrido *',{exact:true}).fill('2027-12-20');
await page.getByLabel('Personas *',{exact:true}).fill('4');
await page.locator('#consentimiento').check();
await page.getByRole('button',{name:'Preparar mi consulta'}).click();
if(!await page.locator('.summary').isVisible())issues.push('Valid form does not show summary');
if(!(await page.getByLabel('Resumen de solicitud').inputValue()).includes('Guatapé'))issues.push('Form lost tour context');
if((await page.locator('.summary a').getAttribute('href')).includes('Prueba'))issues.push('PII in WhatsApp URL');
const missing=await page.goto(base+'/experiencias/no-existe');
if(missing.status()!==404)issues.push('Missing HTTP 404 status');
if(!(await page.locator('h1').textContent()).includes('no está'))issues.push('404 component absent');
for(const width of [320,360,390,768,1024,1280,1440,1920]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/experiencias','/experiencias/guatape-piedra-del-penol','/contacto','/vehiculos']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))issues.push(`Overflow ${width}px ${route}`);
 }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base);
await page.screenshot({path:path.join(output,'home-mobile.png'),fullPage:true});
await page.getByRole('button',{name:'Menú'}).click();
await page.getByRole('navigation',{name:'Principal',exact:true}).getByRole('link',{name:'Experiencias',exact:true}).click();
if(!page.url().endsWith('/experiencias'))issues.push('Mobile navigation');
await page.emulateMedia({reducedMotion:'reduce'});
await page.setViewportSize({width:1440,height:1000});
await page.goto(base+'/experiencias/tour-del-cafe-medellin');
if(await page.locator('.story article:visible').count()!==3)issues.push('Reduced-motion chapters missing');
await page.screenshot({path:path.join(output,'tour-reduced.png'),fullPage:true});
await writeFile(path.join(output,'browser-report.json'),JSON.stringify({results,issues},null,2));
console.log(JSON.stringify({routes:results.length,issues,screenshots:output},null,2));
await browser.close();
if(issues.length)process.exitCode=1;
