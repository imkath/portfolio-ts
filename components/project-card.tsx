"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/src/types";
import { useState } from "react";
import { trackProjectOpen } from "@/src/lib/analytics";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const firstImage = project.images[0];
  const isActive = isHovered || isFocused;

  const handleClick = () => {
    trackProjectOpen(project.slug, project.categories[0]);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden focus-visible:outline-none glitch-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={handleClick}
      aria-label={`${project.title || firstImage.alt} - ${
        project.categories[0]
      }`}
    >
      {/* Container with fixed aspect ratio to prevent layout shift */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface photo-vintage">
        <motion.div
          className="relative h-full w-full"
          animate={{
            scale: isActive ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={firstImage.src || "/placeholder.svg"}
            alt={firstImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            style={{
              filter: isActive
                ? "contrast(1.1) brightness(0.95)"
                : "contrast(1) brightness(1)",
              transition: "filter 0.4s ease",
            }}
          />

          {/* Chromatic aberration overlay on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              opacity: isActive ? 0.15 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              mixBlendMode: "screen",
              background: isActive
                ? "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)"
                : "transparent",
            }}
          />

          {/* Enhanced vignette overlay on hover/focus */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              opacity: isActive ? 1 : 0.3,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(11, 11, 15, 0.5) 100%)",
            }}
          />
        </motion.div>

        {/* Focus border */}
        {isFocused && (
          <div className="pointer-events-none absolute inset-0 border border-line" />
        )}

        {/* Caption - slides up and fades in on hover/focus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/90 to-transparent p-4"
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <p className="caption text-text">
            {project.categories[0]} · {project.year}
          </p>
        </motion.div>
      </div>
    </Link>
  );
}
