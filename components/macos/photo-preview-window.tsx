"use client";

import Image from "next/image";
import { Window } from "./window";

interface PhotoPreviewWindowProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

export function PhotoPreviewWindow({
  src,
  alt,
  className,
  style,
  isOpen = true,
  onClose,
}: PhotoPreviewWindowProps) {
  return (
    <Window
      title={alt}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-center bg-black p-1">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={450}
          className="h-auto max-h-[500px] w-auto object-contain"
        />
      </div>
    </Window>
  );
}
