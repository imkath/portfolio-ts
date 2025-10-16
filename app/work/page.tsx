"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilterBar } from "@/components/filter-bar";
import { MasonryGrid } from "@/components/masonry-grid";
import { Reveal } from "@/components/reveal";
import { projects } from "@/src/lib/projects";
import type { Category } from "@/src/types";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "beauty", label: "Beauty" },
  { value: "editorial", label: "Editorial" },
  { value: "commercial", label: "Commercial" },
  { value: "film", label: "Film" },
  { value: "grooming", label: "Grooming" },
  { value: "bridal", label: "Bridal" },
  { value: "sfx", label: "SFX" },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(activeCategory as Category)
        );

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <Container>
          <Reveal className="mb-12">
            <h1 className="mb-4">Work</h1>
            <p className="text-text-dim">
              Portafolio completo de proyectos de maquillaje profesional
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mb-12">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              resultCount={filteredProjects.length}
            />
          </Reveal>

          <MasonryGrid key={activeCategory} projects={filteredProjects} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
