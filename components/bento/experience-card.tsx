"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./bento-card";

const experiences = [
  {
    company: "Aloes",
    role: "Développeur Fullstack",
    period: "2023 - Présent",
    current: true,
  },
  {
    company: "Efrei Paris",
    role: "Master Web & Management",
    period: "2023 - 2025",
    current: false,
  },
  {
    company: "Sorbonne",
    role: "Licence Pro Web",
    period: "2022 - 2023",
    current: false,
  },
];

export function ExperienceCard() {
  return (
    <BentoCard className="p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        Parcours
      </p>
      <div className="flex flex-col gap-3">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
            className="relative pl-4"
          >
            <div className="absolute top-1.5 left-0 h-2 w-2 rounded-full border-2 border-accent bg-background" />
            {i < experiences.length - 1 && (
              <div className="absolute top-3.5 left-[3px] h-full w-px bg-card-border" />
            )}
            <p className="text-xs font-semibold leading-tight">
              {exp.company}
              {exp.current && (
                <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              )}
            </p>
            <p className="text-[11px] text-muted">{exp.role}</p>
            <p className="text-[10px] text-muted/70">{exp.period}</p>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
