"use client";

import Image from "next/image";
import type { ImageItem } from "@/src/types";
import { useState } from "react";
import { Lightbox } from "./lightbox";

interface GalleryProps {
  images: ImageItem[];
  projectTitle?: string;
}

export function Gallery({ images, projectTitle }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(index);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="group relative block w-full overflow-hidden bg-surface transition-opacity duration-150 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            aria-label={`Abrir imagen ${index + 1} en lightbox: ${image.alt}`}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: `${image.width}/${image.height}` }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        projectTitle={projectTitle}
      />
    </>
  );
}
