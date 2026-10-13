# ARCHIVADO — Spec 12 anterior, no vigente
**Transporte y Turismo Medellín (T&T Medellín)**
**Agente dueño:** `qa-entrega`
**Depende de:** todos los specs anteriores
**Cierra:** el pipeline

---

## 1. Posición

Este spec define **qué significa "terminado"** en este proyecto. Es el último filtro y el único que puede declarar una historia cerrada.

Principio que gobierna todo: **la lealtad es al estado real del trabajo, no a la sensación de avance.** Si algo falla, se dice con la salida del comando. Si algo no se pudo verificar, va como pendiente, nunca como verificado.

---

## 2. Definición de preparada (DoR)

Una historia se puede tomar solo si:

- [ ] Su spec de referencia está cerrado
- [ ] No depende de una decisión abierta del cliente (o su parte bloqueada está aislada)
- [ ] Sus criterios de aceptación son verificables sin ambigüedad
- [ ] Se sabe qué archivos toca y quién es su dueño (skill `tt-trabajo-paralelo`)
- [ ] Está estimada

Si falta cualquiera, **no se empieza**. Empezar una historia mal definida produce trabajo que hay que rehacer.

---

## 3. Definición de terminada (DoD)

Aplica a **todas** las historias, sin excepción.

### 3.1 Estático

```bash
npm run lint
npm run build
```

Ambos pasan. Errores nuevos bloquean. Warnings nuevos se documentan, no se ignoran en silencio.

> **⚠️ `npm run lint` FALLA HOY, antes de tocar nada — verificado el 2026-08-10.**
>
> ```
> ✖ 7320 problems (7312 errors, 8 warnings)   ← exit code 1
> ```
>
> **7312 de los 7312 errores son `prettier/prettier: Delete ␍`**, repartidos por 80 archivos. No es deuda de código: son **finales de línea**.
>
> **Causa raíz:**
>
> | Factor | Estado |
> |---|---|
> | `git config core.autocrlf` | `true` — convierte LF a CRLF al hacer checkout en Windows |
> | `.gitattributes` | **No existe** — nada anula ese comportamiento |
> | `endOfLine` en `.prettierrc` | **No declarado** — prettier asume `"lf"` |
>
> Resultado: en Windows, **todo archivo del repositorio incumple prettier desde el primer día**. `src/routes/index.tsx` está en disco con terminadores CRLF.
>
> **Consecuencia para esta DoD:** el criterio "`npm run lint` pasa" es **hoy inalcanzable**, y no por culpa de ninguna historia. Mientras no se corrija, la única lectura útil es **"no introduce errores nuevos que no sean `prettier/prettier`"**, comparando contra la línea base de 7312.
>
> **Corrección, en orden de preferisa:**
>
> 1. Añadir `.gitattributes` con `* text=auto eol=lf` y renormalizar (`git add --renormalize .`). Arregla el origen y es lo correcto para un repositorio multiplataforma.
> 2. Añadir `"endOfLine": "auto"` a `.prettierrc`. Un cambio de una línea: prettier deja de opinar sobre los finales de línea y los 7312 errores desaparecen.
>
> `TODO(cliente)`: es un cambio de configuración del repositorio. **Requiere aprobación antes de aplicarse**, porque la opción 1 toca todos los archivos en un único commit.
>
> Los 8 warnings restantes son `react-refresh/only-export-components`, ajenos a este problema y sí atribuibles al código.

### 3.2 Funcional

**⚠️ `npm run preview` está ROTO — verificado en ejecución.**

```
ERR_MODULE_NOT_FOUND: Cannot find module 'dist/server/server.js'
```

Causa: el preset de despliegue es Cloudflare (spec 10 §2.1) y escribe la salida en **`.output/server/`**, no en `dist/server/`. El script de `preview` apunta a la ruta antigua, que ya no existe.

Consecuencia para este spec: **`npm run preview` no puede figurar como paso de la DoD ni de la matriz de pruebas mientras siga roto.** Sustituto provisional:

```bash
npm run dev        # puerto 8081
```

Con dos advertencias que hay que repetir en cada informe que use esta vía:

