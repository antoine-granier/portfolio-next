"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Locale = "fr" | "en";

interface I18nContextValue {
  locale: Locale;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Locale, string>> = {
  "menu.portfolio": { fr: "Portfolio d'Antoine", en: "Antoine's Portfolio" },
  "menu.projects": { fr: "Projets", en: "Projects" },
  "menu.photo": { fr: "Photo", en: "Photo" },
  "menu.contact": { fr: "Contact", en: "Contact" },
  "hero.welcome": { fr: "bienvenue sur mon", en: "welcome to my" },
  "todo.title": { fr: "À faire :", en: "To do:" },
  "todo.1": { fr: "Coder des projets ambitieux", en: "Build ambitious projects" },
  "todo.2": { fr: "Prendre plus de photos", en: "Take more photos" },
  "todo.3": { fr: "Apprendre Next.js", en: "Learn Next.js" },
  "todo.4": { fr: "Finir mon Master", en: "Finish my Master's" },
  "todo.5": { fr: "Explorer le monde", en: "Explore the world" },
  "todo.6": { fr: "Acheter le dernier MacBook Pro", en: "Buy the latest MacBook Pro" },
  "about.title": { fr: "À propos", en: "About me" },
  "about.text": {
    fr: "Développeur fullstack passionné, basé en France. J'aime créer des expériences web qui allient design soigné et code propre.",
    en: "Passionate fullstack developer based in France. I love crafting web experiences that combine clean design and clean code.",
  },
  "terminal.whoami": {
    fr: "Antoine Granier — Développeur Fullstack",
    en: "Antoine Granier — Fullstack Developer",
  },
  "finder.favorites": { fr: "Favoris", en: "Favorites" },
  "finder.projects": { fr: "Projets", en: "Projects" },
  "photos.library": { fr: "Bibliothèque", en: "Library" },
  "photos.all": { fr: "Toutes", en: "All" },
  "photos.urban": { fr: "Urbain", en: "Urban" },
  "photos.nature": { fr: "Nature", en: "Nature" },
  "dock.finder": { fr: "Finder", en: "Finder" },
  "dock.launchpad": { fr: "Launchpad", en: "Launchpad" },
  "dock.terminal": { fr: "Terminal", en: "Terminal" },
  "dock.remind": { fr: "Rappels", en: "Reminders" },
  "dock.notes": { fr: "Notes", en: "Notes" },
  "dock.photos": { fr: "Photos", en: "Photos" },
  "dock.mail": { fr: "Mail", en: "Mail" },
  "dock.zed": { fr: "Zed", en: "Zed" },
  "dock.claude": { fr: "Claude", en: "Claude" },
  "dock.figma": { fr: "Figma", en: "Figma" },
  "dock.music": { fr: "Musique", en: "Music" },
  "dock.appstore": { fr: "App Store", en: "App Store" },
  "dock.settings": { fr: "Réglages", en: "Settings" },
  "dock.github": { fr: "GitHub", en: "GitHub" },
  "dock.linkedin": { fr: "LinkedIn", en: "LinkedIn" },
  "dock.trash": { fr: "DON'T LOOK !", en: "DON'T LOOK !" },
};

const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  toggle: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  const toggle = useCallback(() => {
    setLocale((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[locale] ?? key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
