"use client";

import Image from "next/image";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

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

interface ProjectWindowProps {
  project: ProjectData;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ProjectWindow({
  project,
  className,
  style,
  isOpen = true,
  onClose,
}: ProjectWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  const description = isFr ? project.description : (project.descriptionEn || project.description);
  const rawContent = isFr ? project.content : (project.contentEn || project.content);

  // Simple markdown-like rendering: split by ## headings and paragraphs
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
    <Window
      title={project.title}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="max-h-[500px] overflow-y-auto bg-white macos-scrollbar">
        {/* Project image */}
        {project.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="500px"
              quality={75}
            />
          </div>
        )}

        <div className="p-6">
        {/* Header */}
        <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
          {project.title}
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#86868b]">
          {description}
        </p>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#0071e3]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#0071e3]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.github || project.url || project.android || project.ios || project.chrome || project.firefox || project.donate) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.android && (
              <a
                href={project.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1d1f] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-80"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 2.386l1.552-2.68a.39.39 0 00-.14-.531.396.396 0 00-.536.138l-1.572 2.714A8.498 8.498 0 0012 1.06a8.498 8.498 0 00-4.827.967L5.601.313a.396.396 0 00-.536-.138.39.39 0 00-.14.531l1.552 2.68C3.612 5.1 1.673 8.256 1.5 11.89h21c-.173-3.634-2.112-6.79-4.977-8.504zM7.5 8.89a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2zM1.5 13.39v7a1.5 1.5 0 003 0v-7h-3zm18 0v7a1.5 1.5 0 003 0v-7h-3zm-15 0v8.5a1.5 1.5 0 001.5 1.5h1v-2.5a1.5 1.5 0 013 0v2.5h4v-2.5a1.5 1.5 0 013 0v2.5h1a1.5 1.5 0 001.5-1.5v-8.5h-15z" />
                </svg>
                Play Store
              </a>
            )}
            {project.ios && (
              <a
                href={project.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1d1f] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-80"
              >
                <svg width="12" height="14" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.3C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.4 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.4zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                App Store
              </a>
            )}
            {project.chrome && (
              <a
                href={project.chrome}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#4285f4] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-85"
              >
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
              <a
                href={project.firefox}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff7139] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-85"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/firefox-logo.svg" alt="" className="h-3.5 w-3.5" />
                Firefox
              </a>
            )}
            {project.donate && (
              <a
                href={project.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ffdd00] px-3 py-1.5 text-[12px] font-semibold text-[#1d1d1f] transition-opacity hover:opacity-85"
              >
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
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1d1f] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-80"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/5"
              >
                {locale === "fr" ? "Voir le site" : "Visit site"} ↗
              </a>
            )}
          </div>
        )}

        {/* Content sections */}
        <div className="mt-5 border-t border-black/5 pt-5">
          {sections.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-4" : ""}>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                {section.heading}
              </h3>
              {section.body.map((line, j) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("- **")) {
                  // Bold list item
                  const match = trimmed.match(
                    /^- \*\*(.+?)\*\*\s*[:\s]*(.*)$/
                  );
                  if (match) {
                    return (
                      <div
                        key={j}
                        className="mt-1.5 flex gap-2 text-[12px] leading-relaxed"
                      >
                        <span className="mt-0.5 text-[#86868b]">•</span>
                        <span className="text-[#1d1d1f]">
                          <strong>{match[1]}</strong>
                          {match[2] && (
                            <span className="text-[#86868b]">
                              {" "}
                              {match[2]}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  }
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <div
                      key={j}
                      className="mt-1 flex gap-2 text-[12px] leading-relaxed text-[#86868b]"
                    >
                      <span className="mt-0.5">•</span>
                      <span>{trimmed.slice(2)}</span>
                    </div>
                  );
                }
                if (trimmed) {
                  return (
                    <p
                      key={j}
                      className="mt-2 text-[12px] leading-relaxed text-[#86868b]"
                    >
                      {trimmed}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
        </div>
      </div>
    </Window>
  );
}
