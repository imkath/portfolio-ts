import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuración del Sitio",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      label: "Nombre del sitio",
      defaultValue: "Tannia Silva",
    },
    {
      name: "siteDescription",
      type: "textarea",
      required: true,
      label: "Descripción del sitio",
      defaultValue:
        "Portafolio de maquillaje profesional especializado en belleza editorial, comercial y cine.",
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen OG por defecto",
      admin: {
        description: "Imagen que aparece al compartir el sitio en redes sociales",
      },
    },
    {
      name: "siteUrl",
      type: "text",
      label: "URL del sitio",
      defaultValue: "https://tanniasilva.com",
    },
  ],
};
