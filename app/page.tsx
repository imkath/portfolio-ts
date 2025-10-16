import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MasonryGrid } from "@/components/masonry-grid";
import { Reveal } from "@/components/reveal";
import { HeroTriptych } from "@/components/HeroTriptych";
import { getFeaturedProjects } from "@/src/lib/projects";
import { generatePersonJsonLd } from "@/src/lib/seo";

export const metadata = {
  title: "Tannia Silva - Maquilladora Profesional",
  description:
    "Portafolio de maquillaje profesional especializado en belleza editorial, comercial y cine. Piel primero, rostros no convencionales, textura real.",
  openGraph: {
    title: "Tannia Silva - Maquilladora Profesional",
    description:
      "Portafolio de maquillaje profesional especializado en belleza editorial, comercial y cine. Piel primero, rostros no convencionales, textura real.",
    url: "https://tanniasilva.com",
    siteName: "Tannia Silva",
    locale: "es_CL",
    type: "website",
  },
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const personJsonLd = generatePersonJsonLd();

  return (
    <>
      {/* JSON-LD for Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar />
      <main>
        {/* Hero Triptych */}
        <HeroTriptych />

        {/* Featured Projects */}
        <section className="py-16">
          <Container>
            <Reveal className="mb-12">
              <h2 className="mb-2 font-serif text-3xl font-semibold">
                Proyectos Destacados
              </h2>
              <p className="text-text-dim">Selección de trabajos recientes</p>
            </Reveal>

            <MasonryGrid projects={featuredProjects} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
