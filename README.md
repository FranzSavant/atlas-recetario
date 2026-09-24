# Recetario

Las recetas de casa, todas escritas **para cuatro**. Cambiá las porciones en la ficha y las cantidades se recalculan solas.

## Qué es esto

Un sitio **generado**. La fuente de verdad es el vault de Atlas (notas Markdown con `subtipo: receta`); este repositorio es la vista pública que se publica.

Nadie edita el HTML a mano: se edita la nota y se vuelve a generar.

```
nota del vault  →  ATLAS/scripts/build-recetario.py  →  recetario/  →  este repo
```

## La regla de las cuatro porciones

Toda receta se escribe para **4 porciones**. Con esa base común, escalar es multiplicar (`comensales ÷ 4`) y no una regla de tres distinta por receta.

Dos cosas que se respetan siempre:

1. **La receta original no se reescribe.** El bloque *Receta original* de cada nota conserva lo que dijo el autor, con su transcripción intacta.
2. **Lo que no escala linealmente, se avisa.** El huevo para empanar, la sal, las especias fuertes: se ajustan a mano y se explica en la nota del ingrediente.

## Créditos

Cada ficha lleva su autor y el link a la publicación original. Estas son **adaptaciones** (cantidades reescritas para cuatro); las transcripciones literales de los videos no se publican acá, viven en el vault privado.

Recetas de, hasta ahora: **Boca Mía** · **Beatriz Contreras** · **Qistoh** · **Delishus** · **Cook's Illustrated** · **Guiartemx**.

## Cómo correrlo local

Es estático: abrí `index.html` en el navegador. No hay build ni dependencias.

## Publicar una actualización

Desde el vault:

```bash
python ATLAS/scripts/build-recetario.py      # regenera el sitio
bash   ATLAS/scripts/publicar-recetario.sh   # lo sube
```

## Licencia

El código y el diseño de este sitio son libres de usar. Las recetas pertenecen a sus autores, citados en cada ficha.
