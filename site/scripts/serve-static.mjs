// Servidor estático mínimo tipo host de producción (Netlify/Cloudflare Pages/nginx try_files $uri $uri/index.html =404)
import http from 'node:http'; import { readFileSync, existsSync, statSync } from 'node:fs'; import { resolve, extname } from 'node:path'; import { gzipSync } from 'node:zlib';
const [,, root, port, mode='static'] = process.argv;
const T = { '.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.mp4':'video/mp4','.avif':'image/avif' };
const isFile = f => existsSync(f) && statSync(f).isFile();
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); let status = 200; let f = resolve(root, '.' + p);
  if (!f.startsWith(resolve(root))) { res.writeHead(403); return res.end(); }
  if (!isFile(f)) {
    if (mode === 'spa') f = resolve(root, 'index.html');
    else if (isFile(resolve(f, 'index.html'))) f = resolve(f, 'index.html');
    else { f = resolve(root, '404.html'); status = 404; }
  }
  let body = readFileSync(f); const type = T[extname(f)] || 'application/octet-stream'; const h = { 'Content-Type': type, 'Cache-Control': p.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' };
  if (/text|javascript|json|svg|xml/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) { body = gzipSync(body, { level: 6 }); h['Content-Encoding'] = 'gzip'; h.Vary = 'Accept-Encoding'; }
  h['Content-Length'] = body.length; res.writeHead(status, h); res.end(req.method === 'HEAD' ? undefined : body);
}).listen(+port, '127.0.0.1', () => console.log('up', port, mode));
