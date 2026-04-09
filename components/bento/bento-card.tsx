"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { GlowCard } from "@/components/ui/glow-card";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
}

const spanClasses: Record<string, string> = {
  "1x1": "",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

export function BentoCard({
  children,
  className = "",
  span = "1x1",
}: BentoCardProps) {
  return (
    <motion.div variants={fadeUp} className={spanClasses[span]}>
      <GlowCard className={`h-full ${className}`}>{children}</GlowCard>
    </motion.div>
  );
}
