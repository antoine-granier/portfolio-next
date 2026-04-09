"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

const apps = [
  { name: "Finder", icon: "/icons/finder.png" },
  { name: "Terminal", icon: "/icons/terminal.png" },
  { name: "Mail", icon: "/icons/mail.png" },
  { name: "Photos", icon: "/icons/photos.png" },
  { name: "Notes", icon: "/icons/notes.png" },
  { name: "Rappels", icon: "/icons/remind.png" },
  { name: "Music", icon: "/icons/music.png" },
  { name: "App Store", icon: "/icons/appstore.png" },
  { name: "Réglages", icon: "/icons/settings.png" },
  { name: "Zed", icon: "/icons/zed.png" },
  { name: "Claude", icon: "/icons/claude.png" },
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "GitHub", icon: "/icons/github.png" },
  { name: "LinkedIn", icon: "/icons/linkedin.png" },
  { name: "VS Code", icon: "/icons/vscode.png" },
  { name: "Docker", icon: "/icons/docker.png" },
  { name: "Notion", icon: "/icons/notion.png" },
  { name: "Slack", icon: "/icons/slack.png" },
  { name: "Arc", icon: "/icons/arc.png" },
  { name: "Discord", icon: "/icons/discord.png" },
];

export function Launchpad({ isOpen, onClose }: LaunchpadProps) {
  const { locale } = useI18n();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredApps = useMemo(() => {
    if (!search.trim()) return apps;
    const q = search.toLowerCase();
    return apps.filter((app) => app.name.toLowerCase().includes(q));
  }, [search]);

  // Reset search & focus input when opening
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/50 backdrop-blur-2xl"
        >
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-10"
          >
            <div className="flex h-9 w-56 items-center gap-2 rounded-lg bg-white/15 px-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 opacity-50"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "fr" ? "Rechercher" : "Search"}
                className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/40"
              />
            </div>
          </motion.div>

          {/* App grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-w-3xl grid-cols-7 gap-x-6 gap-y-8 px-8"
          >
            {filteredApps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.05 + i * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                layout
                className="flex flex-col items-center gap-1.5"
              >
                <div className="h-16 w-16 transition-transform hover:scale-110 active:scale-95">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-full w-full object-contain"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                </div>
                <span className="max-w-[72px] truncate text-center text-[11px] font-medium text-white/90">
                  {app.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* No results */}
          {filteredApps.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-white/40"
            >
              {locale === "fr" ? "Aucun résultat" : "No results"}
            </motion.p>
          )}

          {/* Page dots */}
          {!search && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex gap-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
