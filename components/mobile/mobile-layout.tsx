"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ThemeToggle } from "./theme-toggle";

// Lazy-load the bottom sheets so framer-motion + sheet code stays out of the
// initial mobile bundle. They're only needed when the user opens a project or
// the contact form.
const MobileSheetsManager = dynamic(() => import("./mobile-sheets"), {
  ssr: false,
});

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  tech: string[];
  content: string;
  contentEn?: string;
  github?: string;
  url?: string;
  android?: string;
  ios?: string;
  chrome?: string;
  firefox?: string;
  donate?: string;
}

interface MobileLayoutProps {
  projects: ProjectData[];
  onOpenContact?: () => void;
}

const techs = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#000000" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#339933" },
  { name: "React Native", color: "#61dafb" },
  { name: "Expo", color: "#000020" },
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "PostgreSQL", color: "#4169e1" },
  { name: "Prisma", color: "#2d3748" },
  { name: "Docker", color: "#2496ed" },
  { name: "Git", color: "#f05032" },
  { name: "Figma", color: "#a259ff" },
];

function TechMarquee() {
  // Row 1: techs in original order, Row 2: reversed
  return (
    <div className="flex flex-col gap-2.5">
      <MarqueeRow items={techs} direction="left" />
      <MarqueeRow items={techs.slice().reverse()} direction="right" />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: { name: string; color: string }[];
  direction: "left" | "right";
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className={`marquee-track marquee-track-${direction} flex gap-2.5`}>
        {/* Duplicate twice for seamless loop */}
        {[...items, ...items].map((tech, i) => (
          <TechPill key={i} name={tech.name} color={tech.color} />
        ))}
      </div>
    </div>
  );
}

function TechPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-card-border bg-surface-glass px-4 py-2">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] font-medium text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function MobileLayout({ projects }: MobileLayoutProps) {
  const { locale, toggle, t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [mailOpen, setMailOpen] = useState(false);

  const onOpenContact = () => setMailOpen(true);

  // ── Project slider state ────────────────────────────────────────────────
  // sliderRef     : the scrollable track, used as IntersectionObserver root
  // activeProject : index of the card currently centered, drives the dots
  // (Side fade is done with `mask-image` on the scroll container — pure CSS,
  // no scroll listener needed.)
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Observe each card and update activeProject when one enters the central
    // strip of the slider. rootMargin shrinks the root horizontally so only
    // the central ~10% counts as "active".
    const cards = slider.querySelectorAll<HTMLElement>("[data-card-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-card-index"));
            setActiveProject(idx);
          }
        }
      },
      {
        root: slider,
        rootMargin: "0px -45% 0px -45%",
        threshold: 0,
      },
    );
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [projects.length]);

  const scrollToProject = (idx: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector<HTMLElement>(
      `[data-card-index="${idx}"]`,
    );
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="noise-background relative min-h-screen pt-12 pb-8">
      {/* Ambient color halos - fixed viewport layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-20 -left-32 h-[340px] w-[340px] rounded-full bg-[#007aff]/25 blur-[100px]" />
        <div className="absolute top-[30%] -right-32 h-[320px] w-[320px] rounded-full bg-[#af52de]/25 blur-[100px]" />
        <div className="absolute top-[60%] -left-20 h-[280px] w-[280px] rounded-full bg-[#ff9500]/20 blur-[110px]" />
        <div className="absolute bottom-0 -right-20 h-[260px] w-[260px] rounded-full bg-[#ff3b7f]/20 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="fixed top-0 right-0 left-0 z-40 h-12">
        {/* Background layer with blur (isolated from content) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-surface-glass-border bg-surface-glass backdrop-blur-xl"
        />
        {/* Content layer (sharp, not affected by backdrop-filter) */}
        <div className="relative flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/memoji.png"
              alt="AG"
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-cover"
              draggable={false}
            />
            <span className="text-sm font-semibold">{t("menu.portfolio")}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={toggle}
              className="flex items-center gap-1 rounded px-2 py-1 text-[12px] transition-colors hover:bg-foreground/5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="font-semibold">
                {locale === "fr" ? "FR" : "EN"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-lg px-4 pt-6">
        {/* Hero - impactant */}
        <section className="relative mb-10">
          {/* Decorative gradient blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-60 w-60 rounded-full bg-gradient-to-br from-[#007aff]/20 via-[#af52de]/20 to-[#ff9500]/20 blur-3xl"
          />

          {/* Profile photo with animated ring */}
          <Reveal className="flex justify-center pt-4">
            <div className="relative">
              {/* Rotating gradient ring */}
              <div className="spin-slow absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#007aff] via-[#af52de] to-[#ff9500]" />
              {/* Photo */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-background">
                <Image
                  src="/images/memoji.png"
                  alt="Antoine Granier"
                  width={112}
                  height={112}
                  preload
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              {/* Pulsing online indicator */}
              <div className="absolute right-1 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-background">
                <div className="relative h-3 w-3">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative block h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Availability badge */}
          <Reveal delay={1} className="mt-5 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/15 px-3 py-1 dark:border-green-400/30 dark:bg-green-400/15">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
              <span className="text-[11px] font-semibold text-green-700 dark:text-green-300">
                {locale === "fr"
                  ? "Ouvert à toute opportunité"
                  : "Open to any opportunity"}
              </span>
            </div>
          </Reveal>

          {/* Name + Title */}
          <Reveal delay={2} className="mt-4 text-center">
            <h1 className="text-[28px] font-bold tracking-tight text-foreground">
              Antoine Granier
            </h1>
            <p className="mt-1 font-serif text-lg italic text-foreground/60">
              {locale === "fr"
                ? "Développeur Fullstack"
                : "Fullstack Developer"}
            </p>
          </Reveal>

          {/* Location */}
          <Reveal
            delay={2}
            className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Paris, France
          </Reveal>

          {/* Description */}
          <Reveal
            as="p"
            delay={3}
            className="mt-5 text-center text-[13px] leading-relaxed text-muted"
          >
            {t("about.text")}
          </Reveal>

          {/* Stats row */}
          <Reveal delay={4} className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-card-border bg-card/50 p-3 text-center backdrop-blur-xl">
              <p className="text-xl font-bold text-foreground">3+</p>
              <p className="text-[10px] text-muted">
                {locale === "fr" ? "ans d'exp." : "years exp."}
              </p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card/50 p-3 text-center backdrop-blur-xl">
              <p className="text-xl font-bold text-foreground">
                {projects.length}
              </p>
              <p className="text-[10px] text-muted">
                {locale === "fr" ? "projets" : "projects"}
              </p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card/50 p-3 text-center backdrop-blur-xl">
              <p className="text-xl font-bold text-foreground">∞</p>
              <p className="text-[10px] text-muted">
                {locale === "fr" ? "motivation" : "motivation"}
              </p>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={5} className="mt-5 flex gap-2">
            <button
              onClick={onOpenContact}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-xs font-semibold text-background active:scale-95 transition-transform"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t("menu.contact")}
            </button>
            <a
              href="/cv-antoine-granier.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-card-border bg-card/50 px-4 py-3 text-xs font-semibold backdrop-blur-xl active:scale-95 transition-transform"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CV
            </a>
          </Reveal>
        </section>

        {/* Tech marquee - infinite scroll */}
        <Reveal as="section" className="-mx-4 mb-8">
          <h2 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
            {locale === "fr" ? "Stack technique" : "Tech stack"}
          </h2>
          <TechMarquee />
        </Reveal>

        {/* Projects - horizontal slider with native scroll-snap */}
        <section className="mb-8">
          <Reveal className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t("finder.projects")}
            </h2>
            <span className="text-[11px] text-muted">
              {projects.length}{" "}
              {locale === "fr"
                ? projects.length > 1
                  ? "projets"
                  : "projet"
                : projects.length > 1
                  ? "projects"
                  : "project"}
            </span>
          </Reveal>

          <Reveal>
            <div className="-mx-4">
              <div
                ref={sliderRef}
                className="overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  // Fade the cards themselves to transparent at the edges
                  // (iOS App Store style). No coloured overlay, no JS — the
                  // real background simply shows through.
                  maskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                }}
              >
                <div className="flex gap-4 px-4 pb-1">
                  {projects.map((project, i) => (
                    <button
                      key={project.slug}
                      data-card-index={i}
                      onClick={() => setSelectedProject(project)}
                      className="slider-card group relative shrink-0 w-[85vw] max-w-sm snap-start overflow-hidden rounded-3xl border border-card-border bg-card/50 text-left backdrop-blur-xl"
                    >
                    {/* Project image */}
                    {project.image && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#007aff]/5 to-[#af52de]/5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 85vw, 384px"
                          className="object-cover"
                          draggable={false}
                        />
                      {/* Gradient overlay bottom */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      {/* Title on image */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3
                          className="text-xl font-bold tracking-tight text-white"
                          style={{
                            textShadow:
                              "0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.8)",
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {!project.image && (
                      <h3 className="mb-1.5 text-base font-bold text-foreground">
                        {project.title}
                      </h3>
                    )}
                    <p className="text-[12px] leading-relaxed text-muted">
                      {locale === "fr"
                        ? project.description
                        : project.descriptionEn || project.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-surface-glass-border bg-surface-glass px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="rounded-full border border-surface-glass-border bg-surface-glass-soft px-2 py-0.5 text-[10px] font-medium text-muted backdrop-blur-sm">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View button */}
                    <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
                      {locale === "fr" ? "Voir le projet" : "View project"}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-active:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    </div>
                  </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots indicator — clickable, reflects active card */}
            <div className="mt-4 flex justify-center gap-1.5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToProject(i)}
                  aria-label={
                    locale === "fr"
                      ? `Aller au projet ${i + 1}`
                      : `Go to project ${i + 1}`
                  }
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeProject
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-foreground/25"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Contact & Socials - CTA card */}
        <section className="mb-6">
          <Reveal className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br from-[#007aff]/10 via-[#af52de]/10 to-[#ff9500]/10 p-6 backdrop-blur-xl">
            {/* Decorative blob */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#007aff]/30 to-[#af52de]/30 blur-3xl" />

            <div className="relative">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/15 px-2.5 py-1 dark:border-green-400/30 dark:bg-green-400/15">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 dark:bg-green-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                </span>
                <span className="text-[10px] font-semibold text-green-700 dark:text-green-300">
                  {locale === "fr" ? "Réponse sous 24h" : "Reply within 24h"}
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {locale === "fr" ? "Discutons" : "Let's chat"}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {locale === "fr"
                  ? "Un projet, une idée, ou juste envie d'échanger ? N'hésite pas à m'écrire, je réponds vite."
                  : "A project, an idea, or just want to say hi? Drop me a message, I reply fast."}
              </p>

              <button
                onClick={onOpenContact}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3.5 text-sm font-semibold text-background shadow-lg shadow-foreground/10 transition-transform active:scale-[0.96]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {locale === "fr" ? "Envoyer un message" : "Send a message"}
              </button>

              {/* Socials row */}
              <p className="mt-4 text-center text-[11px] text-muted">
                {locale === "fr" ? "ou" : "or"}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <a
                  href="https://github.com/antoine-granier"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-card/50 text-foreground/70 backdrop-blur-xl active:scale-95 transition-transform"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/antoine-granier"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-card/50 text-foreground/70 backdrop-blur-xl active:scale-95 transition-transform"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:antoine.granier@outlook.com"
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-card/50 text-foreground/70 backdrop-blur-xl active:scale-95 transition-transform"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <Reveal as="p" className="text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Antoine Granier
        </Reveal>
      </div>

      {/* iOS bottom sheets — lazy-loaded chunk (framer-motion isolated here) */}
      {(selectedProject || mailOpen) && (
        <MobileSheetsManager
          selectedProject={selectedProject}
          mailOpen={mailOpen}
          onCloseProject={() => setSelectedProject(null)}
          onCloseMail={() => setMailOpen(false)}
        />
      )}
    </div>
  );
}
