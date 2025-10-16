import Image from "next/image";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { VintageTitle } from "@/components/vintage-title";

export const metadata = {
  title: "Sobre Mí - Tannia Silva | Maquilladora Profesional",
  description:
    "Maquilladora profesional con más de 10 años de experiencia en belleza editorial, comercial y cine. Especializada en piel diversa y técnicas contemporáneas. Basada en Santiago, Chile.",
  openGraph: {
    title: "Sobre Mí - Tannia Silva",
    description:
      "Maquilladora profesional con más de 10 años de experiencia en belleza editorial, comercial y cine. Especializada en piel diversa y técnicas contemporáneas.",
    url: "https://tanniasilva.com/about",
    siteName: "Tannia Silva",
    locale: "es_CL",
    type: "profile",
    images: [
      {
        url: "/perfil-tannia.png",
        width: 1200,
        height: 630,
        alt: "Retrato de Tannia Silva, maquilladora profesional",
      },
    ],
  },
};

const specialties = [
  "Belleza Editorial",
  "Maquillaje Comercial",
  "Cine y TV",
  "Grooming",
  "Piel Diversa",
  "Efectos Especiales",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="py-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {/* Portrait */}
              <Reveal className="relative aspect-[3/4] overflow-hidden bg-surface photo-vintage spotlight">
                <Image
                  src="/perfil-tannia.png"
                  alt="Retrato de Tannia Silva, maquilladora profesional"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </Reveal>

              {/* Bio */}
              <div className="flex flex-col justify-center space-y-8">
                <div>
                  <VintageTitle withOrnament>Sobre mí</VintageTitle>
                </div>
                <Reveal delay={0.4}>
                  <div className="space-y-4 text-base leading-relaxed text-text-dim">
                    <p>
                      Maquilladora profesional con más de 10 años de experiencia
                      en belleza editorial, comercial y cine. Mi trabajo se
                      centra en celebrar la diversidad de tonos de piel y
                      características no convencionales.
                    </p>
                    <p>
                      Creo en el maquillaje como herramienta para realzar, no
                      para ocultar. Mi enfoque técnico prioriza la preparación
                      de piel, el respeto por la textura natural y el uso
                      estratégico del color.
                    </p>
                    <p>
                      He colaborado con publicaciones como Vogue, Dazed Beauty y
                      GQ, así como con marcas como PlayStation y Estée Lauder.
                      Mi trabajo ha sido reconocido por su precisión técnica y
                      su visión contemporánea de la belleza.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
                    Ciudad Base
                  </h3>
                  <p className="text-base text-text-dim">Santiago, Chile</p>
                  <p className="mt-2 text-sm text-text-dim">
                    Disponible para viajes internacionales
                  </p>
                </Reveal>

                <div>
                  <Reveal delay={0.3}>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
                      Especialidades
                    </h3>
                  </Reveal>
                  <Stagger className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <StaggerItem key={specialty}>
                        <Badge
                          variant="outline"
                          className="border-line bg-surface text-text-dim hover:border-accent-2 hover:text-text"
                        >
                          {specialty}
                        </Badge>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
