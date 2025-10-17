"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      onAnimationComplete={() => {
        const element = document.getElementById("loading-screen");
        if (element) {
          element.style.display = "none";
        }
      }}
      id="loading-screen"
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            className="font-serif text-2xl font-semibold tracking-tight text-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            T
          </motion.span>
          <motion.span
            className="h-8 w-px bg-line"
            animate={{ scaleY: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="font-serif text-2xl font-semibold tracking-tight text-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            S
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
