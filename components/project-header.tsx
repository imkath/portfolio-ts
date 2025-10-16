import type { Project } from "@/src/types"
import { CategoryBadge } from "./category-badge"

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6">
      <h1>{project.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-text-dim">
        {project.clientOrPublication && <p className="text-base">{project.clientOrPublication}</p>}
        {project.year && <p className="text-base">{project.year}</p>}
        {project.country && <p className="text-base">{project.country}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <CategoryBadge key={category} category={category} />
        ))}
      </div>
    </header>
  )
}
