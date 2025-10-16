import type { Project } from "@/src/types";

/**
 * Generate Person JSON-LD for homepage
 */
export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tannia Silva",
    jobTitle: "Maquilladora Profesional",
    description:
      "Maquilladora profesional especializada en belleza editorial, comercial y cine. Piel primero, rostros no convencionales, textura real.",
    url: "https://tanniasilva.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    knowsAbout: [
      "Maquillaje Editorial",
      "Maquillaje Comercial",
      "Maquillaje para Cine",
      "Beauty Makeup",
      "Grooming",
      "Maquillaje Nupcial",
      "Efectos Especiales",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Escuela de Maquillaje Profesional",
    },
  };
}

/**
 * Generate CreativeWork JSON-LD for a project
 */
export function generateProjectJsonLd(project: Project) {
  const firstImage = project.images[0];

  // Build creator/contributor list from credits
  const contributors = project.credits.map((credit) => ({
    "@type": "Person",
    name: credit.name,
    roleName: getRoleLabel(credit.role),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description:
      project.aboutLook || `Proyecto de maquillaje: ${project.title}`,
    creator: {
      "@type": "Person",
      name: "Tannia Silva",
      jobTitle: "Maquilladora Profesional",
    },
    contributor: contributors,
    image: firstImage
      ? {
          "@type": "ImageObject",
          url: firstImage.src,
          width: firstImage.width,
          height: firstImage.height,
          caption: firstImage.alt,
        }
      : undefined,
    datePublished: project.year ? `${project.year}-01-01` : undefined,
    keywords: project.categories.join(", "),
    locationCreated: project.country
      ? {
          "@type": "Country",
          name: project.country,
        }
      : undefined,
    publisher: project.clientOrPublication
      ? {
          "@type": "Organization",
          name: project.clientOrPublication,
        }
      : undefined,
  };
}

/**
 * Helper to get role labels in Spanish
 */
function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    photography: "Fotografía",
    hair: "Cabello",
    styling: "Styling",
    art: "Dirección de Arte",
    model: "Modelo",
    production: "Producción",
    director: "Director",
    dop: "Director de Fotografía",
    brand: "Marca",
    publication: "Publicación",
  };

  return labels[role] || role;
}

/**
 * Generate OG Image URL with proper dimensions (1200x630)
 * This crops/resizes the image to OG standards
 */
export function generateOgImageUrl(
  imageUrl: string,
  width = 1200,
  height = 630
): string {
  // If using Vercel Blob Storage or similar, add resize parameters
  if (imageUrl.includes("vercel-storage.com")) {
    const url = new URL(imageUrl);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("h", height.toString());
    url.searchParams.set("fit", "cover");
    return url.toString();
  }

  // For other providers, return as-is
  // In production, you might want to use an image service
  return imageUrl;
}
