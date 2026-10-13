"""Genera la escalera de anchos de TODAS las imagenes locales del sitio y el
manifiesto de medidas que usa `src/lib/img.ts` (UX-39, 09_spec_rendimiento §11).

Por que: hasta ahora cada `<img>` local descargaba el unico archivo que
existia, fuera cual fuera el tamano en pantalla. Una tarjeta de 400 px
bajaba un WebP de 1600x2133 y 900 KB. Con la escalera el navegador elige,
via `srcset`/`sizes`, el archivo mas pequeno que cubre el hueco a la
densidad de su pantalla: maxima nitidez donde la foto la tiene, y sin
descargar de mas donde no hace falta.

Que hace:
  1. Recorre public/img/** (webp/jpg/png; se salta public/img/_w).
  2. Para cada imagen, escribe public/img/_w/{400,800,1200}/<misma ruta>.webp
     SOLO para los anchos MENORES que el ancho real (nunca se escala hacia
     arriba: eso es justo lo que emborrona). Salta las que ya existen y estan
     al dia (mtime).
  3. Escribe src/data/imagenes.gen.ts con {ruta: [ancho, alto]} de cada
     original, para que `img.ts` sepa que peldanos existen y para que los
     componentes puedan reservar el alto exacto.

Uso: python scripts/generar_escalera.py
Hay que volver a correrlo cada vez que se anada o cambie una foto.
"""

from __future__ import annotations

import io
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "img"
DST = PUB_IMG / "_w"
MANIFIESTO = ROOT / "src" / "data" / "imagenes.gen.ts"

ANCHOS = (400, 800, 1200)
CALIDAD = {400: 78, 800: 78, 1200: 80}
EXTS = {".webp", ".jpg", ".jpeg", ".png"}


def main() -> None:
    medidas: dict[str, tuple[int, int]] = {}
    generadas = 0
    for src in sorted(PUB_IMG.rglob("*")):
        if src.suffix.lower() not in EXTS or DST in src.parents:
            continue
        rel = src.relative_to(PUB_IMG).as_posix()
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            w, h = im.size
            medidas[f"/img/{rel}"] = (w, h)
            for ancho in ANCHOS:
                if ancho >= w:
                    continue
                out = DST / str(ancho) / Path(rel).with_suffix(".webp")
                if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
                    continue
                out.parent.mkdir(parents=True, exist_ok=True)
                factor = ancho / w
                chica = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB").resize(
                    (ancho, round(h * factor)), Image.LANCZOS
                )
                chica.save(out, "WEBP", quality=CALIDAD[ancho], method=6)
                generadas += 1

    lineas = [
        "/* GENERADO por scripts/generar_escalera.py — no editar a mano.",
        " * Medidas reales [ancho, alto] de cada imagen de public/img/, y con ellas",
        " * `src/lib/img.ts` sabe qué peldaños de la escalera (_w/400, _w/800,",
        " * _w/1200) existen para cada una. */",
        "export const MEDIDAS: Record<string, readonly [number, number]> = {",
    ]
    for ruta, (w, h) in sorted(medidas.items()):
        lineas.append(f'  "{ruta}": [{w}, {h}],')
    lineas.append("};")
    lineas.append("")
    lineas.append(f"export const ESCALERA_LOCAL = {json.dumps(list(ANCHOS))} as const;")
    lineas.append("")
    io.open(MANIFIESTO, "w", encoding="utf-8", newline="\n").write("\n".join(lineas))
    print(f"{len(medidas)} imágenes en el manifiesto, {generadas} variantes nuevas")


if __name__ == "__main__":
    main()
