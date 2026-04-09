"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

interface SpotlightItem {
  id: string;
  label: string;
  labelEn: string;
  category: string;
  categoryEn: string;
  action: string;
  icon: string;
}

const items: SpotlightItem[] = [
  { id: "finder", label: "Finder — Projets", labelEn: "Finder — Projects", category: "Apps", categoryEn: "Apps", action: "projects", icon: "/icons/finder.png" },
  { id: "terminal", label: "Terminal", labelEn: "Terminal", category: "Apps", categoryEn: "Apps", action: "terminal", icon: "/icons/terminal.png" },
  { id: "photos", label: "Photos", labelEn: "Photos", category: "Apps", categoryEn: "Apps", action: "photos", icon: "/icons/photos.png" },
  { id: "mail", label: "Mail — Contact", labelEn: "Mail — Contact", category: "Apps", categoryEn: "Apps", action: "contact", icon: "/icons/mail.png" },
  { id: "notes", label: "Notes", labelEn: "Notes", category: "Apps", categoryEn: "Apps", action: "notes", icon: "/icons/notes.png" },
  { id: "reminders", label: "Rappels", labelEn: "Reminders", category: "Apps", categoryEn: "Apps", action: "reminders", icon: "/icons/remind.png" },
  { id: "music", label: "Musique", labelEn: "Music", category: "Apps", categoryEn: "Apps", action: "music", icon: "/icons/music.png" },
  { id: "settings", label: "Réglages", labelEn: "Settings", category: "Apps", categoryEn: "Apps", action: "settings", icon: "/icons/settings.png" },
  { id: "zed", label: "Zed — Éditeur", labelEn: "Zed — Editor", category: "Apps", categoryEn: "Apps", action: "zed", icon: "/icons/zed.png" },
  { id: "claude", label: "Claude — IA", labelEn: "Claude — AI", category: "Apps", categoryEn: "Apps", action: "claude", icon: "/icons/claude.png" },
  { id: "figma", label: "Figma — Design", labelEn: "Figma — Design", category: "Apps", categoryEn: "Apps", action: "figma", icon: "/icons/figma.png" },
  { id: "appstore", label: "App Store", labelEn: "App Store", category: "Apps", categoryEn: "Apps", action: "appstore", icon: "/icons/appstore.png" },
  { id: "cv", label: "CV — Resume", labelEn: "Resume — CV", category: "Documents", categoryEn: "Documents", action: "cv", icon: "/icons/pdf.png" },
  { id: "skills", label: "Compétences", labelEn: "Skills", category: "Documents", categoryEn: "Documents", action: "skills", icon: "/icons/txt.png" },
  { id: "graphite", label: "Graphite — Dessin en ligne", labelEn: "Graphite — Online drawing", category: "Projets", categoryEn: "Projects", action: "project:graphite", icon: "/icons/folder.png" },
  { id: "remind", label: "Re:mind — Rappels intelligents", labelEn: "Re:mind — Smart reminders", category: "Projets", categoryEn: "Projects", action: "project:remind", icon: "/icons/folder.png" },
  { id: "kolr", label: "Kolr — Outils couleur", labelEn: "Kolr — Color tools", category: "Projets", categoryEn: "Projects", action: "project:kolr", icon: "/icons/folder-purple.png" },
  { id: "lang", label: "Changer la langue", labelEn: "Change language", category: "Système", categoryEn: "System", action: "lang", icon: "" },
  { id: "wallpaper", label: "Fond d'écran", labelEn: "Wallpaper", category: "Système", categoryEn: "System", action: "wallpaper", icon: "" },
];

export function Spotlight({ isOpen, onClose, onAction }: SpotlightProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [search, setSearch] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return items.slice(0, 8);
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.labelEn.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.categoryEn.toLowerCase().includes(q)
    );
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIdx]) {
        e.preventDefault();
        onAction(filtered[selectedIdx].action);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIdx, onAction, onClose]);

  // Listen for Cmd+K globally
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent handles opening
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 z-[91] w-[560px] -translate-x-1/2 overflow-hidden rounded-xl bg-[#ececec] shadow-[0_10px_60px_rgba(0,0,0,0.2)]"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#86868b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isFr ? "Rechercher Spotlight" : "Spotlight Search"}
                className="flex-1 bg-transparent text-[16px] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              />
              <kbd className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-[#86868b]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {filtered.length > 0 && (
              <div className="max-h-[360px] overflow-y-auto p-1.5 macos-scrollbar">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onAction(item.action);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      selectedIdx === i ? "bg-[#007aff] text-white" : "text-[#1d1d1f]"
                    }`}
                  >
                    {item.icon ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.icon} alt="" className="h-7 w-7 object-contain" />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black/5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={selectedIdx === i ? "white" : "#86868b"} strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className={`text-[13px] font-medium ${selectedIdx === i ? "text-white" : ""}`}>
                        {isFr ? item.label : item.labelEn}
                      </p>
                    </div>
                    <span className={`text-[10px] ${selectedIdx === i ? "text-white/60" : "text-[#86868b]"}`}>
                      {isFr ? item.category : item.categoryEn}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 && search && (
              <div className="p-6 text-center text-[13px] text-[#86868b]">
                {isFr ? "Aucun résultat" : "No results"}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
