"use client";

import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

export function Terminal({
  className,
  style,
  delay = 0,
  isOpen = true,
  onClose,
}: {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const { t } = useI18n();

  const lines = [
    { prompt: true, text: "whoami" },
    { prompt: false, text: t("terminal.whoami") },
    { prompt: true, text: "cat skills.txt" },
    {
      prompt: false,
      text: "React, Next.js, TypeScript, Node.js, PostgreSQL",
    },
    { prompt: true, text: "ls interests/" },
    {
      prompt: false,
      text: "photography/  apple/  design/  automotive/  hardware/",
    },
    { prompt: true, text: "cat location.txt" },
    { prompt: false, text: "Paris & Île-de-France, France" },
    { prompt: true, text: "" },
  ];

  return (
    <Window
      title="antoine — zsh"
      className={className}
      style={style}
      delay={delay}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="bg-[#1e1e1e] p-4 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={`${i}-${line.text}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 + i * 0.08, duration: 0.3 }}
          >
            {line.prompt ? (
              <span>
                <span className="text-green-400">~</span>
                <span className="text-blue-400"> $ </span>
                <span className="text-gray-200">{line.text}</span>
                {line.text === "" && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block h-4 w-2 bg-gray-400 align-middle"
                  />
                )}
              </span>
            ) : (
              <span className="text-gray-400">{line.text}</span>
            )}
          </motion.div>
        ))}
      </div>
    </Window>
  );
}
