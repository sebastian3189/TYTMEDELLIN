ARCHIVADO
name: tt-git-flujo
description: Convenciones de git para el proyecto — qué está prohibido, cómo nombrar ramas, cómo hacer commits atómicos y qué archivos generados no deben ensuciar el diff. Úsala antes de cualquier commit, rama o push. Consulta CLAUDE1.MD para la plataforma de despliegue.
---

# Skill — Flujo de git

## 1. Prohibiciones absolutas

Si el repositorio está conectado a una plataforma de despliegue continuo:

- **Nunca `git push --force`.**
- **Nunca `git rebase` sobre commits ya publicados.**
- **Nunca `git commit --amend` sobre commits ya publicados.**
- **Nunca `git reset --hard` para borrar commits publicados.**

Reescribir historia publicada rompe la sincronización con la plataforma.

## 2. Ramas

Formato: `tipo/descripcion-en-kebab-case`

| Prefijo | Cuándo |
|---|---|
| `feat/` | Funcionalidad nueva |
| `fix/` | Corrección de bug |
| `docs/` | Solo documentación |
| `chore/` | Dependencias, config, limpieza |
| `refactor/` | Cambio interno sin cambio funcional |

Ejemplo: `feat/seccion-valores`, `fix/responsive-hero-movil`.

## 3. Commits

### Formato
```
tipo(ámbito): descripción en imperativo
```
Ejemplo: `feat(home): añadir sección de cifras animadas`

### Reglas
- **Un commit, una responsabilidad.** No mezclar fix + feat + docs.
- **Un agente, un commit.** Si dos agentes tocan archivos distintos, cada uno commitea lo suyo.
- **Mensaje en español**, imperativo, sin punto final, ≤ 72 caracteres en la primera línea.

### Tipos válidos
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

## 4. Archivos generados — no editar

Consulta `CLAUDE1.MD` para la lista específica. Patrones comunes:

| Archivo | Quién lo genera | Qué haces |
|---|---|---|
| `routeTree.gen.ts` | TanStack Router al correr `dev`/`build` | No editar a mano, no commitear si es el único cambio |
| `bun.lock` / `package-lock.json` | Gestor de paquetes | Commitear si hubo cambio real de dependencia |
| `.output/`, `.vercel/`, `dist/` | Build | En `.gitignore`, nunca commitear |

## 5. Pre-commit

Antes de commitear, verificar:
- [ ] `npm run lint` sin errores nuevos
- [ ] `npm run build` pasa
- [ ] `git diff --staged` no incluye archivos que no deberían estar (`.env`, credenciales, builds)
- [ ] El mensaje sigue el formato `tipo(ámbito): descripción`
