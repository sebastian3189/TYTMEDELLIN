// Móvil 320–430 (Chromium y WebKit iPhone): sin desborde horizontal, titulares sin cortar y botón de WhatsApp sin solape con los CTA del hero.
// Uso: TYT_TEST_URL=http://127.0.0.1:4417 node scripts/check-ronda-tipografia-mobile.mjs
import { chromium, webkit, devices } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4417';
const widths = [320, 360, 390, 412, 430], routes = ['/', '/experiencias', '/experiencias/guatape-piedra-del-penol', '/nosotros', '/vehiculos', '/cotizar', '/contacto'];
const langs = ['', '/en', '/pt-br'];
const problems = [];
const run = async (engine, name, ctxOpts) => {
  const browser = await engine.launch(engine === chromium ? { channel: 'msedge', headless: true } : { headless: true });
  for (const w of widths) for (const lang of langs) for (const r of routes) {
    const ctx = await browser.newContext({ ...ctxOpts, viewport: { width: w, height: 844 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => { try { localStorage.setItem('tyt-privacy-v1', JSON.stringify({ version: 1, preferences: false, expires: Date.now() + 1e10 })); sessionStorage.setItem('tyt-bienvenida', '1'); } catch {} });
    await page.goto(base + (lang + r === '' ? '/' : lang + r), { waitUntil: 'load' }); await page.waitForTimeout(1200);
    const res = await page.evaluate(async () => {
      const out = [], H = document.documentElement.scrollHeight;
      for (let y = 0; y < H; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 500));
      const ov = document.documentElement.scrollWidth - innerWidth; if (ov > 1) out.push(`desborde ${ov}px`);
      // titulares: texto fuera del viewport o cortado por overflow
      for (const h of document.querySelectorAll('h1,h2,h3,.hero-l1,.hero-l2')) {
        const b = h.getBoundingClientRect(); if (!b.width || !b.height) continue;
        if (b.right > innerWidth + 1 || b.left < -1) out.push(`titular fuera: «${h.textContent.trim().slice(0, 30)}» ${Math.round(b.left)}..${Math.round(b.right)}`);
        if (h.scrollWidth > h.clientWidth + 2 && getComputedStyle(h).overflow !== 'visible') out.push(`titular cortado: «${h.textContent.trim().slice(0, 30)}»`);
      }
      // hero: botones vs. FAB de WhatsApp
      const fab = document.querySelector('.wa-fab')?.getBoundingClientRect();
      if (fab && getComputedStyle(document.querySelector('.wa-fab')).visibility !== 'hidden') for (const a of document.querySelectorAll('.hero-actions .button, .home-hero .hero-btn')) {
        const b = a.getBoundingClientRect(); if (b.width && b.top < innerHeight && !(b.right <= fab.left || b.left >= fab.right || b.bottom <= fab.top || b.top >= fab.bottom)) out.push(`solape WhatsApp con «${a.textContent.trim().slice(0, 24)}»`);
      }
      return out;
    });
    for (const m of res) problems.push(`${name} ${w} ${lang}${r}: ${m}`);
    await ctx.close();
  }
  await browser.close();
};
await run(chromium, 'chromium', { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
try { await run(webkit, 'webkit', { ...devices['iPhone 13'], viewport: undefined, isMobile: true, hasTouch: true }); } catch (e) { problems.push('webkit no disponible: ' + e.message.slice(0, 100)); }
console.log(problems.length ? problems.join('\n') : 'sin problemas'); console.log('total', problems.length);
