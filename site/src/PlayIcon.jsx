// Iconos de reproducir / pausar en SVG (currentColor). Nunca usar los caracteres ▶ ❚❚: iOS los dibuja como emoji.
export default function PlayIcon({ playing, size = 16 }) {
  return (
    <svg className="ico-play" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l10.5-6.5z" />}
    </svg>
  );
}

// Altavoz (con ondas) / altavoz silenciado (con cruz), SVG currentColor.
export function SoundIcon({ on, size = 20 }) {
  return (
    <svg className="ico-sound" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor" stroke="none" />
      {on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
    </svg>
  );
}
