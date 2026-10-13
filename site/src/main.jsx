import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Website, { preloadRoute } from './Website.jsx';

const app = <StrictMode><BrowserRouter><Website /></BrowserRouter></StrictMode>;
const root = document.getElementById('root');
// Rutas prerenderizadas (scripts/prerender.mjs): se hidratan tras dejar resuelto el chunk de la ruta. Sin HTML (404 real, /site, /flota): render normal.
if (root.hasChildNodes() && root.dataset.prerender !== '404') preloadRoute(location.pathname).catch(() => {}).then(() => hydrateRoot(root, app));
else preloadRoute(location.pathname).catch(() => {}).then(() => createRoot(root).render(app));
