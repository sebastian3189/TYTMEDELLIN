// iOS/Safari: React no fija de forma fiable el atributo `muted`, y sin `muted` + `playsinline` el video no arranca (ni solo ni con el botón). Se fijan a mano, antes de play().
export function prepVideo(el, muted = true) {
  if (!el) return;
  if (muted) { el.muted = true; el.defaultMuted = true; el.setAttribute('muted', ''); } el.setAttribute('playsinline', ''); el.setAttribute('webkit-playsinline', '');
  el.playsInline = true; el.disableRemotePlayback = true;
}
// Reproduce con la política de Safari: si falla (modo de bajo consumo, sin gesto), el llamador deja el póster con su botón de reproducir.
export function safePlay(el) { prepVideo(el, el.muted); const p = el.play(); return p && p.catch ? p.catch(() => {}) : Promise.resolve(); }
