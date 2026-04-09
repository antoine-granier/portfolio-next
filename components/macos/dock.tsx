"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { useI18n } from "@/lib/i18n";

interface DockItem {
  label: string;
  action: string;
  icon: React.ReactNode;
}

function DockIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[22%]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}

function useDockItems(t: (key: string) => string) {
  return useMemo(() => {
    const appItems: DockItem[] = [
      { label: t("dock.finder"), action: "projects", icon: <DockIcon src="/icons/finder.png" alt="Finder" /> },
      { label: t("dock.launchpad"), action: "launchpad", icon: <DockIcon src="/icons/apps.png" alt="Launchpad" /> },
      { label: t("dock.terminal"), action: "terminal", icon: <DockIcon src="/icons/terminal.png" alt="Terminal" /> },
      { label: t("dock.remind"), action: "reminders", icon: <DockIcon src="/icons/remind.png" alt="Reminders" /> },
      { label: t("dock.notes"), action: "notes", icon: <DockIcon src="/icons/notes.png" alt="Notes" /> },
      { label: t("dock.photos"), action: "photos", icon: <DockIcon src="/icons/photos.png" alt="Photos" /> },
      { label: t("dock.mail"), action: "contact", icon: <DockIcon src="/icons/mail.png" alt="Mail" /> },
      { label: t("dock.zed"), action: "zed", icon: <DockIcon src="/icons/zed.png" alt="Zed" /> },
      { label: t("dock.claude"), action: "claude", icon: <DockIcon src="/icons/claude.png" alt="Claude" /> },
      { label: t("dock.figma"), action: "figma", icon: <DockIcon src="/icons/figma.png" alt="Figma" /> },
      { label: t("dock.music"), action: "music", icon: <DockIcon src="/icons/music.png" alt="Music" /> },
      { label: t("dock.appstore"), action: "appstore", icon: <DockIcon src="/icons/appstore.png" alt="App Store" /> },
      { label: t("dock.settings"), action: "settings", icon: <DockIcon src="/icons/settings.png" alt="Settings" /> },
    ];

    const linkItems: DockItem[] = [
      { label: t("dock.github"), action: "https://github.com/antoine-granier", icon: <DockIcon src="/icons/github.png" alt="GitHub" /> },
      { label: t("dock.linkedin"), action: "https://www.linkedin.com/in/antoine-granier", icon: <DockIcon src="/icons/linkedin.png" alt="LinkedIn" /> },
    ];

    const trashItem: DockItem = {
      label: t("dock.trash"), action: "trash", icon: <DockIcon src="/icons/trash.png" alt="Trash" />,
    };

    return { appItems, linkItems, trashItem };
  }, [t]);
}

const BASE_SIZE = 48;
const MAX_SIZE = 64;
const DISTANCE = 120;

function DockItemComponent({
  item,
  mouseX,
  onAction,
  isOpen,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onAction: (action: string) => void;
  isOpen?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return DISTANCE;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const rawSize = useTransform(distance, [0, DISTANCE], [MAX_SIZE, BASE_SIZE]);
  const rawY = useTransform(distance, [0, DISTANCE], [-12, 0]);
  const size = useSpring(rawSize, { stiffness: 300, damping: 25, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25, mass: 0.5 });

  const isExternal =
    item.action.startsWith("http") || item.action.startsWith("mailto");

  const content = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, y }}
      className="group relative cursor-pointer"
    >
      <div className="h-full w-full overflow-hidden rounded-[22%]">
        {item.icon}
      </div>
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/80 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {item.label}
      </div>
      {isOpen && (
        <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground/60" />
      )}
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={item.action}
        target={item.action.startsWith("http") ? "_blank" : undefined}
        rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <button onClick={() => onAction(item.action)}>{content}</button>;
}

// Alias to avoid conflict with DockItem interface
const DockItemEl = DockItemComponent;

interface DockProps {
  onAction: (action: string) => void;
  openActions?: Set<string>;
}

export function Dock({ onAction, openActions }: DockProps) {
  const { t } = useI18n();
  const { appItems, linkItems, trashItem } = useDockItems(t);
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      className="fixed bottom-2 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="relative flex items-end gap-[5px] px-3 pb-[6px] pt-[6px]"
      >
        {/* Dock background - macOS Sequoia style */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] rounded-[22px] bg-gradient-to-b from-white/15 to-white/5 shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.4)] backdrop-blur-[2px] backdrop-saturate-[2]" />
        {/* Apps */}
        {appItems.map((item) => (
          <DockItemEl
            key={item.label}
            item={item}
            mouseX={mouseX}
            onAction={onAction}
            isOpen={openActions?.has(item.action)}
          />
        ))}
        {/* Separator 1 */}
        <div className="relative z-10 mx-[2px] flex h-[48px] items-center">
          <div className="h-8 w-[1px] rounded-full bg-white/30" />
        </div>
        {/* External links */}
        {linkItems.map((item) => (
          <DockItemEl
            key={item.label}
            item={item}
            mouseX={mouseX}
            onAction={onAction}
          />
        ))}
        {/* Separator 2 */}
        <div className="relative z-10 mx-[2px] flex h-[48px] items-center">
          <div className="h-8 w-[1px] rounded-full bg-white/30" />
        </div>
        {/* Trash */}
        <DockItemEl
          item={trashItem}
          mouseX={mouseX}
          onAction={onAction}
        />
      </div>
    </motion.div>
  );
}
