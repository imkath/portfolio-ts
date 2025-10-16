import type { Project } from "@/src/types"
import beautyShimmer from "@/content/projects/beauty-skin-shimmer.json"
import electricGreen from "@/content/projects/editorial-electric-green.json"
import cleanLines from "@/content/projects/editorial-clean-lines.json"
import gamers from "@/content/projects/commercial-gamers.json"
import softMatte from "@/content/projects/grooming-soft-matte.json"
import warmPortrait from "@/content/projects/commercial-warm-portrait.json"

export const projects: Project[] = [
  beautyShimmer,
  electricGreen,
  cleanLines,
  gamers,
  softMatte,
  warmPortrait,
] as Project[]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects
  return projects.filter((project) => project.categories.includes(category as any))
}

export function getNextProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)
  if (currentIndex === -1) return undefined
  return projects[(currentIndex + 1) % projects.length]
}

export function getPreviousProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)
  if (currentIndex === -1) return undefined
  return projects[(currentIndex - 1 + projects.length) % projects.length]
}
