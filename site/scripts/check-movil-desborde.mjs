// Móvil 320–430, ES/EN/PT: cero scroll horizontal, ningún elemento visible fuera del viewport, titulares sin recorte.
// Uso: TYT_TEST_URL=http://127.0.0.1:4731 [ENGINE=chromium|webkit] [WIDTHS=320,390] node scripts/check-movil-desborde.mjs
import { chromium, webkit, devices } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4731';
const widths = (process.env.WIDTHS || '320,360,390,412,430').split(',').map(Number);
const es = ['/', '/experiencias', '/servicios', '/vehiculos', '/nosotros', '/blog', '/contacto', '/cotizar', '/calificaciones', '/privacidad', '/politica-de-tratamiento-de-datos',
  ...'city-tour-comuna-13 guatape-piedra-del-penol tour-nocturno-medellin vuelta-a-oriente tour-del-cafe-medellin hacienda-napoles salto-del-buey santa-fe-de-antioquia jardin-antioquia tour-de-compras tour-miradores traslados-aeropuerto-jmc'.split(' ').map((s) => '/experiencias/' + s),
  '/blog/preparar-tu-recorrido', '/blog/elegir-tu-experiencia', '/blog/viajar-en-grupo'];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const problems = [];
const eng = process.env.ENGINE || 'chromium';
const browser = await (eng === 'webkit' ? webkit : chromium).launch(eng === 'webkit' ? { headless: true } : { channel: 'msedge', headless: true });
for (const w of widths) for (const lang of ['', '/en', '/pt-br']) for (const r of es) {
  if (only && !only.some((o) => r.includes(o))) continue;
  const ctx = await browser.newContext(eng === 'webkit' ? { ...devices['iPhone 13'], viewport: { width: w, height: 844 } } : { viewport: { width: w, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); sessionStorage.setItem('tyt-bienvenida', '1'); } catch {} });
  await page.goto(base + (lang + r === '' ? '/' : lang + (r === '/' ? '' : r)), { waitUntil: 'load' }); await page.waitForTimeout(900);
  const res = await page.evaluate(async () => {
    const out = [], H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
    const V = innerWidth;
    const ov = document.documentElement.scrollWidth - V; if (ov > 1) out.push(`desborde página ${ov}px`);
    const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const cs = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(cs.overflowX)) { const b = p.getBoundingClientRect(); if (b.right <= V + 1 && b.left >= -1) return true; } } return false; };
    const seen = new Set();
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('.honeypot')) continue; const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
      const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
      if (el.closest('svg') && el.tagName !== 'svg') continue;
      if ((b.right > V + 1 || b.left < -1) && !clipped(el)) { const k = (el.className?.baseVal ?? el.className) + el.tagName; if (!seen.has(k)) { seen.add(k); out.push(`fuera ${el.tagName}.${String(el.className?.baseVal ?? el.className).slice(0, 40)} ${Math.round(b.left)}..${Math.round(b.right)} «${el.textContent.trim().slice(0, 25)}»`); } }
    }
    for (const h of document.querySelectorAll('h1,h2,h3,h4,[class*="title"],[class*="hero-l"]')) {
      const b = h.getBoundingClientRect(); if (!b.width || !b.height) continue;
      if (h.clientWidth > 4 && h.scrollWidth > h.clientWidth + 2 && getComputedStyle(h).display !== 'inline') out.push(`titular recortado ${h.tagName}.${String(h.className).slice(0, 30)} «${h.textContent.trim().slice(0, 25)}» ${h.scrollWidth}>${h.clientWidth}`);
    }
    return out;
  });
  for (const m of res) problems.push(`${eng} ${w} ${lang}${r}: ${m}`);
  await ctx.close();
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'sin problemas'); console.log('total', problems.length);
