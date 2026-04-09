"use client";

import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface TrashWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
  onOpenContact?: () => void;
}

export function TrashWindow({
  className,
  style,
  isOpen = true,
  onClose,
  onOpenContact,
}: TrashWindowProps) {
  const { locale } = useI18n();

  const isFr = locale === "fr";

  return (
    <Window
      title={isFr ? "Corbeille" : "Trash"}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="relative flex flex-col items-center justify-center bg-white px-8 py-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold text-[#1d1d1f]"
        >
          {isFr ? "Hey, tu fouilles dans ma poubelle ?" : "Hey, digging through my trash?"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-[#86868b]"
        >
          {isFr
            ? "Y'a rien ici... enfin presque 😏"
            : "Nothing to see here... or is there? 😏"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-xs text-[#86868b]/60"
        >
          {isFr
            ? "Puisque t'es là, autant me contacter non ?"
            : "Since you're here, might as well say hi?"}
        </motion.p>

        <motion.button
          onClick={() => {
            onClose?.();
            onOpenContact?.();
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 rounded-full bg-[#007aff] px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          {isFr ? "Envoyer un mail" : "Send an email"}
        </motion.button>
      </div>
    </Window>
  );
}
