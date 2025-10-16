"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        exit={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{
          duration: 0.6,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Curtain wipe overlay */}
      {isTransitioning && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[200] bg-surface"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
