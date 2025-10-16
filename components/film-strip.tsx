"use client";

import Image from "next/image";
import type { ImageItem } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FilmStripProps {
  images: ImageItem[];
}

export function FilmStrip({ images }: FilmStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        ref.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.children;
    if (items[index]) {
      const item = items[index] as HTMLElement;
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth =
      (container.children[0] as HTMLElement)?.offsetWidth || 300;
    const gap = 16; // 1rem gap
    const scrollAmount = itemWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (index > 0) {
          newIndex = index - 1;
          scrollToIndex(newIndex);
          setFocusedIndex(newIndex);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (index < images.length - 1) {
          newIndex = index + 1;
          scrollToIndex(newIndex);
          setFocusedIndex(newIndex);
        }
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        scrollToIndex(newIndex);
        setFocusedIndex(newIndex);
        break;
      case "End":
        e.preventDefault();
        newIndex = images.length - 1;
        scrollToIndex(newIndex);
        setFocusedIndex(newIndex);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
          Secuencia
        </h3>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onFocus={() => setShowControls(true)}
        onBlur={(e) => {
          // Keep controls visible if focus is moving to a button
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowControls(false);
          }
        }}
      >
        {/* Previous button */}
        {canScrollLeft && (showControls || focusedIndex !== null) && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-text-dim backdrop-blur-sm transition-all hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Anterior imagen en la secuencia"
            tabIndex={0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Film strip container with scroll-snap */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
          role="list"
          aria-label="Secuencia de imágenes"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0"
              style={{
                width: "clamp(250px, 30vw, 350px)",
                scrollSnapAlign: "center",
              }}
              role="listitem"
            >
              <button
                className="group relative block w-full overflow-hidden bg-surface focus-visible:outline-none"
                style={{
                  aspectRatio: `${image.width}/${image.height}`,
                  outline:
                    focusedIndex === index ? `2px solid var(--focus)` : "none",
                  outlineOffset: focusedIndex === index ? "2px" : "0",
                  border:
                    focusedIndex === index
                      ? "1px solid var(--accent-2)"
                      : "1px solid transparent",
                }}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Imagen ${index + 1} de ${images.length}: ${
                  image.alt
                }`}
                tabIndex={0}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 250px, 350px"
                  className="object-cover transition-opacity group-hover:opacity-90"
                />

                {/* Index indicator */}
                <div className="pointer-events-none absolute bottom-2 right-2">
                  <span className="caption rounded-full bg-surface/80 px-2 py-1 text-text-dim backdrop-blur-sm">
                    {index + 1}/{images.length}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Next button */}
        {canScrollRight && (showControls || focusedIndex !== null) && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-text-dim backdrop-blur-sm transition-all hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Siguiente imagen en la secuencia"
            tabIndex={0}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only" aria-live="polite">
        Usa las flechas izquierda y derecha para navegar por la secuencia.
        Presiona Inicio para ir a la primera imagen, Fin para ir a la última.
      </div>
    </div>
  );
}
