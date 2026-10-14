// Flecha única del sitio (SVG, trazo 1,75 px, currentColor, 18 px, decorativa). `ne` = ↗ (enlaces externos y acciones), el resto indica dirección.
const PATHS = { ne: 'M7 17 17 7M8 7h9v9', right: 'M5 12h14M13 6l6 6-6 6', left: 'M19 12H5M11 6l-6 6 6 6', down: 'M12 5v14M6 13l6 6 6-6', up: 'M12 19V5M6 11l6-6 6 6' };
export default function Arrow({ dir = 'ne' }) {
  return <svg className="ico-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={PATHS[dir]} /></svg>;
}
