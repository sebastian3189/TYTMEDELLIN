import { useEffect } from 'react';

/*
 * Movimiento tipográfico COMPARTIDO (ronda de textos 2026-10-16, Spec 03 §I): un solo IntersectionObserver para todo el sitio.
 *   h1/h2 → palabra a palabra con máscara (clip + translate + opacidad) · .eyebrow → espaciado de letras · párrafos → fundido ascendente escalonado ·
 *   números/índices → contador sutil. Solo transform/opacity (+ letter-spacing del eyebrow, solo si no cambia su alto): CLS ≈ 0.
 * Estático con prefers-reduced-motion o Save-Data. No toca escenas con su propio movimiento (hero, baraja, TravelHand, itinerarios, libro, «Diferentes»)
 * ni contenido que React vuelve a pintar (formularios, carruseles, acordeones). En la primera carga NO oculta lo que ya está a la vista (el LCP no se retrasa).
 */
const SCENES = '.home-hero,.scrub-hero,.th,.it,.blog-book,.different,.story,.explorer-track,[data-rv],.afx,[data-no-tx],dialog,form,details,[aria-live],.review-panel,.consent,.welcome,.tour-bar';
const CARDS = '.tour-card,.card-copy,.vehicle,li,figure,blockquote,button,label,summary';
const NUMS = '.timeline>article>span,.vehicle-index,.chapter';
const WORDS_MAX = 14;
let booted = false;

const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

function splitWords(el) {
  let i = 0;
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === 3) {
        if (!child.nodeValue.trim()) continue;
        const frag = document.createDocumentFragment();
        for (const part of child.nodeValue.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(part); continue; }
          const w = document.createElement('span'), inner = document.createElement('span');
          w.className = 'tx-w'; inner.className = 'tx-wi'; inner.style.setProperty('--i', i++); inner.textContent = part; w.append(inner); frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && !/^(BR|SVG|IMG)$/i.test(child.tagName)) walk(child);
    }
  };
  walk(el);
  return i;
}

function count(el) {
  const node = el.firstChild, text = node.nodeValue, m = /^(\s*)(\d{1,4})(\s*)$/.exec(text);
  if (!m) return;
  const end = Number(m[2]), pad = m[2].length, t0 = performance.now(), dur = 700;
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
    node.nodeValue = m[1] + String(v).padStart(pad, '0') + m[3];
    if (k < 1) requestAnimationFrame(step); else node.nodeValue = text;
  };
  node.nodeValue = m[1] + '0'.repeat(pad) + m[3]; requestAnimationFrame(step);
}

export function useTextMotion(pathname) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return undefined;
    const main = document.getElementById('contenido');
    if (!main) return undefined;
    const first = !booted; booted = true;
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target; io.unobserve(el);
        requestAnimationFrame(() => { el.classList.add('tx-in'); if (el.dataset.tx === 'n') count(el); });
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    const prepare = () => {
      let prevParent = null, k = 0;
      for (const el of main.querySelectorAll('h1,h2,.eyebrow,p,' + NUMS)) {
        if (seen.has(el)) continue;
        const isNum = el.matches(NUMS);
        if (el.closest(SCENES) || (!isNum && el.closest(CARDS))) continue;
        seen.add(el);
        if (first && inView(el)) continue;
        if (!el.offsetParent) continue;
        let kind;
        if (el.matches('h1,h2')) {
          const words = (el.textContent.match(/\S+/g) || []).length;
          kind = words > 0 && words <= WORDS_MAX ? 'h' : 'p';
          // Carga inicial: el HTML prerenderizado aún puede estar hidratándose; partir el texto en palabras provocaría el error de hidratación #418.
          // Se usa una máscara de bloque (solo atributos). Las palabras se separan solo en navegaciones del cliente (DOM nuevo, sin hidratar).
          if (kind === 'h' && first) kind = 'b';
          else if (kind === 'h') { try { splitWords(el); } catch { kind = 'p'; } }
        } else if (el.matches('.eyebrow')) {
          const h = el.offsetHeight; el.dataset.tx = 'e';
          kind = el.offsetHeight !== h ? 'p' : 'e';
        } else if (isNum) {
          kind = !first && el.childNodes.length === 1 && el.firstChild.nodeType === 3 && /^\s*\d{1,4}\s*$/.test(el.textContent) ? 'n' : null;
          if (!kind) continue;
        } else kind = 'p';
        if (kind === 'p') { if (el.parentElement === prevParent) k++; else { k = 0; prevParent = el.parentElement; } el.style.setProperty('--d', `${Math.min(k, 4) * 70}ms`); }
        el.dataset.tx = kind; io.observe(el);
      }
    };
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(prepare); };
    prepare();
    const mo = new MutationObserver((records) => { if (records.some((r) => [...r.addedNodes].some((n) => n.nodeType === 1 && !n.classList?.contains('tx-w')))) schedule(); });
    mo.observe(main, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(frame); mo.disconnect(); io.disconnect(); };
  }, [pathname]);
}

/* Transiciones entre páginas con View Transitions API (Chromium/Safari 18+); sin soporte o con movimiento reducido, navegación normal.
   history.pushState se envuelve: la actualización de React ocurre dentro de la transición y se confirma cuando Layout avisa (notifyRouteReady). */
let pending = null;
export function notifyRouteReady() {
  if (!pending) return;
  const done = pending; pending = null;
  let tries = 0;
  const wait = () => { if (document.querySelector('main#contenido > *') || ++tries > 60) done(); else setTimeout(wait, 16); };
  setTimeout(wait, 16);
}
export function installPageTransitions() {
  if (typeof window === 'undefined' || typeof document.startViewTransition !== 'function' || window.__txVT) return;
  window.__txVT = true;
  let bypass = false;
  // Clic en un enlace interno (captura): la transición envuelve el MISMO clic, que se reenvía a React Router dentro de startViewTransition.
  document.addEventListener('click', (e) => {
    if (bypass || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !e.isTrusted) return;
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    let url; try { url = new URL(a.href, location.href); } catch { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData || pending) return;
    e.preventDefault(); e.stopPropagation();
    try {
      document.startViewTransition(() => new Promise((resolve) => {
        pending = resolve;
        setTimeout(() => { if (pending === resolve) { pending = null; resolve(); } }, 900);
        bypass = true; a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, view: window })); bypass = false;
      }));
    } catch { bypass = true; a.click(); bypass = false; }
  }, true);
}
