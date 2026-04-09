"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface DesktopIconProps {
  label: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  delay?: number;
  icon?: string;
  variant?: "folder" | "file";
}

export function DesktopIcon({
  label,
  href,
  onClick,
  style,
  delay = 0,
  icon,
  variant = "folder",
}: DesktopIconProps) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto");

  const iconContent = (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={style}
      className="flex w-20 cursor-pointer flex-col items-center gap-1"
    >
      {icon ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={icon}
          alt={label}
          className="h-14 w-14 object-contain"
          draggable={false}
        />
      ) : variant === "file" ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/icons/pdf.png"
          alt={label}
          className="h-14 w-14 object-contain"
          draggable={false}
        />
      ) : null}
      <span className="mt-0.5 max-w-[80px] text-center text-[11px] font-medium leading-tight opacity-80 drop-shadow-sm">
        {label}
      </span>
    </motion.div>
  );

  if (onClick) {
    return <button onClick={onClick}>{iconContent}</button>;
  }

  if (href && isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {iconContent}
      </a>
    );
  }

  if (href) {
    return <Link href={href}>{iconContent}</Link>;
  }

  return iconContent;
}
