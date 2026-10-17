// Ningún <video> suena sin que la persona lo pida (reel del inicio). Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/check-video-sound.mjs
import { chromium } from '@playwright/test';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391';
const b = await chromium.launch({ channel: 'msedge', args: ['--autoplay-policy=no-user-gesture-required'] }); let fail = 0;
const snap = (p) => p.evaluate(() => [...document.querySelectorAll('video')].map((v) => { const r = v.getBoundingClientRect(); return { src: (v.currentSrc || v.getAttribute('src') || '').split('/').pop(), paused: v.paused, muted: v.muted, vis: r.bottom > 0 && r.top < innerHeight }; }));
for (const [name, w, h, mob] of [['desktop', 1440, 900, false], ['movil', 390, 844, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob }); const p = await ctx.newPage();
  const check = async (step, { soundAllowed = false } = {}) => {
    await p.waitForTimeout(500); const s = await snap(p), loud = s.filter((v) => !v.paused && !v.muted && !(soundAllowed && v.vis));
    console.log(name, step, 'videos:', s.length, loud.length ? 'SUENA ' + JSON.stringify(loud) : 'ok'); if (loud.length) fail++;
  };
  await p.goto(base + '/'); await p.getByRole('button', { name: 'Rechazar' }).first().click({ timeout: 3000 }).catch(() => {});
  await check('inicio');
  await p.locator('.story-media').scrollIntoViewIfNeeded(); await p.locator('.story-media').scrollIntoViewIfNeeded(); await p.evaluate(() => document.querySelector('.story-media').scrollIntoView({ block: 'center' })); await p.waitForTimeout(800);
  const story = () => p.evaluate(() => { const v = document.querySelector('.story-media video'); return { paused: v.paused, muted: v.muted }; });
  console.log(name, 'reel en vista', JSON.stringify(await story()));
  await p.locator('.vsound').click(); await check('sonido activado (permitido en vista)', { soundAllowed: true });
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(800); await check('reel fuera de vista'); console.log(name, 'estado', JSON.stringify(await story()));
  await p.evaluate(() => document.querySelector('.story-media').scrollIntoView({ block: 'center' })); await p.waitForTimeout(800);
  await p.locator('.vsound').click().catch(() => {}); await p.locator('.vplay').click(); await check('pausado a mano'); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300); await p.evaluate(() => document.querySelector('.story-media').scrollIntoView({ block: 'center' })); await p.waitForTimeout(800);
  console.log(name, 'tras volver a la vista (debe seguir pausado)', JSON.stringify(await story())); await check('pausado respetado');
  // sonido activo y cambio de idioma / navegación
  await p.locator('.vplay').click(); await p.locator('.vsound').click(); await check('sonido otra vez', { soundAllowed: true });
  await p.goto(base + '/en/'); await p.waitForTimeout(800); await check('/en (recarga)');
  await p.locator('.vsound').scrollIntoViewIfNeeded().catch(() => {}); await p.locator('.vsound').click().catch(() => {}); 
  await p.evaluate(() => { history.pushState({}, '', '/pt-br/'); dispatchEvent(new PopStateEvent('popstate')); }); await check('pt-br (SPA)');
  await p.goBack().catch(() => {}); await check('atrás');
  await p.evaluate(() => document.querySelector('a[href*="experiencias"]')?.click()); await check('navegación interna');
  await ctx.close();
}
await b.close(); console.log(fail ? 'FALLOS ' + fail : 'TODO OK'); process.exit(fail ? 1 : 0);
