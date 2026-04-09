"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";

export interface ProjectData {
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

function SheetBody({
  children,
  sheetY,
  scrollRef,
  onClose,
}: {
  children: React.ReactNode;
  sheetY: ReturnType<typeof useMotionValue<number>>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const wasAtTopOnStart = useRef(false);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      isDragging.current = false;
      const scrollEl = scrollRef.current;
      wasAtTopOnStart.current = !scrollEl || scrollEl.scrollTop <= 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!wasAtTopOnStart.current) return;

      const scrollEl = scrollRef.current;
      const deltaY = e.touches[0].clientY - startY.current;
      const isAtTop = !scrollEl || scrollEl.scrollTop <= 0;
      const isPullingDown = deltaY > 0;

      if (isAtTop && isPullingDown) {
        e.preventDefault();
        isDragging.current = true;
        sheetY.set(deltaY * 0.5);
      } else {
        if (isDragging.current) {
          isDragging.current = false;
          animate(sheetY, 0, { type: "spring", stiffness: 400, damping: 30 });
        }
      }
    };

    const handleTouchEnd = () => {
      if (isDragging.current) {
        const currentY = sheetY.get();
        if (currentY > 120) {
          onClose();
        } else {
          animate(sheetY, 0, { type: "spring", stiffness: 400, damping: 30 });
        }
      }
      isDragging.current = false;
      wasAtTopOnStart.current = false;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sheetY, scrollRef, onClose]);

  return (
    <motion.div
      ref={sheetRef}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ y: sheetY }}
      className="fixed right-0 bottom-0 left-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-background"
    >
      <div className="flex shrink-0 justify-center pt-3 pb-2">
        <div className="h-1 w-10 rounded-full bg-foreground/15" />
      </div>
      <div ref={scrollRef} className="overflow-y-auto overscroll-contain px-5 pb-8">
        {children}
      </div>
    </motion.div>
  );
}

function ProjectSheet({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const scrollRef = useRef<HTMLDivElement>(null);
  const sheetY = useMotionValue(0);
  const backdropOpacity = useTransform(sheetY, [0, 300], [1, 0]);

  const description = isFr
    ? project.description
    : project.descriptionEn || project.description;
  const rawContent = isFr ? project.content : project.contentEn || project.content;

  const sections = rawContent
    .split(/\n## /)
    .filter(Boolean)
    .map((section) => {
      const lines = section.split("\n").filter(Boolean);
      const heading = lines[0].replace(/^#+\s*/, "");
      const body = lines.slice(1);
      return { heading, body };
    });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ opacity: backdropOpacity }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40"
      />
      <SheetBody sheetY={sheetY} scrollRef={scrollRef} onClose={onClose}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {project.title}
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-muted"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-surface-glass-border bg-surface-glass px-2.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.github ||
          project.url ||
          project.android ||
          project.ios ||
          project.chrome ||
          project.firefox ||
          project.donate) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.android && (
              <a href={project.android} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[12px] font-medium text-background">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 2.386l1.552-2.68a.39.39 0 00-.14-.531.396.396 0 00-.536.138l-1.572 2.714A8.498 8.498 0 0012 1.06a8.498 8.498 0 00-4.827.967L5.601.313a.396.396 0 00-.536-.138.39.39 0 00-.14.531l1.552 2.68C3.612 5.1 1.673 8.256 1.5 11.89h21c-.173-3.634-2.112-6.79-4.977-8.504zM7.5 8.89a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2zM1.5 13.39v7a1.5 1.5 0 003 0v-7h-3zm18 0v7a1.5 1.5 0 003 0v-7h-3zm-15 0v8.5a1.5 1.5 0 001.5 1.5h1v-2.5a1.5 1.5 0 013 0v2.5h4v-2.5a1.5 1.5 0 013 0v2.5h1a1.5 1.5 0 001.5-1.5v-8.5h-15z" />
                </svg>
                Play Store
              </a>
            )}
            {project.ios && (
              <a href={project.ios} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[12px] font-medium text-background">
                <svg width="12" height="14" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.3C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.4 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.4zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                App Store
              </a>
            )}
            {project.chrome && (
              <a href={project.chrome} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#4285f4] px-3 py-1.5 text-[12px] font-medium text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
                Chrome
              </a>
            )}
            {project.firefox && (
              <a href={project.firefox} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff7139] px-3 py-1.5 text-[12px] font-medium text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/firefox-logo.svg" alt="" className="h-3.5 w-3.5" />
                Firefox
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[12px] font-medium text-background">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-[12px] font-medium text-foreground">
                {isFr ? "Voir le site" : "Visit site"} ↗
              </a>
            )}
            {project.donate && (
              <a href={project.donate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#ffdd00] px-3 py-1.5 text-[12px] font-semibold text-[#1d1d1f]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                Buy me a coffee
              </a>
            )}
          </div>
        )}

        <div className="mt-5 border-t border-card-border pt-5">
          {sections.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-4" : ""}>
              <h3 className="text-[14px] font-semibold text-foreground">
                {section.heading}
              </h3>
              {section.body.map((line, j) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("- **")) {
                  const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[:\s]*(.*)$/);
                  if (match) {
                    return (
                      <div key={j} className="mt-1.5 flex gap-2 text-[13px] leading-relaxed">
                        <span className="mt-0.5 text-muted">•</span>
                        <span className="text-foreground">
                          <strong>{match[1]}</strong>
                          {match[2] && (
                            <span className="text-muted"> {match[2]}</span>
                          )}
                        </span>
                      </div>
                    );
                  }
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <div key={j} className="mt-1 flex gap-2 text-[13px] leading-relaxed text-muted">
                      <span className="mt-0.5">•</span>
                      <span>{trimmed.slice(2)}</span>
                    </div>
                  );
                }
                if (trimmed) {
                  return (
                    <p key={j} className="mt-2 text-[13px] leading-relaxed text-muted">
                      {trimmed}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </SheetBody>
    </>
  );
}

