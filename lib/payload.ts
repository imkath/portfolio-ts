import { getPayload } from "payload";
import config from "@payload-config";
import type { Category, Project } from "@/src/types";

// Get Payload instance
async function getPayloadClient() {
  return await getPayload({ config });
}

// ============================================
// Projects
// ============================================

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "projects",
    where: {
      status: { equals: "published" },
    },
    sort: "-createdAt",
    depth: 2,
  });

  return docs.map(transformProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
    depth: 2,
    limit: 1,
  });

  if (docs.length === 0) return null;
  return transformProject(docs[0]);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "projects",
    where: {
      status: { equals: "published" },
      featured: { equals: true },
    },
    sort: "-createdAt",
    depth: 2,
  });

  return docs.map(transformProject);
}

export async function getProjectsByCategory(categorySlug: string): Promise<Project[]> {
  const payload = await getPayloadClient();

  // First get the category ID
  const { docs: categories } = await payload.find({
    collection: "categories",
    where: {
      slug: { equals: categorySlug },
    },
    limit: 1,
  });

  if (categories.length === 0) return [];

  const { docs } = await payload.find({
    collection: "projects",
    where: {
      status: { equals: "published" },
      categories: { contains: categories[0].id },
    },
    sort: "-createdAt",
    depth: 2,
  });

  return docs.map(transformProject);
}

export async function getNextProject(currentSlug: string): Promise<Project | null> {
  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export async function getPreviousProject(currentSlug: string): Promise<Project | null> {
  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  return projects[prevIndex];
}

// ============================================
// Categories
// ============================================

export async function getCategories(): Promise<{ name: string; slug: string }[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "categories",
    sort: "name",
  });

  return docs.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
  }));
}

// ============================================
// Globals
// ============================================

export async function getSiteSettings() {
  const payload = await getPayloadClient();
  return await payload.findGlobal({ slug: "site-settings", depth: 1 });
}

export async function getAboutContent() {
  const payload = await getPayloadClient();
  return await payload.findGlobal({ slug: "about-page", depth: 1 });
}

export async function getContactInfo() {
  const payload = await getPayloadClient();
  return await payload.findGlobal({ slug: "contact-info", depth: 1 });
}

// ============================================
// Transform functions
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProject(doc: any): Project {
  return {
    slug: doc.slug,
    title: doc.title,
    clientOrPublication: doc.clientOrPublication || undefined,
    year: doc.year || undefined,
    country: doc.country || undefined,
    categories: doc.categories?.map((cat: { slug: string }) =>
      typeof cat === "object" ? cat.slug : cat
    ) as Category[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: doc.images?.map((item: { image: any }) => transformMedia(item.image)) || [],
    credits:
      doc.credits?.map((credit: { role: string; name: string }) => ({
        role: credit.role,
        name: credit.name,
      })) || [],
    videoUrl: doc.videoUrl || undefined,
    featured: doc.featured || false,
    beforeAfter:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.beforeAfter?.map((pair: { before: any; after: any }) => ({
        before: transformMedia(pair.before),
        after: transformMedia(pair.after),
      })) || undefined,
    filmStrip:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.filmStrip?.map((item: { image: any }) => transformMedia(item.image)) || undefined,
    aboutLook: doc.aboutLook || undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformMedia(media: any): {
  src: string;
  width: number;
  height: number;
  alt: string;
  focus?: string;
} {
  if (!media) {
    return {
      src: "/placeholder.svg",
      width: 800,
      height: 600,
      alt: "Imagen no disponible",
    };
  }

  // Preferir cloudinaryUrl si existe, sino usar url normal
  const src = media.cloudinaryUrl || media.url || "/placeholder.svg";

  return {
    src,
    width: media.width || 800,
    height: media.height || 600,
    alt: media.alt || "Imagen del proyecto",
    focus: media.focus || undefined,
  };
}
