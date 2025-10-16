"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/src/types";
import { ProjectCard } from "./project-card";
import { useEffect, useState } from "react";

interface MasonryGridProps {
  projects: Project[];
}

export function MasonryGrid({ projects }: MasonryGridProps) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  if (!mounted || shouldReduceMotion) {
    return (
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="mb-6 inline-block w-full break-inside-avoid"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="columns-1 gap-6 md:columns-2 lg:columns-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div
          key={project.slug}
          variants={itemVariants}
          className="mb-6 inline-block w-full break-inside-avoid"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
