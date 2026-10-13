"""Sorteo de las fotos de /valores y /historia, pedido explícito del cliente
("cambia todas las fotos... de forma aleatoria con las que tenemos en
formato webp"). No hay conversión aquí: las 30 candidatas ya son WebP reales
del propio catálogo (las mismas que usa `galeriaSedes` en la portada).

El sorteo se restringe a los archivos con ANCHO REAL >= 800 px: por debajo de
eso, una banda a página completa o a media columna grande los estira y se
ven borrosos (el mismo problema, ya resuelto una vez, de HERO_HOME con fotos
de teléfono de baja resolución). Los descartados de `galeriaSedes` son
justamente los pensados para la miniatura pequeña de esa tira: bora-bora
(660px), city-tour-plaza-bolivar (576px), 3-islas-oceanario-3 (402px),
pao-pao-4 (346px) y city-tour-cartagena-1 (308px).

Este script es el registro del sorteo, no algo para volver a correr sin
más: si se ejecuta de nuevo da OTRO resultado (es aleatorio a propósito). Se
deja aquí para que el resultado quede auditable y se pueda repetir el
proceso —no el resultado— si el cliente pide otra tanda.

Resultado usado (2026-09-19), primera tanda (todas las fotos de ambas
páginas):

    HERO_HISTORIA   -> /img/bogota/traslado-eldorado-llegada-card-1600.webp
    HERO_VALORES    -> /img/cartagena/oceanario-delfines-1536.webp
    hitos[2020]     -> /img/bogota/sabana-alpina-cabana-1600.webp
    hitos[2021]     -> /img/cartagena/chiva-rumbera-3-1037.webp
    hitos[2022]     -> /img/eje-cafetero/cocora-grupo-ruana-palmas-1600.webp
    hitos[2023]     -> /img/eje-cafetero/filandia-catedral-grupo-1600.webp
    hitos[2024]     -> /img/bogota/noche-bogota-torre-colpatria-1600.webp
    hitos[2026]     -> /img/medellin/tour-miradores-826.webp
    IMG_MANIFIESTO  -> /img/medellin/guatape-zocalos-balcones-1600.webp
    IMG_COMPROMISO  -> /img/eje-cafetero/mirador-mano-corazon-1600.webp

`fundadorQuote.photo` (retrato del fundador en /historia) NO entró en el
sorteo: es la foto de una persona concreta, no una foto de paisaje/viaje
intercambiable, y no hay ninguna foto real suya en el catálogo todavía. Sigue
como placeholder de Unsplash hasta que el cliente entregue una foto real.

Segunda tanda (2026-09-19), solo las dos cabeceras, pedida aparte porque el
cliente quería que "se vean perfectas para este formato". Se sortearon de
nuevo excluyendo las fotos ya protagonistas en otra página del sitio
(`comuna13-parce-medellin-grupo-1600`, `tour-de-compras-1120`) y las dos
elegidas en la primera tanda. Las dos primeras que salieron
(`jaime-duque-taj-mahal-grupo-card-1600`, `chiva-rumbera-3-1037`) se
verificaron en vivo y se descartaron por mal recorte (una dejaba la cara
fuera de cuadro, la otra recortaba la luna que era el punto fuerte de la
foto); se volvió a sortear hasta dar con estas dos:

    HERO_HISTORIA -> /img/bogota/sabana-casa-al-reves-card-1600.webp
    HERO_VALORES  -> /img/eje-cafetero/parque-del-cafe-krater-grupo-card-1600.webp

Uso: python scripts/random_valores_historia.py
"""

import random

