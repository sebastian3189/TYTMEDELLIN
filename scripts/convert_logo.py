"""Genera el logotipo del sitio y los iconos de pestaña a partir de
`TYTLOGO.jpeg` (hermano del repo, 500x500, fondo naranja).

Salidas:
- public/img/logo/tyt-logo-96.webp   -> marca de cabecera y pie (44-48 px CSS,
                                        x2 para pantallas densas)
- public/logo.png (512)              -> `logo` del JSON-LD de la organizacion
- public/favicon.ico (16/32/48)      -> pestana del navegador (todos)
- public/favicon-32.png              -> pestana, navegadores modernos
- public/apple-touch-icon.png (180)  -> icono al anadir a inicio en iPhone
- public/icon-192.png / icon-512.png -> Android / manifest

Uso: python scripts/convert_logo.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "TYTLOGO.jpeg"
PUB = ROOT / "tnt-medellin-connect" / "public"


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    assert im.width == im.height, "el logo debe ser cuadrado"

    (PUB / "img" / "logo").mkdir(parents=True, exist_ok=True)
    im.resize((96, 96), Image.LANCZOS).save(PUB / "img" / "logo" / "tyt-logo-96.webp", "WEBP", quality=90)
    im.resize((512, 512), Image.LANCZOS).save(PUB / "logo.png", "PNG", optimize=True)

    im.resize((32, 32), Image.LANCZOS).save(PUB / "favicon-32.png", "PNG", optimize=True)
    im.resize((180, 180), Image.LANCZOS).save(PUB / "apple-touch-icon.png", "PNG", optimize=True)
    im.resize((192, 192), Image.LANCZOS).save(PUB / "icon-192.png", "PNG", optimize=True)
    im.resize((512, 512), Image.LANCZOS).save(PUB / "icon-512.png", "PNG", optimize=True)
    # ICO con varios tamanos dentro: el navegador elige el que le cuadre.
    im.save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("ok")


if __name__ == "__main__":
    main()
