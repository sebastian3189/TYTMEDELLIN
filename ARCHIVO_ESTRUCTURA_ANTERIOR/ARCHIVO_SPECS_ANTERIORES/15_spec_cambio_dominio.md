# ARCHIVADO — Spec 15 anterior, no vigente

**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `especialista-seo`
**Depende de:** [`08_spec_seo.md`](08_spec_seo.md) · [`11_spec_analitica_medicion.md`](11_spec_analitica_medicion.md) · [`14_configuracion_tag_manager.md`](14_configuracion_tag_manager.md)
**Se usa:** el día que se contrate un dominio propio y se deje de servir el sitio desde `tnt-medellin-connect.vercel.app`.

---

## 0. Checklist rápida

El día que haya dominio nuevo, en este orden. El detalle y el porqué de cada
paso están en las secciones 3-8; esto es solo la lista de acciones.

1. **DNS** — apuntar el dominio nuevo a Vercel (registro que indique el panel).
2. **Vercel** — Settings → Domains → añadir el dominio. Esperar el SSL
   (automático). Configurar redirección 301 del dominio viejo
   (`tnt-medellin-connect.vercel.app`) al nuevo.
3. **Código — 3 archivos, ninguno más:**
   - `src/lib/seo.ts` línea 17 → cambiar `SITE_URL`.
   - `public/robots.txt` → cambiar la línea `Sitemap:`.
   - `public/sitemap.xml` → cambiar las 47 `<loc>`.
   - Verificar con `grep -rn "tnt-medellin-connect.vercel.app" src public` —
     debe quedar en cero. Commit, push, deploy.
4. **Confirmar el deploy** —
   `curl -s https://TUDOMINIO/sitemap.xml | grep vercel.app` sin resultados.
5. **GTM** — vista previa sobre el dominio nuevo, aceptar cookies, confirmar
   que llegan eventos. No hay que reconfigurar nada del contenedor.
6. **GA4** — Administrar → Flujos de datos → editar la URL del flujo al
   dominio nuevo. Pasados unos días, revisar **Exclusión de referencias no
   deseadas** y añadir el dominio viejo si aparece como referral.
7. **Search Console** — crear propiedad nueva tipo **Dominio** (no prefijo de
   URL), verificar por TXT en DNS, enviar el `sitemap.xml` nuevo. No borrar
   la propiedad vieja si existe.
8. **Google Business Profile** — si hay ficha creada, cambiar el campo
   «Sitio web».

**Nota:** el aviso de cookies va a volver a salir para todo el mundo en el
dominio nuevo (cookie de primera parte, no viaja de un origen a otro). Es
normal, no es un error — detalle en §5.

---

## 1. Por qué existe este documento

`14_configuracion_tag_manager.md` §9 ya avisaba: **«Un dominio propio... Si se
contrata, hay que cambiarlo en tres sitios»**. Este spec convierte ese aviso
de una línea en el procedimiento completo — código y paneles — para que el
cambio no rompa la medición ni el posicionamiento que ya se haya ganado.

No es un cambio grande en volumen de líneas. Es un cambio con **muchos sitios
pequeños que tocar en orden**, y el riesgo no está en ninguno de ellos por
separado sino en saltarse uno o hacerlos en el orden equivocado.

---

## 2. Resumen: qué NO se rompe solo

Antes de la lista de tareas, lo importante que ya está resuelto por diseño:

| Pieza | Por qué el cambio de dominio no la afecta |
|---|---|
| **CSP** (`src/server.ts`, `public/_headers`) | Usa `'self'` para el propio origen, nunca el dominio literal. Cambiar de dominio no exige tocar la política. |
| **Contenedor de GTM** (`GTM-TH7TNFW6`) | Los contenedores web de GTM no restringen por dominio: el snippet dispara en cualquier sitio donde esté instalado. No hay que crear un contenedor nuevo. |
| **`VITE_GTM_ID`** | No contiene el dominio, solo el ID del contenedor. No cambia. |
| **Catálogo de eventos y capa de datos** | Nombres de evento y parámetros no dependen del dominio. Nada que tocar en GTM ni en el código de `analytics.ts`. |
| **`src/lib/seo.ts`** salvo una constante | Todas las funciones (`urlAbsoluta`, `tituloSeo`, `jsonLd`, etc.) leen de `SITE_URL`. Cambia la constante una vez y todo lo que depende de ella se actualiza solo. |

Lo que **sí** hay que tocar está en las dos secciones siguientes.

---

## 3. Cambios a nivel de código (3 archivos, ninguno más)

Comprobado por búsqueda en todo el repositorio el 2026-09-25: el dominio
`tnt-medellin-connect.vercel.app` aparece exactamente en estos archivos.

