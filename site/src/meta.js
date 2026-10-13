import { useEffect } from 'react';
import { t } from './i18n';

// Metadatos por ruta (Spec 05 SEO): una sola fuente para el cliente (PageEffects / usePageMeta) y el prerender (scripts/prerender.mjs).
export const staticMeta = {
  '/': ['Medellín, a otro nivel', 'Medellín, a otro nivel. Transporte privado y experiencias desde Medellín con un equipo local.'],
  '/experiencias': ['Experiencias', 'Explora doce recorridos desde Medellín: ciudad, cultura, café y paisajes de Antioquia.'],
  '/vehiculos': ['Vehículos', 'Conoce las categorías de vehículos para tu traslado privado o viaje en grupo desde Medellín.'],
  '/servicios': ['Servicios', 'Traslados, recorridos privados y transporte para empresas, agencias y grupos en Medellín.'],
  '/nosotros': ['Nosotros', 'Conoce la historia, el equipo y los valores de Transporte y Turismo Medellín.'],
  '/blog': ['Cuaderno de viaje', 'Ideas y consejos para preparar tus experiencias y recorridos desde Medellín.'],
  '/contacto': ['Contacto', 'Habla con el equipo de T&T Medellín por teléfono, correo o WhatsApp.'],
  '/cotizar': ['Planea tu viaje', 'Prepara tu consulta de transporte o turismo para recibir una propuesta del equipo de Medellín.'],
  '/calificaciones': ['Calificaciones', 'Consulta la referencia histórica de calificaciones y las reseñas actuales de T&T Medellín en Google.'],
  '/privacidad': ['Privacidad', 'Conoce cómo se prepara tu consulta y qué información decides compartir con T&T Medellín.'],
};
export const NOT_FOUND = ['Página no encontrada', 'Regresa a las experiencias de T&T Medellín para encontrar tu recorrido.'];
export const fullTitle = (title) => `${title} | T&T Medellín`;
export function applyMeta(title, description) {
  document.title = fullTitle(t(title));
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(description));
}
// Fichas y notas: título y descripción de la propia página (el 404 de un slug desconocido lo fija NotFound).
export function usePageMeta(title, description) {
  useEffect(() => { if (title) applyMeta(title, description); }, [title, description]);
}
