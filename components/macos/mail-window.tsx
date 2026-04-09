"use client";

import { useState } from "react";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface MailWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

export function MailWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: MailWindowProps) {
  const { locale } = useI18n();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const to = "antoine.granier@outlook.com";

  const handleSend = () => {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_self");
  };

  const isFr = locale === "fr";

  return (
    <Window
      title={isFr ? "Nouveau message" : "New Message"}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col bg-white">
        {/* Mail header fields */}
        <div className="border-b border-black/5 px-4 py-2">
          <div className="flex items-center gap-3 border-b border-black/5 py-1.5">
            <span className="w-12 text-right text-[12px] font-medium text-muted">
              {isFr ? "De :" : "From:"}
            </span>
            <span className="text-[13px] text-foreground/50">
              visitor@portfolio.dev
            </span>
          </div>
          <div className="flex items-center gap-3 border-b border-black/5 py-1.5">
            <span className="w-12 text-right text-[12px] font-medium text-muted">
              {isFr ? "À :" : "To:"}
            </span>
            <div className="flex items-center gap-1">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[12px] font-medium text-accent">
                {to}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 py-1.5">
            <span className="w-12 text-right text-[12px] font-medium text-muted">
              {isFr ? "Objet :" : "Subject:"}
            </span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={isFr ? "Votre sujet..." : "Your subject..."}
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-foreground/30"
            />
          </div>
        </div>

        {/* Mail body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            isFr
              ? "Bonjour Antoine,\n\nJ'aimerais discuter avec vous de..."
              : "Hi Antoine,\n\nI'd like to discuss..."
          }
          className="min-h-[180px] resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed outline-none placeholder:text-foreground/30"
        />

        {/* Send bar */}
        <div className="flex items-center justify-between border-t border-black/5 px-4 py-2">
          <div className="flex items-center gap-2 text-muted">
            {/* Attachment icon */}
            <button className="rounded p-1 transition-colors hover:bg-black/5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!subject.trim() && !body.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            {isFr ? "Envoyer" : "Send"}
          </button>
        </div>
      </div>
    </Window>
  );
}
