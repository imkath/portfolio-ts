# Guía de Elementos Vintage & Cinematográficos

## 🎞️ Esencia del Diseño

Este portafolio combina la sofisticación editorial moderna con la estética vintage de Hollywood clásico, American Horror Story, y Universal Monsters. Cada elemento está diseñado para evocar nostalgia cinematográfica mientras mantiene funcionalidad contemporánea.

---

## 🌟 Elementos Vintage Implementados

### 1. **Film Grain Texture**

```css
/* Grano de película analógica */
baseFrequency: 0.25
numOctaves: 1
opacity: 0.05-0.06
```

- **Inspiración**: Kodak Tri-X, Ilford HP5
- **Efecto**: Textura orgánica que recuerda películas en blanco y negro
- **Ubicación**: Background global con capa animada

### 2. **Vignette Effect** ✨ NUEVO

```css
radial-gradient(
  ellipse at center,
  transparent 0%,
  rgba(0,0,0,0.15) 85%,
  rgba(0,0,0,0.35) 100%
)
```

- **Inspiración**: Lentes vintage, film noir
- **Efecto**: Oscurecimiento sutil en bordes de pantalla
- **Propósito**: Dirige atención al centro, look cinematográfico

### 3. **Chromatic Aberration** ✨ NUEVO

```css
text-shadow: -1px 0 rgba(255, 0, 0, 0.1), 1px 0 rgba(0, 255, 255, 0.1);
```

- **Inspiración**: Aberración de lentes antiguos
- **Efecto**: Separación RGB sutil en hovers
- **Uso**: Estados interactivos, elementos destacados

### 4. **Ornamental Dividers** ✨ NUEVO

```html
<div class="ornament-divider">
  <span>◆</span>
</div>
```

- **Inspiración**: Separadores editoriales clásicos, manuscritos art déco
- **Efecto**: Línea horizontal con diamante central
- **Uso**: Secciones importantes, transiciones de contenido

### 5. **Title Cards Vintage** ✨ NUEVO

```tsx
<VintageTitle withOrnament subtitle="...">
  Contact
</VintageTitle>
```

- **Inspiración**: Intertítulos de cine mudo, créditos clásicos
- **Tipografía**: Serif, uppercase, tracking amplio (0.15em)
- **Animación**: Fade + scale con ornamentos arriba/abajo

### 6. **Photo Vintage Effect** ✨ NUEVO

```css
.photo-vintage {
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

- **Inspiración**: Fotografías Polaroid envejecidas
- **Efecto**: Bordes oscurecidos, velo atmosférico
- **Uso**: Imágenes de proyectos, retratos

### 7. **Film Strip Perforations** ✨ NUEVO

```css
.film-strip::before,
.film-strip::after {
  background: repeating-linear-gradient(
    0deg,
    var(--surface) 0px,
    var(--surface) 4px,
    var(--line) 4px,
    var(--line) 8px
  );
}
```

- **Inspiración**: Perforaciones de película 35mm
- **Efecto**: Patrón lateral que evoca film real
- **Uso**: Opcional en galerías, secciones destacadas

---

## 🎭 Elementos Gothic & AHS

### 8. **Glitch Hover Effect** ✨ NUEVO

```css
@keyframes glitch-anim {
  /* Multi-directional displacement */
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
}
```

- **Inspiración**: American Horror Story opening titles
- **Efecto**: Distorsión rápida y perturbadora
- **Uso**: `.glitch-hover` en project cards

### 9. **Theatrical Spotlight** ✨ NUEVO

```css
.spotlight::before {
  background: radial-gradient(
    ellipse at top,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 70%
  );
}
```

- **Inspiración**: Iluminación teatral dramática
- **Efecto**: "Luz" sutil desde arriba
- **Uso**: Retratos, secciones hero

### 10. **Curtain Wipe Transitions** ✨ NUEVO

```tsx
<PageTransition>{children}</PageTransition>
```

- **Inspiración**: Transiciones de cine mudo, Kurosawa
- **Efecto**: Cortinilla que barre de izquierda a derecha
- **Timing**: 0.6-0.8s con easing cinematográfico

---

## 📝 Elementos Tipográficos

### 11. **Typewriter Effect** ✨ NUEVO

```css
.typewriter {
  animation: typewriter 2s steps(40, end), blink-caret 0.75s step-end infinite;
}
```

- **Inspiración**: Máquinas de escribir vintage
- **Efecto**: Texto que aparece letra por letra
- **Uso**: Títulos especiales, mensajes destacados

### 12. **Film Credits Component** ✨ NUEVO

```tsx
<FilmCredits
  credits={[
    { role: "Makeup Artist", name: "Tannia Silva" },
    { role: "Photographer", name: "..." },
  ]}
