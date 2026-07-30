# Portafolio — Francisco Berdezagar

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) con los proyectos
para el CV.

```
PORTFOLIO/
├── index.html          # Todo el contenido
├── css/styles.css      # Estilos + tema claro/oscuro
├── js/main.js          # Filtros, scroll-spy, animaciones, toggle de tema
├── assets/             # CV en PDF, capturas, imágenes
└── .nojekyll           # Evita que GitHub Pages procese el sitio con Jekyll
```

## Ver en local

Doble clic en `index.html`. Nada más — no hay build ni servidor.

## Qué falta completar

1. **LinkedIn** — en `index.html`, buscá `TU-USUARIO` y poné la URL real de tu perfil.
2. **CV en PDF** — guardá el archivo como `assets/cv.pdf` y descomentá el botón
   "Descargar CV" en la sección del hero (está marcado con un comentario).
3. **Links a repos** — las tarjetas de proyectos privados muestran "Repositorio privado".
   Cuando hagas público alguno, reemplazá ese `<span class="link link--muted">` por el
   `<a class="link">` que quedó comentado arriba, con la URL del repo.
4. **Números del hero** — los `data-count` de la sección `.hero__stats` (12 / 4 / 3) son
   una estimación: ajustalos a lo que quieras declarar.

## Publicar en GitHub Pages

```bash
cd "C:/Users/berde/Desktop/PORTFOLIO"
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/franberdezagar/portfolio.git
git push -u origin main
```

Antes del `push`, creá el repo `portfolio` **público** en
<https://github.com/new>.

Después, en el repo: **Settings → Pages → Build and deployment**

- Source: `Deploy from a branch`
- Branch: `main` · carpeta `/ (root)` → **Save**

En un par de minutos queda publicado en:

```
https://franberdezagar.github.io/portfolio/
```

Ese es el link que va en el CV.

### Actualizarlo después

```bash
git add .
git commit -m "Actualizo proyectos"
git push
```

Pages redespliega solo.

## Agregar un proyecto nuevo

Copiá un bloque `<article class="card">` completo en `index.html` y cambiá el contenido.
El atributo `data-cat` controla en qué filtros aparece; los valores válidos son
`fullstack`, `backend`, `frontend` y `security` (podés poner varios separados por espacio).
