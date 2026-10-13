import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.TYT_TEST_URL || 'http://127.0.0.1:4173';
const out = 'test-results/experience-book';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const evidence = [], errors = [];
try {
  for (const [width, reduced, saveData] of [[1440, false, false], [390, false, false], [320, false, false], [390, true, false], [1440, false, true]]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    if (saveData) await context.addInitScript(() => Object.defineProperty(navigator.connection, 'saveData', { get: () => true }));
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base);
    const book = page.locator('.ft-book');
    await book.scrollIntoViewIfNeeded();
    const thumbs = book.locator('.ft-thumb');
    assert.equal(await thumbs.count(), 3);
    assert(await book.getByRole('button', { name: 'Nota anterior', exact: true }).isDisabled());
    if (!reduced && !saveData) {
      await book.evaluate(async (el) => {
        el.querySelectorAll('.ft-thumb')[1].click();
        await new Promise(requestAnimationFrame);
        const animation = el.querySelector('.ft-leaf')?.getAnimations()[0];
        if (animation) { animation.pause(); animation.currentTime = 180; }
      });
      const state = await book.locator('.ft-leaf').evaluate((el) => {
        const animation = el.getAnimations()[0];
        animation.pause(); animation.currentTime = 180;
        return { transform: getComputedStyle(el).transform, perspective: getComputedStyle(el.parentElement).perspective, inert: el.parentElement.inert, hidden: el.parentElement.getAttribute('aria-hidden'), links: el.querySelectorAll('a,button').length };
      });
      assert(state.transform.startsWith('matrix3d('));
      assert.notEqual(state.perspective, 'none');
      assert(state.inert && state.hidden === 'true' && state.links === 0);
      await book.screenshot({ path: `${out}/${width}-turn.png` });
      await book.locator('.ft-leaf').evaluate((el) => el.getAnimations()[0].finish());
      await page.waitForTimeout(30);
    } else { await thumbs.nth(1).dispatchEvent('click'); assert.equal(await book.locator('.ft-leaf').count(), 0); }
    await thumbs.nth(2).dispatchEvent('click');
    await thumbs.nth(0).dispatchEvent('click');
    await thumbs.nth(2).dispatchEvent('click');
    await page.waitForTimeout(700);
    assert.equal(await thumbs.nth(2).getAttribute('aria-pressed'), 'true');
    assert.equal(await book.locator('.ft-name').textContent(), await thumbs.nth(2).getAttribute('aria-label'));
    await thumbs.nth(2).focus();
    await page.keyboard.press('End');
    assert(await book.getByRole('button', { name: 'Nota siguiente', exact: true }).isDisabled());
    await page.keyboard.press('Home');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(700);
    const focusGeometry = await thumbs.nth(1).evaluate((el) => {
      const item = el.getBoundingClientRect(), strip = el.parentElement.getBoundingClientRect();
      return { left: item.left, right: item.right, viewportLeft: strip.left, viewportRight: strip.right };
    });
    assert(focusGeometry.left >= focusGeometry.viewportLeft && focusGeometry.right <= focusGeometry.viewportRight, 'keyboard thumbnail visible');
    assert.equal(await thumbs.nth(1).getAttribute('aria-pressed'), 'true');
    assert.equal(await book.locator('.ft-leaf').count(), 0);
    const geometry = await book.evaluate((el) => ({ width: el.getBoundingClientRect().width, overflow: document.documentElement.scrollWidth > innerWidth, media: el.querySelector('.ft-media').getBoundingClientRect().toJSON(), side: el.querySelector('.ft-side').getBoundingClientRect().toJSON() }));
    assert(!geometry.overflow, `overflow ${width}`);
    if (width < 800) assert(geometry.side.top >= geometry.media.bottom);
    await book.screenshot({ path: `${out}/${width}-${reduced ? 'reduced' : saveData ? 'save-data' : 'open'}.png` });
    if (!reduced && !saveData) {
      await book.evaluate(async (el) => {
        el.querySelectorAll('.ft-thumb')[2].click();
        await new Promise(requestAnimationFrame);
        el.querySelector('.ft-leaf')?.getAnimations()[0]?.pause();
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => !document.querySelector('.ft-leaf'), null, { timeout: 1000 }); // la hoja debe desaparecer en cuanto cambia la preferencia (≤1 s, un par de fotogramas)
      assert.equal(await book.locator('.ft-leaf').count(), 0, 'dynamic reduced motion removes the animated leaf');
      assert.equal(await book.getAttribute('data-turning'), 'false');
    }
    evidence.push({ width, reduced, saveData, geometry, passed: true });
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(`${out}/checks.json`, JSON.stringify({ evidence, errors }, null, 2));
  console.log(JSON.stringify({ passed: evidence.length, errors }));
} finally { await browser.close(); }
