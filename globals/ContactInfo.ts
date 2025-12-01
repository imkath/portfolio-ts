import type { GlobalConfig } from "payload";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  label: "Información de Contacto",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email de contacto",
      defaultValue: "hello@tanniasilva.com",
    },
    {
      name: "location",
      type: "text",
      label: "Ubicación",
      defaultValue: "Santiago, Chile",
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Redes Sociales",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          label: "Plataforma",
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Behance", value: "behance" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "TikTok", value: "tiktok" },
            { label: "YouTube", value: "youtube" },
            { label: "Otro", value: "other" },
          ],
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Etiqueta",
          admin: {
            description: "Texto que se muestra (ej: @bodyssnatchers)",
          },
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL",
        },
      ],
    },
    {
      name: "contactFormEnabled",
      type: "checkbox",
      label: "Formulario de contacto habilitado",
      defaultValue: true,
    },
    {
      name: "contactSubtitle",
      type: "text",
      label: "Subtítulo de la página de contacto",
      defaultValue: "Disponible para proyectos editoriales, comerciales y de cine",
    },
    {
      name: "privacyNotice",
      type: "textarea",
      label: "Aviso de privacidad",
      defaultValue:
        "Tu información se usa únicamente para responder a tu consulta. No se comparte con terceros.",
    },
    // SEO
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta título",
          defaultValue: "Contacto - Tannia Silva",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta descripción",
          defaultValue:
            "Contacta a Tannia Silva para proyectos de maquillaje editorial, comercial y cine.",
        },
      ],
    },
  ],
};
