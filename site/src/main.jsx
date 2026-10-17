import { StrictMode, useEffect, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Website, { preloadRoute } from './Website.jsx';
import { language, prepareLanguage, setLanguage } from './i18n';
import { languageFromPath, languageInfo } from './languages';
import { installPageTransitions } from './text-motion';
installPageTransitions();
await prepareLanguage(language());

// El idioma activo cambia sin recargar (switchLanguage, desde el selector): la app se vuelve a montar con el diccionario y el prefijo nuevos.
// «Atrás/Adelante» entre entradas de otro idioma también se resuelve aquí.
function App() {
  const [code, setCode] = useState(language());
  useEffect(() => {
    const change = (event) => { setCode(event.detail); requestAnimationFrame(() => document.querySelector('.language-toggle')?.focus({ preventScroll: true })); };
    const pop = () => { const next = languageFromPath(location.pathname); if (next !== language()) { prepareLanguage(next).then(() => { setLanguage(next); document.documentElement.lang = languageInfo(next).html; setCode(next); }); } };
    window.addEventListener('tyt-language-change', change); window.addEventListener('popstate', pop);
    return () => { window.removeEventListener('tyt-language-change', change); window.removeEventListener('popstate', pop); };
  }, []);
  return <BrowserRouter key={code} basename={languageInfo(code).prefix || '/'}><Website /></BrowserRouter>;
}
const app = <StrictMode><App /></StrictMode>;
const root = document.getElementById('root');
// Rutas prerenderizadas (scripts/prerender.mjs): se hidratan tras dejar resuelto el chunk de la ruta. Sin HTML (404 real, /site, /flota): render normal.
// Hosts con reescritura SPA (cualquier ruta → un mismo index.html): el HTML del #root puede ser de OTRA ruta (data-path); hidratarlo daría React #418.
// En ese caso se descarta y se renderiza en el cliente (Spec 04 «Despliegue»).
const norm = (path) => (path || '').replace(/\/+$/, '') || '/';
const sameRoute = root.dataset.path !== undefined && norm(root.dataset.path) === norm(location.pathname);
if (root.hasChildNodes() && root.dataset.prerender !== '404' && sameRoute) preloadRoute(location.pathname).catch(() => {}).then(() => hydrateRoot(root, app));
else preloadRoute(location.pathname).catch(() => {}).then(() => { root.textContent = ''; createRoot(root).render(app); });
