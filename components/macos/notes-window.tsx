"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface NotesWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

interface Note {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  content: string;
  contentEn: string;
  folder: string;
}

const notes: Note[] = [
  {
    id: "1",
    title: "Commandes Docker utiles",
    titleEn: "Useful Docker commands",
    date: "28 mars 2026",
    folder: "tech",
    content: `docker ps -a
docker-compose up -d
docker exec -it <container> bash
docker system prune -a
docker logs -f <container>`,
    contentEn: `docker ps -a
docker-compose up -d
docker exec -it <container> bash
docker system prune -a
docker logs -f <container>`,
  },
  {
    id: "2",
    title: "Setup Next.js 16",
    titleEn: "Next.js 16 Setup",
    date: "25 mars 2026",
    folder: "tech",
    content: `npx create-next-app@latest
- App Router par défaut
- Turbopack stable
- View Transitions
- use cache directive
- params async partout`,
    contentEn: `npx create-next-app@latest
- App Router by default
- Turbopack stable
- View Transitions
- use cache directive
- async params everywhere`,
  },
  {
    id: "3",
    title: "Raccourcis VS Code",
    titleEn: "VS Code Shortcuts",
    date: "20 mars 2026",
    folder: "tech",
    content: `⌘+P → ouvrir fichier
⌘+Shift+P → command palette
⌘+D → sélection multiple
⌘+Shift+L → sélect. toutes occurrences
⌥+↑/↓ → déplacer ligne
⌘+/ → commenter`,
    contentEn: `⌘+P → open file
⌘+Shift+P → command palette
⌘+D → multi select
⌘+Shift+L → select all occurrences
⌥+↑/↓ → move line
⌘+/ → toggle comment`,
  },
  {
    id: "4",
    title: "Liste de courses",
    titleEn: "Grocery list",
    date: "1 avr 2026",
    folder: "perso",
    content: `- Pâtes
- Sauce tomate
- Mozzarella
- Basilic
- Pain
- Café ☕
- Fruits`,
    contentEn: `- Pasta
- Tomato sauce
- Mozzarella
- Basil
- Bread
- Coffee ☕
- Fruits`,
  },
  {
    id: "5",
    title: "Idées side projects",
    titleEn: "Side project ideas",
    date: "15 mars 2026",
    folder: "perso",
    content: `1. App de suivi photo (stats EXIF)
2. CLI pour générer des OG images
3. Extension VS Code pour Tailwind
4. Bot Discord pour code reviews
5. Portfolio en 3D (Three.js)`,
    contentEn: `1. Photo tracking app (EXIF stats)
2. CLI to generate OG images
3. VS Code extension for Tailwind
4. Discord bot for code reviews
5. 3D Portfolio (Three.js)`,
  },
  {
    id: "6",
    title: "Exercices salle",
    titleEn: "Gym routine",
    date: "10 mars 2026",
    folder: "perso",
    content: `Lundi — Push
  Bench press 4x8
  Incline DB 3x10
  Shoulder press 3x10
  Triceps dips 3x12

Mercredi — Pull
  Deadlift 4x6
  Pull-ups 4x8
  Rows 3x10
  Bicep curls 3x12

Vendredi — Legs
  Squats 4x8
  Leg press 3x10
  RDL 3x10
  Calf raises 4x15`,
    contentEn: `Monday — Push
  Bench press 4x8
  Incline DB 3x10
  Shoulder press 3x10
  Triceps dips 3x12

Wednesday — Pull
  Deadlift 4x6
  Pull-ups 4x8
  Rows 3x10
  Bicep curls 3x12

Friday — Legs
  Squats 4x8
  Leg press 3x10
  RDL 3x10
  Calf raises 4x15`,
  },
];

type Folder = "all" | "tech" | "perso";

export function NotesWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: NotesWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [selectedId, setSelectedId] = useState(notes[0].id);
  const [folder, setFolder] = useState<Folder>("all");

  const filtered = folder === "all" ? notes : notes.filter((n) => n.folder === folder);
  const selected = notes.find((n) => n.id === selectedId) || notes[0];

  return (
    <Window
      title={isFr ? "Notes" : "Notes"}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[480px]">
        {/* Sidebar - folders */}
        <div className="w-36 border-r border-black/5 bg-[#f5f3f0] p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
            {isFr ? "Dossiers" : "Folders"}
          </p>
          <button
            onClick={() => setFolder("all")}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              folder === "all" ? "bg-[#ff9500]/10 font-medium text-[#ff9500]" : "text-[#1d1d1f]/60 hover:bg-black/5"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            {isFr ? "Toutes" : "All"}
            <span className="ml-auto text-[10px] opacity-50">{notes.length}</span>
          </button>
          <button
            onClick={() => setFolder("tech")}
            className={`mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              folder === "tech" ? "bg-[#ff9500]/10 font-medium text-[#ff9500]" : "text-[#1d1d1f]/60 hover:bg-black/5"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Tech
            <span className="ml-auto text-[10px] opacity-50">{notes.filter((n) => n.folder === "tech").length}</span>
          </button>
          <button
            onClick={() => setFolder("perso")}
            className={`mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              folder === "perso" ? "bg-[#ff9500]/10 font-medium text-[#ff9500]" : "text-[#1d1d1f]/60 hover:bg-black/5"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Perso
            <span className="ml-auto text-[10px] opacity-50">{notes.filter((n) => n.folder === "perso").length}</span>
          </button>
        </div>

        {/* Note list */}
        <div className="w-48 overflow-y-auto border-r border-black/5 bg-white macos-scrollbar">
          {filtered.map((note, i) => (
            <motion.button
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedId(note.id)}
              className={`w-full border-b border-black/5 px-3 py-2.5 text-left transition-colors ${
                selectedId === note.id ? "bg-[#007aff]/10" : "hover:bg-black/[0.02]"
              }`}
            >
              <p className={`text-[12px] font-semibold ${selectedId === note.id ? "text-[#007aff]" : "text-[#1d1d1f]"}`}>
                {isFr ? note.title : note.titleEn}
              </p>
              <p className="mt-0.5 text-[10px] text-[#86868b]">{note.date}</p>
              <p className="mt-0.5 truncate text-[10px] text-[#86868b]/60">
                {(isFr ? note.content : note.contentEn).split("\n")[0]}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Note content */}
        <div className="flex-1 overflow-y-auto bg-white p-5 macos-scrollbar">
          <h2 className="text-[16px] font-bold text-[#1d1d1f]">
            {isFr ? selected.title : selected.titleEn}
          </h2>
          <p className="mt-1 text-[10px] text-[#86868b]">{selected.date}</p>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#1d1d1f]/80">
            {isFr ? selected.content : selected.contentEn}
          </pre>
        </div>
      </div>
    </Window>
  );
}