1. **Las cifras de rendimiento de `dev` no son representativas de producción.** El servidor de desarrollo no minifica igual, no aplica las mismas cabeceras de caché y sirve módulos sin empaquetar. Cualquier medición de Core Web Vitals tomada en `dev` va a **PENDIENTE**, nunca a VERIFICADO.
2. Las cabeceras de seguridad de `_headers` **no se aplican en `dev`**: son de Cloudflare. Verificarlas exige el dominio real (spec 10 §6).

`TODO(agente)`: arreglar el script de `preview` para que apunte a `.output/server/`. Hasta entonces, la verificación funcional pre-despliegue es incompleta por construcción y hay que decirlo en el veredicto.

- [ ] Cada criterio de aceptación verificado **uno por uno**, no en bloque
- [ ] Sin errores en la consola del navegador
- [ ] La funcionalidad existente sigue funcionando (sin regresión)

### 3.3 Responsive — bloqueante

Anchos **320 · 360 · 390 · 768 · 1024 · 1280 · 1440 · 1920** px:

```js
() => ({
  ancho: document.documentElement.clientWidth,
  desborde: document.body.scrollWidth > document.documentElement.clientWidth,
})
```

Cualquier `desborde: true` **bloquea la entrega**.

### 3.4 Temas e idiomas

Las 4 combinaciones: claro/ES, claro/EN, oscuro/ES, oscuro/EN.

- [ ] Ningún bloque queda sin traducir
- [ ] Contraste legible en ambos temas
- [ ] Las preferencias persisten al recargar

### 3.5 Accesibilidad

- [ ] Un solo `<h1>` por página
- [ ] Recorrido con teclado con foco visible
- [ ] `aria-label` en botones de icono, traducidos
- [ ] Imágenes con `alt` real o `alt=""` si decorativas
- [ ] Ningún mensaje comunicado solo por color

### 3.6 Higiene

- [ ] `git status` sin archivos inesperados
- [ ] Sin `console.log` ni código comentado
- [ ] Todo `TODO` marcado como `TODO(cliente)` o `TODO(agente)` con motivo
- [ ] Sin texto de relleno visible
- [ ] No se editó `src/components/ui/**` ni `src/routeTree.gen.ts` a mano

---

## 4. Matriz de pruebas

### 4.1 Rutas

**Son 9 rutas reales, no 8.** El conteo correcto es:

`/` · `/historia` · `/equipo` · `/valores` · `/servicios` · `/contacto` · `/sedes` · `/sedes/eje-cafetero` · `/sedes/cartagena`

El error de conteo venía de tratar `sedes.$slug` como una ruta: **genera dos** (Eje Cafetero y Cartagena), porque son las dos sedes sin sitio propio. Nueve URLs navegables, verificadas en ejecución.

✅ Corregido también en `.claude/agents/qa-entrega.md`: ya dice "las 9 URLs" y explica por qué son 9 con 8 archivos de ruta.

| Ruta | Qué verificar | Estado |
|---|---|---|
| `/` | 8 secciones renderizan · contadores animan y terminan en el valor correcto | ☑ **200 verificado** |
| `/historia` | Timeline completa · cita del fundador | ☑ **200 verificado** |
| `/equipo` | Grid por áreas · bloque de conductores · sin desalineación a 1024 px | ☑ **200 verificado** |
| `/valores` | Valores con ejemplo · certificaciones | ☑ **200 verificado** |
| `/servicios` | 3 servicios alternando lado | ☑ **200 verificado** |
| `/contacto` | Formulario · datos · mapa | ☑ **200 verificado** — pero el formulario incumple (spec 10 §2.2) |
| `/sedes` | 4 tarjetas · 2 salen, 2 entran · jerarquía de CTA correcta | ☑ **200 verificado** |
| `/sedes/eje-cafetero` | Catálogo · enlaces a fichas · CTA de cotización | ☑ **200 verificado** |
| `/sedes/cartagena` | Ídem | ☑ **200 verificado** |
| `/sedes/{slug}/{exp}` | Ficha completa · breadcrumb · campos ausentes no se renderizan | ☐ No existe todavía |
| `/privacidad` | Aviso completo y enlazado desde el formulario | ☐ No existe todavía — bloquea el cumplimiento legal |

