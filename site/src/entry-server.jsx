import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Website, { preloadAllRoutes } from './Website.jsx';
import { tours, articles } from './content';
import { staticMeta, NOT_FOUND } from './meta';
import { setLanguage, prepareLanguage, unprefix, t } from './i18n';

// Prerender (Spec 04): HTML de una ruta y sus metadatos. Se compila con `vite build --ssr` y lo invoca scripts/prerender.mjs.
import { LANGUAGES, languageFromPath, languageInfo, pathForLanguage } from './languages';
const spanishPaths = ['/', '/experiencias', '/servicios', '/vehiculos', '/nosotros', '/blog', '/contacto', '/cotizar', '/calificaciones', '/privacidad', '/politica-de-tratamiento-de-datos',
  ...tours.map((t) => `/experiencias/${t.slug}`), ...articles.map((a) => `/blog/${a.slug}`)];
export const paths = spanishPaths.flatMap(path=>LANGUAGES.map(lang=>pathForLanguage(path,lang.code)));
export async function metaFor(path) {
  const lang=languageFromPath(path); await prepareLanguage(lang); setLanguage(lang);
  path=unprefix(path).replace(/\/+$/,'')||'/';
  const tour = tours.find((t) => path === `/experiencias/${t.slug}`), article = articles.find((a) => path === `/blog/${a.slug}`);
  if (tour) return [t(tour.name), t(tour.description)];
  if (article) return [t(article.title), t(article.intro)];
  return (staticMeta[path] || NOT_FOUND).map(t);
}
export async function render(url) {
  await preloadAllRoutes();
  const lang=languageFromPath(url); await prepareLanguage(lang); setLanguage(lang);
  return renderToString(<StaticRouter basename={languageInfo(lang).prefix || '/'} location={url}><Website /></StaticRouter>);
}
