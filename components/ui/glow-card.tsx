"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, var(--accent) / 0.06, transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border border-card-border bg-card backdrop-blur-xl transition-shadow hover:shadow-lg ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
