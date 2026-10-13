// Prerender de todas las rutas (Spec 04 «Prerender», Spec 05 LCP/SEO). Sin servidor: lee dist/index.html (cáscara del build de cliente), renderiza cada
// ruta con dist-ssr/entry-server.js (renderToString + StaticRouter) y escribe dist/<ruta>/index.html con el HTML de la página, su título/descripción,
// el CSS en línea, la precarga de la imagen LCP y un cargador que pide el JS (app + chunk de la ruta) cuando la imagen LCP termina.
// dist/404.html es la página 404 prerenderizada; /site y /flota (redirecciones de cliente) se publican con la cáscara original.
// Uso: `npm run build` (vite build && vite build --ssr … && node scripts/prerender.mjs).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(site, 'dist');
const { render, paths, metaFor } = await import(pathToFileURL(join(site, 'dist-ssr', 'entry-server.js')).href);
const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
const shell = (await readFile(join(dist, 'index.html'), 'utf8')).split('\r\n').join('\n');

const esc = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (html, name) => html.replace(new RegExp(`[ \\t]*<!--${name}:start-->[\\s\\S]*?<!--${name}:end-->\\n?`), '');
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const chunkFor = (path) => {
  path=path.replace(/^\/en(?=\/|$)/,'')||'/';
  if (path === '/') return 'Home';
  if (path === '/experiencias') return 'Catalog';
  if (path.startsWith('/experiencias/')) return 'Tour';
  if (path === '/vehiculos') return 'Fleet';
  if (path === '/blog' || path.startsWith('/blog/')) return 'Blog';
  return 'Company';
};
function chunkFiles(key, seen = new Set()) {
  const entry = manifest[key];
  if (!entry || seen.has(key)) return [];
  seen.add(key);
  return [`/${entry.file}`, ...(entry.imports || []).flatMap((k) => chunkFiles(k, seen))];
}

// Entrada y precargas que Vite puso en la cáscara: el prerender las sustituye por un cargador (ver `loader`).
const entryTag = shell.match(/<script type="module"[^>]*\ssrc="(\/assets\/[^"]+\.js)"[^>]*><\/script>/);
if (!entryTag) throw new Error('prerender: no se encontró el script de entrada del build');
const shellPreloads = [...shell.matchAll(/<link rel="modulepreload"[^>]*href="(\/assets\/[^"]+\.js)"[^>]*>/g)];
// CSS en línea: un solo archivo (cssCodeSplit:false) de ~14 KB gzip que va dentro del HTML; así el primer pintado no espera un viaje de red extra
// (en Slow 4G, RTT 562 ms) y no hay hoja de estilos externa que bloquee la hidratación.
const cssLink = shell.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error('prerender: no se encontró la hoja de estilos del build');
const css = (await readFile(join(dist, cssLink[1]), 'utf8')).trim();

// Cargador del JS (Spec 05 LCP): el HTML ya es la página completa, así que el JS (hidratación) no interviene en el LCP. Se pide cuando la imagen LCP
// (el póster #boot en el inicio, la imagen con fetchpriority=high en el resto) termina o a los 3,5 s; sin imagen, de inmediato. Los enlaces del HTML
// son <a> reales y funcionan antes de hidratar. `modulepreload` de la app y del chunk de la ruta salen a la vez para no encadenar viajes de red.
const loader = (urls, extra) => `<script>(function(){var u=${JSON.stringify(urls)},e=${JSON.stringify(entryTag[1])},x=${JSON.stringify(extra)},d=document,done=0;
function go(){if(done)return;done=1;x.forEach(function(h){var l=d.createElement('link');l.rel='preload';l.as='font';l.type='font/woff2';l.href=h;l.crossOrigin='anonymous';d.head.appendChild(l)});u.forEach(function(h){var l=d.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=h;d.head.appendChild(l)});var s=d.createElement('script');s.type='module';s.crossOrigin='';s.src=e;d.head.appendChild(s)}
function arm(){var i=d.querySelector('#boot-layer img,img[fetchpriority=high]');if(i&&!i.complete){i.addEventListener('load',go);i.addEventListener('error',go);setTimeout(go,3500)}else go()}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',arm);else arm()})()</script>`;

