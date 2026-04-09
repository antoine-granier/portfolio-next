"use client";

import { motion } from "framer-motion";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: "yellow" | "pink" | "green" | "blue";
  rotate?: number;
  delay?: number;
}

const colors = {
  yellow: "bg-[#fff9b1] border-[#f0e68c]",
  pink: "bg-[#ffb3c6] border-[#f09eb5]",
  green: "bg-[#b8f0b8] border-[#98d898]",
  blue: "bg-[#b3d9ff] border-[#8ec4f0]",
};

export function StickyNote({
  children,
  className = "",
  style,
  color = "yellow",
  rotate = 0,
  delay = 0,
}: StickyNoteProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 10 }}
      animate={{ scale: 1, rotate }}
      transition={{
        delay,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      }}
      style={style}
      className={`w-56 rounded-sm border p-4 shadow-md ${colors[color]} ${className}`}
    >
      <div className="text-[13px] leading-relaxed text-gray-800">{children}</div>
    </motion.div>
  );
}
