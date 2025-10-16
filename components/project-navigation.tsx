import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/src/types"

interface ProjectNavigationProps {
  previousProject?: Project
  nextProject?: Project
}

export function ProjectNavigation({ previousProject, nextProject }: ProjectNavigationProps) {
  return (
    <nav className="flex items-center justify-between border-t border-line pt-8">
      {previousProject ? (
        <Link
          href={`/work/${previousProject.slug}`}
          className="group flex items-center gap-2 text-text-dim transition-colors hover:text-text"
        >
          <ChevronLeft className="h-5 w-5" />
          <div>
            <p className="caption">Anterior</p>
            <p className="text-base font-semibold">{previousProject.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex items-center gap-2 text-right text-text-dim transition-colors hover:text-text"
        >
          <div>
            <p className="caption">Siguiente</p>
            <p className="text-base font-semibold">{nextProject.title}</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
