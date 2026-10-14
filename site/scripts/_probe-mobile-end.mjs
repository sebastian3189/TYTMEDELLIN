import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { timeline } from '../src/baraja-geometria.js';

const out = process.argv[2] || 'test-results/probe';
await mkdir(out, { recursive: true });
const T = timeline(true);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
const page = await ctx.newPage();
await page.goto(process.env.TYT_TEST_URL || 'http://127.0.0.1:5180');
await page.locator('.scrub-hero').scrollIntoViewIfNeeded();
await page.waitForFunction(() => Number(document.querySelector('.scrub-hero')?.dataset.loaded) >= 121, null, { timeout: 90000 });
const go = async (u) => {
  await page.evaluate(({ u, total }) => {
    const track = document.querySelector('.scrub-track'), stage = document.querySelector('.scrub-stage');
    scrollTo({ top: track.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(stage).top) + u / total * (track.offsetHeight - stage.offsetHeight), behavior: 'instant' });
  }, { u, total: T.total });
  await page.waitForFunction(() => document.querySelector('.scrub-hero')?.dataset.settled === 'true');
  await page.waitForTimeout(400);
};
const pts = { f80: T.t1 + .8 * (T.t2 - T.t1), f95: T.t1 + .95 * (T.t2 - T.t1), hold: (T.t2 + T.t3) / 2, s30: T.t3 + .3 * (T.t4 - T.t3), s70: T.t3 + .7 * (T.t4 - T.t3), r20: T.t4 + .2 * (T.t5 - T.t4), r50: T.t4 + .5 * (T.t5 - T.t4), r80: T.t4 + .8 * (T.t5 - T.t4), c0: T.t5 + 34 * .2 };
for (const [name, u] of Object.entries(pts)) {
  await go(u);
  const info = await page.evaluate(() => {
    const m = document.querySelector('.scrub-media'), cv = m.querySelector('canvas'), c0 = document.querySelector('.bd-card');
    return { phase: document.querySelector('.scrub-stage').dataset.phase, ui: document.querySelector('.scrub-stage').dataset.ui, frame: document.querySelector('.scrub-hero').dataset.frame,
      cv: [cv.width, cv.height, m.offsetWidth, m.offsetHeight], mt: m.style.transform, mo: m.style.opacity, c0t: c0.style.transform, c0o: c0.style.opacity, c0r: c0.getBoundingClientRect().toJSON() };
  });
  console.log(name, u.toFixed(1), JSON.stringify(info));
  await page.screenshot({ path: `${out}/${name}.png` });
}
await browser.close();
