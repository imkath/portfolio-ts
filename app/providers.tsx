"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

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
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