// Compone el HTML de una ruta a partir de la cáscara. `mark` marca el root: 404 → el cliente lo renderiza con createRoot (no se hidrata: el mismo HTML
// sirve para cualquier URL desconocida, p. ej. /experiencias/inexistente, donde el menú activo difiere).
function compose({ path, body, title, description, chunk, mark }) {
  const en=/^\/en(?:\/|$)/.test(path),localPath=path.replace(/^\/en(?=\/|$)/,'')||'/';
  // renderToString no falla ante un error de render: cae a render de cliente y deja una plantilla. Aquí sí debe fallar el build.
  if (/Switched to client rendering|<template data-msg/.test(body)) throw new Error(`prerender ${path}: el servidor cayó a render de cliente: ${body.match(/data-msg="([^"]*)"/)?.[1]}`);
  if ((body.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`prerender ${path}: se esperaba exactamente un h1`);
  let html = shell;
  html=html.replace('lang="es-CO"',en?'lang="en"':'lang="es-CO"');
  if(!mark) html=html.replace('</head>',`<link rel="alternate" hreflang="es" href="${localPath}"/><link rel="alternate" hreflang="en" href="/en${localPath}"/><link rel="alternate" hreflang="x-default" href="${localPath}"/></head>`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(`${title} | T&T Medellín`)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${esc(description)}${b}`);
  html = strip(html, 'inter');
  html = html.replace(cssLink[0], () => `<style>${css}</style>`);
  html = html.replace(entryTag[0], '');
  for (const link of shellPreloads) html = html.replace(link[0], '');
  html = html.replace(/<!--noscript:start-->[\s\S]*?<!--noscript:end-->/, '<noscript><style>#boot{display:none}</style></noscript>');
  const preloads = [], fonts = [];
  if (localPath !== '/') {
    // Rutas interiores: sin póster de arranque; la imagen LCP del HTML se precarga desde <head> e Inter llega junto con el JS.
    html = strip(strip(strip(html, 'boot'), 'bootjs'), 'home-preload');
    fonts.push('/fonts/inter.woff2');
    const lcp = body.match(/<img\b[^>]*\sfetchpriority="high"[^>]*>/i)?.[0];
    if (lcp) {
      const src = attr(lcp, 'src'), srcset = attr(lcp, 'srcset'), sizes = attr(lcp, 'sizes');
      preloads.push(`<link rel="preload" as="image" href="${src}"${srcset ? ` imagesrcset="${srcset}"` : ''}${sizes ? ` imagesizes="${sizes}"` : ''} fetchpriority="high" />`);
    }
  }
  const urls = [...new Set([...shellPreloads.map((m) => m[1]), ...chunkFiles(`src/pages/${chunk}.jsx`)])];
  if (preloads.length) html = html.replace('</head>', () => `  ${preloads.join('\n  ')}\n</head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root"${mark ? ` data-prerender="${mark}"` : ''}>${body}</div>`);
  html = html.replace('</body>', () => `  ${loader(urls, fonts)}\n</body>`);
  return html;
}

const pages = [];
for (const path of paths) {
  const [title, description] = metaFor(path);
  const html = compose({ path, body: await render(path), title, description, chunk: chunkFor(path) });
  const out = path === '/' ? join(dist, 'index.html') : join(dist, ...path.split('/').filter(Boolean), 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  pages.push({ path, kb: +(Buffer.byteLength(html) / 1024).toFixed(1) });
}
// 404 real: la página «Este recorrido no está aquí» prerenderizada (h1 sin JS; el servidor la entrega con estado 404).
{
  const [title, description] = metaFor('/__404__');
  const html = compose({ path: '/__404__', body: await render('/__404__'), title, description, chunk: 'NotFound', mark: '404' });
  await writeFile(join(dist, '404.html'), html);
  pages.push({ path: '/404.html', kb: +(Buffer.byteLength(html) / 1024).toFixed(1) });
}
// /site y /flota redirigen en el cliente: se publica la cáscara (sin HTML de servidor, createRoot) para que un host estático los sirva con 200.
for (const path of ['/site', '/flota']) {
  const out = join(dist, ...path.split('/').filter(Boolean), 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, shell);
}
console.log(`prerender: ${pages.length} rutas + 404.html + /site + /flota`);
for (const page of pages) console.log(`  ${page.path.padEnd(48)} ${page.kb} KB`);
