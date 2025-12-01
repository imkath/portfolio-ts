import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Tannia Silva | Maquilladora Profesional",
  description:
    "Contacta conmigo para proyectos editoriales, comerciales y de cine. Disponible para colaboraciones internacionales. Respondo en 24-48 horas.",
  openGraph: {
    title: "Contacto - Tannia Silva",
    description:
      "Contacta conmigo para proyectos editoriales, comerciales y de cine. Disponible para colaboraciones internacionales.",
    url: "https://tanniasilva.com/contact",
    siteName: "Tannia Silva",
    locale: "es_CL",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
