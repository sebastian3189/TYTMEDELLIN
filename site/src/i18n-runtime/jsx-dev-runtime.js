import { jsxDEV as reactJsxDEV, Fragment } from 'react/jsx-dev-runtime';
// Sin importar ../i18n: Vite pre-empaqueta este runtime como dependencia y una copia propia de i18n.js quedaba desincronizada (y en caché).
// i18n.js registra localizedProps en globalThis.__ttI18n; aquí solo se lee.
export { Fragment };
const localize = (type, props) => { const f = globalThis.__ttI18n && globalThis.__ttI18n.localizedProps; return f ? f(type, props) : props; };
export const jsxDEV = (type, props, ...rest) => reactJsxDEV(type, localize(type, props), ...rest);
