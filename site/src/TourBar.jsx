import { useEffect, useState } from 'react';
import { whatsapp } from './company';
import { useMedia } from './PremiumMotion';
import { watchScroll } from './scroll-bus';
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
    let last = scrollY, timer = 0, formVisible = false, shown = false;
    html.dataset.tourpage = '1';
    // Solo se escribe (estado de React y atributo de <html>) cuando el valor cambia: el scroll normal no invalida estilos del documento.
    const set = (value) => { if (value === shown) return; shown = value; setShow(value); html.dataset.tourbar = value ? 'on' : 'off'; };
    const form = document.getElementById('consulta');
    const io = new IntersectionObserver(([entry]) => { formVisible = entry.isIntersecting; if (formVisible) set(false); }, { rootMargin: '0px 0px -10% 0px' });
    if (form) io.observe(form);
    const onScroll = (y) => {
      const dy = y - last; last = y;
      if (formVisible) { set(false); return; }
      if (dy > 8 && y > 240) set(true); else if (dy < -8) set(false);
      if (shown) { clearTimeout(timer); timer = setTimeout(() => set(false), 1400); }
    };
    const stop = watchScroll({ update: onScroll }); // un solo scroll/rAF compartido (scroll-bus): sin lecturas de layout aquí
    return () => { stop(); io.disconnect(); clearTimeout(timer); delete html.dataset.tourbar; delete html.dataset.tourpage; };
  }, [mobile]);
  return (
    <aside className="tour-bar" data-on={show} aria-label="Cotizar esta experiencia por WhatsApp" inert={!show}>
      <p className="tour-bar-name">{name}</p>
      <a className="button tour-bar-cta" href={whatsapp(name)} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp<Arrow /></a>
    </aside>
  );
}
