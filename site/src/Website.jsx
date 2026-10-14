import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, matchPath, useLocation } from 'react-router-dom';
import './website.css';
import './extras.css';
import './forms-contact.css';
import './glass.css';
import './footer.css';
import './home-legacy.css';
import { company } from './company';
import Socials, { SocialIcon } from './Socials';
import Icon from './icons';
import Skyline from './Skyline';
import Allies from './Allies';
import { staticMeta, NOT_FOUND, applyMeta } from './meta';
import { Arrow, Button, reduced } from './shared';
import Preferences from './Preferences';
import WhatsAppFab from './WhatsAppFab';
import { unprefix } from './i18n';

// Logo aportado por el usuario, TAL CUAL (SPECS/01): solo se reduce; la máscara de esquinas redondeadas es CSS (.logo-mark). Maestro vectorial PENDIENTE.
const LOGO_SRCSET = '/media/marca/logo/logo-40.webp 40w, /media/marca/logo/logo-44.webp 44w, /media/marca/logo/logo-56.webp 56w, /media/marca/logo/logo-80.webp 80w, /media/marca/logo/logo-88.webp 88w, /media/marca/logo/logo-112.webp 112w, /media/marca/logo/logo-120.webp 120w, /media/marca/logo/logo-132.webp 132w, /media/marca/logo/logo-168.webp 168w, /media/marca/logo/logo-224.webp 224w, /media/marca/logo/logo-240.webp 240w, /media/marca/logo/logo-336.webp 336w, /media/marca/logo/logo-360.webp 360w, /media/marca/logo/logo-400.webp 400w';
function Logo({ size, sizes, className = '', lazy = false }) { return <img className={`logo-mark ${className}`} fetchPriority={lazy ? undefined : "low"} loading={lazy ? "lazy" : undefined} src="/media/marca/logo/logo-400.png" srcSet={LOGO_SRCSET} sizes={sizes} width={size} height={size} alt="Transporte y Turismo Medellín" decoding="async"/>; }

/*
 * Cáscara de la app (Spec 04 «Prerender»): cabecera, pie, rutas y efectos de página. Cada ruta es un chunk propio (React.lazy) y TODAS se
 * prerenderizan a HTML en el build (scripts/prerender.mjs); el cliente las hidrata con hydrateRoot (main.jsx), tras precargar el chunk de la ruta
 * actual para que la primera pintura de React coincida con el HTML del servidor.
 */
// Carga de una ruta: `preload()` deja el módulo resuelto; con él ya resuelto el componente se renderiza de forma síncrona (hidratación sin Suspense).
function lazyRoute(loader) {
  let Loaded = null, promise = null;
  const preload = () => promise || (promise = loader().then((component) => { Loaded = component; return component; }));
  const Lazy = lazy(() => preload().then((component) => ({ default: component })));
  function Route() { const sync = useRef(Loaded !== null); return sync.current ? <Loaded /> : <Lazy />; }
  Route.preload = preload;
  return Route;
}
const pick = (loader, name) => () => loader().then((m) => m[name]);
const company_ = () => import('./pages/Company');
const R = {
  home: lazyRoute(() => import('./pages/Home').then((m) => m.default)),
  catalog: lazyRoute(() => import('./pages/Catalog').then((m) => m.default)),
  tour: lazyRoute(() => import('./pages/Tour').then((m) => m.default)),
  fleet: lazyRoute(() => import('./pages/Fleet').then((m) => m.default)),
  blog: lazyRoute(pick(() => import('./pages/Blog'), 'Blog')),
  article: lazyRoute(() => import('./pages/Blog').then((m) => m.default)),
  about: lazyRoute(pick(company_, 'About')),
  services: lazyRoute(pick(company_, 'Services')),
  contact: lazyRoute(pick(company_, 'Contact')),
  quote: lazyRoute(pick(company_, 'QuotePage')),
  privacy: lazyRoute(pick(company_, 'Privacy')),
  ratings: lazyRoute(pick(company_, 'Ratings')),
  notFound: lazyRoute(() => import('./pages/NotFound').then((m) => m.default)),
};
const table = [['/', R.home], ['/experiencias', R.catalog], ['/experiencias/:slug', R.tour], ['/vehiculos', R.fleet], ['/blog', R.blog], ['/blog/:slug', R.article], ['/nosotros', R.about], ['/servicios', R.services], ['/contacto', R.contact], ['/cotizar', R.quote], ['/privacidad', R.privacy], ['/calificaciones', R.ratings]];
// Deja resuelto el chunk de la ruta (o el de 404) antes de hidratar/renderizar en el servidor.
export const preloadRoute = (pathname) => (table.find(([path]) => matchPath({ path, end: true }, unprefix(pathname)))?.[1] || R.notFound).preload();
export const preloadAllRoutes = () => Promise.all(Object.values(R).map((route) => route.preload()));

