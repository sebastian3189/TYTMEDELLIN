import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Website, { preloadAllRoutes } from './Website.jsx';
import { tours, articles } from './content';
import { staticMeta, NOT_FOUND } from './meta';

// Prerender (Spec 04): HTML de una ruta y sus metadatos. Se compila con `vite build --ssr` y lo invoca scripts/prerender.mjs.
export const paths = ['/', '/experiencias', '/servicios', '/vehiculos', '/nosotros', '/blog', '/contacto', '/cotizar', '/calificaciones', '/privacidad',
  ...tours.map((t) => `/experiencias/${t.slug}`), ...articles.map((a) => `/blog/${a.slug}`)];
export function metaFor(path) {
  const tour = tours.find((t) => path === `/experiencias/${t.slug}`), article = articles.find((a) => path === `/blog/${a.slug}`);
  if (tour) return [tour.name, tour.description];
  if (article) return [article.title, article.intro];
  return staticMeta[path] || NOT_FOUND;
}
export async function render(url) {
  await preloadAllRoutes();
  return renderToString(<StaticRouter location={url}><Website /></StaticRouter>);
}
