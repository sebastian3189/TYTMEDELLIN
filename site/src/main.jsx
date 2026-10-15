import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Website, { preloadRoute } from './Website.jsx';
import { language, prepareLanguage } from './i18n';
import { languageInfo } from './languages';
await prepareLanguage(language());

const app = <StrictMode><BrowserRouter basename={languageInfo(language()).prefix || '/'}><Website /></BrowserRouter></StrictMode>;
const root = document.getElementById('root');
// Rutas prerenderizadas (scripts/prerender.mjs): se hidratan tras dejar resuelto el chunk de la ruta. Sin HTML (404 real, /site, /flota): render normal.
// Hosts con reescritura SPA (cualquier ruta → un mismo index.html): el HTML del #root puede ser de OTRA ruta (data-path); hidratarlo daría React #418.
// En ese caso se descarta y se renderiza en el cliente (Spec 04 «Despliegue»).
const norm = (path) => (path || '').replace(/\/+$/, '') || '/';
const sameRoute = root.dataset.path !== undefined && norm(root.dataset.path) === norm(location.pathname);
if (root.hasChildNodes() && root.dataset.prerender !== '404' && sameRoute) preloadRoute(location.pathname).catch(() => {}).then(() => hydrateRoot(root, app));
else preloadRoute(location.pathname).catch(() => {}).then(() => { root.textContent = ''; createRoot(root).render(app); });
