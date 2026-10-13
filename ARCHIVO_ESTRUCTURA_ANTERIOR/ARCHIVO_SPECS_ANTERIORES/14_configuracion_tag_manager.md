# ARCHIVADO — Spec 14 anterior, no vigente

**Para quien monte la medición en el panel de Google.** El código del sitio ya
está hecho y no hay que tocarlo: este documento explica qué envía, cómo
recogerlo en Tag Manager y cómo comprobar que funciona.

Implementa `11_spec_analitica_medicion.md`. Decisión del cliente (2026-09-24):
la medición entra por **Tag Manager**, no por Google Analytics directo.

---

## 1. Qué hace ya el sitio

El sitio empuja eventos a `window.dataLayer`, que es la cola que lee Tag
Manager. Tres cosas que conviene tener claras antes de abrir el panel:

1. **Nada se carga sin consentimiento.** El contenedor de GTM no se descarga
   hasta que la persona pulsa «Aceptar» en el aviso de cookies. Si elige «Solo
   las necesarias», Google no llega a cargarse y no se envía un solo evento.
   Es un requisito de la Ley 1581 de 2012 y está prometido por escrito en
   `/privacidad`.
2. **Las vistas de página las manda el sitio.** Esto es una aplicación de una
   sola página: el navegador carga el documento una vez y el resto de la
   navegación es interna. El disparador «Vista de página» de GTM solo vería la
   primera pantalla. Por eso el sitio envía un evento `page_view` propio en
   cada cambio de ruta, y **hay que configurar GA4 para usar ese, no el suyo**
   (paso 4.2).
3. **No viajan datos personales.** Ni nombres, ni correos, ni teléfonos, ni el
   número de pasajeros. Solo identificadores de contenido. No añadas variables
   que recojan campos de formulario: rompería la promesa de `/privacidad`.

### Archivos implicados

| Archivo | Qué hace |
|---|---|
| `src/lib/analytics.ts` | Carga GTM, envía los eventos, define la lista cerrada de nombres |
| `src/components/layout/Analitica.tsx` | Arranca la medición y envía `page_view` en cada cambio de ruta |
| `src/lib/cookies.ts` | Guarda la decisión sobre cookies y avisa cuando cambia |
| `src/server.ts` | Las cabeceras de seguridad del HTML, incluida la `Content-Security-Policy` que autoriza a Google |
| `public/_headers` | Copia de esas cabeceras para Cloudflare. **En Vercel no se aplica** (ver apartado 10) |
| `.env.example` | Dónde va el identificador del contenedor |

---

## 2. Antes de empezar

1. ~~Crear un contenedor **Web**~~ **HECHO.** El contenedor del sitio es
   **`GTM-TH7TNFW6`**, creado para `https://tnt-medellin-connect.vercel.app`
   y válido sin cambios en el dominio de producción
   `https://www.transporteyturismomedellin.com` (2026-09-29): los contenedores
   web no se atan a un dominio.
2. Crear una propiedad de **Google Analytics 4** y anotar su identificador de
   medición, con forma `G-XXXXXXXXXX`. Pendiente — ver el apartado 2.1.
3. Configurar la variable de entorno en **Vercel** (Project → Settings →
   Environment Variables), marcando el entorno **Production**:

   ```
   VITE_GTM_ID=GTM-TH7TNFW6
   ```

   Marcar también *Preview* solo si se quiere medir las previsualizaciones,
   que normalmente no interesa: mezclaría pruebas con datos reales.

   En local ya está puesta en `.env` (que no se sube al repositorio). Si se
   deja vacía, la medición queda apagada y el sitio funciona igual.

   > El identificador **no es un secreto**: cualquiera puede verlo en el
   > código fuente de la página, como pasa en todos los sitios que usan GTM.
   > Está en variable de entorno para poder apagar la medición en local y en
   > las previsualizaciones, no por sigilo.

   > La variable se lee al **compilar**, no al arrancar. Después de añadirla
   > hay que volver a desplegar; si no, el sitio seguirá sin medir.

   **¿Variable normal o secreta?** Normal, en texto plano (según la versión
   del panel aparece como *Plaintext*, *Config* o simplemente sin marcar
   nada). **No** como *Secret* ni *Sensitive*. El motivo no es pereza: las
   variables que empiezan por `VITE_` se incrustan en el JavaScript que
   descarga el navegador, así que su valor es público por definición.
   Marcarla como secreta no la esconde de nadie y además impide volver a
   leerla desde el panel más adelante.