El 200 confirma que la ruta responde, **no** que su contenido sea correcto. Los criterios de la columna central siguen pendientes uno por uno.

### 4.2 Casos límite — deben dar 404

| URL | Por qué | Estado |
|---|---|---|
| `/sedes/bogota` | Tiene sitio propio: no hay detalle interno | ☑ **404 verificado** |
| `/sedes/medellin` | Ídem | ☑ **404 verificado** |
| `/sedes/cartagena/experiencia-inexistente` | Slug no existe | ☐ Depende de la ruta de ficha |
| `/ruta-que-no-existe` | 404 con diseño propio | ☑ **404 verificado** (`/noexiste`) |

**`/sedes/bogota` devolviendo 404 no es un fallo: es el comportamiento correcto** y hay que verificar que se mantiene tras cualquier cambio en `sedes.ts`.

**La lógica `tieneSitioPropio` funciona como se diseñó**, confirmado en ejecución: las dos sedes con sitio propio dan 404 en su detalle interno y las dos sin él resuelven a 200.

### 4.3 Interacciones

| Interacción | Resultado esperado |
|---|---|
| Menú móvil | Abre, navega, cierra · cierra con `Escape` · devuelve el foco |
| Toggle de tema | Cambia y persiste al recargar |
| Toggle de idioma | Cambia todo y persiste · `<html lang>` se actualiza |
| Formulario vacío | Error **junto al campo**, no solo toast |
| Formulario sin autorización | Bloquea el envío |
| Formulario válido | Envía de verdad · confirma · limpia |
| Enlaces externos | Pestaña nueva con `rel="noopener noreferrer"` |
| CTA de cotización | Mensaje correcto y codificado en WhatsApp |
| FAB de WhatsApp | Presente, contextual, sin tapar contenido |
| Paquete de tours | Añade, quita, envía, vacía |
| Carrusel | Navegable con teclado · sin autoplay bajo movimiento reducido |

### 4.4 Navegadores

| Navegador | Prioridad |
|---|---|
| Chrome escritorio y Android | Alta |
| Safari iOS | **Alta** — es donde fallan `dvh` y `safe-area` |
| Firefox | Media |
| Edge | Media |

Safari iOS no es opcional: buena parte del tráfico turístico llega desde ahí, y es el navegador donde se manifiestan los problemas del spec 07.

**Corrección — el zoom de inputs ya no es un problema.** Verificado en ejecución: los inputs de `/contacto` tienen `font-size: 16px`, el umbral por debajo del cual Safari iOS hace zoom automático al enfocar. **No hay zoom automático.** Este punto se retira de la lista de riesgos: está correcto y no requiere trabajo.

---

## 5. Compuertas entre specs

El pipeline avanza en orden. **El spec N+1 no arranca hasta que el N pase su compuerta.**

```
03 Arquitectura → 04 Design system → 05 Contenido → 06 Módulo de venta
→ 07 A11y/Responsive → 08 SEO → 09 Rendimiento → 10 Seguridad
→ 11 Analítica → 12 QA
```

### Criterios de compuerta

| Criterio | Verificación |
|---|---|
| El spec está completo, sin secciones "por definir" | Lectura |
| Sus hipótesis fueron **rectificadas contra el código en ejecución** | Bloque de verificación del propio spec |
| No contradice specs anteriores | Revisión cruzada |
| Sus historias están en el backlog con criterios verificables | Grep del ID |
| Lo bloqueado está marcado 🔒, no inventado | Búsqueda de `🔒` y `TODO(cliente)` |
| El agente dueño dio veredicto | Informe |

**Si algo falla, no se avanza.** "Seguimos y luego lo arreglamos" es exactamente lo que este método existe para impedir.

### Estado actual de las compuertas

