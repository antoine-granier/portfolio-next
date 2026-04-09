"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

interface MenuItem {
  labelFr: string;
  labelEn: string;
  action?: string;
  shortcut?: string;
  divider?: boolean;
}

const menuItems: MenuItem[] = [
  { labelFr: "Ouvrir le Finder", labelEn: "Open Finder", action: "projects", shortcut: "⌘F" },
  { labelFr: "Ouvrir le Terminal", labelEn: "Open Terminal", action: "terminal", shortcut: "⌘T" },
  { labelFr: "", labelEn: "", divider: true },
  { labelFr: "Photos", labelEn: "Photos", action: "photos", shortcut: "⌘P" },
  { labelFr: "Compétences", labelEn: "Skills", action: "skills", shortcut: "⌘K" },
  { labelFr: "Voir le CV", labelEn: "View Resume", action: "cv" },
  { labelFr: "", labelEn: "", divider: true },
  { labelFr: "Contacter", labelEn: "Contact", action: "contact", shortcut: "⌘M" },
  { labelFr: "", labelEn: "", divider: true },
  { labelFr: "Changer la langue", labelEn: "Change Language", action: "lang", shortcut: "⌘L" },
  { labelFr: "Fond d'écran", labelEn: "Wallpaper", action: "wallpaper" },
];

export function ContextMenu({ x, y, isOpen, onClose, onAction }: ContextMenuProps) {
  const { locale } = useI18n();

  // Adjust position so menu doesn't go off screen
  const adjustedX = Math.min(x, typeof window !== "undefined" ? window.innerWidth - 220 : x);
  const adjustedY = Math.min(y, typeof window !== "undefined" ? window.innerHeight - 300 : y);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible overlay to catch clicks */}
          <div
            className="fixed inset-0 z-[70]"
            onClick={onClose}
            onContextMenu={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[71] w-[200px] overflow-hidden rounded-lg bg-gradient-to-b from-white/50 to-white/30 py-1 shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.5),0_5px_30px_rgba(0,0,0,0.12)] backdrop-blur-[20px] backdrop-saturate-[2]"
            style={{ left: adjustedX, top: adjustedY }}
          >
            {menuItems.map((item, i) => {
              if (item.divider) {
                return (
                  <div
                    key={`div-${i}`}
                    className="mx-2 my-1 h-px bg-black/10"
                  />
                );
              }

              const label = locale === "fr" ? item.labelFr : item.labelEn;

              return (
                <button
                  key={item.action}
                  onClick={() => {
                    onAction(item.action!);
                    onClose();
                  }}
                  className="mx-1 flex w-[calc(100%-8px)] items-center justify-between rounded-[4px] px-2 py-[5px] text-[13px] text-[#1d1d1f] transition-colors hover:bg-black/5"
                >
                  <span>{label}</span>
                  {item.shortcut && (
                    <span className="text-[11px] text-[#86868b] group-hover:text-white/70">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
