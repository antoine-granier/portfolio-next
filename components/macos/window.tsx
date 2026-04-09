"use client";

import { motion } from "framer-motion";
import { useDragHandle } from "./draggable";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Window({
  title,
  children,
  className = "",
  style,
  delay = 0,
  isOpen = true,
  onClose,
}: WindowProps) {
  const dragControls = useDragHandle();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        delay,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      style={style}
      className={`overflow-hidden rounded-xl border border-black/10 bg-card shadow-2xl ${className}`}
    >
      {/* Title bar - drag handle */}
      <div
        className="flex h-9 cursor-grab items-center gap-2 border-b border-black/5 bg-window-title px-3 active:cursor-grabbing"
        onPointerDown={(e) => {
          // Don't trigger drag when clicking the close button
          if ((e.target as HTMLElement).closest("button")) return;
          dragControls?.start(e);
        }}
      >
        <div className="flex gap-1.5">
          {onClose ? (
            <button
              onClick={onClose}
              className="group h-3 w-3 rounded-full bg-window-close transition-colors hover:bg-red-600"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <path
                  d="M3.5 3.5l5 5M8.5 3.5l-5 5"
                  stroke="rgba(0,0,0,0.6)"
                  strokeWidth="1.2"
                />
              </svg>
            </button>
          ) : (
            <div className="h-3 w-3 rounded-full bg-window-close" />
          )}
          <div className="h-3 w-3 rounded-full bg-window-minimize" />
          <div className="h-3 w-3 rounded-full bg-window-maximize" />
        </div>
        <span className="flex-1 text-center text-[13px] font-medium text-foreground/70 select-none">
          {title}
        </span>
        <div className="w-[52px]" />
      </div>
      {/* Content */}
      <div className="macos-scrollbar">{children}</div>
    </motion.div>
  );
}
