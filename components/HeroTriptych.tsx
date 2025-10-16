"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface ImageSet {
  src: string;
  alt: string;
}

interface SlotConfig {
  colSpan: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  images: ImageSet[];
}

const slots: SlotConfig[] = [
  {
    colSpan: { mobile: 4, tablet: 4, desktop: 5 },
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/460932547_1913327075856917_25410145764772056_n-G9LVQN5o7VejtK8hpvJYVffO8bLrEe.jpeg",
        alt: "Maquillaje editorial con rubor rosado intenso, labios rojos brillantes y piel luminosa",
      },
    ],
  },
  {
    colSpan: { mobile: 4, tablet: 4, desktop: 4 },
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/426479068_840992791131289_900721664563515578_n-syjiKajuRPRw9r2LiRMWYo8MdGxMEK.jpeg",
        alt: "Retrato de perfil con gorro rosa voluminoso y maquillaje natural con rubor rosado",
      },
    ],
  },
  {
    colSpan: { mobile: 4, tablet: 8, desktop: 3 },
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/125877582_409754280058231_8695006825834067878_n-sTtlHp1nyVi6ewVUGN7BgSqNEpwWMM.jpg",
        alt: "Maquillaje editorial con línea verde neón sobre fondo naranja",
      },
    ],
  },
];

export function HeroTriptych() {
  const [activeIndices, setActiveIndices] = useState([0, 0, 0]);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [focusedSlot, setFocusedSlot] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveIndices((prev) =>
        prev.map((index, slotIndex) => {
          const images = slots[slotIndex].images;
          return (index + 1) % images.length;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const isSlotHighlighted = (slotIndex: number) =>
    hoveredSlot === slotIndex || focusedSlot === slotIndex;

  return (
    <section className="relative h-[85vh] overflow-hidden bg-surface">
      <div className="grid h-full grid-cols-4 gap-1 md:grid-cols-8 lg:grid-cols-12">
        {slots.map((slot, slotIndex) => {
          const currentImage = slot.images[activeIndices[slotIndex]];
          const isHighlighted = isSlotHighlighted(slotIndex);

          // Generate column span classes
          const colSpanClasses = [
            slotIndex === 0 ? "col-span-4 md:col-span-4 lg:col-span-5" : "",
            slotIndex === 1 ? "col-span-4 md:col-span-4 lg:col-span-4" : "",
            slotIndex === 2 ? "col-span-4 md:col-span-8 lg:col-span-3" : "",
          ][slotIndex];

          return (
            <div
              key={slotIndex}
              className={`relative h-full ${colSpanClasses}`}
              onMouseEnter={() => setHoveredSlot(slotIndex)}
              onMouseLeave={() => setHoveredSlot(null)}
            >
              <div
                className="relative h-full focus-visible:outline-none"
                tabIndex={0}
                role="img"
                aria-label={currentImage.alt}
                onFocus={() => setFocusedSlot(slotIndex)}
                onBlur={() => setFocusedSlot(null)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${slotIndex}-${activeIndices[slotIndex]}`}
                    initial={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }
                    }
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      fill
                      sizes={`(max-width: 768px) ${
                        (slot.colSpan.mobile / 4) * 100
                      }vw, 
                              (max-width: 1024px) ${
                                (slot.colSpan.tablet / 8) * 100
                              }vw, 
                              ${(slot.colSpan.desktop / 12) * 100}vw`}
                      className="object-cover"
                      priority={slotIndex < 3}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Vignette overlay on hover/focus */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHighlighted ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 40%, rgba(11, 11, 15, 0.15) 100%)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overlay gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

      {/* Categories caption */}
      <div className="absolute bottom-8 left-8">
        <p className="caption text-text-dim">
          Beauty · Editorial · Commercial · Film
        </p>
      </div>
    </section>
  );
}
