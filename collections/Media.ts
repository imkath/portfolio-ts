import type { CollectionConfig } from "payload";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "cloudinaryUrl", "focus", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    disableLocalStorage: true, // No guardamos localmente, solo en Cloudinary
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Solo procesar en create cuando hay un archivo
        if (operation === "create" && req.file) {
          try {
            const file = req.file;
            const result = await uploadToCloudinary(
              file.data,
              file.name,
              "tannia-silva/portfolio"
            );

            // Actualizar los datos con la info de Cloudinary
            data.cloudinaryId = result.public_id;
            data.cloudinaryUrl = result.secure_url;
            data.url = result.secure_url;
            data.width = result.width;
            data.height = result.height;
            data.filesize = result.bytes;
            data.mimeType = `image/${result.format}`;
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new Error("Failed to upload image to Cloudinary");
          }
        }

        return data;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Eliminar de Cloudinary cuando se borra el documento
        if (doc.cloudinaryId) {
          try {
            await deleteFromCloudinary(doc.cloudinaryId);
          } catch (error) {
            console.error("Error deleting from Cloudinary:", error);
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Texto alternativo",
      admin: {
        description: "Descripción de la imagen para accesibilidad y SEO",
      },
    },
    {
      name: "focus",
      type: "select",
      label: "Enfoque del maquillaje",
      options: [
        { label: "Ojos", value: "eyes" },
        { label: "Labios", value: "lips" },
        { label: "Piel", value: "skin" },
        { label: "Efectos", value: "fx" },
        { label: "Complexión", value: "complexion" },
      ],
      admin: {
        description: "Área principal de enfoque del maquillaje en esta imagen",
      },
    },
    // Campos de Cloudinary (ocultos en admin, gestionados por hooks)
    {
      name: "cloudinaryId",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "ID del archivo en Cloudinary",
      },
    },
    {
      name: "cloudinaryUrl",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "URL directa de Cloudinary",
      },
    },
  ],
};
