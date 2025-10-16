"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VintageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  withOrnament?: boolean;
}

export function VintageTitle({
  children,
  subtitle,
  className,
  withOrnament = false,
}: VintageTitleProps) {
  return (
    <div className={cn("relative", className)}>
      {withOrnament && (
        <motion.div
          className="ornament-divider mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="relative z-10 bg-bg px-4 text-xs tracking-widest text-text-dim">
            ◆
          </span>
        </motion.div>
      )}

      <motion.h1
        className={cn(
          "title-card mb-4 text-center font-serif text-4xl md:text-5xl lg:text-6xl",
          "bg-gradient-to-b from-text to-text-dim bg-clip-text text-transparent"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        {children}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="text-center text-sm tracking-widest text-text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}

      {withOrnament && (
        <motion.div
          className="ornament-divider mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="relative z-10 bg-bg px-4 text-xs tracking-widest text-text-dim">
            ◆
          </span>
        </motion.div>
      )}
    </div>
  );
}