# Ancho real >= 800 px únicamente (ver nota de arriba).
SAFE_POOL = [
    "/img/medellin/tour-miradores-826.webp",
    "/img/eje-cafetero/cocora-grupo-ruana-palmas-1600.webp",
    "/img/medellin/guatape-piedra-mirador-poncho-1600.webp",
    "/img/cartagena/atardecer-840.webp",
    "/img/bogota/minas-sal-nave-cruz-1600.webp",
    "/img/eje-cafetero/termales-piscina-noche-amigos-1600.webp",
    "/img/medellin/tour-de-compras-1120.webp",
    "/img/bogota/jaime-duque-taj-mahal-grupo-card-1600.webp",
    "/img/eje-cafetero/parque-del-cafe-krater-grupo-card-1600.webp",
    "/img/medellin/salto-del-buey-cascada-1600.webp",
    "/img/bogota/sabana-casa-al-reves-card-1600.webp",
    "/img/eje-cafetero/mirador-estoy-en-filandia-card-1600.webp",
    "/img/medellin/comuna13-parce-medellin-grupo-1600.webp",
    "/img/cartagena/oceanario-delfines-1536.webp",
    "/img/eje-cafetero/parque-del-cafe-letrero-grupo-1600.webp",
    "/img/bogota/noche-bogota-torre-colpatria-1600.webp",
    "/img/medellin/comuna13-escaleras-electricas-grupo-1600.webp",
    "/img/cartagena/beach-club-camas-1434.webp",
    "/img/bogota/traslado-eldorado-llegada-card-1600.webp",
    "/img/eje-cafetero/filandia-catedral-grupo-1600.webp",
    "/img/medellin/noche-medellin-bandera-mirador-1600.webp",
    "/img/eje-cafetero/mirador-mano-corazon-1600.webp",
    "/img/bogota/sabana-velero-guatavita-1600.webp",
    "/img/medellin/oriente-la-ceja-letras-1600.webp",
    "/img/cartagena/chiva-rumbera-3-1037.webp",
    "/img/eje-cafetero/cocora-valle-grupo-completo-1600.webp",
    "/img/bogota/sabana-alpina-cabana-1600.webp",
    "/img/medellin/guatape-zocalos-balcones-1600.webp",
    "/img/eje-cafetero/cocora-cabalgata-1600.webp",
    "/img/medellin/guatape-embalse-mirador-pareja-1600.webp",
]

# Subconjunto apaisado (ratio >= 1.3), para las dos cabeceras a sangre
# completa: ahí object-cover recorta mucho verticalmente y un retrato
# perdería la escena por completo (mismo criterio que HERO_HOME).
HERO_POOL = [
    "/img/medellin/tour-miradores-826.webp",
    "/img/cartagena/atardecer-840.webp",
    "/img/medellin/tour-de-compras-1120.webp",
    "/img/bogota/jaime-duque-taj-mahal-grupo-card-1600.webp",
    "/img/eje-cafetero/parque-del-cafe-krater-grupo-card-1600.webp",
    "/img/bogota/sabana-casa-al-reves-card-1600.webp",
    "/img/eje-cafetero/mirador-estoy-en-filandia-card-1600.webp",
    "/img/medellin/comuna13-parce-medellin-grupo-1600.webp",
    "/img/cartagena/oceanario-delfines-1536.webp",
    "/img/cartagena/beach-club-camas-1434.webp",
    "/img/bogota/traslado-eldorado-llegada-card-1600.webp",
    "/img/cartagena/chiva-rumbera-3-1037.webp",
]


def main() -> None:
    heroes = random.sample(HERO_POOL, 2)
    print("HERO_HISTORIA ->", heroes[0])
    print("HERO_VALORES  ->", heroes[1])

    resto_pool = [f for f in SAFE_POOL if f not in heroes]
    resto = random.sample(resto_pool, 8)
    etiquetas = [
        "hito_2020",
        "hito_2021",
        "hito_2022",
        "hito_2023",
        "hito_2024",
        "hito_2026",
        "IMG_MANIFIESTO",
        "IMG_COMPROMISO",
    ]
    random.shuffle(resto)
    for etiqueta, archivo in zip(etiquetas, resto):
        print(f"{etiqueta:16} -> {archivo}")


if __name__ == "__main__":
    main()
