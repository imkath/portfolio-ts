"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilmCreditProps {
  role: string;
  name: string;
  className?: string;
  delay?: number;
}

export function FilmCredit({
  role,
  name,
  className,
  delay = 0,
}: FilmCreditProps) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-[120px_1fr] gap-4 border-b border-line/30 py-3",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <dt className="text-xs uppercase tracking-widest text-text-dim">
        {role}
      </dt>
      <dd className="font-serif text-sm text-text">{name}</dd>
    </motion.div>
  );
}

interface FilmCreditsProps {
  credits: Array<{ role: string; name: string }>;
  title?: string;
  className?: string;
}

export function FilmCredits({
  credits,
  title = "Credits",
  className,
}: FilmCreditsProps) {
  return (
    <section className={cn("relative py-16", className)}>
      <div className="ornament-divider mb-12">
        <span className="relative z-10 bg-bg px-6 text-xs uppercase tracking-widest text-text-dim">
          {title}
        </span>
      </div>

      <dl className="mx-auto max-w-2xl">
        {credits.map((credit, index) => (
          <FilmCredit
            key={`${credit.role}-${index}`}
            role={credit.role}
            name={credit.name}
            delay={index * 0.1}
          />
        ))}
      </dl>

      <motion.div
        className="ornament-divider mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: credits.length * 0.1 + 0.3 }}
      >
        <span className="relative z-10 bg-bg px-4 text-xs tracking-widest text-text-dim">
          ◆
        </span>
      </motion.div>
    </section>
  );
}