function MailSheet({ onClose }: { onClose: () => void }) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const to = "antoine.granier@outlook.com";

  const handleSend = () => {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_self");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 bottom-0 left-0 z-50 flex max-h-[90vh] flex-col rounded-t-3xl bg-background"
      >
        <div className="flex shrink-0 justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-foreground/15" />
        </div>

        <div className="flex shrink-0 items-center justify-between border-b border-card-border px-5 pb-3">
          <button onClick={onClose} className="text-[14px] font-medium text-accent">
            {isFr ? "Annuler" : "Cancel"}
          </button>
          <h2 className="text-[15px] font-semibold text-foreground">
            {isFr ? "Nouveau message" : "New Message"}
          </h2>
          <button
            onClick={handleSend}
            disabled={!subject.trim() && !body.trim()}
            className="flex items-center gap-1 text-[14px] font-semibold text-accent disabled:opacity-40"
          >
            {isFr ? "Envoyer" : "Send"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
          className="shrink-0 px-5"
        >
          <div className="flex items-center gap-3 border-b border-card-border py-2.5">
            <span className="w-14 text-[13px] font-medium text-muted">
              {isFr ? "De :" : "From:"}
            </span>
            <span className="text-[13px] text-foreground/50">visitor@portfolio.dev</span>
          </div>
          <div className="flex items-center gap-3 border-b border-card-border py-2.5">
            <span className="w-14 text-[13px] font-medium text-muted">
              {isFr ? "À :" : "To:"}
            </span>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[12px] font-medium text-accent">
              {to}
            </span>
          </div>
          <div className="flex items-center gap-3 border-b border-card-border py-2.5">
            <span className="w-14 text-[13px] font-medium text-muted">
              {isFr ? "Objet :" : "Subject:"}
            </span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={isFr ? "Votre sujet..." : "Your subject..."}
              className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-foreground/30"
            />
          </div>
        </motion.div>

        <motion.textarea
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35, ease: "easeOut" }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            isFr
              ? "Bonjour Antoine,\n\nJ'aimerais discuter avec vous de..."
              : "Hi Antoine,\n\nI'd like to discuss..."
          }
          className="min-h-[240px] flex-1 resize-none bg-transparent px-5 py-4 text-[14px] leading-relaxed text-foreground outline-none placeholder:text-foreground/30"
        />
      </motion.div>
    </>
  );
}

interface MobileSheetsManagerProps {
  selectedProject: ProjectData | null;
  mailOpen: boolean;
  onCloseProject: () => void;
  onCloseMail: () => void;
}

export default function MobileSheetsManager({
  selectedProject,
  mailOpen,
  onCloseProject,
  onCloseMail,
}: MobileSheetsManagerProps) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <ProjectSheet project={selectedProject} onClose={onCloseProject} />
      )}
      {mailOpen && <MailSheet onClose={onCloseMail} />}
    </AnimatePresence>
  );
}
