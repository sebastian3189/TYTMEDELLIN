/**
 * Preview local del build de producción, sin Cloudflare.
 *
 * `npm run preview` usa wrangler, que es lo correcto para el destino real
 * (el preset de despliegue es cloudflare-module) pero requiere descargarlo.
 * Este script construye con el preset `node-server` y arranca el resultado
 * con Node, que es suficiente para verificación funcional y para medir.
 *
 * ⚠️ Aviso al medir rendimiento: este servidor sirve los assets **sin
 * comprimir**. En Cloudflare van con gzip/brotli, así que el bundle pesa
 * aproximadamente un tercio. Cualquier LCP medido aquí es **pesimista** y no
 * debe reportarse como cifra de producción. Ver 09_spec_rendimiento.md §0.
 *
 * Uso:  npm run preview:node  [-- --port 4180]
 */
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const puerto = args[args.indexOf("--port") + 1] ?? "4180";
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

/**
 * `shell` se decide por llamada y no de forma global.
 *
 * En Windows hacía falta para `npx.cmd` —un .cmd no es ejecutable sin shell—,
 * pero con `shell: true` el comando se concatena como cadena y el ejecutable de
 * Node (`C:\Program Files\nodejs\node.exe`) lleva un espacio en la ruta: el
 * paso de servir moría con "C:\Program no se reconoce como un comando". El
 * build sí terminaba, así que si había otro servidor escuchando en el puerto se
 * obtenían respuestas de un build viejo sin notarlo.
 */
const ejecutar = (cmd, cmdArgs, env, { shell = false } = {}) =>
  new Promise((resolve, reject) => {
    const hijo = spawn(cmd, cmdArgs, {
      stdio: "inherit",
      env: { ...process.env, ...env },
      shell,
    });
    hijo.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} salió con ${code}`)),
    );
    hijo.on("error", reject);
  });

try {
  console.log("→ Construyendo con preset node-server…");
  await ejecutar(
    npx,
    ["vite", "build"],
    { NITRO_PRESET: "node-server" },
    {
      shell: process.platform === "win32",
    },
  );

  console.log(`→ Sirviendo el build de producción en http://localhost:${puerto}/`);
  console.log("   Aviso: assets sin comprimir. No uses estas cifras como LCP de producción.");
  await ejecutar(process.execPath, [".output/server/index.mjs"], { PORT: puerto });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
