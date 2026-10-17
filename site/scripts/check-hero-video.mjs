// Verifica el hero con video de dron en todos los dispositivos (Spec 03 §J). Uso: TYT_TEST_URL=http://127.0.0.1:PUERTO node scripts/check-hero-video.mjs [--shots]
import { chromium, webkit } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4391';
const shots = process.argv.includes('--shots');
mkdirSync('test-results/hero-video', { recursive: true });
const D = (name, w, h, dpr = 1, mobile = false) => ({ name, w, h, dpr, mobile });
const cases = [
  ...[[320, 568], [360, 740], [390, 844], [412, 915], [430, 932]].flatMap(([w, h]) => [['chromium', D(`m${w}`, w, h, 3, true)], ['webkit', D(`m${w}`, w, h, 3, true)]]),
  ['webkit', D('iPhoneSE', 375, 667, 2, true)], ['webkit', D('iPhone13', 390, 844, 3, true)], ['webkit', D('iPhone15', 393, 852, 3, true)], ['webkit', D('iPhoneProMax', 430, 932, 3, true)],
  ...[[768, 1024, 2], [1024, 768, 2], [820, 1180, 2]].map(([w, h, d]) => ['chromium', D(`tab${w}x${h}`, w, h, d, true)]),
  ['webkit', D('tab768x1024', 768, 1024, 2, true)],
  ['chromium', D('1280x720', 1280, 720)], ['chromium', D('1366x768', 1366, 768)], ['chromium', D('1440x900', 1440, 900)], ['chromium', D('1920x1080', 1920, 1080)], ['chromium', D('2560x1440', 2560, 1440)],
  ['chromium', D('1440x900@2x', 1440, 900, 2)], ['chromium', D('m844x390', 844, 390, 3, true)], ['webkit', D('m844x390', 844, 390, 3, true)],
];
const ch = await chromium.launch({ channel: 'msedge', headless: true }), wk = await webkit.launch();
const rows = [];
for (const [eng, c] of cases) {
  for (const scheme of ['light', 'dark']) {
    if (scheme === 'dark' && !(shots && ['m390', 'tab768x1024', '1440x900', '1920x1080', 'm844x390'].includes(c.name) && eng === 'chromium')) continue;
    const browser = eng === 'chromium' ? ch : wk;
    const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, deviceScaleFactor: c.dpr, isMobile: c.mobile && eng === 'chromium', hasTouch: c.mobile, colorScheme: scheme });
    const page = await ctx.newPage(); const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.getByRole('button', { name: 'Rechazar' }).first().click({ timeout: 4000 }).catch(() => {});
    let ok = true; try { await page.waitForFunction(() => { const v = document.querySelector('video.hero-dron'); return v && v.readyState >= 3 && !v.paused && v.currentTime > 0.2; }, null, { timeout: 20000 }); } catch { ok = false; }
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const v = document.querySelector('video.hero-dron'), hero = document.querySelector('.home-hero'), hb = hero.getBoundingClientRect(), vb = v.getBoundingClientRect();
      const rect = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom }; };
      const wa = rect('.wa-fab'), copy = [rect('.hero-copy h1'), rect('.hero-actions'), rect('.hero-support')], btn = rect('.hero-pause');
      const hit = (a, b) => a && b && a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
      const cs = getComputedStyle(v);
      return { src: (v.currentSrc || '').split('/').pop(), ready: v.readyState, paused: v.paused, t: +v.currentTime.toFixed(2), vw: v.videoWidth, vh: v.videoHeight, opacity: cs.opacity, pos: cs.objectPosition,
        covers: vb.width >= hb.width - 1 && vb.height >= hb.height - 1, heroH: Math.round(hb.height), overflowX: document.documentElement.scrollWidth > innerWidth,
        waOverlap: copy.some((x) => hit(x, wa)), pauseOverlap: copy.some((x) => hit(x, btn)) || hit(btn, wa), label: document.querySelector('.hero-pause')?.getAttribute('aria-label'), h1: rect('.hero-copy h1'), actions: rect('.hero-actions') };
    });
    const bad = !ok || !r.covers || r.overflowX || r.waOverlap || r.pauseOverlap || r.paused;
    rows.push({ eng, dev: c.name, scheme, ok, ...r, errs: errs.length, bad });
    console.log(JSON.stringify({ eng, dev: c.name, scheme, ok, src: r.src, dim: `${r.vw}x${r.vh}`, paused: r.paused, t: r.t, opacity: r.opacity, covers: r.covers, wa: r.waOverlap, pauseOv: r.pauseOverlap, label: r.label, errs: errs.length, bad }));
    if (shots && eng === 'chromium' && ['m390', 'tab768x1024', '1440x900', '1920x1080', 'm844x390'].includes(c.name)) await page.screenshot({ path: `test-results/hero-video/${c.name}-${scheme}.png` });
    await ctx.close();
  }
}
await ch.close(); await wk.close();
console.log('FAIL:', rows.filter((r) => r.bad).map((r) => `${r.eng}/${r.dev}/${r.scheme}`).join(', ') || 'ninguno');
