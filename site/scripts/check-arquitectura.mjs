// Arquitectura SEO (Spec 02/04/05): cada URL con su h1, título propio y canonical; enlaces internos vivos; sitemap sin rutas antiguas y 301 sincronizadas.
// Uso: npm run build && node scripts/check-arquitectura.mjs
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rutasAnteriores, tourSeo, RUTA_TOURS, RUTA_TRANSPORTE, RUTA_VEHICULOS } from '../src/rutas.js';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..'), dist = join(site, 'dist');
const PREFIJOS = ['', '/en', '/pt-br'], findings = [];
const soft = (cond, msg) => { if (!cond) findings.push(msg); };
const walk = (dir) => readdirSync(dir).flatMap((name) => { const p = join(dir, name); return statSync(p).isDirectory() ? walk(p) : [p]; });
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const htmlDe = (path) => join(dist, ...path.split('/').filter(Boolean), 'index.html');

// 1) Rutas nuevas presentes; antiguas ausentes.
const nuevas = [RUTA_TOURS, RUTA_TRANSPORTE, RUTA_VEHICULOS, ...Object.values(tourSeo).map((s) => s.path)];
assert.equal(nuevas.length, 15);
for (const pre of PREFIJOS) {
  for (const path of nuevas) soft(existsSync(htmlDe(pre + path)), `falta ${pre + path}`);
  for (const path of Object.keys(rutasAnteriores)) soft(!existsSync(htmlDe(pre + path)), `sigue publicada ${pre + path}`);
}

