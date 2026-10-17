// Audita recortes: para cada <img> con object-fit:cover calcula qué % de la foto queda oculto por el marco. Uso: node scripts/audit-encuadre.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:5199';
const routes = ['/', '/experiencias', '/experiencias/guatape-piedra-del-penol', '/experiencias/city-tour-comuna-13', '/vehiculos', '/nosotros', '/blog', '/servicios', '/contacto'];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const seen = new Map();
for (const w of [390, 768, 1440]) for (const r of routes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800 });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); } catch {} });
  await page.goto(base + r, { waitUntil: 'load' }); await page.waitForTimeout(1200);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const rows = [];
  for (let y = 0; y < H; y += 450) {
    await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(140);
    rows.push(...await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth).map((i) => {
      const cs = getComputedStyle(i), b = i.getBoundingClientRect(); if (b.width < 40 || b.height < 40) return null;
      const fit = cs.objectFit, na = i.naturalWidth / i.naturalHeight, ba = b.width / b.height;
      let hidden = 0; if (fit === 'cover') hidden = ba > na ? 1 - na / ba : 1 - ba / na;
      const cls = (i.closest('[class]')?.className || '').toString().slice(0, 30) + '>' + (i.className || '').toString().slice(0, 24);
      return { src: (i.currentSrc || i.src).replace(location.origin, '').slice(-46), fit, pos: cs.objectPosition, hidden: +hidden.toFixed(2), box: [Math.round(b.width), Math.round(b.height)], nat: [i.naturalWidth, i.naturalHeight], cls };
    }).filter(Boolean)));
  }
  for (const x of rows) { const k = `${w}|${r}|${x.src}|${x.box}`; if (!seen.has(k)) seen.set(k, { w, r, ...x }); }
  await ctx.close();
}
const all = [...seen.values()].filter((x) => x.hidden >= 0.22).sort((a, b) => b.hidden - a.hidden);
console.log(all.length, 'recortes ≥22 %'); for (const x of all) console.log(`${x.hidden} ${x.w} ${x.r} ${x.cls} ${x.src} box=${x.box} nat=${x.nat} pos=${x.pos}`);
await browser.close();
