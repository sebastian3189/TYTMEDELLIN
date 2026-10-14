// Prerender de todas las rutas (Spec 04 «Prerender», Spec 05 LCP/SEO). Sin servidor: lee dist/index.html (cáscara del build de cliente), renderiza cada
// ruta con dist-ssr/entry-server.js (renderToString + StaticRouter) y escribe dist/<ruta>/index.html con el HTML de la página, su título/descripción,
// el CSS en línea, la precarga de la imagen LCP y un cargador que pide el JS (app + chunk de la ruta) cuando la imagen LCP termina.
// dist/404.html es la página 404 prerenderizada; /site y /flota (redirecciones de cliente) se publican con la cáscara original.
// Además escribe sitemap.xml, robots.txt, 200.html (cáscara vacía para hosts con reescritura SPA) y un canonical absoluto por ruta.
// Dominio (PENDIENTE CLIENTE, Spec 06): TYT_SITE_URL=https://dominio-final; indexación: TYT_INDEXABLE=1 (sin él, el prototipo conserva noindex y robots.txt cierra todo).
// Uso: `npm run build` (vite build && vite build --ssr … && node scripts/prerender.mjs).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(site, 'dist');
const { render, paths, metaFor } = await import(pathToFileURL(join(site, 'dist-ssr', 'entry-server.js')).href);
const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
const shell = (await readFile(join(dist, 'index.html'), 'utf8')).split('\r\n').join('\n');

const SITE_PENDING = 'https://dominio-pendiente-cliente.invalid';
const SITE = (process.env.TYT_SITE_URL || SITE_PENDING).replace(/\/+$/, '');
const INDEXABLE = process.env.TYT_INDEXABLE === '1';
if (SITE === SITE_PENDING) console.warn('prerender: TYT_SITE_URL no definido; canonical y sitemap usan el marcador PENDIENTE CLIENTE (' + SITE_PENDING + ')');
const abs = (path) => SITE + (path === '/' ? '/' : path.replace(/\/+$/, ''));
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
// (la imagen con fetchpriority=high; el inicio ya no tiene: su LCP es el titular del hero) termina o a los 3,5 s; sin imagen, de inmediato. Los enlaces del HTML
// son <a> reales y funcionan antes de hidratar. `modulepreload` de la app y del chunk de la ruta salen a la vez para no encadenar viajes de red.
const loader = (urls, extra) => `<script>(function(){var u=${JSON.stringify(urls)},e=${JSON.stringify(entryTag[1])},x=${JSON.stringify(extra)},d=document,done=0;
function go(){if(done)return;done=1;x.forEach(function(h){var l=d.createElement('link');l.rel='preload';l.as='font';l.type='font/woff2';l.href=h;l.crossOrigin='anonymous';d.head.appendChild(l)});u.forEach(function(h){var l=d.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=h;d.head.appendChild(l)});var s=d.createElement('script');s.type='module';s.crossOrigin='';s.src=e;d.head.appendChild(s)}
function arm(){var i=d.querySelector('img[fetchpriority=high]');if(i&&!i.complete){i.addEventListener('load',go);i.addEventListener('error',go);setTimeout(go,3500)}else go()}
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
  if(!mark) html=html.replace('</head>',`<link rel="canonical" href="${abs(path)}"/><link rel="alternate" hreflang="es" href="${abs(localPath)}"/><link rel="alternate" hreflang="en" href="${abs('/en'+(localPath==='/'?'/':localPath))}"/><link rel="alternate" hreflang="x-default" href="${abs(localPath)}"/></head>`);
  if (INDEXABLE) html = html.replace(/[ \t]*<meta name="robots" content="noindex, nofollow" \/>\n?/, '');
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(`${title} | T&T Medellín`)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${esc(description)}${b}`);
  html = strip(html, 'inter');
  html = html.replace(cssLink[0], () => `<style>${css}</style>`);
  html = html.replace(entryTag[0], '');
  for (const link of shellPreloads) html = html.replace(link[0], '');
  // Sin JavaScript: cabecera sólida (no hay observador del hero) y el menú se reduce al enlace «Menú» → pie (ver .menu-nojs en website.css).
  html = html.replace(/<!--noscript:start-->[\s\S]*?<!--noscript:end-->/, '<noscript><style>.site-header.is-home{background:#fff!important;color:#1E201D!important;border-bottom:1px solid rgba(30,32,29,.08)!important}.site-header.is-home *{color:#1E201D!important;border-color:rgba(30,32,29,.4)!important}.home-hero{margin-top:0!important}</style></noscript>');
  const preloads = [], fonts = [];
  if (localPath !== '/') {
    // Rutas interiores: la imagen LCP del HTML se precarga desde <head> e Inter llega junto con el JS.
    fonts.push('/fonts/inter.woff2');
    const lcp = body.match(/<img\b[^>]*\sfetchpriority="high"[^>]*>/i)?.[0];
    if (lcp) {
      const src = attr(lcp, 'src'), srcset = attr(lcp, 'srcset'), sizes = attr(lcp, 'sizes');
      preloads.push(`<link rel="preload" as="image" href="${src}"${srcset ? ` imagesrcset="${srcset}"` : ''}${sizes ? ` imagesizes="${sizes}"` : ''} fetchpriority="high" />`);
    }
  }
  const urls = [...new Set([...shellPreloads.map((m) => m[1]), ...chunkFiles(`src/pages/${chunk}.jsx`)])];
  if (preloads.length) html = html.replace('</head>', () => `  ${preloads.join('\n  ')}\n</head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root" data-path="${path}"${mark ? ` data-prerender="${mark}"` : ''}>${body}</div>`);
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
// Cáscara vacía para hosts que solo saben reescribir a un HTML (Netlify/Surge `200.html`): el cliente la renderiza con createRoot (sin hidratar HTML ajeno).
await writeFile(join(dist, '200.html'), shell);
// sitemap.xml: solo las rutas 200 indexables (sin /site, /flota ni 404), con alternos es/en.
const urls = paths.map((path) => {
  const local = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return `  <url><loc>${abs(path)}</loc><xhtml:link rel="alternate" hreflang="es" href="${abs(local)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs('/en' + (local === '/' ? '/' : local))}"/></url>`;
});
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), INDEXABLE ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n` : `# Prototipo: sin indexación hasta la publicación (Spec 01/06).\nUser-agent: *\nDisallow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`prerender: ${pages.length} rutas + 404.html + 200.html + /site + /flota + sitemap.xml + robots.txt`);
for (const page of pages) console.log(`  ${page.path.padEnd(48)} ${page.kb} KB`);
