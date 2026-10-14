import { useEffect, useState } from 'react';
import { whatsapp } from './company';
import { useMedia } from './PremiumMotion';
import Arrow from './Arrow';

/*
 * Barra inferior de las fichas en móvil (<768 px; pedido del usuario 2026-10-14): nombre de la experiencia + «Cotizar por WhatsApp» (el enlace lleva solo el nombre
 * del recorrido). Aparece al desplazarse HACIA ABAJO y se oculta al subir, al detenerse el scroll o cuando el formulario (#consulta) está a la vista; mientras está
 * visible el botón flotante de WhatsApp se oculta (html[data-tourbar=on]): nunca se ven los dos a la vez. Sin animación con movimiento reducido.
 */
export default function TourBar({ name }) {
  const mobile = useMedia('(max-width: 767px)');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!mobile) return undefined;
    const html = document.documentElement;
    let last = scrollY, timer = 0, formVisible = false;
    html.dataset.tourpage = '1';
    const set = (value) => { setShow(value); html.dataset.tourbar = value ? 'on' : 'off'; };
    const form = document.getElementById('consulta');
    const io = new IntersectionObserver(([entry]) => { formVisible = entry.isIntersecting; if (formVisible) set(false); }, { rootMargin: '0px 0px -10% 0px' });
    if (form) io.observe(form);
    const onScroll = () => {
      const y = scrollY, dy = y - last; last = y; clearTimeout(timer);
      if (formVisible) { set(false); return; }
      if (dy > 8 && y > 240) set(true); else if (dy < -8) set(false);
      timer = setTimeout(() => set(false), 1400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); clearTimeout(timer); delete html.dataset.tourbar; delete html.dataset.tourpage; };
  }, [mobile]);
  return (
    <aside className="tour-bar" data-on={show} aria-label="Cotizar esta experiencia por WhatsApp" inert={!show}>
      <p className="tour-bar-name">{name}</p>
      <a className="button tour-bar-cta" href={whatsapp(name)} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp<Arrow /></a>
    </aside>
  );
}
