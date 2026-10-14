// Hoja de contacto: node scripts/_sheet.mjs salida.png entrada1.png entrada2.png ... (ancho de cada celda: W, por defecto 300)
import { chromium } from '@playwright/test'; import { readFileSync } from 'node:fs';
const [out, ...ins] = process.argv.slice(2), W = Number(process.env.W || 300);
const html = `<body style="margin:0;background:#888;display:flex;gap:6px;flex-wrap:wrap;width:${ins.length * (W + 6)}px">${ins.map((f) => `<img style="width:${W}px" src="data:image/png;base64,${readFileSync(f).toString('base64')}">`).join('')}</body>`;
const b = await chromium.launch({ channel: 'msedge', headless: true }); const p = await b.newPage({ viewport: { width: ins.length * (W + 6), height: 800 } });
await p.setContent(html); await p.waitForTimeout(300); await p.screenshot({ path: out, fullPage: true }); await b.close();
