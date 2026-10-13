import { jsxDEV as reactJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { localizedProps } from '../i18n';
export { Fragment };
export const jsxDEV = (type,props,...rest) => reactJsxDEV(type,localizedProps(type,props),...rest);
