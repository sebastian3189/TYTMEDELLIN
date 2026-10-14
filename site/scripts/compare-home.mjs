// Comparación visual de la PORTADA contra su estado congelado (HEAD «meencanta3»): captura las mismas posiciones de scroll en dos servidores y cuenta píxeles distintos.
// Uso: TYT_A=http://127.0.0.1:4421 (HEAD) TYT_B=http://127.0.0.1:4417 (actual) node scripts/compare-home.mjs   — se excluyen el pie y el botón flotante (cambios pedidos por el usuario).
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const A = process.env.TYT_A || 'http://127.0.0.1:4421', B = process.env.TYT_B || 'http://127.0.0.1:4417', out = 'test-results/ronda-j/home-comparacion';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const cmp = await browser.newPage();
const diff = async (a, b) => cmp.evaluate(async ([a, b]) => {
  const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
  const [x, y] = await Promise.all([load(a), load(b)]); const c = document.createElement('canvas'); c.width = x.width; c.height = x.height; const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(x, 0, 0); const da = g.getImageData(0, 0, c.width, c.height).data; g.clearRect(0, 0, c.width, c.height); g.drawImage(y, 0, 0); const db = g.getImageData(0, 0, c.width, c.height).data;
  let n = 0, max = 0; for (let i = 0; i < da.length; i += 4) { const d = Math.max(Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2])); if (d > 8) n++; if (d > max) max = d; }
  return { pct: +(100 * n / (da.length / 4)).toFixed(3), max };
}, [a, b]);
const rows = [];
for (const theme of ['light', 'dark']) for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const mobile = w < 800, shots = {};
  for (const [name, base] of [['A', A], ['B', B]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile, colorScheme: theme });
    await ctx.addInitScript((t) => { try { localStorage.setItem('tyt-theme', t); sessionStorage.setItem('tyt-libro-gesto', '1'); } catch { /* */ } }, theme);
    const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelector('.th')?.dataset.hydrated === 'true'); await p.waitForTimeout(1500);
    await p.addStyleTag({ content: '.wa-fab,.site-footer,.pie-wrap,.skyline{visibility:hidden!important}*{animation-duration:0s!important;caret-color:transparent!important}' });
    const g = await p.evaluate(() => { const s = document.querySelector('.scrub-track'), st = document.querySelector('.scrub-stage'), t = document.querySelector('.th-track'), ts = document.querySelector('.th-stage'); return { sTop: s.getBoundingClientRect().top + scrollY, sSpan: s.offsetHeight - st.offsetHeight, sTotal: Number(getComputedStyle(s).getPropertyValue('--total')), tTop: t.getBoundingClientRect().top + scrollY, tSpan: t.offsetHeight - ts.offsetHeight, tTotal: Number(getComputedStyle(t).getPropertyValue('--th-total')), hh: document.querySelector('.site-header').offsetHeight, layout: document.querySelector('.th').dataset.layout }; });
    const seg = g.layout === 'wide' ? 30 : 80, pts = [];
    pts.push(['hero', 0]); pts.push(['historia', 'sel:.home-story']);
    for (const u of [10, 60, 140, 250, 290, 320]) pts.push([`pelicula-${u}`, g.sTop - g.hh + (u / g.sTotal) * g.sSpan]);
    for (const [i, s] of [[0, 0.1], [0, 0.56], [3, 0.56], [7, 0.56]]) pts.push([`mano-${i}-${s}`, g.tTop - g.hh + ((34 + (i + s) * seg) / g.tTotal) * g.tSpan]);
    for (const sel of ['.service-band', '.reviews-g', '.about-preview', '.ft-book', '.home-close', '.home-social']) pts.push([sel.slice(1), `sel:${sel}`]);
    for (const [label, pos] of pts) {
      if (typeof pos === 'string') await p.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'start' }), pos.slice(4)); else await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), pos);
      await p.waitForTimeout(label.startsWith('pelicula') || label.startsWith('mano') ? 1700 : 700);
      (shots[label] ||= {})[name] = (await p.screenshot()).toString('base64');
    }
    await ctx.close();
  }
  for (const [label, s] of Object.entries(shots)) { const d = await diff(s.A, s.B); rows.push({ theme, w, label, ...d }); if (d.pct > 0.05) { const fs = await import('node:fs/promises'); await fs.writeFile(`${out}/${label}-${w}-${theme}-HEAD.png`, Buffer.from(s.A, 'base64')); await fs.writeFile(`${out}/${label}-${w}-${theme}-actual.png`, Buffer.from(s.B, 'base64')); } }
}
await browser.close();
const bad = rows.filter((r) => r.pct > 0.05);
console.log(`posiciones comparadas: ${rows.length}; con diferencia >0,05 %: ${bad.length}`);
for (const r of rows) console.log(`${r.theme} ${r.w} ${r.label.padEnd(18)} ${r.pct}% (máx ${r.max})`);
