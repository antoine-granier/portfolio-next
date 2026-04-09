"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BentoCard } from "./bento-card";

export function HeroCard() {
  return (
    <BentoCard span="2x2" className="flex flex-col justify-between p-8 lg:p-10">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-accent">
            Disponible pour de nouveaux projets
          </span>
        </div>

        <AnimatedText
          text="Antoine Granier"
          as="h1"
          className="text-4xl font-bold tracking-tight lg:text-5xl"
        />
        <AnimatedText
          text="Développeur Fullstack"
          as="h2"
          className="mt-2 text-2xl font-medium text-muted lg:text-3xl"
        />

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          Je conçois et développe des applications web modernes avec une
          attention particulière au design, à la performance et à
          l&apos;expérience utilisateur.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <MagneticButton href="mailto:antoine.granier@outlook.com">
          Me contacter
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </MagneticButton>
        <MagneticButton
          href="/cv-antoine-granier.pdf"
          className="bg-transparent !text-foreground border border-card-border hover:!bg-card"
        >
          Télécharger CV
        </MagneticButton>
      </div>
    </BentoCard>
  );
}
