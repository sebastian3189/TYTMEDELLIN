// Compilación PARA PUBLICAR (dominio final + indexación abierta). Uso: npm run build:produccion
// Equivale a: TYT_SITE_URL=https://www.transporteenmedellin.com TYT_INDEXABLE=1 npm run build   (sin depender de la terminal: funciona igual en Windows, Mac y Linux).
// `npm run build` a secas mantiene noindex y robots.txt cerrado (prototipo). En Vercel NO hace falta este script: basta con la variable de entorno
// TYT_INDEXABLE=1 en el entorno «Production» (ver pendientes/SEOOP.md).
import { spawnSync } from 'node:child_process';
const env = { ...process.env, TYT_SITE_URL: process.env.TYT_SITE_URL || 'https://www.transporteenmedellin.com', TYT_INDEXABLE: '1' };
const r = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', env, shell: true });
process.exit(r.status ?? 1);
