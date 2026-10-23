"""Sincroniza src/itinerarios.js con la selección fotográfica (imagen, alt y foco de cada parada; null = «Foto pendiente»).

Uso: py -3.12 -I site/scripts/sync-itinerarios-js.py  (desde site/; idempotente). Mantiene títulos, descripciones y estados; solo reescribe la cola
de cada p(...). La clave de imagen es <prefijo-del-tour>-<orden> (scripts/_fotos.py PREFIJO), la misma que genera prepare-itinerarios.py.
Vuelta a Oriente: esta pasada también quitó «Rionegro» y «Parada panorámica» (5 paradas); en ejecuciones posteriores no hace nada más.
"""
import re, json, sys
sys.path.insert(0, 'scripts')
import _fotos as F
sel = F.seleccion()
path = 'src/itinerarios.js'
lines = open(path, encoding='utf-8').read().split('\n')
out = []; cur = None
BS = chr(92)
tail_re = re.compile(r", ('[a-z-]+-\d\d'|null), (null|'(?:[^'" + BS + BS + r"]|" + BS + BS + r".)*')(, \{[^}]*\})?\),\s*$")
def js(s): return "'" + s.replace(BS, BS + BS).replace("'", BS + "'") + "'"
for ln in lines:
    m = re.match(r"  '([a-z0-9-]+)': \{ corto", ln)
    if m: cur = m.group(1)
    if cur == 'vuelta-a-oriente' and re.match(r"    p\((5, 'Historia que permanece'|7, 'Paisajes para recordar')", ln): continue
    if cur == 'vuelta-a-oriente' and ln.startswith("    p(6, 'Una dulce tradición'"): ln = ln.replace('p(6,', 'p(5,', 1)
    pm = re.match(r"    p\((\d+), ", ln)
    if cur and pm and cur in F.PREFIJO:
        n = int(pm.group(1)); par = next(p for p in sel[cur]['paradas'] if p['orden'] == n)
        t = tail_re.search(ln); assert t, ln[:80]
        extra = t.group(3) or ''
        if par['id']:
            key = f"{F.PREFIJO[cur]}-{n:02d}"
            if extra:
                if "foco:" in extra: extra = re.sub(r"foco: '[^']*'", f"foco: '{par['foco']}'", extra)
                else: extra = extra[:-2] + f", foco: '{par['foco']}' }}"
            else: extra = f", {{ foco: '{par['foco']}' }}"
            tail = f", '{key}', {js(par['alt'])}{extra}),"
        else:
            tail = f", null, null{extra}),"
        ln = ln[:t.start()] + tail
    out.append(ln)
open(path, 'w', encoding='utf-8').write('\n'.join(out))
