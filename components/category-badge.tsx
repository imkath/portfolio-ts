import { Badge } from "@/components/ui/badge"
import type { Category } from "@/src/types"

const categoryLabels: Record<Category, string> = {
  beauty: "Beauty",
  editorial: "Editorial",
  commercial: "Commercial",
  film: "Film",
  grooming: "Grooming",
  bridal: "Bridal",
  sfx: "SFX",
}

interface CategoryBadgeProps {
  category: Category
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Badge variant="outline" className="border-line bg-surface text-text-dim hover:border-accent-2 hover:text-text">
      {categoryLabels[category]}
    </Badge>
  )
}
