"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface ClaudeWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

const analysisFr = [
  "Analyse de l'empreinte numérique...",
  "Scan des cookies en cours...",
  "Détection du navigateur...",
  "Profilage comportemental...",
  "Génération du profil...",
];

const analysisEn = [
  "Analyzing digital footprint...",
  "Scanning cookies...",
  "Detecting browser...",
  "Behavioral profiling...",
  "Generating profile...",
];

interface ProfileLine {
  label: string;
  labelEn: string;
  value: string;
  valueEn: string;
}

const profileLines: ProfileLine[] = [
  { label: "Type", labelEn: "Type", value: "Probablement un recruteur", valueEn: "Probably a recruiter" },
  { label: "Humeur", labelEn: "Mood", value: "Curieux et impressionné", valueEn: "Curious and impressed" },
  { label: "Pensée", labelEn: "Thinking", value: "\"Ce portfolio est stylé\"", valueEn: "\"This portfolio is cool\"" },
  { label: "Prochaine action", labelEn: "Next action", value: "Envoyer un mail à Antoine", valueEn: "Send Antoine an email" },
  { label: "Compatibilité", labelEn: "Compatibility", value: "98.7%", valueEn: "98.7%" },
  { label: "Recommandation", labelEn: "Recommendation", value: "Embaucher immédiatement", valueEn: "Hire immediately" },
];

type Stage = "scanning" | "profile";

export function ClaudeWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: ClaudeWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [stage, setStage] = useState<Stage>("scanning");
  const [scanLine, setScanLine] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = isFr ? analysisFr : analysisEn;

  useEffect(() => {
    if (stage !== "scanning") return;

    setScanLine(0);
    setProgress(0);

    const lineTimers = steps.map((_, i) =>
      setTimeout(() => {
        setScanLine(i);
        setProgress(((i + 1) / steps.length) * 100);
      }, i * 600)
    );

    const doneTimer = setTimeout(() => {
      setStage("profile");
    }, steps.length * 600 + 400);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [stage, steps]);

  // Reset on reopen
  useEffect(() => {
    if (isOpen) {
      setStage("scanning");
    }
  }, [isOpen]);

  return (
    <Window
      title="Claude"
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="bg-[#2b2a27] p-5 text-white" style={{ minHeight: "320px" }}>
        {/* Claude logo */}
        <div className="mb-4 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/claude.png"
            alt="Claude"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <div>
            <p className="text-[13px] font-semibold">Claude</p>
            <p className="text-[10px] text-white/40">by Anthropic</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {stage === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Scan lines */}
              <div className="mb-4 flex flex-col gap-1.5">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      i <= scanLine
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {i < scanLine ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : i === scanLine ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    ) : null}
                    <span className={`font-mono text-[11px] ${i < scanLine ? "text-white/40" : "text-white/70"}`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[#007aff]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {stage === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mb-4 text-[12px] text-white/50">
                {isFr
                  ? "Analyse terminée. Voici ce que je sais sur vous :"
                  : "Analysis complete. Here's what I know about you:"}
              </p>

              <div className="flex flex-col gap-2">
                {profileLines.map((line, i) => (
                  <motion.div
                    key={line.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2"
                  >
                    <span className="shrink-0 text-[11px] font-medium text-white/40">
                      {isFr ? line.label : line.labelEn}
                    </span>
                    <span className="text-right text-[12px] text-white/80">
                      {isFr ? line.value : line.valueEn}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-5 text-center text-[10px] text-white/30"
              >
                {isFr
                  ? "* Résultats 100% fiables (ou presque)"
                  : "* Results 100% accurate (or almost)"}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