const nav = [['Inicio','/'],['Experiencias','/experiencias'],['Servicios','/servicios'],['Vehículos','/vehiculos'],['Nosotros','/nosotros'],['Blog','/blog'],['Contacto','/contacto']];
function PageEffects(){
 const {pathname,hash}=useLocation();const first=useRef(true);
 useEffect(()=>{
  if(hash){requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:reduced()?'auto':'smooth'}));}
  else {window.scrollTo({top:0,behavior:'instant'});if(!first.current)document.querySelector('main')?.focus({preventScroll:true});}
  first.current=false;
 },[pathname,hash]);
 // Fichas y notas fijan su propio título (usePageMeta, en el chunk de la ruta); aquí van las páginas estáticas y el 404.
 useEffect(()=>{
  if(/^\/(experiencias|blog)\/[^/]+\/?$/.test(pathname))return;
  const page=staticMeta[pathname]||NOT_FOUND;applyMeta(page[0],page[1]);
 },[pathname]);
 return null;
}
function Header(){
 const [open,setOpen]=useState(false);const location=useLocation();const toggle=useRef(null);
 useEffect(()=>setOpen(false),[location]);
 useEffect(()=>{const key=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus()}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[open]);
 const home=unprefix(location.pathname)==='/';
 return <header className={`site-header${home?' is-home':''}${open?' menu-open':''}`}><Link to="/" className="brand" aria-label="Transporte y Turismo Medellín, inicio"><Logo size={56} sizes="(max-width: 899px) 44px, 56px"/></Link><Preferences/><a className="menu-nojs" href="#pie">Menú</a><button ref={toggle} className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation">{open?'Cerrar':'Menú'} <span aria-hidden="true">{open?'−':'+'}</span></button><nav id="navigation" className={open?'open':''} aria-label="Principal">{nav.map(([label,url])=><NavLink key={url} to={url} end={url==='/'}>{label}</NavLink>)}<Socials className="header-socials"/><Link to="/cotizar" className="nav-cta">Planeemos tu viaje <Arrow/></Link></nav></header>;
}
// Pie siempre oscuro (escala --d-* en ambos modos, Spec 03 §I.2): silueta de Medellín, marca, enlaces rápidos, contacto directo, redes y datos legales.
function Footer(){return <div className="pie-wrap"><Skyline/><footer className="site-footer tone-dark" id="pie"><div className="pie-top"><p>Tu próxima historia<br/>empieza <em>aquí.</em></p><Button to="/experiencias">Encuentra tu experiencia</Button></div><div className="pie-grid"><div className="pie-brand"><Link className="footer-brand" to="/" aria-label="Transporte y Turismo Medellín, inicio"><Logo size={120} sizes="120px" className="logo-footer" lazy/></Link><p className="pie-line">Experiencias a otro nivel</p><p>Nos mueve nuestra tierra.<br/>Nos importan las personas.</p></div><nav aria-label="Enlaces rápidos"><h2 className="pie-h">Enlaces rápidos</h2><ul role="list">{[['Inicio','/'],['Experiencias','/experiencias'],['Vehículos','/vehiculos'],['Nosotros','/nosotros'],['Contacto','/contacto']].map(([label,url])=><li key={url}><Link to={url}>{label}</Link></li>)}</ul></nav><div><h2 className="pie-h">Contacto directo</h2><ul role="list" className="pie-contact"><li><span className="pie-ico"><Icon name="mapPin" size={18}/></span><span>{company.address}</span></li><li><span className="pie-ico"><Icon name="phone" size={18}/></span><a href={`tel:${company.phone.replaceAll(' ','')}`}>{company.phone}</a></li><li><span className="pie-ico"><Icon name="mail" size={18}/></span><a href={`mailto:${company.email}`}>{company.email}</a></li></ul></div><div><h2 className="pie-h">Síguenos</h2><ul role="list" className="pie-social">{[['instagram','Instagram',company.instagram,'@transporteenmedellin'],['tiktok','TikTok',company.tiktok,'@tytmedellin']].map(([id,name,url,handle])=><li key={id}><a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Síguenos en ${name} (se abre en una pestaña nueva)`}><span className="pie-circle"><SocialIcon id={id} size={20}/></span><span>{handle}</span></a></li>)}</ul></div></div><div className="pie-bottom"><span>RNT 176384</span><span>NIT 901738550-6</span><span>© 2026 Transporte y Turismo Medellín</span><Link to="/privacidad">Privacidad</Link><Link to="/calificaciones">Calificaciones</Link></div></footer></div>}
function Layout(){const {pathname}=useLocation();return <><a className="skip-link" href="#contenido">Saltar al contenido</a><PageEffects/><Header/><main id="contenido" tabIndex={-1} key={pathname}><Suspense fallback={null}><Routes><Route path="/" element={<R.home/>}/><Route path="/site" element={<Navigate to="/" replace/>}/><Route path="/experiencias" element={<R.catalog/>}/><Route path="/experiencias/:slug" element={<R.tour/>}/><Route path="/servicios" element={<R.services/>}/><Route path="/vehiculos" element={<R.fleet/>}/><Route path="/flota" element={<Navigate to="/vehiculos" replace/>}/><Route path="/nosotros" element={<R.about/>}/><Route path="/blog" element={<R.blog/>}/><Route path="/blog/:slug" element={<R.article/>}/><Route path="/contacto" element={<R.contact/>}/><Route path="/cotizar" element={<R.quote/>}/><Route path="/calificaciones" element={<R.ratings/>}/><Route path="/privacidad" element={<R.privacy/>}/><Route path="*" element={<R.notFound/>}/></Routes></Suspense></main><Allies/><Footer/><WhatsAppFab/></>}
export default function Website(){return <Layout/>}