| Archivo | Qué cambiar | Ocurrencias |
|---|---|---|
| `src/lib/seo.ts` | La constante `SITE_URL` (línea 17). Es el único sitio del código: `OG_IMAGE`, `LOGO`, `ORG_ID`, `WEBSITE_ID`, canonical, `hreflang`, JSON-LD y breadcrumbs se derivan todos de ella. | 1 |
| `public/robots.txt` | El comentario informativo de la línea 4 y la línea `Sitemap:` (línea 21). El comentario no lo lee ningún rastreador pero debe quedar coherente. | 2 |
| `public/sitemap.xml` | El comentario de cabecera (línea 5) y **las 47 etiquetas `<loc>`** — una por cada URL del sitio. | 48 |

Estos dos últimos son estáticos: no importan `SITE_URL` de `seo.ts` porque no
pasan por el bundler. Es la misma razón por la que están duplicados hoy y no
se puede resolver sin generar esos archivos en build (fuera del alcance de
este cambio puntual).

### Cómo hacerlo sin dejar ninguno atrás

```bash
# Desde la raíz de tnt-medellin-connect, con el dominio nuevo sin barra final:
grep -rn "tnt-medellin-connect.vercel.app" src public
```

Reemplazar cada ocurrencia por el dominio nuevo (p. ej.
`https://www.tytmedellin.com`) y volver a correr el mismo `grep` — debe
quedar en cero antes de hacer commit. **No usar un `sed` global sobre todo el
repo**: hay capturas de pantalla, notas y otros documentos con el nombre
`tnt-medellin-connect` en rutas de archivo que no son URLs y no deben
tocarse.

### Decisión que hay que tomar antes de editar

¿El dominio nuevo lleva `www.` o no? Elegir uno como canónico (el que se
ponga en `SITE_URL`) y en el paso 4.2 configurar en Vercel una redirección
301 desde el otro. Las dos formas sirviendo contenido sin redirección es
contenido duplicado a ojos de un rastreador.

---

## 4. Cambios en las plataformas

### 4.1 Antes de tocar código: DNS

1. Comprar/tener el dominio y crear en el proveedor de DNS los registros que
   pida Vercel (normalmente un `A` o `ALIAS` a la IP de Vercel para el
   dominio raíz, y un `CNAME` a `cname.vercel-dns.com` para `www`).
2. La propagación puede tardar minutos u horas. No hace falta esperarla para
   seguir con los pasos siguientes, pero sí antes de apuntar tráfico real.

### 4.2 En Vercel