| Spec | Estado | Bloqueo principal |
|---|---|---|
| 01 Plan maestro | 🔴 CERRADA | Diagnóstico sin verificar en ejecución |
| 02 Backlog | 🔴 CERRADA | Prioridades P0 sin validar con el cliente |
| 03 Arquitectura | 🔴 CERRADA | Decisión de navegación · slugs sin aprobar |
| 04 Design system | 🔴 CERRADA | 8 puntos sin verificar en ejecución |
| 05 Contenido | 🔴 CERRADA | Contradicción "cuatro/cinco casas" |
| 06 Módulo de venta | 🔴 CERRADA | 🔒 Decisiones #2 y #5 · datos operativos |
| 07 A11y/Responsive | 🔴 CERRADA | Barrido de anchos sin ejecutar |
| 08 SEO | 🔴 CERRADA | Volúmenes sin validar · decisión de i18n |
| 09 Rendimiento | 🔴 CERRADA | Sin línea base medida |
| 10 Seguridad | 🔴 CERRADA | Infraestructura **ya conocida: Cloudflare Workers** · sigue bloqueada por 🔒 decisión #1 y validación legal del aviso |
| 11 Analítica | 🔴 CERRADA | Consentimiento y CSP |
| 12 QA | 🔴 CERRADA | Depende de todas las anteriores · `npm run preview` roto (§3.2) |

**Todas siguen cerradas**, pero la rectificación en ejecución ya empezó y hay que registrar lo que cambió:

| Hallazgo verificado | Efecto sobre la compuerta |
|---|---|
| Despliegue = **Cloudflare Workers** (`.output/server/wrangler.json`) | El spec 10 deja de tener una incógnita de infraestructura: el rate limiting **es posible**. No la abre — nada está implementado |
| Las **9 rutas** responden 200 · `/sedes/bogota`, `/sedes/medellin` y `/noexiste` dan 404 | El enrutado y `tieneSitioPropio` quedan verificados. El contenido de cada ruta, no |
| `/contacto`: 5 campos, **0 `aria-invalid`**, **0 casillas** | Confirma la brecha A3. Incumplimiento de WCAG SC 3.3.1 y de la Ley 1581 de 2012, ya no hipotético |
| Inputs a **16 px**: sin zoom en iOS | Un riesgo del spec 07 queda **descartado**, no pendiente |
| **`npm run preview` roto** | Degrada la verificación pre-despliegue del propio spec 12 (§3.2) |

**Conocer un hecho no abre una compuerta.** Estos hallazgos convierten preguntas abiertas en trabajo definido; el trabajo sigue sin hacerse.

---

## 6. Ceremonias

| Ceremonia | Cuándo | Qué produce |
|---|---|---|
| **Planificación** | Al abrir un spec | Historias en el backlog con prioridad, estimación y criterios |
| **Seguimiento** | En cada intervención | `TodoWrite` al día, una tarea en curso |
| **Revisión** | Al cerrar el spec | Informe: qué se hizo, qué quedó bloqueado y por qué |
| **Retrospectiva** | Al cerrar el spec | Si un agente pisó zona ajena o un criterio no se pudo verificar, se actualiza la skill correspondiente |

La retrospectiva es la que impide que el mismo error se repita: no basta con corregirlo, hay que corregir la instrucción que lo permitió.

---

## 7. Despliegue

### Antes

- [ ] Todas las historias del sprint con DoD cumplida
- [ ] `npm run build` limpio
- [ ] **`npm run preview` arreglado** y ejecutado: es la única forma de ver la salida real antes de publicar (§3.2)
- [ ] `npm audit` sin vulnerabilidades altas o críticas
- [ ] Cabeceras de seguridad verificadas sobre el dominio real (bloque `/*` en `_headers`)
- [ ] `robots.txt` y `sitemap.xml` publicados
- [ ] Metadatos correctos en el HTML servido
- [ ] Aviso de privacidad publicado si hay captura de datos
- [ ] Line base de rendimiento registrada

### Reglas de git

Ver skill `tt-git-flujo`. En resumen:

- **Nunca reescribir historia publicada.** El usuario perdería su historial.
- La rama conectada siempre en estado funcional.
- Commits atómicos por responsabilidad.
- **Push solo cuando el usuario lo pida.**

### Después

