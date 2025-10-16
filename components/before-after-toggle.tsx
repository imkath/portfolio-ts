"use client";

import Image from "next/image";
import type { BeforeAfterPair } from "@/src/types";
import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BeforeAfterToggleProps {
  pair: BeforeAfterPair;
}

export function BeforeAfterToggle({ pair }: BeforeAfterToggleProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newPosition = sliderPosition;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newPosition = Math.max(0, sliderPosition - 10);
        break;
      case "ArrowRight":
        e.preventDefault();
        newPosition = Math.min(100, sliderPosition + 10);
        break;
      case "Home":
        e.preventDefault();
        newPosition = 0;
        break;
      case "End":
        e.preventDefault();
        newPosition = 100;
        break;
      default:
        return;
    }

    setSliderPosition(newPosition);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const aspectRatio = `${pair.before.width}/${pair.before.height}`;

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden bg-surface"
        style={{ aspectRatio }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Before image (background) */}
        <div className="absolute inset-0">
          <Image
            src={pair.before.src || "/placeholder.svg"}
            alt={pair.before.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
            className="object-cover"
            priority
          />
        </div>

        {/* After image (with clip-path) */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: shouldReduceMotion
              ? `inset(0 ${100 - sliderPosition}% 0 0)`
              : undefined,
          }}
          animate={
            !shouldReduceMotion
              ? {
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }
              : undefined
          }
          transition={
            !shouldReduceMotion
              ? {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }
              : undefined
          }
        >
          <Image
            src={pair.after.src || "/placeholder.svg"}
            alt={pair.after.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Slider handle */}
        <motion.div
          className="absolute top-0 bottom-0 z-10 w-0.5 cursor-ew-resize"
          style={{
            left: shouldReduceMotion ? `${sliderPosition}%` : undefined,
          }}
          animate={
            !shouldReduceMotion
              ? {
                  left: `${sliderPosition}%`,
                }
              : undefined
          }
          transition={
            !shouldReduceMotion
              ? {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }
              : undefined
          }
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Vertical line */}
          <div className="absolute inset-0 bg-text shadow-lg" />

          {/* Handle button */}
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-text bg-surface p-2 shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            onKeyDown={handleKeyDown}
            role="slider"
            aria-label="Ajustar comparación antes y después"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuetext={`${Math.round(sliderPosition)}% después visible`}
            tabIndex={0}
          >
            <div className="flex gap-1">
              <div className="h-4 w-0.5 bg-text" />
              <div className="h-4 w-0.5 bg-text" />
            </div>
          </button>
        </motion.div>

        {/* Labels */}
        <div className="pointer-events-none absolute bottom-4 left-4">
          <span className="caption rounded-full bg-surface/80 px-3 py-1 text-text-dim backdrop-blur-sm">
            Antes
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4">
          <span className="caption rounded-full bg-surface/80 px-3 py-1 text-text-dim backdrop-blur-sm">
            Después
          </span>
        </div>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Comparación de antes y después. {Math.round(sliderPosition)}% de la
        imagen después visible.
      </div>
    </div>
  );
}
