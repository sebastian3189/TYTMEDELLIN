// Datos de contacto de la sede Medellín. Sin dependencias pesadas: lo usan el pie, la cabecera y los enlaces de WhatsApp en todas las rutas.
import { language, t } from './i18n.js';
export const company = {
  phone: '+57 304 496 1698', whatsapp: '573044961698',
  email: 'transporteyturismomedellin@gmail.com',
  address: 'Carrera 79AA #1A Sur-280, Medellín',
  reviews: 'https://www.google.com/maps/place/Transporte+%26+Turismo+Medellin/data=!4m2!3m1!1s0x0:0x676cebadb662a88a',
  // Redes de la sede Medellín: URLs exactas de sedes.ts oficial (medellin.redes). Facebook de Medellín: PENDIENTE CLIENTE.
  instagram: 'https://www.instagram.com/transporteenmedellin',
  tiktok: 'https://www.tiktok.com/@tytmedellin',
};
export const whatsapp = (context = 'mi recorrido') => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(language()==='pt-BR'?`Olá, gostaria de consultar a T&T Medellín sobre ${t(context)}.`:language()==='en'?`Hello, I'd like to ask T&T Medellín about ${t(context)}.`:`Hola, quiero consultar con T&T Medellín sobre ${context}.`)}`;
