import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const media=JSON.parse(await readFile('src/exploration-media.json','utf8'));
const limits={main:70000,satellite:24000,mobile:55000},roles={},tours={};
for(const [slug,photos] of Object.entries(media)){
 let mobile=0;
 for(const [n,p] of Object.entries(photos))for(const [role,limit] of Object.entries(limits)){
  const bytes=(await stat('public'+p[role])).size,v=p.variants[role];assert.ok(bytes<=limit,`${slug}/${n}/${role}: ${bytes}`);assert.ok(v.quality>=60,`${slug}/${n}: q${v.quality}`);assert.equal(p.bytes[role],bytes);
  (roles[role]??=[]).push({width:v.width,height:v.height,quality:v.quality,bytes});if(role==='mobile')mobile+=bytes;
  if(p.horizontal)assert.ok(Math.abs(v.width/v.height-4/3)<.003,`${slug}/${n}: horizontal ratio`);
 }
 assert.ok(mobile<=220000,`${slug} total mobile ${mobile}`);tours[slug]=mobile;
}
console.log(JSON.stringify({photographs:Object.values(media).reduce((a,t)=>a+Object.keys(t).length,0),derivatives:Object.values(media).reduce((a,t)=>a+Object.keys(t).length*3,0),roles:Object.fromEntries(Object.entries(roles).map(([role,list])=>[role,{maxBytes:Math.max(...list.map(v=>v.bytes)),minWidth:Math.min(...list.map(v=>v.width)),maxWidth:Math.max(...list.map(v=>v.width)),minQuality:Math.min(...list.map(v=>v.quality)),maxQuality:Math.max(...list.map(v=>v.quality))}])),tourMobileBytes:tours},null,2));
