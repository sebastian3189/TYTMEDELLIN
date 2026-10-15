import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';
import { tours, articles } from './src/content.js';

const paths = new Set(['/', '/site', '/experiencias', '/servicios', '/vehiculos', '/flota', '/nosotros', '/blog', '/contacto', '/cotizar', '/calificaciones', '/privacidad', '/politica-de-tratamiento-de-datos', ...tours.map(t => `/experiencias/${t.slug}`), ...articles.map(a => `/blog/${a.slug}`)]);
for(const path of [...paths]) for(const prefix of ['/en','/pt-br']) paths.add(prefix+(path==='/'?'':path));
// 404 real (Spec 05): rutas desconocidas devuelven 404 con la cáscara de la app (`dist/404.html`, sin HTML prerenderizado; el cliente la renderiza con createRoot).
function routeStatus() {
  const middleware = (root, file, transform) => async (req, res, next) => {
    const pathname = new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '') || '/';
    if (!req.headers.accept?.includes('text/html') || paths.has(pathname) || /\.[a-z0-9]+$/i.test(pathname) || pathname.startsWith('/@')) return next();
    try {
      const localized = file==='404.html' ? (/^\/pt-br(?:\/|$)/.test(pathname)?'pt-br/404.html':/^\/en(?:\/|$)/.test(pathname)?'en/404.html':file) : file;
      const html = await readFile(resolve(root, localized), 'utf8');
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(transform ? await transform(req.url, html) : html);
    } catch (error) { next(error); }
  };
  return {
    name: 'local-route-status',
    configureServer(server) { server.middlewares.use(middleware(server.config.root, 'index.html', server.transformIndexHtml.bind(server))); },
    configurePreviewServer(server) {
      const dist = resolve(server.config.root, 'dist');
      // Como un host estático: /ruta sirve dist/ruta/index.html (el HTML prerenderizado de esa ruta) sin redirigir.
      server.middlewares.use((req, _res, next) => {
        const url = new URL(req.url, 'http://localhost'), pathname = url.pathname.replace(/\/$/, '');
        if (!pathname) req.url = '/index.html' + url.search;
        else if (!/\.[a-z0-9]+$/i.test(pathname) && existsSync(resolve(dist, '.' + pathname, 'index.html'))) req.url = pathname + '/index.html' + url.search;
        next();
      });
      // Compresión gzip de los textos (HTML, JS, CSS, JSON, SVG), como cualquier host real: `vite preview` sirve sin comprimir y las mediciones de
      // Slow 4G (Spec 05) pagarían 4× el peso de transferencia. Las imágenes y fuentes no se tocan.
      const TEXT = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml' }, cache = new Map();
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' || !String(req.headers['accept-encoding'] || '').includes('gzip')) return next();
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname), type = TEXT[pathname.match(/\.[a-z0-9]+$/i)?.[0]];
        const file = type && resolve(dist, '.' + pathname);
        if (!file || !file.startsWith(dist) || !existsSync(file)) return next();
        const key = file + statSync(file).mtimeMs;
        if (!cache.has(key)) cache.set(key, gzipSync(readFileSync(file), { level: 9 }));
        const body = cache.get(key);
        res.writeHead(200, { 'Content-Type': type, 'Content-Encoding': 'gzip', 'Content-Length': body.length, Vary: 'Accept-Encoding', 'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' });
        res.end(body);
      });
      server.middlewares.use(middleware(dist, '404.html'));
    },
  };
}

// Build en tres pasos (npm run build): 1) cliente (con manifiesto), 2) servidor (entry-server.jsx) y 3) scripts/prerender.mjs, que escribe el HTML de
// cada ruta en dist/. Un solo CSS (sin partirlo por chunk) para que el HTML prerenderizado traiga ya sus estilos en <head>.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react({jsxImportSource:'@tt-i18n'}), routeStatus()],
  resolve: {alias:{'@tt-i18n':resolve(import.meta.dirname,'src/i18n-runtime')}},
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  build: { target:'esnext', manifest: !isSsrBuild, cssCodeSplit: false, copyPublicDir: !isSsrBuild },
}));
