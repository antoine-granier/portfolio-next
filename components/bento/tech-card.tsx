"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./bento-card";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
];

export function TechCard() {
  return (
    <BentoCard className="p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        Stack
      </p>
      <div className="grid grid-cols-2 gap-2">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 rounded-xl bg-background/50 px-3 py-2"
          >
            <span className="text-sm">{tech.icon}</span>
            <span className="text-xs font-medium">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
