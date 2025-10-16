"use client";
import { motion } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Category } from "@/src/types";
import { cn } from "@/lib/utils";
import { trackFilterSelect } from "@/src/lib/analytics";

interface FilterBarProps {
  categories: { value: Category | "all"; label: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  resultCount: number;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  resultCount,
}: FilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const announceRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Read category from querystring on mount
  useEffect(() => {
    const catFromUrl = searchParams.get("cat");
    if (catFromUrl && categories.some((c) => c.value === catFromUrl)) {
      onCategoryChange(catFromUrl);
    }
    isFirstRender.current = false;
  }, []);

  const handleCategoryChange = (category: string) => {
    // Track filter selection
    trackFilterSelect(category);

    // Update querystring
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("cat");
    } else {
      params.set("cat", category);
    }
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });

    // Update state
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar proyectos por categoría"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.value;
          return (
            <motion.button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm transition-colors duration-150",
                isActive
                  ? "border-accent bg-accent text-text"
                  : "border-line bg-transparent text-text-dim hover:border-accent-2 hover:text-text"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              aria-pressed={isActive}
              aria-label={`Filtrar por ${category.label}`}
            >
              {category.label}
            </motion.button>
          );
        })}
      </div>

      {/* Screen reader announcements */}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {!isFirstRender.current &&
          `Mostrando ${resultCount} ${
            resultCount === 1 ? "proyecto" : "proyectos"
          } en ${
            categories.find((c) => c.value === activeCategory)?.label || "todos"
          }`}
      </div>

      <motion.p
        key={resultCount}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-text-dim"
        aria-hidden="true"
      >
        {resultCount} {resultCount === 1 ? "proyecto" : "proyectos"}
      </motion.p>
    </div>
  );
}
