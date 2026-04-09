"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface MenuBarProps {
  onAction?: (action: string) => void;
  isDark?: boolean;
  onWifiToggle?: () => void;
  onDateClick?: () => void;
  onSpotlightToggle?: () => void;
}

export function MenuBar({ onAction, isDark, onWifiToggle, onDateClick, onSpotlightToggle }: MenuBarProps) {
  const [time, setTime] = useState("");
  const { locale, toggle, t } = useI18n();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
          weekday: "long",
        }) +
          " " +
          now.toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <div className={`fixed top-0 right-0 left-0 z-50 flex h-7 items-center justify-between px-4 text-[13px] font-medium select-none ${isDark ? "bg-gradient-to-b from-white/10 to-white/5 shadow-[inset_0_-0.5px_0_0_rgba(255,255,255,0.1)] text-white backdrop-blur-[20px] backdrop-saturate-[2]" : "bg-gradient-to-b from-white/60 to-white/40 shadow-[inset_0_-0.5px_0_0_rgba(0,0,0,0.05)] text-[#1d1d1f] backdrop-blur-[20px] backdrop-saturate-[2]"}`}>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/memoji.png"
          alt="AG"
          className="h-5 w-5 rounded-full object-cover"
          draggable={false}
        />
        <span className="font-semibold">{t("menu.portfolio")}</span>
        <button
          onClick={() => onAction?.("projects")}
          className="cursor-default opacity-60 transition-opacity hover:opacity-100"
        >
          {t("menu.projects")}
        </button>
        <button
          onClick={() => onAction?.("photos")}
          className="cursor-default opacity-60 transition-opacity hover:opacity-100"
        >
          {t("menu.photo")}
        </button>
        <button
          onClick={() => onAction?.("contact")}
          className="cursor-default opacity-60 transition-opacity hover:opacity-100"
        >
          {t("menu.contact")}
        </button>
      </div>
      <div className="flex items-center gap-3 opacity-70">
        <button onClick={onSpotlightToggle} className="rounded p-0.5 transition-colors hover:bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          onClick={toggle}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[12px] opacity-100 transition-colors hover:bg-white/10"
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
        <button onClick={onWifiToggle} className="rounded p-0.5 transition-colors hover:bg-white/10">
          <svg
            width="15"
            height="11"
            viewBox="0 0 24 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <path d="M2 5a20 20 0 0 1 20 0" />
            <path d="M6 9a12 12 0 0 1 12 0" />
            <path d="M10 13a4 4 0 0 1 4 0" />
            <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
          </svg>
        </button>
        <button onClick={onDateClick} className="rounded px-1 py-0.5 text-[12px] capitalize transition-colors hover:bg-white/10">
          {time}
        </button>
      </div>
    </div>
  );
}