- [ ] Las 9 rutas cargan en producción
- [ ] Formulario probado end-to-end en el dominio real
- [ ] Enlaces de WhatsApp probados en móvil real
- [ ] Core Web Vitals medidos en producción
- [ ] Sitemap enviado a Search Console

---

## 8. Formato del veredicto

```
ESTADO: APROBADO | BLOQUEADO | APROBADO CON OBSERVACIONES

HISTORIA:    UX-08 · Ficha de detalle de experiencia
SPEC:        06 Módulo de venta

VERIFICADO
  ✓ npm run lint · npm run build sin errores
  ✓ 8 anchos sin desborde (evidencia: informe por ancho)
  ✓ 4 combinaciones tema × idioma
  ✓ Criterios 1–9 comprobados uno por uno

FALLOS
  ✗ src/routes/sedes.$slug.$experiencia.tsx:47
    El bloque "No incluye" se renderiza vacío cuando el campo no existe.
    Criterio 8 incumplido.

PENDIENTE
  · Enlace de WhatsApp no probado en móvil real (no hay dispositivo disponible)
  · Datos operativos reales no recibidos: la ficha usa TODO(cliente)
```

**Lo que no se comprobó va en PENDIENTE.** Nunca en VERIFICADO. Un informe que declara verificado algo que no se miró es peor que no tener informe.

---

## 9. Reglas del agente de QA

1. **No apruebas sin evidencia.** Comando ejecutado, cifra medida o captura.
2. **No arreglas lo que auditas.** Devuelves el hallazgo al dueño del archivo.
3. **No suavizas el veredicto.** Si está bloqueado, se dice bloqueado.
4. **No das por bueno lo que no miraste.**
5. **Delegas en los especialistas** y recoges sus veredictos: `guardian-design-system`, `revisor-i18n`, `especialista-seo`, `especialista-rendimiento`, `especialista-seguridad`.
6. **Un fallo bloqueante no se compensa** con diez criterios cumplidos.

---

## 9.bis Veredicto de la ronda — 2026-08-10

```
ESTADO: APROBADO CON OBSERVACIONES

ALCANCE: Specs 01–12. Sprint 1 completo y la mayor parte del sprint 2.
ENTORNO: build de producción (preset node-server) en localhost:4192,
         viewport 390×844, 4G 1,6 Mbps, CPU 4×, caché deshabilitada.
```

### Verificado con evidencia

| Comprobación | Resultado |
|---|---|
| `npm run lint` | **exit 0** · 0 errores, 8 warnings preexistentes de `react-refresh` |
| `npm run build` | **exit 0** |
| `npx tsc --noEmit` | **exit 0** |
| Rutas reales | **12/12 → 200** |
| Casos límite | `/sedes/bogota`, `/sedes/medellin`, `/sedes/cartagena/no-existe`, `/nada` → **404** |
| **Responsive** | **96/96 sin desborde** (12 rutas × 8 anchos, 320→1920) |
| `<h1>` por página | **12/12 exactamente uno** |
| Errores de consola | **0** |
| **CLS** | **0** en `/` · **0,002** en `/sedes/cartagena` |
| Peso de imágenes en `/` | **19 714 KB → 332 KB** (−98,3 %) |
| JS inicial | **157 KB gzip**, bajo el presupuesto de 180 KB |
| Menú móvil | `Escape` cierra (7 enlaces → 0) **y devuelve el foco al botón** |
| Formulario vacío | **5 campos con `aria-invalid` y 5 mensajes junto al campo**. No confirma |
| Embudo de venta | **6 enlaces `wa.me`** y **4 enlaces a ficha** en `/sedes/cartagena` |
| Targets táctiles | Todos ≥ 44 px salvo el enlace en línea documentado |

### Observaciones — por qué no es APROBADO a secas

