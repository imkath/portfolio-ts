import Link from "next/link"
import { Container } from "@/components/container"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center py-16">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-4">Proyecto no encontrado</h1>
            <p className="mb-8 text-text-dim">El proyecto que buscas no existe o ha sido eliminado.</p>
            <Link
              href="/work"
              className="inline-block rounded-full border border-line px-6 py-3 text-sm transition-all duration-150 hover:border-accent-2 hover:text-text"
            >
              Ver todos los proyectos
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
