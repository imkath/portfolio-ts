import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Página About",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Foto de perfil",
    },
    {
      name: "title",
      type: "text",
      label: "Título de la página",
      defaultValue: "Sobre mí",
    },
    {
      name: "bio",
      type: "array",
      label: "Biografía",
      admin: {
        description: "Párrafos de la biografía",
      },
      fields: [
        {
          name: "paragraph",
          type: "textarea",
          required: true,
          label: "Párrafo",
        },
      ],
    },
    {
      name: "location",
      type: "group",
      label: "Ubicación",
      fields: [
        {
          name: "city",
          type: "text",
          label: "Ciudad",
          defaultValue: "Santiago",
        },
        {
          name: "country",
          type: "text",
          label: "País",
          defaultValue: "Chile",
        },
        {
          name: "availableForTravel",
          type: "checkbox",
          label: "Disponible para viajes internacionales",
          defaultValue: true,
        },
      ],
    },
    {
      name: "specialties",
      type: "array",
      label: "Especialidades",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Especialidad",
        },
      ],
    },
    // SEO
    {
      name: "seo",
      type: "group",
      label: "SEO",
      admin: {
        description: "Configuración para motores de búsqueda",
      },
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta título",
          defaultValue: "Sobre Mí - Tannia Silva | Maquilladora Profesional",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta descripción",
          defaultValue:
            "Maquilladora profesional con más de 10 años de experiencia en belleza editorial, comercial y cine.",
        },
      ],
    },
  ],
};