/>
```

- **Inspiración**: Créditos finales de películas clásicas
- **Layout**: Grid con roles y nombres
- **Animación**: Stagger slide-in desde izquierda

---

## 🎨 Mejoras a Componentes Existentes

### Project Cards

**Antes:**

- Scale 1.02 en hover
- Vignette básico

**Ahora:**

- Scale 1.05 (más dramático)
- `.photo-vintage` bordes envejecidos
- Chromatic aberration overlay
- Enhanced contrast + brightness
- `.glitch-hover` en el link

### About Page

**Antes:**

- H1 simple

**Ahora:**

- `<VintageTitle withOrnament>` con ornamentos
- `.photo-vintage.spotlight` en retrato
- Timing stagger mejorado

### Contact Page

**Antes:**

- Título directo

**Ahora:**

- `<VintageTitle>` con subtitle
- Ornamentos decorativos

### Navbar

**Antes:**

- Border simple

**Ahora:**

- Film strip decoration en top
- Gradient sutil que evoca película

### Footer

**Antes:**

- Separador básico

**Ahora:**

- `.ornament-divider` con diamante
- Film strip line en top
- Tipografía serif para copyright

---

## 🎬 Referencias Visuales

### Películas

- **Universal Monsters** (1930s-50s): Iluminación dramática, vignettes
- **Film Noir** (The Third Man): Alto contraste, sombras profundas
- **Ari Aster** (Hereditary, Midsommar): Atmósfera inquietante pero bella
- **A24** (The Witch, The Lighthouse): Texturas vintage, grain pesado
- **Kurosawa**: Wipe transitions icónicas

### Series

- **American Horror Story**: Glitch effects, tipografía gothic
- **True Detective**: Oscuridad atmosférica
- **Hannibal**: Sofisticación editorial macabra

### Fotografía

- **Diane Arbus**: Sujetos no convencionales
- **Irving Penn**: Elegancia de estudio
- **Helmut Newton**: Drama de alto contraste
- **Film stocks**: Kodak Tri-X, Ilford HP5

---

## 💡 Cómo Usar los Nuevos Componentes

### VintageTitle

```tsx
import { VintageTitle } from "@/components/vintage-title";

<VintageTitle withOrnament subtitle="Optional subtitle">
  Your Title
</VintageTitle>;
```

### FilmCredits

```tsx
import { FilmCredits } from "@/components/film-credit";

<FilmCredits
  title="Credits"
  credits={[
    { role: "Makeup Artist", name: "Tannia Silva" },
    { role: "Photographer", name: "Jane Doe" },
  ]}
/>;
```

### Utility Classes

```html
<!-- Vintage photo effect -->
<div class="photo-vintage">
  <img src="..." />
</div>

<!-- Spotlight -->
<section class="spotlight">...</section>

<!-- Glitch hover -->
<a class="glitch-hover"> ... </a>

<!-- Ornamental divider -->
<div class="ornament-divider">
  <span>◆</span>
</div>

<!-- Title card typography -->
<h1 class="title-card">Classic Title</h1>
```

---

## ⚡ Performance & Accesibilidad

### Optimizaciones

- Film grain: SVG puro (no canvas overhead)
- Vignette: Fixed overlay (GPU compositor)
- Animaciones: Framer Motion con `will-change` implícito
- Reduced motion respetado globalmente

### Accesibilidad

- Contraste WCAG AA mantenido con vignette
- Film grain no interfiere con legibilidad
- Animaciones desactivables con `prefers-reduced-motion`
- Ornamentos son decorativos (aria-hidden implícito)

---

## 🔮 Ideas Futuras

### Posibles Adiciones

1. **Scratches overlay**: Líneas verticales de daño de película
2. **Light leaks**: Color overlays estilo lomography
3. **Dust particles**: SVG animado para autenticidad
4. **Aperture wipe**: Transición circular tipo iris
5. **Film countdown**: Loading screen estilo "3...2...1..."
6. **Edge burn**: Halation effect de película overexposed

---

**Última actualización**: Octubre 2025  
**Elementos vintage totales**: 20+  
**Inspiración principal**: Hollywood clásico + AHS + A24 + Editorial de lujo