// 2) Cada página: un h1, canonical propio y título/descripción únicos dentro de su idioma.
const paginas = walk(dist).filter((f) => f.endsWith('index.html') && !/(^|[\\/])(site|flota)[\\/]/.test(relative(dist, f)));
assert.equal(paginas.length, 78, `se esperaban 78 páginas, hay ${paginas.length}`);
const vistos = new Map();
for (const file of paginas) {
  const html = readFileSync(file, 'utf8'), rel = '/' + relative(dist, file).replaceAll('\\', '/').replace(/\/?index\.html$/, '');
  const root = html.match(/<div id="root"[^>]*>([\s\S]*)/)?.[1] || '';
  soft((root.match(/<h1[\s>]/g) || []).length === 1, `${rel}: no tiene exactamente un h1`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '';
  soft(new URL(canonical).pathname === rel, `${rel}: canonical ${canonical}`);
  const lang = rel.startsWith('/en') ? 'en' : rel.startsWith('/pt-br') ? 'pt' : 'es';
  for (const [tipo, valor] of [['título', html.match(/<title>([^<]*)/)?.[1]], ['descripción', html.match(/<meta name="description" content="([^"]*)"/)?.[1]]]) {
    const clave = `${lang}|${tipo}|${valor}`;
    soft(!vistos.has(clave), `${tipo} repetido en ${rel} y ${vistos.get(clave)}: ${valor}`);
    vistos.set(clave, rel);
  }
  if (lang !== 'es') soft(!/<h1[^>]*>[^<]*(Tour a |Tours privados en|Transporte privado en|Alquiler de vans)/.test(root), `${rel}: h1 sin traducir`);
  // 3) Enlaces internos reales.
  for (const [, raw] of root.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)) {
    const href = decode(raw).replace(/\/+$/, '') || '/';
    if (/\.[a-z0-9]+$/i.test(href)) continue;
    soft(existsSync(href === '/' ? join(dist, 'index.html') : htmlDe(href)), `${rel}: enlace roto ${href}`);
    soft(!/^(\/en|\/pt-br)?\/(experiencias|servicios|vehiculos)(\/|$)/.test(href), `${rel}: enlace a ruta antigua ${href}`);
  }
}

// 4) Sitemap.
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const enSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
soft(enSitemap.size === 72 && (sitemap.match(/<url>/g) || []).length === 72, `sitemap: se esperaban 72 URL y hay ${enSitemap.size}`);
for (const file of paginas) {
  const rel = '/' + relative(dist, file).replaceAll('\\', '/').replace(/\/?index\.html$/, ''), legal = /(^|\/)(privacidad|politica-de-tratamiento-de-datos)$/.test(rel);
  soft(enSitemap.has(rel) !== legal, legal ? `sitemap: incluye la página legal ${rel}` : `sitemap: falta ${rel}`);
}
soft((sitemap.match(/hreflang="x-default"/g) || []).length === 72, 'sitemap: faltan alternos x-default');
const indice = readFileSync(join(dist, 'sitemap_index.xml'), 'utf8');
soft(/<sitemapindex [^>]*>\s*<sitemap><loc>https:\/\/[^<]+\/sitemap\.xml<\/loc><\/sitemap>\s*<\/sitemapindex>/.test(indice), 'sitemap_index.xml: no apunta a sitemap.xml');
soft(/^Sitemap: https:\/\/[^\n]+\/sitemap_index\.xml$/m.test(readFileSync(join(dist, 'robots.txt'), 'utf8')), 'robots.txt: no anuncia sitemap_index.xml');
soft(!/\/(experiencias|servicios|vehiculos)(["/<])/.test(sitemap), 'sitemap: contiene rutas antiguas');

// 5) Inicio: h1, título y descripción con la keyword de su idioma; un solo bloque de empresa con servicios que existen. Todo JSON-LD debe ser válido.
const KEYWORD = { '': 'Agencia de turismo en Medellín', '/en': 'Tour agency in Medellín', '/pt-br': 'Agência de turismo em Medellín' };
for (const pre of PREFIJOS) {
  const html = readFileSync(pre ? htmlDe(pre) : join(dist, 'index.html'), 'utf8'), kw = KEYWORD[pre];
  soft(new RegExp(`<h1[^>]*>${kw}</h1>`).test(html), `${pre || '/'}: el h1 no es «${kw}»`);
  soft(html.match(/<title>([^<]*)/)?.[1].startsWith(kw), `${pre || '/'}: el título no empieza por la keyword`);
  soft(html.match(/<meta name="description" content="([^"]*)"/)?.[1].startsWith(kw), `${pre || '/'}: la descripción no empieza por la keyword`);
  const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const empresa = bloques.filter((b) => b['@type'] === 'TravelAgency');
  soft(empresa.length === 1, `${pre || '/'}: hay ${empresa.length} bloques TravelAgency`);
  soft(empresa[0]?.description.startsWith(kw), `${pre || '/'}: JSON-LD sin la keyword`);
  const sitio = bloques.find((b) => b['@type'] === 'WebSite'), lang = pre === '/en' ? 'en' : pre === '/pt-br' ? 'pt-BR' : 'es-CO';
  soft(sitio?.description?.startsWith(kw), `${pre || '/'}: WebSite sin description`);
  soft(sitio?.potentialAction?.target?.urlTemplate?.endsWith(`${pre}/tours?buscar={search_term_string}`) && sitio.potentialAction['query-input'] === 'required name=search_term_string', `${pre || '/'}: WebSite sin SearchAction válida`);
  soft(bloques.find((b) => b['@type'] === 'FAQPage')?.inLanguage === lang, `${pre || '/'}: FAQPage sin inLanguage ${lang}`);
  for (const campo of ['name', 'url', 'telephone', 'email', 'address', 'areaServed', 'sameAs', 'identifier', 'taxID']) soft(empresa[0]?.[campo], `${pre || '/'}: JSON-LD sin ${campo}`);
  for (const { itemOffered } of empresa[0]?.hasOfferCatalog.itemListElement || []) { const ruta = new URL(itemOffered.url).pathname; soft(existsSync(htmlDe(ruta)), `${pre || '/'}: servicio sin página ${ruta}`); soft(pre ? ruta.startsWith(pre) : !/^\/(en|pt-br)\//.test(ruta), `${pre || '/'}: servicio de otro idioma ${ruta}`); }
}
for (const file of paginas) for (const [, json] of readFileSync(file, 'utf8').matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(json); } catch { findings.push(`${relative(dist, file)}: JSON-LD inválido`); } }

// 6) 301 de vercel.json y .htaccess iguales a rutasAnteriores.
const esperadas = PREFIJOS.flatMap((pre) => Object.entries(rutasAnteriores).map(([a, b]) => `${pre + a}→${pre + b}`)).sort();
const vercel = JSON.parse(readFileSync(join(site, 'vercel.json'), 'utf8')).redirects;
assert.deepEqual(vercel.map((r) => `${r.source}→${r.destination}`).sort(), esperadas);
soft(vercel.every((r) => r.statusCode === 301), 'vercel.json: alguna redirección no es 301');
const htaccess = readFileSync(join(site, 'public', '.htaccess'), 'utf8');
for (const [a, b] of Object.entries(rutasAnteriores)) soft(htaccess.includes(`RewriteRule ^(en/|pt-br/)?${a.slice(1)}/?$ /$1${b.slice(1)} [R=301,L]`), `.htaccess: falta ${a}`);

for (const pre of PREFIJOS) for (const path of ['/tours/guatape', '/transporte/aeropuerto-medellin']) console.log(pre + path, '→', readFileSync(htmlDe(pre + path), 'utf8').match(/<title>([^<]*)/)?.[1]);
if (findings.length) { console.error('HALLAZGOS:\n- ' + findings.join('\n- ')); process.exit(1); }
console.log(`OK: ${paginas.length} páginas, ${esperadas.length} redirecciones, sitemap sin rutas antiguas.`);
