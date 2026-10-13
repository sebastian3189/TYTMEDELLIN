import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
import { localizedProps } from '../i18n';
export { Fragment };
export const jsx = (type, props, key) => reactJsx(type, localizedProps(type, props), key);
export const jsxs = (type, props, key) => reactJsxs(type, localizedProps(type, props), key);
