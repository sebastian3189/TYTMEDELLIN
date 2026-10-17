// Mide Cormorant cursiva real frente a Times New Roman cursiva (respaldo métrico, CLS).
import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const p = await (await b.newContext()).newPage();
await p.goto('http://127.0.0.1:5199/cotizar', { waitUntil: 'networkidle' });
const r = await p.evaluate(async () => {
  const s = 'vive experiencia otro nivel conversación control aquí forma de viajar Medellín ñ ç ã';
  const out = {};
  for (const w of [500, 600]) {
    await document.fonts.load(`italic ${w} 100px Cormorant`, s);
    const c = document.createElement('canvas').getContext('2d');
    const m = (f) => { c.font = f; const t = c.measureText(s); return { w: t.width, a: t.fontBoundingBoxAscent, d: t.fontBoundingBoxDescent }; };
    out[w] = { cor: m(`italic ${w} 1000px Cormorant`), tnr: m(`italic ${w} 1000px "Times New Roman"`), geo: m(`italic ${w} 1000px Georgia`) };
  }
  return out;
});
console.log(JSON.stringify(r, null, 1)); await b.close();
