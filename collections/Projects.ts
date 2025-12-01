import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categories", "featured", "status", "updatedAt"],
    listSearchableFields: ["title", "clientOrPublication", "aboutLook"],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Información básica
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL amigable del proyecto",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Borrador", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Destacado",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Mostrar en la página principal",
      },
    },

    // Detalles del proyecto
    {
      type: "row",
      fields: [
        {
          name: "clientOrPublication",
          type: "text",
          label: "Cliente / Publicación",
          admin: {
            width: "50%",
          },
        },
        {
          name: "year",
          type: "number",
          label: "Año",
          min: 2000,
          max: 2100,
          admin: {
            width: "25%",
          },
        },
        {
          name: "country",
          type: "text",
          label: "País",
          admin: {
            width: "25%",
          },
        },
      ],
    },

    // Categorías
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true,
      label: "Categorías",
      admin: {
        description: "Selecciona una o más categorías",
      },
    },

    // Imágenes principales
    {
      name: "images",
      type: "array",
      label: "Imágenes",
      required: true,
      minRows: 1,
      admin: {
        description: "Galería principal del proyecto",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },

    // Créditos
    {
      name: "credits",
      type: "array",
      label: "Créditos",
      admin: {
        description: "Equipo que participó en el proyecto",
      },
      fields: [
        {
          name: "role",
          type: "select",
          required: true,
          label: "Rol",
          options: [
            { label: "Fotografía", value: "photography" },
            { label: "Cabello", value: "hair" },
            { label: "Styling", value: "styling" },
            { label: "Dirección de Arte", value: "art" },
            { label: "Modelo", value: "model" },
            { label: "Producción", value: "production" },
            { label: "Director", value: "director" },
            { label: "Director de Fotografía", value: "dop" },
            { label: "Marca", value: "brand" },
            { label: "Publicación", value: "publication" },
          ],
        },
        {
          name: "name",
          type: "text",
          required: true,
          label: "Nombre",
        },
      ],
    },

    // Contenido adicional
    {
      name: "aboutLook",
      type: "textarea",
      label: "Sobre este look",
      admin: {
        description: "Descripción del concepto y técnicas utilizadas",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      label: "URL del video",
      admin: {
        description: "Enlace a video de YouTube o Vimeo (opcional)",
      },
    },

    // Before/After
    {
      name: "beforeAfter",
      type: "array",
      label: "Antes y Después",
      admin: {
        description: "Comparaciones de transformación (opcional)",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "before",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Antes",
              admin: {
                width: "50%",
              },
            },
            {
              name: "after",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Después",
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },

    // Film Strip
    {
      name: "filmStrip",
      type: "array",
      label: "Film Strip",
      admin: {
        description: "Secuencia de imágenes tipo película (opcional, mínimo 3)",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
