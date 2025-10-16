"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Image from "next/image";
import type { ImageItem } from "@/src/types";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { trackImageOpen } from "@/src/lib/analytics";

interface LightboxProps {
  images: ImageItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  projectTitle?: string;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  projectTitle,
}: LightboxProps) {
  const currentImage = images[currentIndex];
  const announceRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(currentIndex);
  const hasTrackedOpen = useRef(false);

  // Track lightbox open
  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current && projectTitle) {
      trackImageOpen(projectTitle, currentIndex);
      hasTrackedOpen.current = true;
    }
    if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen, currentIndex, projectTitle]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    if (images[nextIndex]) {
      const nextImg = new window.Image();
      nextImg.src = images[nextIndex].src;
    }

    if (images[prevIndex]) {
      const prevImg = new window.Image();
      prevImg.src = images[prevIndex].src;
    }
  }, [currentIndex, images, isOpen]);

  // Track index changes for announcements
  useEffect(() => {
    if (isOpen && previousIndexRef.current !== currentIndex) {
      previousIndexRef.current = currentIndex;
    }
  }, [currentIndex, isOpen]);

  const goToNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className="max-w-[95vw] border-line bg-bg p-0 md:max-w-[90vw]"
        showCloseButton={false}
      >
        {/* Hidden title for accessibility */}
        <VisuallyHidden>
          <DialogTitle>
            {projectTitle
              ? `${projectTitle} - Imagen ${currentIndex + 1} de ${
                  images.length
                }`
              : `Imagen ${currentIndex + 1} de ${images.length}`}
          </DialogTitle>
        </VisuallyHidden>

        <div className="relative flex min-h-[80vh] items-center justify-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-surface/80 p-2 text-text-dim backdrop-blur-sm transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Cerrar lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-text-dim backdrop-blur-sm transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div className="relative h-full w-full p-12">
            <div className="relative mx-auto h-full max-h-[80vh] w-full max-w-6xl">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-text-dim backdrop-blur-sm transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter and title */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            {projectTitle && (
              <p className="caption text-text">{projectTitle}</p>
            )}
            <div className="rounded-full bg-surface/80 px-4 py-2 backdrop-blur-sm">
              <p className="caption text-text-dim" aria-hidden="true">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Screen reader announcements */}
          <div
            ref={announceRef}
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            Imagen {currentIndex + 1} de {images.length}
            {projectTitle && `: ${projectTitle}`}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
