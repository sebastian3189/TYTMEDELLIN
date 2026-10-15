export const LANGUAGES = [
  { code: 'es', prefix: '', label: 'Español', html: 'es-CO', og: 'es_CO' },
  { code: 'en', prefix: '/en', label: 'English', html: 'en', og: 'en_US' },
  { code: 'pt-BR', prefix: '/pt-br', label: 'Português (Brasil)', html: 'pt-BR', og: 'pt_BR' },
];
export const languageInfo = code => LANGUAGES.find(x => x.code === code) || LANGUAGES[0];
export const languageFromPath = path => /^\/pt-br(?:\/|$)/i.test(path) ? 'pt-BR' : /^\/en(?:\/|$)/.test(path) ? 'en' : 'es';
export const stripLanguage = path => path.replace(/^\/(?:en|pt-br)(?=\/|$)/i, '') || '/';
export const pathForLanguage = (path, code) => languageInfo(code).prefix + (stripLanguage(path) === '/' ? '/' : stripLanguage(path));
