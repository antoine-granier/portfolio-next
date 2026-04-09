"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface RemindersWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

interface Reminder {
  id: string;
  text: string;
  textEn: string;
  done: boolean;
  priority?: boolean;
  today?: boolean;
}

const initialReminders: Reminder[] = [
  { id: "1", text: "Mettre en prod le portfolio", textEn: "Deploy the portfolio", done: false, priority: true, today: true },
  { id: "2", text: "Ajouter les vraies photos", textEn: "Add real photos", done: false, priority: true, today: true },
  { id: "3", text: "Optimiser le Lighthouse score", textEn: "Optimize Lighthouse score", done: false, today: true },
  { id: "4", text: "Écrire les case studies projets", textEn: "Write project case studies", done: false },
  { id: "5", text: "Configurer le domaine custom", textEn: "Set up custom domain", done: false },
  { id: "6", text: "Ajouter les tests E2E", textEn: "Add E2E tests", done: false },
  { id: "7", text: "Créer le projet CRM Motima", textEn: "Build CRM Motima project", done: true },
  { id: "8", text: "Redesign Discogs (maquette)", textEn: "Discogs redesign (mockup)", done: true },
  { id: "9", text: "Setup CI/CD pipeline", textEn: "Setup CI/CD pipeline", done: true },
];

type Filter = "all" | "today" | "flagged";

function Checkbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all"
      style={{
        borderColor: checked ? "#007aff" : "#c7c7cc",
        backgroundColor: checked ? "#007aff" : "transparent",
      }}
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export function RemindersWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: RemindersWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [reminders, setReminders] = useState(initialReminders);
  const [filter, setFilter] = useState<Filter>("all");

  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const toggleReminder = (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder && !reminder.done) {
      // Checking: show animation first, then move to completed
      setAnimatingId(id);
      setTimeout(() => {
        setReminders((prev) =>
          prev.map((r) => (r.id === id ? { ...r, done: true } : r))
        );
        setAnimatingId(null);
      }, 600);
    } else {
      // Unchecking: instant
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, done: false } : r))
      );
    }
  };

  const allPending = reminders.filter((r) => !r.done);
  const todayCount = reminders.filter((r) => r.today && !r.done).length;
  const flaggedCount = reminders.filter((r) => r.priority && !r.done).length;

  const filtered = (() => {
    switch (filter) {
      case "today":
        return reminders.filter((r) => r.today);
      case "flagged":
        return reminders.filter((r) => r.priority);
      default:
        return reminders;
    }
  })();

  const pending = filtered.filter((r) => !r.done);
  const completed = filtered.filter((r) => r.done);

  const filterLabels: Record<Filter, { fr: string; en: string }> = {
    all: { fr: "Toutes", en: "All" },
    today: { fr: "Aujourd'hui", en: "Today" },
    flagged: { fr: "Priorité", en: "Flagged" },
  };

  return (
    <Window
      title={`${isFr ? "Rappels" : "Reminders"} — ${isFr ? filterLabels[filter].fr : filterLabels[filter].en}`}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[450px] flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-44 border-r border-black/5 bg-[#f5f3f0] p-3">
            <button
              onClick={() => setFilter("all")}
              className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                filter === "all"
                  ? "bg-[#007aff]/10 font-medium text-[#007aff]"
                  : "text-[#1d1d1f]/60 hover:bg-black/5"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {isFr ? "Toutes" : "All"}
              <span className="ml-auto text-[11px] opacity-60">{allPending.length}</span>
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`mt-1 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                filter === "today"
                  ? "bg-[#007aff]/10 font-medium text-[#007aff]"
                  : "text-[#1d1d1f]/60 hover:bg-black/5"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {isFr ? "Aujourd'hui" : "Today"}
              <span className="ml-auto text-[11px] opacity-60">{todayCount}</span>
            </button>
            <button
              onClick={() => setFilter("flagged")}
              className={`mt-1 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                filter === "flagged"
                  ? "bg-[#ff9500]/10 font-medium text-[#ff9500]"
                  : "text-[#1d1d1f]/60 hover:bg-black/5"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={filter === "flagged" ? "#ff9500" : "currentColor"} strokeWidth="2" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {isFr ? "Priorité" : "Flagged"}
              <span className="ml-auto text-[11px] opacity-60">{flaggedCount}</span>
            </button>
          </div>

          {/* Reminders list */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-4 macos-scrollbar">
            <AnimatePresence initial={false}>
              {pending.map((reminder, i) => (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="group"
                >
                <div className="flex items-start gap-3 border-b border-black/5 py-2.5">
                  <Checkbox
                    checked={animatingId === reminder.id}
                    onToggle={() => toggleReminder(reminder.id)}
                  />
                  <div className="flex-1">
                    <p className={`text-[13px] transition-all duration-300 ${animatingId === reminder.id ? "text-[#86868b] line-through" : "text-[#1d1d1f]"}`}>
                      {isFr ? reminder.text : reminder.textEn}
                    </p>
                    <div className="flex items-center gap-2">
                      {reminder.today && (
                        <span className="text-[10px] text-[#007aff]">
                          {isFr ? "Aujourd'hui" : "Today"}
                        </span>
                      )}
                      {reminder.priority && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#ff9500" stroke="#ff9500" strokeWidth="2">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Completed */}
            {completed.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                  {isFr ? "Terminés" : "Completed"} — {completed.length}
                </p>
                {completed.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="group flex items-start gap-3 py-2"
                  >
                    <Checkbox
                      checked={true}
                      onToggle={() => toggleReminder(reminder.id)}
                    />
                    <p className="text-[13px] text-[#86868b] line-through">
                      {isFr ? reminder.text : reminder.textEn}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {pending.length === 0 && completed.length === 0 && (
              <p className="mt-8 text-center text-[13px] text-[#86868b]">
                {isFr ? "Aucun rappel" : "No reminders"}
              </p>
            )}
          </div>
        </div>
      </div>
    </Window>
  );
}
