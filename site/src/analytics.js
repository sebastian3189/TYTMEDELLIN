import { company } from './company';
import { allowAnalytics, CONSENT_KEY } from './consent';
import { stripLanguage } from './languages';
import { slugFromPath } from './rutas';

/*
 * Medición con consentimiento (Spec 04 «Consentimiento», Spec 05 «Eventos»). Tag Manager solo se carga si la persona acepta «Analítica». Sin VITE_GTM_ID
 * (definida solo en Production de Vercel) no se hace nada, y las copias de prueba no ensucian los datos. Regla de oro: nunca nombre, teléfono, correo, mensaje ni URL de WhatsApp;
 * solo pasan los parámetros de PERMITIDOS. Un evento sin consentimiento se descarta: si se guardara, GTM lo enviaría al aceptar.
 */
const GTM_ID = import.meta.env.VITE_GTM_ID;
const PERMITIDOS = ['tipo', 'slug', 'origen', 'posicion', 'lista', 'tipo_error'];
const ENLACE_WHATSAPP = `a[href^="https://wa.me/${company.whatsapp}"]`;
const TARJETA = 'a.tour-card-main,a.th-card,a.th-title-link,a.ssc-card';
const ORIGEN_WHATSAPP = [['.wa-fab', 'boton_flotante'], ['.tour-bar', 'barra_ficha'], ['.summary', 'cotizacion'], ['.contact-grid', 'contacto'], ['.home-close', 'inicio'], ['.socials', 'redes']];
const LISTA_TARJETA = [['.tour-grid', 'catalogo'], ['.th', 'inicio_mano'], ['.scrub-hero', 'inicio_baraja']];

let iniciada = false, cargado = false, vistaPendiente = null;
const activa = () => Boolean(GTM_ID) && allowAnalytics();
function gtag() { window.dataLayer.push(arguments); }

export function track(event, params = {}) {
  if (!activa()) return;
  // La capa de datos conserva valores entre eventos: cada parámetro permitido se escribe siempre, aunque quede vacío.
  const limpios = Object.fromEntries(PERMITIDOS.map((clave) => [clave, typeof params[clave] === 'string' ? params[clave].slice(0, 100) : params[clave]]));
  window.dataLayer.push({ event, idioma: document.documentElement.lang, ...limpios });
}
// La persona suele aceptar con la ficha ya abierta: esa vista se envía al aceptar. La función devuelta la olvida al salir de la página.
export function trackView(params) {
  if (activa()) track('view_item', params); else vistaPendiente = params;
  return () => { vistaPendiente = null; };
}
export function contextoPagina() {
  const origen = stripLanguage(location.pathname), slug = slugFromPath(origen);
  return { origen, slug, tipo: slug ? 'experiencia' : 'general' };
}

function cargarTagManager() {
  if (cargado) return;
  cargado = true;
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const insertar = () => { const script = document.createElement('script'); script.async = true; script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`; document.head.append(script); };
  (window.requestIdleCallback || ((fn) => setTimeout(fn, 1200)))(insertar, { timeout: 2500 }); // no compite con el primer pintado
}
function borrarCookies() {
  const partes = location.hostname.split('.'), dominios = [''];
  for (let i = 0; i < partes.length - 1; i++) dominios.push(`; domain=.${partes.slice(i).join('.')}`);
  for (const par of document.cookie.split('; ')) {
    const nombre = par.split('=')[0];
    if (/^(_ga|_gid|_gat)/.test(nombre)) for (const dominio of dominios) document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dominio}`;
  }
}
function sincronizar() {
  if (allowAnalytics()) {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    cargarTagManager();
    if (vistaPendiente) { track('view_item', vistaPendiente); vistaPendiente = null; }
  } else {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    borrarCookies();
  }
}
function alHacerClic(event) {
  if (!event.isTrusted || !(event.target instanceof Element)) return; // las transiciones de página reenvían el mismo clic: se cuenta una sola vez
  const whatsapp = event.target.closest(ENLACE_WHATSAPP);
  if (whatsapp) {
    const { slug, tipo } = contextoPagina();
    track('whatsapp_click', { origen: ORIGEN_WHATSAPP.find(([selector]) => whatsapp.closest(selector))?.[1] || 'otro', tipo, slug });
    return;
  }
  const tarjeta = event.target.closest(TARJETA), slug = tarjeta && slugFromPath(stripLanguage(new URL(tarjeta.href).pathname));
  if (!slug) return;
  const [selector, lista] = LISTA_TARJETA.find(([s]) => tarjeta.closest(s)) || [];
  const grupo = selector ? tarjeta.closest(selector) : tarjeta.closest('section') || document;
  const destinos = [...new Set([...grupo.querySelectorAll(TARJETA)].map((a) => a.href))];
  track('select_item', { tipo: 'experiencia', slug, posicion: destinos.indexOf(tarjeta.href) + 1, lista: lista || 'otras_experiencias' });
}

export function initAnalytics() {
  if (iniciada || !GTM_ID || typeof window === 'undefined') return;
  iniciada = true;
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  sincronizar();
  window.addEventListener('tyt-consent-change', sincronizar);
  window.addEventListener('storage', (event) => { if (event.key === CONSENT_KEY || event.key === null) sincronizar(); });
  window.addEventListener('click', alHacerClic, true);
}
