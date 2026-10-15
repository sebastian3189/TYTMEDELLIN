import english from './locales/en.json' with {type:'json'};

// Presentation-only translation. IDs, routes, submitted values and user input stay intact.
let locale = typeof window !== 'undefined' && /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'es';
export const language = () => locale;
export const setLanguage = value => { locale = value === 'en' ? 'en' : 'es'; };
export const unprefix = path => path.replace(/^\/en(?=\/|$)/, '') || '/';
export const languagePath = (path, lang) => lang === 'en' ? '/en' + (path === '/' ? '/' : path) : path;
const normalize = value => value.replace(/\s+/g, ' ').trim();
export function t(value) {
  if (locale !== 'en' || typeof value !== 'string' || !value.trim()) return value;
  const key = normalize(value);
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
  for(const [pattern,convert] of patterns) { const match=key.match(pattern);if(match)return convert(...match.slice(1)); }
  // JSX splits sentences at inline elements/numbers; preserve punctuation and whitespace.
  const punctuation=key.match(/^(.+?)([.:*→↗↓]+)$/);
  if(punctuation && Object.hasOwn(english,punctuation[1].trim())) return english[punctuation[1].trim()]+punctuation[2];
  return value;
}
export function localizedProps(type, props) {
  if (locale !== 'en' || !props || props.translate === 'no') return props;
  const next = {...props};
  const children = value => Array.isArray(value) ? value.map(children) : typeof value === 'string' ? t(value) : value;
  if(type !== 'script' && type !== 'style' && type !== 'textarea') next.children=children(props.children);
  for(const key of ['aria-label','aria-description','title','alt','placeholder']) if(typeof props[key]==='string') next[key]=t(props[key]);
  // An option without an explicit value must keep its original, language-neutral form value.
  if(type==='option' && props.value===undefined && typeof props.children==='string') next.value=props.children;
  return next;
}
