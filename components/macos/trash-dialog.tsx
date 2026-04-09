"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface TrashDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

type Stage = "alert" | "repairing" | "done";

export function TrashDialog({ isOpen, onCancel, onComplete }: TrashDialogProps) {
  const { locale } = useI18n();
  const [stage, setStage] = useState<Stage>("alert");
  const [progress, setProgress] = useState(0);
  const isFr = locale === "fr";

  useEffect(() => {
    if (stage !== "repairing") return;

    setProgress(0);
    const steps = [
      { p: 12, t: 300 },
      { p: 25, t: 600 },
      { p: 38, t: 900 },
      { p: 52, t: 1400 },
      { p: 61, t: 1800 },
      { p: 74, t: 2200 },
      { p: 89, t: 2800 },
      { p: 95, t: 3200 },
      { p: 100, t: 3600 },
    ];

    const timers = steps.map(({ p, t }) =>
      setTimeout(() => setProgress(p), t)
    );

    const done = setTimeout(() => {
      setStage("done");
      setTimeout(() => {
        onComplete();
        setStage("alert");
      }, 500);
    }, 4000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [stage, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* Dialog in macOS window */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative w-[340px] overflow-hidden rounded-xl border border-black/10 bg-card shadow-2xl"
      >
        {/* macOS title bar */}
        <div className="flex h-9 items-center gap-2 border-b border-black/5 bg-window-title px-3">
          <div className="flex gap-1.5">
            <button
              onClick={onCancel}
              className="group h-3 w-3 rounded-full bg-window-close transition-colors hover:bg-red-600"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100">
                <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
              </svg>
            </button>
            <div className="h-3 w-3 rounded-full bg-window-minimize" />
            <div className="h-3 w-3 rounded-full bg-window-maximize" />
          </div>
          <span className="flex-1 text-center text-[13px] font-medium text-foreground/70">
            {isFr ? "Alerte système" : "System Alert"}
          </span>
          <div className="w-[52px]" />
        </div>

        <div className="flex flex-col items-center px-6 pt-5 pb-5 text-center bg-white">
          {/* Icon */}
          <div>
            {stage === "alert" && (
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff9500]/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            )}
            {stage === "repairing" && (
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#007aff]/10">
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#007aff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </motion.svg>
              </div>
            )}
            {stage === "done" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#34c759]/10"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <p className="text-[14px] font-bold text-[#1d1d1f]">
            {stage === "alert" &&
              (isFr
                ? "Dossier corrompu"
                : "Corrupted folder")}
            {stage === "repairing" &&
              (isFr
                ? "Réparation en cours..."
                : "Repairing...")}
            {stage === "done" &&
              (isFr
                ? "Réparation terminée !"
                : "Repair complete!")}
          </p>

          {/* Description */}
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#86868b]">
            {stage === "alert" &&
              (isFr
                ? "Le fichier « Corbeille » semble endommagé et ne peut pas être ouvert. Voulez-vous tenter une réparation ?"
                : 'The file "Trash" appears to be damaged and cannot be opened. Would you like to attempt a repair?')}
            {stage === "repairing" &&
              (isFr
                ? "Analyse et reconstruction des fichiers..."
                : "Analyzing and rebuilding files...")}
            {stage === "done" &&
              (isFr
                ? "Tous les fichiers ont été récupérés."
                : "All files have been recovered.")}
          </p>

          {/* Progress bar (repairing stage) */}
          {stage === "repairing" && (
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full rounded-full bg-[#007aff]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          )}
        </div>

        {/* Buttons (alert stage only) */}
        {stage === "alert" && (
          <div className="flex justify-end gap-2 border-t border-black/5 bg-white px-5 py-3">
            <button
              onClick={onCancel}
              className="rounded-md border border-black/10 bg-white px-4 py-1.5 text-[12px] font-medium text-[#1d1d1f] shadow-sm transition-colors hover:bg-[#f5f5f5]"
            >
              {isFr ? "Annuler" : "Cancel"}
            </button>
            <button
              onClick={() => setStage("repairing")}
              className="rounded-md bg-[#007aff] px-4 py-1.5 text-[12px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {isFr ? "Réparer" : "Repair"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
