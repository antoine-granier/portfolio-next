"use client";

import { useState } from "react";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";
import { wallpapers, type Wallpaper } from "./wallpaper-picker";

export interface AccessibilitySettings {
  reduceMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

interface SettingsWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
  wallpaper: Wallpaper;
  onWallpaperChange: (wp: Wallpaper) => void;
  accessibility: AccessibilitySettings;
  onAccessibilityChange: (a: AccessibilitySettings) => void;
}

type Section = "general" | "wallpaper" | "accessibility" | "about";

export function SettingsWindow({
  className,
  style,
  isOpen = true,
  onClose,
  wallpaper,
  onWallpaperChange,
  accessibility,
  onAccessibilityChange,
}: SettingsWindowProps) {
  const { locale, toggle: toggleLang } = useI18n();
  const isFr = locale === "fr";
  const [section, setSection] = useState<Section>("general");

  const sections: { id: Section; label: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: "general",
      label: "Général",
      labelEn: "General",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "wallpaper",
      label: "Fond d'écran",
      labelEn: "Wallpaper",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
    },
    {
      id: "accessibility",
      label: "Accessibilité",
      labelEn: "Accessibility",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="4" r="1" />
          <path d="M7 8h10" />
          <path d="M12 8v8" />
          <path d="M9 20l3-4 3 4" />
        </svg>
      ),
    },
    {
      id: "about",
      label: "À propos",
      labelEn: "About",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  ];

  return (
    <Window
      title={isFr ? "Réglages" : "Settings"}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[480px]">
        {/* Sidebar */}
        <div className="w-44 border-r border-black/5 bg-[#f5f3f0] p-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`mt-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                section === s.id
                  ? "bg-[#007aff]/10 font-medium text-[#007aff]"
                  : "text-[#1d1d1f]/60 hover:bg-black/5"
              }`}
            >
              {s.icon}
              {isFr ? s.label : s.labelEn}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white p-5 macos-scrollbar">
          {section === "general" && (
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                {isFr ? "Général" : "General"}
              </h3>

              {/* Language */}
              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f5f5f7] p-4">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">
                    {isFr ? "Langue" : "Language"}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? "Changer la langue de l'interface" : "Change interface language"}
                  </p>
                </div>
                <button
                  onClick={toggleLang}
                  className="rounded-lg bg-[#007aff] px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  {locale === "fr" ? "EN" : "FR"}
                </button>
              </div>

              {/* Reset */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f5f5f7] p-4">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">
                    {isFr ? "Réinitialiser" : "Reset"}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? "Fermer toutes les fenêtres" : "Close all windows"}
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-[#f5f5f5]"
                >
                  {isFr ? "Réinitialiser" : "Reset"}
                </button>
              </div>
            </div>
          )}

          {section === "wallpaper" && (
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                {isFr ? "Fond d'écran" : "Wallpaper"}
              </h3>
              <p className="mt-1 text-[11px] text-[#86868b]">
                {isFr ? "Choisissez un fond d'écran pour votre bureau" : "Choose a wallpaper for your desktop"}
              </p>

              <div className="mt-4 grid grid-cols-4 gap-3">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => onWallpaperChange(wp)}
                    className={`group relative aspect-[16/10] overflow-hidden rounded-xl transition-transform hover:scale-105 ${
                      wallpaper.id === wp.id ? "ring-2 ring-[#007aff] ring-offset-2" : ""
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-1.5 pb-1 pt-3">
                      <p className="text-[9px] font-medium text-white">{wp.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === "accessibility" && (
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                {isFr ? "Accessibilité" : "Accessibility"}
              </h3>

              {/* Reduce Motion */}
              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f5f5f7] p-4">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">
                    {isFr ? "Réduire les animations" : "Reduce motion"}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? "Désactive les animations du bureau" : "Disable desktop animations"}
                  </p>
                </div>
                <button
                  onClick={() => onAccessibilityChange({ ...accessibility, reduceMotion: !accessibility.reduceMotion })}
                  className={`relative h-[22px] w-[40px] rounded-full transition-colors ${accessibility.reduceMotion ? "bg-[#34c759]" : "bg-[#e0e0e0]"}`}
                >
                  <div
                    className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-all"
                    style={{ left: accessibility.reduceMotion ? "20px" : "2px" }}
                  />
                </button>
              </div>

              {/* Large Text */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f5f5f7] p-4">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">
                    {isFr ? "Texte plus grand" : "Larger text"}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? "Augmente la taille des textes" : "Increase text sizes"}
                  </p>
                </div>
                <button
                  onClick={() => onAccessibilityChange({ ...accessibility, largeText: !accessibility.largeText })}
                  className={`relative h-[22px] w-[40px] rounded-full transition-colors ${accessibility.largeText ? "bg-[#34c759]" : "bg-[#e0e0e0]"}`}
                >
                  <div
                    className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-all"
                    style={{ left: accessibility.largeText ? "20px" : "2px" }}
                  />
                </button>
              </div>

              {/* High Contrast */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f5f5f7] p-4">
                <div>
                  <p className="text-[13px] font-medium text-[#1d1d1f]">
                    {isFr ? "Contraste élevé" : "High contrast"}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? "Renforce les bordures et textes" : "Enhance borders and text"}
                  </p>
                </div>
                <button
                  onClick={() => onAccessibilityChange({ ...accessibility, highContrast: !accessibility.highContrast })}
                  className={`relative h-[22px] w-[40px] rounded-full transition-colors ${accessibility.highContrast ? "bg-[#34c759]" : "bg-[#e0e0e0]"}`}
                >
                  <div
                    className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-all"
                    style={{ left: accessibility.highContrast ? "20px" : "2px" }}
                  />
                </button>
              </div>
            </div>
          )}

          {section === "about" && (
            <div className="flex flex-col items-center pt-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/memoji.png"
                alt="Antoine Granier"
                className="h-20 w-20 rounded-full object-cover"
              />
              <h3 className="mt-3 text-[16px] font-bold text-[#1d1d1f]">
                Antoine Granier
              </h3>
              <p className="text-[12px] text-[#86868b]">
                {isFr ? "Développeur Fullstack" : "Fullstack Developer"}
              </p>

              <div className="mt-5 w-full space-y-1 text-left">
                <div className="flex justify-between rounded-lg bg-[#f5f5f7] px-3 py-2">
                  <span className="text-[12px] text-[#86868b]">Portfolio</span>
                  <span className="text-[12px] text-[#1d1d1f]">v1.0.0</span>
                </div>
                <div className="flex justify-between rounded-lg bg-[#f5f5f7] px-3 py-2">
                  <span className="text-[12px] text-[#86868b]">Next.js</span>
                  <span className="text-[12px] text-[#1d1d1f]">16.2.2</span>
                </div>
                <div className="flex justify-between rounded-lg bg-[#f5f5f7] px-3 py-2">
                  <span className="text-[12px] text-[#86868b]">React</span>
                  <span className="text-[12px] text-[#1d1d1f]">19.2.4</span>
                </div>
              </div>

              <p className="mt-5 text-[10px] text-[#86868b]">
                &copy; 2026 Antoine Granier
              </p>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
