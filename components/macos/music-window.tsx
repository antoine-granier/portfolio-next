"use client";

import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface MusicWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

const APPLE_MUSIC_PLAYLIST_URL =
  "https://embed.music.apple.com/fr/playlist/pl.u-DdAN8l3T015XNR9";

export function MusicWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: MusicWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  return (
    <Window
      title={isFr ? "Musique" : "Music"}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className="relative overflow-hidden bg-white"
        style={{ height: "340px" }}
      >
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameBorder="0"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={APPLE_MUSIC_PLAYLIST_URL}
          className="absolute w-full border-0"
          style={{ height: "570px", top: "-105px" }}
        />
      </div>
    </Window>
  );
}
