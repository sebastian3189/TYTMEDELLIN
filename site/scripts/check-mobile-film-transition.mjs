import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { timeline, uForCard } from '../src/baraja-geometria.js';
import { inicioTextos } from '../src/inicio-textos.js';

// CONSTRUIR, Spec 03 H1/I: película continua, foto completa y 12 tours también en móvil.
assert.deepEqual(timeline(false), { t0: 30, t1: 80, t2: 245, t3: 260, t4: 305, t5: 335, t6: 743, total: 767, clip: 165 });
assert.equal(timeline(true).t6 - timeline(true).t5, 12 * 34);
const out = 'test-results/mobile-film-transition', checks = [];
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [width, height] of [[390, 844], [360, 640], [320, 568], [768, 1024], [1440, 900]]) {
    const mobile = width < 800, T = timeline(mobile);
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: mobile, isMobile: mobile, deviceScaleFactor: mobile ? 3 : 1 });
    const page = await context.newPage(), errors = [], requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (r.url().includes('/media/inicio/')) requests.push(r.url()); });
    await page.goto(process.env.TYT_TEST_URL || 'http://127.0.0.1:4173');
    await page.waitForFunction(() => Number(document.querySelector('.scrub-hero')?.dataset.loaded) >= 121, null, { timeout: 90000 });
    const go = async (u, name) => {
      await page.evaluate(({ u, total }) => {
        const track = document.querySelector('.scrub-track'), stage = document.querySelector('.scrub-stage');
        scrollTo({ top: track.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(stage).top) + u / total * (track.offsetHeight - stage.offsetHeight), behavior: 'instant' });
      }, { u, total: T.total });
      await page.waitForTimeout(700);
      if (name) await page.screenshot({ path: `${out}/${width}-${name}.png` });
    };
    const film = () => page.evaluate(() => {
      const el = document.querySelector('.scrub-media'), css = getComputedStyle(el);
      const inset = css.clipPath.match(/inset\(([\d.]+)px ([\d.]+)px/);
      return { phase: document.querySelector('.scrub-stage').dataset.phase,
        frame: Number(document.querySelector('.scrub-hero').dataset.frame),
        ratio: inset ? (el.offsetWidth - 2 * Number(inset[2])) / (el.offsetHeight - 2 * Number(inset[1])) : el.offsetWidth / el.offsetHeight,
        transform: css.transform, clip: css.clipPath, opacity: Number(css.opacity) };
    });
    let previousFrame = -1;
    for (const fraction of [.6, .7, .8, .9, .925, .95, .975, 1]) {
      await go(T.t1 + fraction * (T.t2 - T.t1), `film-${fraction}`);
      const f = await film();
      assert(Math.abs(f.frame - Math.round(fraction * 120)) <= 1, JSON.stringify(f));
      assert(f.frame > previousFrame, 'last frames must keep moving');
      previousFrame = f.frame;
      if (mobile && fraction === 1) assert(Math.abs(f.ratio - 16 / 9) < .003, JSON.stringify(f));
    }
    assert.equal(await page.locator('.scrub-final-frame').count(), 0);
    if (mobile) {
      assert(!requests.some(url => /\/media\/inicio\/m\//.test(url)), 'no padded mobile movie frames');
      const error = await page.evaluate(async () => {
        const actual = document.querySelector('.scrub-media canvas'), W = actual.width, H = actual.height;
        const expected = document.createElement('canvas'); expected.width = W; expected.height = H;
        const ctx = expected.getContext('2d'), img = new Image(); img.src = '/media/inicio/d16/121.webp'; await img.decode();
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        const h = W * 9 / 16; ctx.drawImage(img, 0, (H - h) / 2, W, h);
        const y = Math.ceil((H - h) / 2) + 3, ch = Math.floor(h) - 6;
        const a = actual.getContext('2d').getImageData(3, y, W - 6, ch).data;
        const b = ctx.getImageData(3, y, W - 6, ch).data;
        let delta = 0; for (let i = 0; i < a.length; i++) if (i % 4 !== 3) delta += Math.abs(a[i] - b[i]);
        return delta / (a.length * .75);
      });
      assert(error < 2, `final photo pixel error ${error}`);
    }
    await go((T.t2 + T.t3) / 2, 'hold'); const hold = await film();
    assert.equal(hold.frame, 120); assert.equal(hold.opacity, 1);
    await go(T.t3 + .85 * (T.t4 - T.t3), 'shrink');
    if (mobile) assert(Math.abs((await film()).ratio - 16 / 9) < .003);
    await go(T.t4 + .7 * (T.t5 - T.t4), 'reveal');
    const slugs = await page.locator('.bd-card').evaluateAll(els => els.map(el => el.getAttribute('href').split('/').at(-1)));
    assert.equal(slugs.length, 12);
    const names = new Set();
    for (let i = 0; i < 12; i++) {
      await go(uForCard(T, i), `tour-${String(i + 1).padStart(2, '0')}`);
      const s = await page.evaluate(i => {
        const card = document.querySelectorAll('.bd-card')[i], cap = document.querySelectorAll('.bd-cap')[i], plan = document.querySelectorAll('.bd-plan')[i];
        const box = el => { const r = el.getBoundingClientRect(); return { top:r.top, bottom:r.bottom, left:r.left, right:r.right, width:r.width, height:r.height }; };
        return { ui: document.querySelector('.scrub-stage').dataset.ui,
          capOpacity: Number(getComputedStyle(cap).opacity), name: cap.querySelector('h2').textContent,
          text: cap.querySelector('.scrub-cap-sub').textContent, href: plan.getAttribute('href'),
          card: box(card), cap:box(cap), plan:box(plan),
          photoReady:card.querySelector('.bd-full').classList.contains('ready'),
          titleOpacity:Number(getComputedStyle(document.querySelector('.scrub-t1')).opacity),
          overflow:document.documentElement.scrollWidth > innerWidth + 1 };
      }, i);
      assert.equal(s.ui, 'cards'); assert(s.capOpacity > .99, JSON.stringify(s));
      const copy = inicioTextos.cartas[slugs[i]];
      assert.equal(s.text, `${copy.emocion}: ${copy.frase}`);
      assert.equal(s.href, `/experiencias/${slugs[i]}#consulta`);
      assert(s.photoReady && !s.overflow, JSON.stringify(s));
      assert(s.card.top >= 0 && s.card.bottom < height && s.card.left >= 0 && s.card.right <= width + 1, JSON.stringify(s));
      assert(s.plan.height >= 44);
      if (mobile) {
        assert(s.card.width >= Math.min(width * .7, 330), JSON.stringify(s));
        assert(s.card.bottom <= s.cap.top - 4 && s.cap.bottom <= s.plan.top - 4, JSON.stringify(s));
        assert.equal(s.titleOpacity, 0);
      }
      names.add(s.name);
    }
    assert.equal(names.size, 12);
    await go(uForCard(T, 4));
    await page.getByRole('button', { name:'Carta siguiente', exact:true }).click();
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('.bd-cap.is-on').getAttribute('data-i'), '5');
    await page.getByRole('button', { name:'Carta anterior', exact:true }).click();
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('.bd-cap.is-on').getAttribute('data-i'), '4');
    await go((T.t2 + T.t3) / 2, 'reverse'); assert.deepEqual(await film(), hold);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(500); assert.equal(await page.locator('.scrub-media canvas').count(), 0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(900);
    await go(uForCard(T, 8));
    await page.locator('.bd-card').nth(8).click();
    await page.waitForURL('**/experiencias/jardin-antioquia');
    assert.equal(await page.locator('.scrub-media canvas').count(), 0);
    assert.deepEqual(errors, []);
    checks.push({ width, height, tours:names.size, continuousFrames:true, reverse:true, navigation:true, errors });
    console.log(`PASS ${width}x${height}: continuous film, full photo, 12 tours, navigation, reverse, reduced motion`);
    await context.close();
  }
  await writeFile(`${out}/checks.json`, JSON.stringify(checks, null, 2));
} finally { await browser.close(); }
