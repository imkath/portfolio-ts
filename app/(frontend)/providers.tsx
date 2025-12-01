"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Siempre forzar visibilidad después de 500ms por si acaso
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const pageVariants = {
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
        },
    animate: {
      opacity: 1,
    },
    exit: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
        },
  };

  const pageTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.2,
        ease: "easeOut" as const,
      };

  return (
    <>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          window.scrollTo(0, 0);
          setIsVisible(true);
        }}
      >
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
          style={{
            opacity: isVisible ? 1 : undefined,
          }}
          onAnimationStart={() => setIsVisible(false)}
          onAnimationComplete={() => setIsVisible(true)}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Fallback de emergencia - siempre visible después de 600ms */}
      <style jsx global>{`
        body {
          min-height: 100vh;
        }
        @keyframes force-visible {
          to {
            opacity: 1 !important;
          }
        }
        body > div {
          animation: force-visible 0.1s 0.6s forwards;
        }
      `}</style>
    </>
  );
}
