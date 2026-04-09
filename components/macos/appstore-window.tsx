"use client";

import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface AppStoreWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

interface AppItem {
  name: string;
  desc: string;
  descEn: string;
  icon: string;
  category: string;
  categoryEn: string;
  rating: number;
  installed?: boolean;
}

const featuredApps: AppItem[] = [
  {
    name: "Zed",
    desc: "Éditeur de code ultra-rapide",
    descEn: "Blazing fast code editor",
    icon: "/icons/zed.png",
    category: "Développement",
    categoryEn: "Developer Tools",
    rating: 4.8,
    installed: true,
  },
  {
    name: "Figma",
    desc: "Design collaboratif",
    descEn: "Collaborative design",
    icon: "/icons/figma.png",
    category: "Design",
    categoryEn: "Design",
    rating: 4.7,
    installed: true,
  },
  {
    name: "Claude",
    desc: "Assistant IA par Anthropic",
    descEn: "AI assistant by Anthropic",
    icon: "/icons/claude.png",
    category: "Productivité",
    categoryEn: "Productivity",
    rating: 4.9,
    installed: true,
  },
];

const topApps: AppItem[] = [
  {
    name: "Docker",
    desc: "Conteneurs applicatifs",
    descEn: "Application containers",
    icon: "/icons/docker.png",
    category: "Développement",
    categoryEn: "Developer Tools",
    rating: 4.5,
    installed: true,
  },
  {
    name: "Arc",
    desc: "Le navigateur du futur",
    descEn: "The browser of the future",
    icon: "/icons/arc.png",
    category: "Internet",
    categoryEn: "Internet",
    rating: 4.6,
    installed: true,
  },
  {
    name: "Notion",
    desc: "Workspace tout-en-un",
    descEn: "All-in-one workspace",
    icon: "/icons/notion.png",
    category: "Productivité",
    categoryEn: "Productivity",
    rating: 4.7,
  },
  {
    name: "Discord",
    desc: "Chat vocal et textuel",
    descEn: "Voice and text chat",
    icon: "/icons/discord.png",
    category: "Social",
    categoryEn: "Social",
    rating: 4.4,
    installed: true,
  },
  {
    name: "Slack",
    desc: "Communication d'équipe",
    descEn: "Team communication",
    icon: "/icons/slack.png",
    category: "Travail",
    categoryEn: "Business",
    rating: 4.3,
  },
  {
    name: "VS Code",
    desc: "Éditeur de code Microsoft",
    descEn: "Microsoft code editor",
    icon: "/icons/vscode.png",
    category: "Développement",
    categoryEn: "Developer Tools",
    rating: 4.8,
    installed: true,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? "#ff9500" : "none"}
          stroke="#ff9500"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="ml-0.5 text-[10px] text-[#86868b]">{rating}</span>
    </div>
  );
}

export function AppStoreWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: AppStoreWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  return (
    <Window
      title="App Store"
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[500px]">
        {/* Sidebar */}
        <div className="w-40 border-r border-black/5 bg-[#f5f3f0] p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
            {isFr ? "Découvrir" : "Discover"}
          </p>
          <div className="flex items-center gap-2 rounded-md bg-[#007aff]/10 px-2.5 py-1.5 text-[12px] font-medium text-[#007aff]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {isFr ? "Pour vous" : "For You"}
          </div>
          <div className="mt-1 flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] text-[#1d1d1f]/60 hover:bg-black/5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            {isFr ? "Catégories" : "Categories"}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white p-5 macos-scrollbar">
          {/* Featured section */}
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
            {isFr ? "Mes indispensables" : "My Essentials"}
          </p>
          <h2 className="mt-0.5 text-[18px] font-bold text-[#1d1d1f]">
            {isFr ? "Apps du quotidien" : "Daily Apps"}
          </h2>

          {/* Featured cards */}
          <div className="mt-3 flex flex-col gap-2.5">
            {featuredApps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3 rounded-xl border border-black/5 bg-[#f9f9f9] p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-contain"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1d1d1f]">
                    {app.name}
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    {isFr ? app.desc : app.descEn}
                  </p>
                  <div className="mt-1">
                    <Stars rating={app.rating} />
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${app.installed ? "bg-[#86868b]/10 text-[#86868b]" : "bg-[#007aff]/10 text-[#007aff]"}`}>
                  {app.installed ? (isFr ? "Ouvrir" : "Open") : (isFr ? "Obtenir" : "Get")}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Top apps list */}
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
            {isFr ? "Classement" : "Top Charts"}
          </p>
          <h2 className="mt-0.5 text-[18px] font-bold text-[#1d1d1f]">
            {isFr ? "Outils essentiels" : "Essential Tools"}
          </h2>

          <div className="mt-3 flex flex-col">
            {topApps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.2 }}
                className="flex items-center gap-3 border-b border-black/5 py-2.5"
              >
                <span className="w-4 text-right text-[13px] font-bold text-[#86868b]">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.icon}
                  alt={app.name}
                  className="h-10 w-10 rounded-xl object-contain"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1d1d1f]">
                    {app.name}
                  </p>
                  <p className="text-[10px] text-[#86868b]">
                    {isFr ? app.category : app.categoryEn}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${app.installed ? "bg-[#86868b]/10 text-[#86868b]" : "bg-[#007aff]/10 text-[#007aff]"}`}>
                  {app.installed ? (isFr ? "Ouvrir" : "Open") : (isFr ? "Obtenir" : "Get")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
