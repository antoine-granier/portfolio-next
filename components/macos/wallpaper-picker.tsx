"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export interface Wallpaper {
  id: string;
  name: string;
  style: React.CSSProperties;
  grid?: boolean;
  dark?: boolean;
}

export const wallpapers: Wallpaper[] = [
  {
    id: "default",
    name: "Quadrillé",
    style: { background: "#e8e4dc" },
    grid: true,
  },
  {
    id: "light-gray",
    name: "Gris clair",
    style: { background: "#f0f0f0" },
    grid: true,
  },
  {
    id: "midnight",
    name: "Minuit",
    style: { background: "#1a1a2e" },
    grid: false,
    dark: true,
  },
  {
    id: "sequoia",
    name: "Sequoia",
    style: {
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d1b69 30%, #e07843 70%, #f4a261 100%)",
    },
    grid: false,
    dark: true,
  },
  {
    id: "sonoma",
    name: "Sonoma",
    style: {
      background: "linear-gradient(160deg, #2c5f2d 0%, #97bc62 40%, #f0c27f 70%, #fc5c7d 100%)",
    },
    grid: false,
  },
  {
    id: "ocean",
    name: "Océan",
    style: {
      background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
    },
    grid: false,
    dark: true,
  },
  {
    id: "sunset",
    name: "Coucher de soleil",
    style: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
    },
    grid: false,
  },
  {
    id: "aurora",
    name: "Aurore",
    style: {
      background: "linear-gradient(160deg, #0f0c29 0%, #302b63 40%, #24243e 60%, #43cea2 100%)",
    },
    grid: false,
    dark: true,
  },
  {
    id: "lavender",
    name: "Lavande",
    style: {
      background: "linear-gradient(135deg, #e6dee9 0%, #c3aed6 50%, #8675a9 100%)",
    },
    grid: true,
  },
  {
    id: "sand",
    name: "Sable",
    style: {
      background: "linear-gradient(180deg, #e8d5b7 0%, #d4a76a 100%)",
    },
    grid: true,
  },
];

interface WallpaperPickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentId: string;
  onSelect: (wallpaper: Wallpaper) => void;
}

export function WallpaperPicker({
  isOpen,
  onClose,
  currentId,
  onSelect,
}: WallpaperPickerProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed right-1/2 bottom-24 z-[61] w-[340px] translate-x-1/2 overflow-hidden rounded-xl border border-black/10 bg-card shadow-2xl"
          >
            {/* Title bar */}
            <div className="flex h-9 items-center gap-2 border-b border-black/5 bg-window-title px-3">
              <button
                onClick={onClose}
                className="group h-3 w-3 rounded-full bg-window-close transition-colors hover:bg-red-600"
              >
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <path
                    d="M3.5 3.5l5 5M8.5 3.5l-5 5"
                    stroke="rgba(0,0,0,0.6)"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
              <div className="h-3 w-3 rounded-full bg-window-minimize" />
              <div className="h-3 w-3 rounded-full bg-window-maximize" />
              <span className="flex-1 text-center text-[13px] font-medium text-foreground/70">
                {isFr ? "Fond d'écran" : "Wallpaper"}
              </span>
              <div className="w-[52px]" />
            </div>

            {/* Grid of wallpapers */}
            <div className="grid grid-cols-5 gap-2 bg-white p-3">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => {
                    onSelect(wp);
                    onClose();
                  }}
                  className={`group relative aspect-square overflow-hidden rounded-lg transition-transform hover:scale-105 ${
                    currentId === wp.id
                      ? "ring-2 ring-[#007aff] ring-offset-1"
                      : ""
                  }`}
                >
                  <div className="h-full w-full" style={wp.style} />
                  {wp.grid && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "4px 4px",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
