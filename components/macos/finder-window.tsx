"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

type FinderTab = "projects" | "photos";

const photos = [
  { src: "/images/photography/photo-1.jpg", alt: "Photo 1" },
  { src: "/images/photography/photo-2.jpg", alt: "Photo 2" },
  { src: "/images/photography/photo-3.jpg", alt: "Photo 3" },
  { src: "/images/photography/photo-4.jpg", alt: "Photo 4" },
  { src: "/images/photography/photo-5.jpg", alt: "Photo 5" },
  { src: "/images/photography/photo-6.jpg", alt: "Photo 6" },
];


interface FinderWindowProps {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  projects: { slug: string; title: string; tech: string[] }[];
  isOpen?: boolean;
  onClose?: () => void;
  onSelectProject?: (slug: string) => void;
  onSelectPhoto?: (src: string, alt: string) => void;
  initialTab?: FinderTab;
}

export function FinderWindow({
  className,
  style,
  delay = 0,
  projects,
  isOpen = true,
  onClose,
  onSelectProject,
  onSelectPhoto,
  initialTab = "projects",
}: FinderWindowProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<FinderTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const title =
    activeTab === "projects"
      ? `~/${t("finder.projects").toLowerCase()}`
      : `~/${t("dock.photos").toLowerCase()}`;

  return (
    <Window
      title={title}
      className={className}
      style={style}
      delay={delay}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="w-40 border-r border-black/5 bg-[#f5f3f0] p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {t("finder.favorites")}
          </p>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              activeTab === "projects"
                ? "bg-accent/10 font-medium text-accent"
                : "text-foreground/60 hover:bg-black/5"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/folder.png" alt="" className="h-5 w-5 object-contain" />
            {t("finder.projects")}
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              activeTab === "photos"
                ? "bg-accent/10 font-medium text-accent"
                : "text-foreground/60 hover:bg-black/5"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/photos.png" alt="" className="h-5 w-5 object-contain" />
            {t("dock.photos")}
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[400px] max-h-[500px] flex-1 overflow-y-auto p-4 macos-scrollbar">
          {activeTab === "projects" && (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <button
                    onClick={() => onSelectProject?.(project.slug)}
                    className="group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-accent/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={i % 2 === 0 ? "/icons/folder.png" : "/icons/folder-purple.png"}
                      alt=""
                      className="h-12 w-12 object-contain"
                    />
                    <span className="max-w-[80px] text-center text-[11px] font-medium leading-tight">
                      {project.title}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="grid grid-cols-3 gap-1.5">
              {photos.map((photo, i) => (
                <motion.button
                  key={photo.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => onSelectPhoto?.(photo.src, photo.alt)}
                  className="relative aspect-square overflow-hidden rounded-md bg-card-border"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="150px"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
