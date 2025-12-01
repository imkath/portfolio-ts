import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectHeader } from "@/components/project-header";
import { Gallery } from "@/components/gallery";
import { Credits } from "@/components/credits";
import { BeforeAfterToggle } from "@/components/before-after-toggle";
import { FilmStrip } from "@/components/film-strip";
import { ProjectNavigation } from "@/components/project-navigation";
import {
  getProjectBySlug,
  getNextProject,
  getPreviousProject,
} from "@/src/lib/projects";
import { generateProjectJsonLd, generateOgImageUrl } from "@/src/lib/seo";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado - Tannia Silva",
      description: "El proyecto que buscas no existe.",
    };
  }

  const firstImage = project.images[0];
  const title = `${project.title} - Tannia Silva`;
  const description =
    project.aboutLook ||
    `Proyecto de maquillaje ${
      project.clientOrPublication ? `para ${project.clientOrPublication}` : ""
    } - ${project.categories.join(", ")}`.trim();

  // Generate OG image with proper dimensions
  const ogImageUrl = firstImage
    ? generateOgImageUrl(firstImage.src, 1200, 630)
    : "/placeholder.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://tanniasilva.com/work/${slug}`,
      siteName: "Tannia Silva",
      locale: "es_CL",
      type: "article",
      publishedTime: project.year ? `${project.year}-01-01` : undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: firstImage?.alt || project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const previousProject = getPreviousProject(slug);
  const projectJsonLd = generateProjectJsonLd(project);

  return (
    <>
      {/* JSON-LD for CreativeWork */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <Navbar />
      <main className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Project Header */}
            <div className="mb-16">
              <ProjectHeader project={project} />
            </div>

            {/* Main Gallery */}
            <div className="mb-16">
              <Gallery images={project.images} projectTitle={project.title} />
            </div>

            {/* Before/After if available */}
            {project.beforeAfter && project.beforeAfter.length > 0 && (
              <div className="mb-16 space-y-12">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
                  Antes y Después
                </h3>
                {project.beforeAfter.map((pair, index) => (
                  <BeforeAfterToggle key={index} pair={pair} />
                ))}
              </div>
            )}

            {/* Film Strip if available */}
            {project.filmStrip && project.filmStrip.length >= 3 && (
              <div className="mb-16">
                <FilmStrip images={project.filmStrip} />
              </div>
            )}

            {/* About this look */}
            {project.aboutLook && (
              <div className="mb-16">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
                  Sobre este look
                </h3>
                <p className="text-base leading-relaxed text-text-dim">
                  {project.aboutLook}
                </p>
              </div>
            )}

            {/* Credits */}
            <div className="mb-16">
              <Credits credits={project.credits} />
            </div>

            {/* Project Navigation */}
            <ProjectNavigation
              previousProject={previousProject}
              nextProject={nextProject}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
