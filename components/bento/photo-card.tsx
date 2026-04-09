"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BentoCard } from "./bento-card";

const previewPhotos = [
  { src: "/images/photography/photo-1.jpg", alt: "Photo 1" },
  { src: "/images/photography/photo-2.jpg", alt: "Photo 2" },
  { src: "/images/photography/photo-3.jpg", alt: "Photo 3" },
];

export function PhotoCard() {
  return (
    <BentoCard span="2x1" className="overflow-hidden p-0">
      <Link href="/photography" className="block">
        <div className="p-6 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Photographie
          </p>
          <p className="mt-1 text-sm text-muted">
            Capturer des moments, une passion
          </p>
        </div>
        <div className="flex gap-2 overflow-hidden px-6 pb-6">
          {previewPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="relative aspect-[4/3] flex-1 overflow-hidden rounded-xl bg-card-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 200px"
              />
            </motion.div>
          ))}
        </div>
      </Link>
    </BentoCard>
  );
}
