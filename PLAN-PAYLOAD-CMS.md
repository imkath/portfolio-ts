# Plan de Implementación: Payload CMS

## Resumen
Integrar Payload CMS 3.0 en el proyecto Next.js existente como monorepo, con PostgreSQL (Neon) y Cloudinary para imágenes. UI del admin personalizada con el tema editorial oscuro del sitio.

---

## 1. Dependencias a Instalar

```bash
# Payload CMS core
npm install payload @payloadcms/next @payloadcms/richtext-lexical

# Database adapter (PostgreSQL)
npm install @payloadcms/db-postgres

# Storage adapter (Cloudinary)
npm install @payloadcms/plugin-cloud-storage cloudinary

# Utilidades
npm install sharp graphql
```

---

## 2. Estructura de Archivos Nuevos

```
tannia-silva-portfolio/
├── payload.config.ts              # Configuración principal de Payload
├── app/
│   └── (payload)/                 # Grupo de rutas para admin
│       └── admin/
│           └── [[...segments]]/
│               └── page.tsx       # Admin UI de Payload
│               └── not-found.tsx
├── collections/                   # Definiciones de collections
│   ├── Projects.ts               # Proyectos (reemplaza JSON)
│   ├── Media.ts                  # Imágenes con Cloudinary
│   ├── Categories.ts             # Categorías (beauty, editorial, etc.)
│   ├── Credits.ts                # Créditos/colaboradores
│   └── Users.ts                  # Usuarios admin
├── globals/                      # Contenido global (singletons)
│   ├── SiteSettings.ts           # Configuración del sitio
│   ├── AboutPage.ts              # Contenido página About
│   └── ContactInfo.ts            # Info de contacto, redes sociales
├── components/
│   └── payload/                  # Componentes custom para admin UI
│       ├── Logo.tsx              # Logo en admin
│       ├── Icon.tsx              # Favicon admin
│       └── providers.tsx         # Theme provider para admin
├── lib/
│   └── payload.ts                # Cliente de Payload para queries
└── .env.local                    # Variables de entorno
```

---

## 3. Collections (Schemas)

### 3.1 Projects Collection
```typescript
// Campos basados en src/types/index.ts
{
  slug: string (auto-generado desde title)
  title: string
  clientOrPublication: string (opcional)
  year: number (opcional)
  country: string (opcional)
  categories: relationship → Categories (hasMany)
  images: array de Media con campos extra (focus, alt)
  credits: array de { role: select, name: string }
  videoUrl: string (opcional)
  featured: boolean
  beforeAfter: array de { before: Media, after: Media }
  filmStrip: array de Media
  aboutLook: richText o textarea
  status: draft | published
  publishedAt: date
}
```

### 3.2 Media Collection
```typescript
{
  // Campos automáticos de Payload
  filename, mimeType, filesize, width, height, url

  // Campos custom
  alt: string (requerido)
  focus: select (eyes | lips | skin | fx | complexion)
  cloudinaryPublicId: string (auto)
}
```

### 3.3 Categories Collection
```typescript
{
  name: string
  slug: string (auto)
  // beauty, editorial, commercial, film, grooming, bridal, sfx
}
```

### 3.4 Globals

**SiteSettings:**
- siteName, siteDescription, defaultOgImage

**AboutPage:**
- profileImage, bio (richText), location, availableForTravel, specialties[]

**ContactInfo:**
- email, instagram, behance, otherSocialLinks[], privacyNotice

---

## 4. Migración de Datos

1. Crear script `scripts/migrate-to-payload.ts`
2. Leer JSON existentes de `content/projects/`
3. Subir imágenes a Cloudinary
4. Crear documentos en Payload via API
5. Eliminar carpeta `content/` después de verificar

---

## 5. Actualización del Frontend

### 5.1 Nuevo archivo: `lib/payload.ts`
```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'

// Funciones que reemplazan src/lib/projects.ts
export async function getProjects()
export async function getProjectBySlug(slug: string)
export async function getFeaturedProjects()
export async function getAboutContent()
export async function getContactInfo()
export async function getSiteSettings()
```

### 5.2 Páginas a Actualizar
- `app/page.tsx` - Usar getPayload() para proyectos destacados
- `app/work/page.tsx` - Usar getPayload() para lista de proyectos
- `app/work/[slug]/page.tsx` - Usar getPayload() para proyecto individual
- `app/about/page.tsx` - Usar AboutPage global
- `app/contact/page.tsx` - Usar ContactInfo global
- `components/footer.tsx` - Usar ContactInfo global

---

## 6. Personalización del Admin UI

### 6.1 Tema Oscuro Editorial
Crear CSS custom en `app/(payload)/admin/custom.css`:
```css
:root {
  --theme-bg: #0b0b0f;
  --theme-elevation-0: #121219;
  --theme-elevation-50: #1a1a24;
  --theme-text: #f1f1f1;
  --theme-text-dim: #c9c9d1;
  --theme-success: #6b5b95;
  /* ... mapear variables del sitio */
}
```

### 6.2 Componentes Custom
- `Logo.tsx` - Logo "T|S" animado como en el navbar
- `Icon.tsx` - Favicon con iniciales
- Dashboard con preview de proyectos recientes

---

## 7. Variables de Entorno Necesarias

```env
# Database (Neon)
DATABASE_URI=postgresql://...@ep-xxx.neon.tech/neondb

# Payload
PAYLOAD_SECRET=tu-secret-de-32-caracteres-minimo

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## 8. Orden de Implementación

### Fase 1: Setup Base
1. Instalar dependencias
2. Crear `payload.config.ts` básico
3. Crear collection Users (requerida)
4. Configurar rutas admin en `app/(payload)/`
5. Verificar que admin carga

### Fase 2: Collections
6. Crear Media collection + Cloudinary adapter
7. Crear Categories collection + seed inicial
8. Crear Projects collection completa
9. Crear Globals (SiteSettings, AboutPage, ContactInfo)

### Fase 3: Migración
10. Script de migración de JSON → Payload
11. Subir imágenes existentes a Cloudinary
12. Verificar datos en admin

### Fase 4: Frontend
13. Crear `lib/payload.ts` con queries
14. Actualizar páginas para usar Payload
15. Eliminar `content/` y `src/lib/projects.ts`

### Fase 5: UI Admin
16. Aplicar tema oscuro al admin
17. Crear componentes Logo/Icon
18. Ajustes finales de UX

### Fase 6: Testing & Deploy
19. Probar CRUD completo
20. Verificar build
21. Configurar Neon en producción
22. Deploy a Vercel

---

## 9. Notas Técnicas

- **Payload 3.0** usa Next.js App Router nativamente
- El admin se monta en `/admin` como ruta de Next.js
- No hay servidor separado - todo en un monorepo
- Las queries usan `getPayload()` server-side
- Cloudinary maneja optimización de imágenes automáticamente
- Neon tiene hibernación en free tier (delay inicial ~500ms)

---

## 10. Archivos a Eliminar Después

- `content/projects/*.json` (6 archivos)
- `src/lib/projects.ts` (reemplazado por lib/payload.ts)
- Imports de JSON en componentes
