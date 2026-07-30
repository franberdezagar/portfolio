# Portafolio

Sitio personal con mis proyectos. HTML, CSS y JavaScript, sin dependencias ni
build: se sirve tal cual está.

**En vivo:** <https://franberdezagar.github.io/portfolio/>

## Estructura

```
├── index.html      # Contenido
├── css/styles.css  # Estilos y temas
├── js/main.js      # Filtros, scroll-spy y animaciones
└── assets/         # Imágenes y CV
```

## Desarrollo

Abrir `index.html` en el navegador. No hay build ni servidor.

## Detalles

- Tema claro/oscuro, con la preferencia del sistema como valor inicial y la
  elección del usuario persistida en `localStorage`.
- Filtrado de proyectos por categoría vía el atributo `data-cat` de cada tarjeta
  (`fullstack`, `backend`, `frontend`, `security`).
- Animaciones de entrada y navegación activa con `IntersectionObserver`.
- Respeta `prefers-reduced-motion` e incluye estilos de impresión.

## Deploy

GitHub Pages desde la rama `main`. Cada push a `main` redespliega el sitio.
