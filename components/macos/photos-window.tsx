"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

const photos = [
  { src: "/images/photography/photo-1.jpg", alt: "Photo 1" },
  { src: "/images/photography/photo-2.jpg", alt: "Photo 2" },
  { src: "/images/photography/photo-3.jpg", alt: "Photo 3" },
  { src: "/images/photography/photo-4.jpg", alt: "Photo 4" },
  { src: "/images/photography/photo-5.jpg", alt: "Photo 5" },
  { src: "/images/photography/photo-6.jpg", alt: "Photo 6" },
];

interface PhotosWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
  onSelectPhoto?: (src: string, alt: string) => void;
}

export function PhotosWindow({
  className,
  style,
  isOpen = true,
  onClose,
  onSelectPhoto,
}: PhotosWindowProps) {
  const { t } = useI18n();

  return (
    <Window
      title={t("dock.photos")}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="w-36 border-r border-black/5 bg-[#f5f3f0] p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {t("photos.library")}
          </p>
          <div className="flex items-center gap-2 rounded-md bg-accent/10 px-2 py-1.5 text-[12px] font-medium text-accent">
            <span className="text-sm">📸</span>
            {t("photos.all")}
          </div>
          <div className="mt-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-foreground/60 hover:bg-black/5">
            <span className="text-sm">🏙️</span>
            {t("photos.urban")}
          </div>
          <div className="mt-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-foreground/60 hover:bg-black/5">
            <span className="text-sm">🌿</span>
            {t("photos.nature")}
          </div>
        </div>

        {/* Photo grid */}
        <div className="max-h-[400px] flex-1 overflow-y-auto p-3 macos-scrollbar">
          <div className="grid grid-cols-3 gap-1.5">
            {photos.map((photo, i) => (
              <motion.button
                key={photo.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => onSelectPhoto?.(photo.src, photo.alt)}
                className="relative aspect-square overflow-hidden rounded-md bg-card-border"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="150px"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
