import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { timeline, stateAt } from '../src/baraja-geometria.js';

// CONSTRUIR, Spec 03 H1/I: observable hold, shrink and reveal; reversible native scroll.
const T = timeline(true);
assert.deepEqual(timeline(false), { t0: 30, t1: 80, t2: 245, t3: 260, t4: 305, t5: 335, t6: 743, total: 767, clip: 165 });
assert.equal(T.t2 - T.t1, 140);
assert(T.t3 - T.t2 >= 24 && T.t4 - T.t3 >= 48 && T.t5 - T.t4 >= 24);
assert.equal(stateAt((T.t2 + T.t3) / 2, T, true).w, 1);
assert.equal(stateAt((T.t3 + T.t4) / 2, T, true).fanT, 0);
assert.equal(stateAt((T.t4 + T.t5) / 2, T, true).w, 0);
const out = 'test-results/mobile-film-transition';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [width, height] of [[390, 844], [360, 640]]) {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.TYT_TEST_URL || 'http://127.0.0.1:4173');
    await page.waitForFunction(() => Number(document.querySelector('.scrub-hero')?.dataset.loaded) >= 121, null, { timeout: 90000 });
    const go = async (u, name) => {
      await page.evaluate(({ u, total }) => {
        const track = document.querySelector('.scrub-track'), stage = document.querySelector('.scrub-stage');
        const top = parseFloat(getComputedStyle(stage).top);
        scrollTo({ top: track.getBoundingClientRect().top + scrollY - top + u / total * (track.offsetHeight - stage.offsetHeight), behavior: 'instant' });
      }, { u, total: T.total });
      await page.waitForTimeout(650);
      const s = await page.evaluate(() => ({
        phase: document.querySelector('.scrub-stage').dataset.phase,
        frame: Number(document.querySelector('.scrub-hero').dataset.frame),
        mediaOpacity: Number(getComputedStyle(document.querySelector('.scrub-media')).opacity),
        mediaWidth: document.querySelector('.scrub-media').getBoundingClientRect().width,
        cardOpacity: Number(document.querySelector('.bd-card').style.opacity),
        finalOpacity: Number(getComputedStyle(document.querySelector('.scrub-final-frame')).opacity),
        infoOpacity: Number(getComputedStyle(document.querySelector('.mobile-deck-info')).opacity),
        infoName: document.querySelector('.mobile-deck-info h2').textContent,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      }));
      assert(!s.overflow);
      await page.screenshot({ path: `${out}/${width}-${name}.png` });
      return s;
    };
    const hold = await go((T.t2 + T.t3) / 2, 'hold');
    assert.equal(hold.phase, 'hold'); assert.equal(hold.frame, 120); assert.equal(hold.mediaOpacity, 1); assert.equal(hold.cardOpacity, 0); assert.equal(hold.finalOpacity, 1);
    const shrink = await go((T.t3 + T.t4) / 2, 'shrink');
    assert.equal(shrink.phase, 'shrink'); assert.equal(shrink.frame, 120); assert.equal(shrink.cardOpacity, 0); assert(shrink.mediaWidth < hold.mediaWidth);
    const reveal = await go((T.t4 + T.t5) / 2, 'reveal');
    assert.equal(reveal.phase, 'reveal'); assert(reveal.mediaOpacity > .3 && reveal.mediaOpacity < .7); assert(reveal.cardOpacity > .3 && reveal.cardOpacity < .7); assert(reveal.infoOpacity > .9); assert.equal(reveal.infoName, 'City Tour & Comuna 13');
    const deck = await go(T.t5 + 5, 'cards');
    assert.equal(deck.phase, 'deck'); assert.equal(deck.mediaOpacity, 0); assert.equal(deck.cardOpacity, 1); assert.equal(deck.infoOpacity, 1);
    assert.deepEqual(await go((T.t2 + T.t3) / 2, 'reverse'), hold);
    await page.locator('.ft-book').scrollIntoViewIfNeeded();
    await page.locator('.ft-thumb').nth(1).dispatchEvent('click');
    await page.waitForTimeout(700);
    assert.equal(await page.locator('.ft-thumb').nth(1).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.ft-thumb').count(), 12);
    assert.deepEqual(errors, []);
    await context.close();
  }
  console.log('PASS: 390/360 hold -> shrink -> reveal -> deck -> album, reverse, no overflow/errors; desktop timeline unchanged');
} finally { await browser.close(); }
