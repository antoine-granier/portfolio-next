"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { WeatherWidget } from "./weather-widget";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  app: string;
  icon: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    app: "Mail",
    icon: "/icons/mail.png",
    title: "Nouveau message",
    titleEn: "New message",
    body: "Un recruteur veut vous contacter !",
    bodyEn: "A recruiter wants to reach you!",
    time: "now",
  },
  {
    id: "2",
    app: "Rappels",
    icon: "/icons/remind.png",
    title: "Rappel",
    titleEn: "Reminder",
    body: "Mettre en prod le portfolio",
    bodyEn: "Deploy the portfolio",
    time: "2min",
  },
  {
    id: "3",
    app: "App Store",
    icon: "/icons/appstore.png",
    title: "Mise à jour disponible",
    titleEn: "Update available",
    body: "Kolr v2.0 est disponible",
    bodyEn: "Kolr v2.0 is available",
    time: "15min",
  },
  {
    id: "4",
    app: "Claude",
    icon: "/icons/claude.png",
    title: "Analyse terminée",
    titleEn: "Analysis complete",
    body: "Compatibilité : 98.7%",
    bodyEn: "Compatibility: 98.7%",
    time: "1h",
  },
  {
    id: "5",
    app: "Notes",
    icon: "/icons/notes.png",
    title: "Note partagée",
    titleEn: "Shared note",
    body: "Commandes Docker utiles",
    bodyEn: "Useful Docker commands",
    time: "3h",
  },
];

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[70]" onClick={onClose} />
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-8 right-2 bottom-20 z-[71] w-[320px] overflow-y-auto rounded-2xl bg-[#f0eeeb]/95 p-3 shadow-[0_5px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl macos-scrollbar"
          >
            {/* Widgets - weather + date */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              <WeatherWidget />
              <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#ff3b30]">
                  {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US", { weekday: "long" })}
                </p>
                <p className="text-[32px] font-bold leading-tight text-[#1d1d1f]">
                  {new Date().getDate()}
                </p>
                <p className="text-[11px] capitalize text-[#86868b]">
                  {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                {isFr ? "Notifications" : "Notifications"}
              </h3>
              <span className="text-[11px] text-[#86868b]">
                {notifications.length}
              </span>
            </div>

            {/* Notifications */}
            <div className="flex flex-col gap-2">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  className="rounded-xl bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={notif.icon}
                      alt={notif.app}
                      className="h-8 w-8 shrink-0 rounded-lg object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-[#1d1d1f]">
                          {notif.app}
                        </p>
                        <span className="text-[10px] text-[#86868b]">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[12px] font-medium text-[#1d1d1f]">
                        {isFr ? notif.title : notif.titleEn}
                      </p>
                      <p className="text-[11px] text-[#86868b]">
                        {isFr ? notif.body : notif.bodyEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
