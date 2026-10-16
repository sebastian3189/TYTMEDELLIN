// Cadenas de /pt-br idénticas a las del español (sin traducir). Usa los volcados de check-i18n-sweep.mjs (es y pt, mismo ancho).
// Uso: TYT_W=1440 node scripts/check-i18n-sweep.mjs es && TYT_W=1440 node scripts/check-i18n-sweep.mjs pt && node scripts/check-pt-untranslated.mjs [1440]
import { readFileSync } from 'node:fs';
import { PROPER } from './_i18n-verdict.mjs';
const w = process.argv[2] || '1440';
const es = JSON.parse(readFileSync(`test-results/i18n-all-es-${w}.json`, 'utf8')), pt = JSON.parse(readFileSync(`test-results/i18n-all-pt-${w}.json`, 'utf8'));
const esAll = new Set(Object.values(es).flat());
const found = new Map();
for (const [route, strings] of Object.entries(pt)) for (const s of strings) {
  const words = (s.replace(PROPER, ' ').match(/\p{L}{3,}/gu) || []);
  if (words.length < 1 || !esAll.has(s)) continue;
  if (words.length === 1 && /^[A-ZÁÉÍÓÚÑ]/.test(words[0]) === false && words[0].length < 5) continue;
  (found.get(s) || found.set(s, []).get(s)).push(route);
}
console.log(`cadenas idénticas al español: ${found.size}`);
for (const [s, r] of found) console.log('-', s.slice(0, 150), `[${r[0]}${r.length > 1 ? ' +' + (r.length - 1) : ''}]`);
