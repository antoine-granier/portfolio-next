"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BentoCard } from "./bento-card";

const featuredProjects = [
  {
    title: "CRM Motima",
    description: "Application CRM complète pour la gestion client",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    slug: "crm-motima",
  },
  {
    title: "Discogs Redesign",
    description: "Refonte UI/UX de la plateforme musicale",
    tech: ["React", "Figma", "Tailwind"],
    slug: "discogs-redesign",
  },
];

export function ProjectsCard() {
  return (
    <BentoCard span="2x1" className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Projets
        </p>
        <Link
          href="/projects"
          className="text-xs font-medium text-accent transition-colors hover:text-accent/80"
        >
          Voir tout &rarr;
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block rounded-2xl bg-background/50 p-4 transition-colors hover:bg-background/80"
            >
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <p className="mt-1 text-xs text-muted">{project.description}</p>
              <div className="mt-2 flex gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
