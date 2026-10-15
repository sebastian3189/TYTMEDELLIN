import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const [w,h] of [[1440,900],[390,844]]) for (const path of ['/experiencias','/en/experiencias']) {
  const p = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto('http://127.0.0.1:5291'+path, { waitUntil: 'load' }); await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1200);
  console.log(path,w,await p.evaluate(()=>!!document.querySelector('.marquee, [class*=marquee]')));
  await p.screenshot({ path: `test-results/ronda-usuario-3/catalogo-fin-${w}${path.startsWith('/en')?'-en':''}.png` });
}
await browser.close();
