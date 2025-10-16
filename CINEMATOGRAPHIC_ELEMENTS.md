# Elementos Cinematográficos y Editoriales Implementados

## 🎬 Efectos Visuales

### 1. **Film Grain Animado** (`app/globals.css`)

- **Qué es**: Textura de grano de película que se mueve sutilmente
- **Dónde verlo**: En todo el sitio, como overlay sobre el contenido
- **Efecto**: opacity: 0.08 (aumentado de 0.03) con animación de 8 segundos
- **Inspiración**: Look de fotografía analógica/editorial

### 2. **Transiciones de Página** (`app/providers.tsx`)

- **Qué es**: Fade + translate cuando cambias entre páginas
- **Dónde verlo**: Al navegar entre Home → Work → About → Contact
- **Efecto**:
  - Enter: opacity 0→1, translateY 8px→0 (0.2s)
  - Exit: opacity 1→0, translateY 0→-4px (0.12s)
- **Inspiración**: Motion editorial suave, no disruptivo

### 3. **Vignette en Hover** (`components/project-card.tsx`)

- **Qué es**: Oscurecimiento radial en los bordes de las imágenes
- **Dónde verlo**: Al hacer hover/focus sobre project cards
- **Efecto**: `radial-gradient(circle at center, transparent 40%, rgba(11, 11, 15, 0.4) 100%)`
- **Inspiración**: Lentes cinematográficos, dirección de mirada

### 4. **Scale Sutil en Cards** (`components/project-card.tsx`)

- **Qué es**: Zoom 1.02x en hover/focus
- **Dónde verlo**: Project cards al interactuar
- **Efecto**: `scale: 1.02` con easing `[0.25, 0.1, 0.25, 1]`
- **Inspiración**: Ken Burns effect, movimiento fotográfico

## 🎨 Diseño Editorial

### 5. **Tipografía Serif para Títulos** (`app/globals.css`)

- **Qué es**: Cormorant Garamond para h1-h6
- **Dónde verlo**: Todos los títulos principales
- **Efecto**: letter-spacing: -0.02em (tight tracking)
- **Inspiración**: Revistas editoriales como Vogue, Dazed

### 6. **Paleta de Color Monocromática** (`app/globals.css`)

- **Qué es**: Escala de grises con accent purple
- **Colores principales**:
  - `--bg: #0b0b0f` (casi negro)
  - `--text: #f1f1f1` (casi blanco)
  - `--accent: #6b5b95` (purple editorial)
- **Inspiración**: Alto contraste, minimalismo editorial

### 7. **Espaciado Generoso**

- **Qué es**: Padding y margin amplios, breathing room
- **Dónde verlo**: Toda la navegación, headers, sections
- **Inspiración**: Editorial de lujo, less is more

## 🎭 Micro-interacciones

### 8. **Reveal Animations** (`components/reveal.tsx`)

- **Qué es**: Fade in desde abajo al hacer scroll
- **Dónde verlo**: About page, badges, texto
- **Efecto**: IntersectionObserver con opacity + translateY
- **Inspiración**: Parallax editorial suave

### 9. **Stagger Effect** (`components/reveal.tsx`)

- **Qué es**: Animación escalonada de elementos
- **Dónde verlo**: Specialties badges en About
- **Efecto**: delay incremental (0.05s por item)
- **Inspiración**: Secuencias cinematográficas

### 10. **Navbar Active Indicator** (`components/navbar.tsx`)

- **Qué es**: Línea animada bajo link activo
- **Dónde verlo**: Navegación principal
- **Efecto**: `layoutId="navbar-indicator"` con shared layout animation
- **Inspiración**: Motion design editorial

### 11. **Filter Chips con Spring** (`components/filter-bar.tsx`)

- **Qué es**: Botones con animación tipo "resorte"
- **Dónde verlo**: Work page, filtros de categoría
- **Efecto**: `spring` con stiffness: 400, damping: 17
- **Inspiración**: Interacciones táctiles de lujo

### 12. **Caption Slide-up** (`components/project-card.tsx`)

- **Qué es**: Información que sube desde abajo en hover
- **Dónde verlo**: Project cards al hacer hover
- **Efecto**: translateY: 8px→0, opacity: 0→1
- **Inspiración**: Overlays de galerías editoriales

## 🎞️ Componentes Específicos

### 13. **HeroTriptych** (`components/HeroTriptych.tsx`)

- **Qué es**: Mosaico de 3 imágenes con crossfade cada 10s
- **Dónde verlo**: Homepage hero
- **Efecto**: Grid irregular (4/8/12 cols), AnimatePresence
- **Inspiración**: Layouts editoriales asymétricos

### 14. **Lightbox con Preloading** (`components/lightbox.tsx`)

- **Qué es**: Visor fullscreen con precarga de imágenes adyacentes
- **Dónde verlo**: Al hacer click en imágenes de galería
- **Efecto**: Backdrop blur, body scroll lock, keyboard nav
- **Inspiración**: Visualización profesional de portfolios

### 15. **Before/After con Slider** (`components/before-after-toggle.tsx`)

- **Qué es**: Comparación interactiva con handle
- **Dónde verlo**: Project details (si tiene beforeAfter)
- **Efecto**: clip-path reveal con drag/keyboard
- **Inspiración**: Tools editoriales de retoque

### 16. **Film Strip Horizontal** (`components/film-strip.tsx`)

- **Qué es**: Secuencia scrolleable horizontal con snap
- **Dónde verlo**: Project details (si tiene filmStrip)
- **Efecto**: scroll-snap-type: x mandatory
- **Inspiración**: Contact sheets de fotografía

### 17. **Masonry Grid con CSS Columns** (`components/masonry-grid.tsx`)

- **Qué es**: Layout tipo Pinterest sin JS
- **Dónde verlo**: Homepage featured, Work page
- **Efecto**: CSS columns con break-inside-avoid
- **Inspiración**: Grids editoriales de Tumblr/Pinterest

## 🎯 Accesibilidad Cinematográfica

### 18. **Focus States Visuales**

- **Qué es**: Outline con `--focus: #9aa7ff`
- **Dónde verlo**: Tab por cualquier elemento interactivo
- **Efecto**: 2px solid outline, offset 2px
- **Inspiración**: Navegación por teclado profesional

### 19. **prefers-reduced-motion**

- **Qué es**: Respeta preferencias de usuario
- **Dónde verlo**: Todas las animaciones
- **Efecto**: Desactiva grain, transitions, reveals
- **Inspiración**: Accesibilidad universal

### 20. **Screen Reader Announcements**

- **Qué es**: Mensajes ocultos para lectores de pantalla
- **Dónde verlo**: FilterBar, Lightbox, Gallery
- **Efecto**: aria-live regions con sr-only class
- **Inspiración**: Portfolio accesible para todos

## 🎬 Resumen Cinematográfico

**Lo que hace que esto se sienta "editorial/cinematográfico":**

1. **Paleta restringida**: Monocromático + 1 accent color
2. **Film grain animado**: Textura análoga constante
3. **Tipografía serif**: Headlines con personalidad
4. **Transiciones suaves**: Nunca bruscas, siempre con easing
5. **Espaciado generoso**: Breathing room entre elementos
6. **Hover states sutiles**: Scale, vignette, slide-up
7. **Layouts asimétricos**: HeroTriptych, masonry grid
8. **Motion con propósito**: Reveal on scroll, stagger effects
9. **Detalles fotográficos**: Before/after, film strip
10. **Sin sombras**: Solo borders 1px, muy flat y editorial

**Inspiración visual**: Vogue, Dazed Beauty, Another Magazine, i-D Magazine
