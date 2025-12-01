"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed left-0 top-0 z-50 flex h-screen w-20 flex-col items-center justify-between border-r border-line bg-bg/95 py-8 backdrop-blur-sm md:w-24"
    >
      {/* Film strip decoration at the left edge */}
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-accent-2/20 to-transparent" />

      {/* Logo/Name - Vertical */}
      <Link
        href="/"
        className="group relative flex items-center justify-center"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <motion.div
          className="relative flex items-center justify-center"
          initial={false}
        >
          {/* Tannia Silva expanded - horizontal, right to left */}
          <motion.div
            className="absolute flex flex-col items-center gap-0 overflow-hidden whitespace-nowrap font-serif text-sm tracking-tight text-text"
            initial={false}
            animate={{
              width: isLogoHovered ? "auto" : 0,
              opacity: isLogoHovered ? 1 : 0,
              x: isLogoHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="transition-colors group-hover:text-accent-2">
              Tannia
            </span>
            <span className="transition-colors group-hover:text-accent-2">
              Silva
            </span>
          </motion.div>

          {/* T — S compact */}
          <motion.div
            className="flex flex-col items-center"
            initial={false}
            animate={{
              opacity: isLogoHovered ? 0 : 1,
              scale: isLogoHovered ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-serif text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent-2">
              T
            </span>
            <span className="h-8 w-px bg-line"></span>
            <span className="font-serif text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent-2">
              S
            </span>
          </motion.div>
        </motion.div>
      </Link>

      {/* Navigation Items - Vertical */}
      <ul className="flex flex-col items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center justify-center transition-colors duration-150",
                  isActive ? "text-text" : "text-text-dim hover:text-text"
                )}
              >
                {/* Vertical text */}
                <span className="text-vertical text-xs uppercase tracking-widest">
                  {item.label}
                </span>

                {/* Active indicator - horizontal line */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator-vertical"
                    className="absolute -right-1 top-1/2 h-8 w-px -translate-y-1/2 bg-accent-2"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Decorative element at bottom */}
      <div className="flex flex-col items-center gap-2 opacity-30">
        <div className="h-px w-4 bg-line"></div>
        <div className="text-xs text-text-dim">◆</div>
      </div>
    </nav>
  );
}
