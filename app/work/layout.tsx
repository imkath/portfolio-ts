import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portafolio de Trabajo - Tannia Silva | Maquillaje Profesional",
  description:
    "Explora el portafolio completo de proyectos de maquillaje profesional: beauty, editorial, comercial, film, grooming, bridal y efectos especiales.",
  openGraph: {
    title: "Portafolio de Trabajo - Tannia Silva",
    description:
      "Explora el portafolio completo de proyectos de maquillaje profesional: beauty, editorial, comercial, film, grooming y más.",
    url: "https://tanniasilva.com/work",
    siteName: "Tannia Silva",
    locale: "es_CL",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
