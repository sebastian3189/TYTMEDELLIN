// Consentimiento local, sin SDK ni solicitudes externas. Spec 04: no añade rastreadores.
export const CONSENT_KEY = 'tyt-privacy-v1';
const VERSION = 1, LIFETIME = 180 * 24 * 60 * 60 * 1000;
let memory = null;
if(typeof window!=='undefined') window.addEventListener('storage',event=>{if(event.key===CONSENT_KEY||event.key===null)memory=null;});
export function readConsent() {
  if (memory && memory.expires > Date.now()) return memory;
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (value?.version === VERSION && typeof value.preferences === 'boolean' && value.expires > Date.now()) return value;
  } catch { /* almacenamiento no disponible */ }
  return null;
}
export const allowPreferences = () => readConsent()?.preferences === true;
export function saveConsent(preferences) {
  memory = { version: VERSION, preferences: Boolean(preferences), expires: Date.now() + LIFETIME };
  let persisted = false;
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(memory)); persisted = true; } catch { /* elección en memoria */ }
  if (!preferences) { try { localStorage.removeItem('tyt-theme'); } catch { /* sin almacenamiento */ } }
  window.dispatchEvent(new CustomEvent('tyt-consent-change'));
  return persisted;
}
export const openConsent = () => window.dispatchEvent(new CustomEvent('tyt-open-consent'));