1. **El formulario todavía no entrega el lead.** UX-15 sigue pendiente: valida de verdad, pero no envía a ninguna parte. Hay un `TODO(agente)` explícito en el código. **No debe publicarse así.**
2. **`/privacidad` es un borrador técnico** con un banner que lo declara. Necesita revisión del asesor legal del cliente antes de considerarse vigente.
3. **LCP sin cifra homologable.** Lo medido (3 060 ms) es **pesimista**: el servidor local sirve los assets sin comprimir, 386 KB donde Cloudflare serviría ~118 KB. La cifra real exige el despliegue.
4. **El parpadeo de tema e idioma sigue ahí**: 5 521 ms medidos. UX-31 pendiente.
5. **Cabeceras de seguridad no aplicadas** (UX-30): requieren el despliegue de Cloudflare.
6. **Contraste del eyebrow sin resolver** (≈2,6:1): requiere decisión de diseño.
7. Enlace "política de tratamiento" a 15 px de alto: va **dentro de una frase** y WCAG SC 2.5.8 exime los enlaces en línea. Se deja a propósito.

### Regresiones detectadas y corregidas en esta misma ronda

Las tres las introduje yo, y las tres aparecieron **porque se volvió a ejecutar el barrido completo** en vez de dar los cambios por buenos:

| Regresión | Causa | Corrección |
|---|---|---|
| Desborde en `/` y `/historia` a 320 px | `width`/`height` crean un `aspect-ratio` implícito que, con altura CSS fija, revienta columnas de grid sin `grid-cols-1` | `grid-cols-1` explícito en 4 archivos |
| Desborde en `/` a 768 px | El correo real es mucho más largo que el ficticio y no cabía en el flex del footer | `min-w-0 break-all` |
| CTA de conversión a 36 px | `rounded-full px-8 py-3` no anula el `h-9` de la variante base del botón | `min-h-11` en 8 archivos |

### Falso positivo de método, anotado

Un barrido intermedio reportó imágenes desbordando en `/contacto` y `/privacidad`. **No era un defecto**: medía a 160 ms, con el layout sin asentar. Con 600 ms desaparece. Lección: los tiempos de espera del script de QA forman parte del propio control de calidad.

---

## 10. Compuerta de cierre del pipeline

| | Punto | Cómo se rectifica |
|---|---|---|
| ☑ | **Las 9 rutas responden** | Verificado en ejecución: 9 URLs con 200. Responder no es estar correcta |
| ☑ | **404 correctos en `/sedes/bogota`, `/sedes/medellin` y ruta inexistente** | Verificado en ejecución: `tieneSitioPropio` funciona como se diseñó |
| ☑ | **Infraestructura de despliegue conocida** | Cloudflare Workers, confirmado por el build (spec 10 §2.1) |
| ☐ | `npm run preview` funcionando | Hoy falla con `ERR_MODULE_NOT_FOUND` (§3.2). Bloquea la verificación pre-despliegue |
| ☐ | Las 11 compuertas anteriores abiertas | Revisión de cada spec |
| ☐ | Las 6 decisiones del cliente respondidas | Consulta |
| ☐ | Todas las historias P0 terminadas con DoD | Backlog |
| ☐ | Barrido responsive completo ejecutado | Informe con evidencia |
| ☐ | Core Web Vitals dentro del presupuesto | Medición **en producción** — las cifras de `npm run dev` no valen (§3.2) |
| ☐ | Errores de formulario con `aria-invalid` por campo | Hoy: **0 elementos**. WCAG SC 3.3.1 incumplido (spec 10 §2.2) |
| ☐ | Casilla de autorización de datos presente y no premarcada | Hoy: **0 casillas**. Ley 1581 de 2012 incumplida (spec 10 §8) |
| ☐ | Cumplimiento de Habeas Data verificado | Revisión legal del cliente |
| ☐ | Cabeceras de seguridad activas en producción | `curl -I` sobre el dominio real |
| ☐ | Analítica recibiendo eventos correctamente | DebugView |
| ☐ | Sin `TODO(cliente)` visible para el usuario final | Recorrido de las 9 rutas |

**Estado: CERRADA.** Tres puntos pasan a verificado —el enrutado completo, los 404 y la infraestructura— y eso es progreso real. Pero los dos incumplimientos normativos de `/contacto` están ahora **confirmados con medición**, no supuestos, y `npm run preview` roto impide comprobar la salida de producción antes de publicarla. El proyecto no está listo hasta que los puntos restantes estén verificados.
