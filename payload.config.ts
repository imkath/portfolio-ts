import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { Projects } from "./collections/Projects";

// Globals
import { SiteSettings } from "./globals/SiteSettings";
import { AboutPage } from "./globals/AboutPage";
import { ContactInfo } from "./globals/ContactInfo";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Tannia Silva Admin",
    },
    components: {
      graphics: {
        Logo: "/components/payload/Logo#default",
        Icon: "/components/payload/Icon#default",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    css: path.resolve(dirname, "app/(payload)/custom.css"),
  },

  collections: [Users, Media, Categories, Projects],
  globals: [SiteSettings, AboutPage, ContactInfo],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // En desarrollo, forzamos el schema sin preguntas interactivas
    push:
      process.env.NODE_ENV === "development"
        ? {
            // Crear columnas nuevas automáticamente
          }
        : false,
  }),

  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_IN_PRODUCTION",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sharp: sharp as any,

  // Localization for Spanish content
  localization: {
    locales: [
      {
        code: "es",
        label: "Español",
      },
    ],
    defaultLocale: "es",
  },

  // Spanish translations for admin UI
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: "es",
  },
});