---

## 2.1 Cómo crear la propiedad de GA4

Es lo único que falta para que los datos lleguen a algún sitio. Sin esto, Tag
Manager recibe los eventos y no tiene a dónde mandarlos.

1. Entrar en [analytics.google.com](https://analytics.google.com) con la misma
   cuenta de Google que tiene el contenedor de Tag Manager.
2. Abajo a la izquierda, el engranaje de **Administrar**. Luego **Crear → Propiedad**
   (si es la primera vez, primero pedirá crear una **cuenta**: nombre
   «Transporte y Turismo Medellín»).
3. Datos de la propiedad:
   - Nombre: `T&T Medellín`
   - Zona horaria: **(GMT-05:00) Bogotá**
   - Moneda: **Peso colombiano (COP)**

   La zona horaria importa: decide dónde corta cada día en los informes. Si se
   deja en la de Estados Unidos, las cifras «de ayer» estarán desplazadas.
4. Responder las preguntas de sector y tamaño (no condicionan nada técnico) y
   aceptar las condiciones.
5. En **Empezar a recoger datos**, elegir la plataforma **Web** y crear un
   flujo de datos:
   - URL del sitio web: `https://www.transporteyturismomedellin.com`
     (si el flujo ya se creó con el dominio antiguo de `vercel.app`, editarlo:
     15_spec_cambio_dominio.md §4.4)
   - Nombre del flujo: `T&T Medellín Web`
6. Al terminar se abre la ficha del flujo. Arriba a la derecha está el
   **ID de medición**, con forma `G-XXXXXXXXXX`. **Ese es el dato.** Copiarlo.

> **Importante: NO instalar la etiqueta que ofrece Google ahí.** GA4 propondrá
> pegar un fragmento de código en el sitio. Hay que ignorarlo: la etiqueta la
> va a cargar Tag Manager, y pegar las dos haría que cada visita se contara
> por duplicado. Además ese fragmento se saltaría el aviso de cookies.

### Qué hacer con el ID de medición

Va **solo dentro del panel de Tag Manager**. No se pone en el código, ni en
Vercel, ni en ningún archivo del proyecto:

1. En Tag Manager, contenedor `GTM-TH7TNFW6`.
2. **Etiquetas → Nueva → Google Analytics: etiqueta de Google**, y pegar ahí el
   `G-XXXXXXXXXX`. El resto de la configuración está en el apartado 4.2, y
   tiene un paso que **no se puede saltar**: desmarcar el envío automático de
   vista de página.
3. Cuando esté todo montado, pulsar **Enviar** y publicar la versión. Mientras
   no se publique, el contenedor sigue vacío por mucho que se haya configurado
   dentro: es el olvido más común.

---

## 3. Variables de capa de datos

En GTM: **Variables → Nueva → Variable de capa de datos**. El nombre de la
variable de capa de datos tiene que escribirse **exactamente** como aparece en
la columna de la izquierda, respetando mayúsculas y guiones bajos.

| Nombre de capa de datos | Nombre sugerido en GTM | Qué contiene |
|---|---|---|
| `page_path` | DL - page_path | Ruta de la página, p. ej. `/sedes/medellin` |
| `layer` | DL - layer | `A` (corporativa) o `B` (venta) |
| `lang` | DL - lang | `es` o `en` |
| `theme` | DL - theme | `light` o `dark` |
| `sede` | DL - sede | Slug de la sede, p. ej. `medellin` |
| `experience` | DL - experience | Slug de la experiencia, p. ej. `guatape-piedra-del-penol` |
| `channel` | DL - channel | `whatsapp` o `form` |
| `source` | DL - source | `card` o `detail` |
| `enquiry_type` | DL - enquiry_type | Tipo de consulta (PQRSF o `receptivo`) |
| `has_company` | DL - has_company | `true` si rellenó el campo de empresa |
| `field` | DL - field | Campo del formulario que falló |
| `error_type` | DL - error_type | Motivo del fallo |
| `from` | DL - from | Idioma de origen al cambiar de idioma |
| `to` | DL - to | Idioma de destino al cambiar de idioma |
| `destination_url` | DL - destination_url | A dónde sale quien abandona el dominio |
| `has_own_site` | DL - has_own_site | `true` si la sede tiene web propia |

---

## 4. Etiquetas y activadores

### 4.1 Activadores

Crear un activador de tipo **Evento personalizado** por cada evento de la
tabla del apartado 5. El «Nombre del evento» es el de la primera columna, tal
cual, sin comodines.

Atajo razonable: para los eventos que solo alimentan informes y no son
conversiones, se puede usar **un único** activador de evento personalizado con
la expresión regular activada y este nombre de evento:

```
^(sede_view|experience_view|experience_card_click|gallery_open|language_switch|sede_card_click|external_site_click|contact_form_start|contact_form_error)$
```

Los tres que sí son conversiones —`quote_click`, `contact_form_submit` y
`whatsapp_fab_click`— conviene tenerlos en activadores propios, porque se
marcan como eventos clave y se les revisan los parámetros de uno en uno.

### 4.2 Etiqueta de configuración de GA4

**Etiquetas → Nueva → Google Analytics: etiqueta de Google.**

- ID de medición: `G-XXXXXXXXXX`.
- **Desmarcar «Enviar un evento de vista de página cuando se cargue esta
  configuración».** Este es el paso que más se olvida, y saltárselo cuesta
  caro: GA4 contaría una sola vista por visita, la de entrada, y todo el
  recorrido interno del sitio —que es casi todo— desaparecería de los
  informes.
- Activador: el evento personalizado `page_view`.
- Campos a definir:

  | Campo | Valor |
  |---|---|
  | `page_path` | `{{DL - page_path}}` |
  | `anonymize_ip` | `true` |

### 4.3 Etiqueta de vista de página

**Etiquetas → Nueva → Google Analytics: evento de GA4.**

- Nombre del evento: `page_view`.
- Parámetros: `page_path`, `layer`, `lang`, `theme`, cada uno con su variable.
- Activador: evento personalizado `page_view`.

### 4.4 Una etiqueta por cada evento restante

Mismo patrón: tipo «evento de GA4», el nombre del evento igual que el de la
capa de datos, los parámetros que le correspondan según la tabla del apartado
5, y su activador.

No hace falta una etiqueta por evento si se usa el activador agrupado: se
puede crear **una** etiqueta cuyo nombre de evento sea la variable integrada
`{{Event}}` y que declare todos los parámetros. Los que no existan en un
evento concreto llegan vacíos y GA4 los descarta. Es menos trabajo de
mantenimiento y menos sitios donde equivocarse.

### 4.5 Retención y privacidad

En **GA4 → Administrar → Configuración de datos → Retención de datos**, dejar
**14 meses** (el máximo de la propiedad gratuita). Es lo que declara
`/privacidad`, así que no es una preferencia: es coherencia con lo prometido.

---

## 5. Catálogo de eventos

Esta tabla es la misma de `11_spec_analitica_medicion.md` §4. Si aquí y allí
dejan de coincidir, manda el spec.

### Transversales

| Evento | Cuándo se dispara | Parámetros |
|---|---|---|
| `page_view` | En cada cambio de ruta, incluida la entrada | `page_path`, `layer`, `lang`, `theme` |
| `language_switch` | Al pulsar el botón de idioma, antes de cambiarlo | `from`, `to` |
| `external_site_click` | Al salir hacia la web propia de una sede | `sede`, `destination_url` |
| `whatsapp_fab_click` | Al pulsar el botón verde flotante | `layer`, `sede`, `page_path` |

### Capa A — corporativa

| Evento | Cuándo se dispara | Parámetros |
|---|---|---|
| `contact_form_start` | Primera interacción real con el formulario, una vez por formulario | `enquiry_type` |
| `contact_form_submit` | Formulario validado y enviado | `enquiry_type`, `has_company` |
| `contact_form_error` | Un evento **por cada campo** en rojo al intentar enviar | `field`, `error_type` |
| `sede_card_click` | Al pulsar el botón de una tarjeta de sede, lleve dentro o fuera | `sede`, `has_own_site` |

### Capa B — venta

| Evento | Cuándo se dispara | Parámetros |
|---|---|---|
| `sede_view` | Al abrir la página de una sede | `sede` |
| `experience_card_click` | Al pulsar «ver detalle» en una tarjeta del catálogo | `sede`, `experience` |
| `experience_view` | Al abrir la ficha de una experiencia | `sede`, `experience` |
| `quote_click` | Al pedir cotización, por cualquier vía | `sede`, `experience`, `channel`, `source` |
| `gallery_open` | Al abrir el visor de fotos de una ficha | `sede`, `experience` |

Sobre `quote_click`, que es **la** métrica del sitio:

- `channel: "whatsapp"` — botones que abren WhatsApp.
- `channel: "form"` — envío del formulario incrustado en una ficha. Si no se
  configura este canal, el formulario de la ficha parecerá no vender nada.
- `source: "card"` — cotizó desde el catálogo, sin abrir la ficha. Decidió con
  una foto y tres líneas.
- `source: "detail"` — cotizó desde la ficha o desde la página de la sede.

La diferencia entre los dos `source` no es cosmética: si casi todo es `card`,
las fichas no están aportando y el esfuerzo debería ir a las tarjetas.

### No implementados

`package_add`, `package_remove` y `package_submit` están en el spec §4.3 y
reservados en el código, pero **no se disparan**: la función de armar un
paquete con varias experiencias (spec 06) no existe todavía en el sitio. No
crees etiquetas para ellos ni informes que los usen, o mostrarán cero para
siempre y parecerá un fallo de medición. Cuando se construya esa función, los
nombres ya están listos.

---

## 6. Eventos clave (conversiones)

En **GA4 → Administrar → Eventos**, marcar como evento clave:

| Evento | Por qué |
|---|---|
| `quote_click` | La conversión de la capa de venta |
| `contact_form_submit` | La conversión de la capa corporativa |
| `whatsapp_fab_click` | Contacto directo desde cualquier punto del sitio |

---

## 7. Comprobar que funciona

### 7.1 En el modo de vista previa de GTM

1. Pulsar **Vista previa** en GTM y abrir el sitio.
2. **Aceptar las cookies.** Hasta que no se acepte, no se conecta nada: si el
   depurador no engancha, es casi siempre esto y no un error de configuración.
3. Navegar: entrar en una sede, abrir una experiencia, abrir el visor de
   fotos, cambiar el idioma. Cada acción debe aparecer en la columna de la
   izquierda con su nombre.
4. Pulsar un evento y revisar la pestaña **Data Layer**: los parámetros deben
   estar ahí, con valores reales, y no debe haber ningún dato personal.

### 7.2 Que el consentimiento se respeta de verdad

Esta comprobación es la importante, porque es la que el sitio promete por
escrito:

1. Abrir una ventana de incógnito y entrar en el sitio.
2. Elegir **«Solo las necesarias»**.
3. Abrir las herramientas del navegador → pestaña **Red**, y filtrar por
   `googletagmanager`.
4. Navegar por el sitio. **No debe aparecer ni una sola petición.** Si aparece
   alguna, hay algo mal y no se puede publicar así.
5. Repetir aceptando las cookies: ahora sí debe cargarse `gtm.js`.

### 7.3 En GA4

**Informes → En tiempo real** muestra los eventos al minuto. Los informes
completos tardan hasta 24 horas en llenarse; no conviene sacar conclusiones el
primer día.

---

## 8. Cuando algo no aparece

| Síntoma | Causa más probable |
|---|---|
| No llega absolutamente nada | No se aceptaron las cookies, o falta `VITE_GTM_ID`, o se configuró y no se volvió a desplegar |
| Solo llega la primera vista de página | Quedó marcada la casilla de vista de página en la etiqueta de configuración (paso 4.2) |
| La consola dice «Refused to load» | La `Content-Security-Policy` de `src/server.ts` no autoriza ese dominio. Al añadir cualquier herramienta nueva desde el panel de GTM hay que abrirle allí `script-src` y `connect-src`, o el navegador la bloquea en silencio. **Editar `public/_headers` no sirve en Vercel** |
| Un parámetro llega vacío | El nombre de la variable de capa de datos no coincide exactamente con el de la tabla del apartado 3 |
| Funciona en local pero no en producción | La variable de entorno está en `.env` pero no en el panel del hosting |

---

## 9. Lo que queda pendiente

- **La propiedad de GA4.** Es lo único que falta para que los datos lleguen
  a algún sitio. Sin ella, GTM recibe los eventos y no tiene a dónde
  mandarlos.
- ~~**Un dominio propio.**~~ **HECHO el 2026-09-29:**
  `https://www.transporteyturismomedellin.com`. Código cambiado (`SITE_URL`,
  `robots.txt`, sitemap y redirección 301 del `vercel.app` en
  `src/server.ts`). Quedan los pasos de panel de 15_spec_cambio_dominio.md
  §4.3-4.6: vista previa de GTM en el dominio nuevo, URL del flujo de GA4,
  Search Console y Google Business Profile.
- **Cabeceras de seguridad en los archivos estáticos.** Ver apartado 10.
- **Quitar `'unsafe-inline'` de `script-src`.** Hoy es obligado porque el
  sitio sirve dos scripts en línea (el anti-parpadeo del tema y el JSON-LD de
  SEO) y porque GTM inyecta etiquetas. Cerrarlo exige emitir un `nonce` por
  respuesta desde el servidor: es un cambio de renderizado, no de cabeceras.
- **Revisión legal de `/privacidad`.** Los apartados 8 y 9 describen con
  exactitud lo que hace el código, pero el documento entero sigue pendiente
  de que lo apruebe el asesor jurídico de la empresa.
- **Una línea base.** Las métricas del spec §6 son cocientes; durante el
  primer mes no hay con qué compararlos. Conviene esperar a tener datos antes
  de tomar decisiones sobre el catálogo.

---

## 10. Por qué no se pegó el código que da Google

El panel de GTM entrega dos fragmentos para pegar en el HTML. **Ninguno de los
dos se usó**, y no es un descuido:

**El fragmento del `<head>`** descarga Tag Manager nada más abrir la página,
antes de que nadie haya aceptado nada. Pegarlo tal cual contradice el aviso de
cookies y lo que promete `/privacidad`, y con la Ley 1581 de 2012 de por medio
eso es una infracción, no un detalle. El código hace exactamente lo mismo que
ese fragmento —empuja `gtm.start` a `dataLayer` y carga `gtm.js` de forma
asíncrona— pero **después** de que la persona acepte. Está en
`src/lib/analytics.ts`.

**El fragmento del `<noscript>`** es un `<iframe>` para navegadores sin
JavaScript. Tampoco se usó, por dos motivos: se sirve desde el HTML, así que
se descargaría también para quien rechazó las cookies —el mismo problema—, y
además no mediría nada útil, porque sin JavaScript esta aplicación ni siquiera
llega a dibujarse.

Resultado comprobado el 2026-09-24 con `curl`: el HTML que sale del servidor
no contiene ni una sola referencia a `googletagmanager.com`. Aparece solo
cuando alguien acepta.

---

## 11. Dónde están de verdad las cabeceras de seguridad

Esto se descubrió al configurar la medición y conviene dejarlo escrito, porque
es fácil perder una tarde con ello.

El repositorio tiene un `public/_headers`. Ese formato es de **Cloudflare Pages
y Netlify**. El sitio está desplegado en **Vercel**, donde ese archivo no se
aplica: es un archivo estático más.

Las cabeceras que sí llegan las pone `src/server.ts`, que envuelve cada
respuesta del servidor. Comprobado con `curl -I` contra el sitio en vivo:

| Respuesta | Cabeceras de seguridad |
|---|---|
| Páginas HTML (`/`, `/sedes`, …) | Sí — pasan por `src/server.ts` |
| Archivos estáticos (`/robots.txt`, `/favicon.ico`, `/assets/*`) | **No** |

Para la `Content-Security-Policy` la cobertura es la correcta de todos modos:
una política de contenidos se aplica por documento, y los documentos son HTML.

Queda un hueco menor: los archivos estáticos salen sin
`x-content-type-options: nosniff`. El riesgo es bajo (son archivos nuestros,
servidos con su tipo correcto), pero se cierra añadiendo un `vercel.json` con
un bloque `headers`. No se hizo en esta ronda para no tocar la configuración
de despliegue sin probarla en el entorno real.

`public/_headers` se mantiene sincronizado con la lista de `src/server.ts` por
si el despliegue vuelve a Cloudflare. **Si se cambia una, hay que cambiar la
otra.**