1. Project → **Settings → Domains** → añadir el dominio nuevo.
2. Vercel valida los registros DNS del paso 4.1 y emite el certificado SSL
   automáticamente (Let's Encrypt). No hay nada que instalar a mano.
3. Marcar el dominio nuevo (o su variante con/sin `www` elegida en §3) como
   **dominio de producción**. Vercel redirige automáticamente la otra
   variante (`www` ↔ raíz) con 301 si ambas están añadidas al proyecto.
4. **El dominio viejo (`tnt-medellin-connect.vercel.app`) sigue funcionando
   solo.** Vercel no lo desactiva al añadir uno propio. Decisión a tomar:
   - Dejarlo activo y sirviendo el mismo contenido → riesgo de contenido
     duplicado (mitigado en parte por el `canonical`, que ya apuntará al
     dominio nuevo una vez desplegado el cambio de §3).
   - Configurar una redirección 301 del subdominio `.vercel.app` al dominio
     nuevo. **Recomendado**, y es lo único que preserva el valor SEO de
     cualquier enlace externo que ya apunte al dominio viejo.
5. Volver a desplegar (o esperar el próximo deploy) después de fusionar los
   cambios de §3, para que el HTML servido lleve ya el `canonical`, el
   `sitemap.xml` y el `robots.txt` correctos.

### 4.3 En Google Tag Manager

No hay que crear un contenedor nuevo (§2). Sí hay que comprobar:

1. Abrir **Vista previa** de GTM apuntando al dominio nuevo (una vez
   desplegado) y repetir la comprobación de `14_configuracion_tag_manager.md`
   §7.1: aceptar cookies, navegar, revisar que los eventos lleguen con sus
   parámetros.
2. Si en el contenedor se configuraron **Entornos** (Environments) con URLs
   específicas de prueba, revisar que sigan apuntando donde corresponde —
   no aplica a este proyecto salvo que se haya añadido después de
   2026-09-24.

### 4.4 En Google Analytics 4

1. **Administrar → Flujos de datos → (el flujo `T&T Medellín Web`)**: editar
   la **URL del sitio web** del flujo de `https://tnt-medellin-connect.vercel.app`
   al dominio nuevo. Es solo una etiqueta descriptiva — no filtra datos — pero
   dejarla desactualizada confunde a cualquiera que abra el panel después.
2. Si se decidió la redirección 301 del paso 4.2, GA4 puede empezar a contar
   el dominio viejo como **referencia (referral)** de sí mismo en el momento
   de la redirección. Revisar **Administrar → Configuración de datos →
   Exclusión de referencias no deseadas** y añadir
   `tnt-medellin-connect.vercel.app` si aparecen sesiones marcadas con ese
   origen tras el cambio.
3. **Lo que no se puede evitar:** los datos históricos quedan asociados al
   `page_location` con el hostname viejo. No se fusionan retroactivamente con
   los del dominio nuevo. Al leer comparativas antes/después del cambio, es
   el mismo aviso de continuidad que ya hace `13_plan_observabilidad_metricas.md`
   para otros cambios de infraestructura: la serie tiene un salto, no un error.
4. Los **eventos clave** marcados en `11_spec_analitica_medicion.md` §6 no se
   tocan: son nombres de evento, no dominios.

### 4.5 En Search Console

Comprobado el 2026-09-25: el código no tiene ninguna etiqueta
`google-site-verification`, lo que indica que **la propiedad de Search
Console todavía no está verificada** para el dominio actual (coherente con
la casilla sin marcar en `11_spec_analitica_medicion.md` §11).

**Esto es en realidad la situación más simple posible:** si Search Console
aún no se ha configurado, no hay nada que migrar — se verifica directamente
sobre el dominio definitivo y se evita repetir el trabajo. Si para cuando se
lea este spec ya se verificó sobre `tnt-medellin-connect.vercel.app`, seguir
esta rama:

1. Crear una propiedad nueva de tipo **Dominio** (no de prefijo de URL) sobre
   el dominio nuevo. Una propiedad de dominio cubre `http`, `https`, con y
   sin `www` en una sola verificación — evita repetir este mismo problema si
   algún día cambia solo el subdominio.
2. Verificar por **registro TXT en el DNS** (el método que pide una propiedad
   de dominio). Se añade en el mismo proveedor de DNS del paso 4.1.
3. **Sitemaps → Añadir sitemap nuevo**: `sitemap.xml`, una vez desplegado el
   cambio de §3 (si se envía antes, todavía tiene las URLs viejas).
4. Si existía una propiedad verificada para el dominio viejo, **no borrarla**.
   Dejarla activa para vigilar en el informe de **Cobertura** que las URLs
   viejas se marcan como redirigidas (301) y no como error — es la prueba de
   que la redirección del paso 4.2 quedó bien puesta.
5. La herramienta **Cambio de dirección** de Search Console (pensada
   exactamente para esto) solo está disponible entre dos propiedades del
   mismo tipo verificadas en la misma cuenta. Usarla si ambas propiedades
   (vieja y nueva) están verificadas; si no, los pasos 1-4 cumplen lo mismo
   de forma manual.

### 4.6 Google Business Profile

Si ya existe una ficha creada (decisión pendiente en
`11_spec_analitica_medicion.md` §3): actualizar el campo **Sitio web** al
dominio nuevo. Es edición directa en el panel, sin dependencias técnicas.

---

## 5. El consentimiento de cookies no viaja de un dominio a otro

`src/lib/cookies.ts` guarda la decisión en una cookie de primera parte
(`tt-cookies`), atada al origen que la puso. Un dominio nuevo es un origen
distinto: **quien ya había aceptado las cookies en
`tnt-medellin-connect.vercel.app` verá el aviso otra vez en el dominio
nuevo.** No es un fallo del cambio — es el comportamiento correcto y
esperado de una cookie de primera parte — pero conviene saberlo de antemano
para no confundirlo con que la medición se rompió.

---

## 6. Orden recomendado, de principio a fin

El orden importa más que la lista. Hacerlo en otro orden no rompe nada de
forma irreversible, pero puede dejar ventanas donde el sitio nuevo sirve
`sitemap.xml`/`canonical` con el dominio viejo, o donde Search Console no
tiene nada que verificar todavía.

1. DNS del dominio nuevo apuntando a Vercel (§4.1).
2. Dominio añadido y verificado en Vercel; SSL emitido (§4.2, pasos 1-2).
3. Editar los 3 archivos de código (§3), PR, merge.
4. Deploy a producción. Confirmar con `curl` que el HTML servido en el
   dominio nuevo trae el `canonical` correcto y que `robots.txt` /
   `sitemap.xml` responden con las URLs nuevas.
5. Marcar el dominio nuevo como producción en Vercel y configurar la
   redirección 301 del dominio viejo (§4.2, pasos 3-4).
6. Vista previa de GTM sobre el dominio nuevo (§4.3).
7. Actualizar la URL del flujo en GA4 (§4.4, paso 1).
8. Verificar/crear la propiedad de Search Console sobre el dominio nuevo y
   enviar el sitemap (§4.5).
9. Actualizar Google Business Profile si aplica (§4.6).
10. Esperar unos días y revisar: Search Console → Cobertura (redirecciones
    limpias, sin errores 404 masivos) y GA4 → Tiempo real / Exclusión de
    referencias (§4.4, paso 2).

---

## 7. Verificación posterior

Repetir, ya en el dominio nuevo, las mismas pruebas de
`14_configuracion_tag_manager.md` §7:

| Prueba | Qué debe pasar |
|---|---|
| `curl -sI https://<dominio-nuevo>/` | Cabeceras de seguridad presentes (las pone `src/server.ts`, no dependen del dominio) |
| `curl -s https://<dominio-nuevo>/robots.txt` | `Sitemap:` con el dominio nuevo |
| `curl -s https://<dominio-nuevo>/sitemap.xml \| grep vercel.app` | Sin resultados — cero `<loc>` con el dominio viejo |
| Ver código fuente de `/` | `<link rel="canonical">` y el bloque `application/ld+json` con el dominio nuevo |
| Incógnito, rechazar cookies, pestaña Red filtrada por `googletagmanager` | Ninguna petición |
| Incógnito, aceptar cookies | Se carga `gtm.js`; vista previa de GTM enlaza y los eventos llegan (§4.3) |
| `https://<dominio-viejo>.vercel.app/` | Redirige 301 al dominio nuevo (si se tomó esa decisión en §4.2) |
| Search Console → Cobertura, después de unos días | URLs viejas como «Redirección», no como error |

---

## 8. Cuando algo no cuadra

| Síntoma | Causa más probable |
|---|---|
| El sitio nuevo funciona pero GTM no dispara nada | Falta desplegar después del merge de §3, o no se aceptaron las cookies en este origen nuevo (§5) |
| `sitemap.xml` sigue mostrando el dominio viejo tras el deploy | Deploy en caché de CDN — probar con `curl -s ... ?v=$(date +%s)` o purgar caché en Vercel |
| GA4 muestra una caída brusca de sesiones el día del cambio | Esperado si hubo ventana entre desactivar el dominio viejo y activar el nuevo, o si el dominio nuevo tardó en propagar DNS. Revisar `page_location` para confirmar en qué dominio cayeron las sesiones «perdidas» |
| Aparecen sesiones con origen `tnt-medellin-connect.vercel.app` en GA4 semanas después | Falta añadirlo a la exclusión de referencias no deseadas (§4.4, paso 2) |
| Search Console no verifica el registro TXT | Propagación de DNS incompleta, o se añadió el TXT en el proveedor equivocado si el dominio se compró en un sitio y el DNS lo gestiona otro |
| Alguien reporta el aviso de cookies «otra vez» | Correcto y esperado (§5), no es un error que arreglar |

---

## 9. Compuerta

| | Punto | Cómo se rectifica |
|---|---|---|
| ☑ | DNS del dominio nuevo apuntando a Vercel y propagado | 2026-09-29: `https://www.transporteyturismomedellin.com` responde 200 |
| ☑ | Dominio verificado en Vercel con SSL activo | 2026-09-29: HTTPS válido; la raíz sin `www` redirige 308 a `www` |
| ☑ | `SITE_URL`, `robots.txt` y las 47 `<loc>` de `sitemap.xml` actualizados | 2026-09-29, `grep` en cero (§3). Canónico elegido: **con `www`** |
| ☐ | Deploy en producción con los cambios de código | `curl` contra el dominio nuevo |
| ☐ | Redirección 301 del dominio `.vercel.app` decidida y, si aplica, configurada | Decidida: sí. Páginas HTML → 301 desde `src/server.ts` (solo el host exacto, no las previews). Estáticos → falta «Redirect to» en el panel de Vercel. `curl -I` al dominio viejo tras el deploy |
| ☐ | GTM dispara eventos en el dominio nuevo | Vista previa de GTM |
| ☐ | URL del flujo de datos actualizada en GA4 | Panel de GA4 |
| ☐ | Propiedad de Search Console verificada para el dominio nuevo y sitemap enviado | Panel de Search Console |
| ☐ | Exclusión de referencias revisada si hay redirección 301 activa | Panel de GA4, pasados unos días |
| ☐ | Google Business Profile actualizado, si existe ficha | Panel de GBP |

**Estado de la compuerta: EN CURSO desde el 2026-09-29.** Dominio:
`https://www.transporteyturismomedellin.com`. Código listo; faltan el deploy
y los pasos de panel (GTM, GA4, Search Console, GBP).
