import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
// Ver jsx-dev-runtime.js: el estado y la función de traducción viven en globalThis.__ttI18n (registrados por src/i18n.js).
export { Fragment };
const localize = (type, props) => { const f = globalThis.__ttI18n && globalThis.__ttI18n.localizedProps; return f ? f(type, props) : props; };
export const jsx = (type, props, key) => reactJsx(type, localize(type, props), key);
export const jsxs = (type, props, key) => reactJsxs(type, localize(type, props), key);
