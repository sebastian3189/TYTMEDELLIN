import { languageFromPath, languageInfo, stripLanguage, pathForLanguage } from './languages.js';
let locale = typeof window !== 'undefined' ? languageFromPath(window.location.pathname) : 'es';
const dictionaries = { es: {} };
const loaders = { en: () => import('./locales/en.json'), 'pt-BR': () => import('./locales/pt-BR.json') };
export const language = () => locale;
export const setLanguage = value => { locale = languageInfo(value).code; };
export async function prepareLanguage(value) {
  const code=languageInfo(value).code;
  if(!dictionaries[code]) dictionaries[code]=(await loaders[code]()).default;
}
// Cambio de idioma sin recargar (Spec 04): carga el diccionario, actualiza la URL (/en, /pt-br) y avisa a la aplicación para que se vuelva a montar.
export async function switchLanguage(value) {
  const code=languageInfo(value).code; if(code===locale) return;
  await prepareLanguage(code);
  const {pathname,search,hash}=window.location, next=pathForLanguage(pathname,code)+search+hash;
  history.pushState(null,'',next); setLanguage(code); document.documentElement.lang=languageInfo(code).html;
  window.dispatchEvent(new CustomEvent('tyt-language-change',{detail:code}));
}
export const unprefix = stripLanguage;
export const languagePath = pathForLanguage;
const normalize = value => value.replace(/\s+/g, ' ').trim();
export function t(value) {
  if (locale === 'es' || typeof value !== 'string' || !value.trim()) return value;
  const key = normalize(value);
  const english = dictionaries[locale] || {};
  if (Object.hasOwn(english, key)) return value.replace(value.trim(), english[key]);
  // Repeated accessible labels and counters, with translated tour names.
  const patterns = [
    [/^estos (\d+) campos$/, n=>`these ${n} fields`],
    [/^Foto (\d+) de (\d+), (.+)$/, (n,total,name)=>`Photo ${n} of ${total}, ${t(name)}`],
    [/^(.+)\. (Descubre|Explora|Siente|Conecta|Vive|Disfruta|Sorpréndete|Recuerda|Enamórate|Inspírate): (.+)$/, (name,verb,text)=>`${t(name)}. ${t(verb)}: ${t(text)}`],
    [/^Ampliar fotografía (\d+) de (.+)$/, (n,name)=>`Enlarge photo ${n} of ${t(name)}`],
    [/^Fotografía (\d+) de (.+)$/, (n,name)=>`Photo ${n} of ${t(name)}`],
    [/^Mostrar fotografía (\d+) de (.+)$/, (n,name)=>`Show photo ${n} of ${t(name)}`],
    [/^(.+), fotografía (\d+) de (\d+)$/, (name,n,total)=>`${t(name)}, photo ${n} of ${total}`],
    [/^Foto (\d+) de (\d+)$/, (n,total)=>`Photo ${n} of ${total}`],
    [/^(.+) \(se abre en una pestaña nueva\)$/, name=>`${t(name)} (opens in a new tab)`],
    [/^Seguir a (.+) en Instagram$/, handle=>`Follow ${handle} on Instagram`],
    [/^También en TikTok (@.+)$/, handle=>`Also on TikTok ${handle}`],
    [/^(.+) · Desde Medellín$/, cat=>`${t(cat)} · From Medellín`],
    [/^(.+), fotografía (\d+)$/, (name,n)=>`${t(name)}, photo ${n}`],
    [/^(.+), capítulo (\d+)$/, (name,n)=>`${t(name)}, chapter ${n}`],
    [/^Capítulo (\d+): (.+)$/, (n,title)=>`Chapter ${n}: ${t(title)}`],
    [/^Fotografías de (.+)$/, name=>`Photos of ${t(name)}`],
    [/^Elegir fotografía de (.+)$/, name=>`Choose a photo of ${t(name)}`],
    [/^Galería ampliada de (.+)$/, name=>`Enlarged gallery of ${t(name)}`],
    [/^Un recorrido por (.+)$/, name=>`A journey through ${t(name)}`],
    [/^Planea esta experiencia: (.+)$/, name=>`Plan this experience: ${t(name)}`],
    [/^Leer la nota: (.+)$/, name=>`Read the article: ${t(name)}`],
    [/^Categoría (.+)$/, name=>`Category: ${t(name)}`],
    [/^(.+) \| T&T Medellín$/, title=>`${t(title)} | T&T Medellín`],
  ];
  const portuguesePatterns = [
    [/^estos (\d+) campos$/, n=>`estes ${n} campos`],
    [/^Foto (\d+) de (\d+), (.+)$/, (n,total,name)=>`Foto ${n} de ${total}, ${t(name)}`],
    [/^(.+)\. (Descubre|Explora|Siente|Conecta|Vive|Disfruta|Sorpréndete|Recuerda|Enamórate|Inspírate): (.+)$/, (name,verb,text)=>`${t(name)}. ${t(verb)}: ${t(text)}`],
    [/^Ampliar fotografía (\d+) de (.+)$/, (n,name)=>`Ampliar foto ${n} de ${t(name)}`],
    [/^Fotografía (\d+) de (.+)$/, (n,name)=>`Foto ${n} de ${t(name)}`],
    [/^Mostrar fotografía (\d+) de (.+)$/, (n,name)=>`Mostrar foto ${n} de ${t(name)}`],
    [/^(.+), fotografía (\d+) de (\d+)$/, (name,n,total)=>`${t(name)}, foto ${n} de ${total}`],
    [/^Foto (\d+) de (\d+)$/, (n,total)=>`Foto ${n} de ${total}`],
    [/^(.+) \(se abre en una pestaña nueva\)$/, name=>`${t(name)} (abre em uma nova aba)`],
    [/^Seguir a (.+) en Instagram$/, name=>`Seguir ${name} no Instagram`],
    [/^También en TikTok (@.+)$/, name=>`Também no TikTok ${name}`],
    [/^(.+) · Desde Medellín$/, cat=>`${t(cat)} · Saindo de Medellín`],
    [/^(.+), fotografía (\d+)$/, (name,n)=>`${t(name)}, foto ${n}`],
    [/^(.+), capítulo (\d+)$/, (name,n)=>`${t(name)}, capítulo ${n}`],
    [/^Capítulo (\d+): (.+)$/, (n,title)=>`Capítulo ${n}: ${t(title)}`],
    [/^Fotografías de (.+)$/, name=>`Fotos de ${t(name)}`],
    [/^Elegir fotografía de (.+)$/, name=>`Escolher foto de ${t(name)}`],
    [/^Galería ampliada de (.+)$/, name=>`Galeria ampliada de ${t(name)}`],
    [/^Un recorrido por (.+)$/, name=>`Um passeio por ${t(name)}`],
    [/^Planea esta experiencia: (.+)$/, name=>`Planeje esta experiência: ${t(name)}`],
    [/^Leer la nota: (.+)$/, name=>`Ler o artigo: ${t(name)}`],
    [/^Categoría (.+)$/, name=>`Categoria: ${t(name)}`],
    [/^(.+) \| T&T Medellín$/, title=>`${t(title)} | T&T Medellín`],
  ];
  for(const [pattern,convert] of (locale === 'pt-BR' ? portuguesePatterns : patterns)) { const match=key.match(pattern);if(match)return convert(...match.slice(1)); }
  // JSX splits sentences at inline elements/numbers; preserve punctuation and whitespace.
  const punctuation=key.match(/^(.+?)([.:*→↗↓]+)$/);
  if(punctuation && Object.hasOwn(english,punctuation[1].trim())) return english[punctuation[1].trim()]+punctuation[2];
  return value;
}
export function localizedProps(type, props) {
  if (locale === 'es' || !props || props.translate === 'no') return props;
  const next = {...props};
  const children = value => Array.isArray(value) ? value.map(children) : typeof value === 'string' ? t(value) : value;
  if(type !== 'script' && type !== 'style' && type !== 'textarea') next.children=children(props.children);
  for(const key of ['aria-label','aria-description','title','alt','placeholder']) if(typeof props[key]==='string') next[key]=t(props[key]);
  // An option without an explicit value must keep its original, language-neutral form value.
  if(type==='option' && props.value===undefined && typeof props.children==='string') next.value=props.children;
  return next;
}
