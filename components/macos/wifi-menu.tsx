"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface WifiMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WifiNetwork {
  name: string;
  strength: 1 | 2 | 3;
  locked: boolean;
  connected?: boolean;
}

const networks: WifiNetwork[] = [
  { name: "Antoine's MacBook", strength: 3, locked: true, connected: true },
  { name: "Livebox-4F2A", strength: 3, locked: true },
  { name: "Freebox-8C7E", strength: 2, locked: true },
  { name: "iPhone de Maman", strength: 2, locked: true },
  { name: "FBI Surveillance Van", strength: 1, locked: false },
  { name: "Pretty Fly for a Wi-Fi", strength: 1, locked: true },
  { name: "Martin_5G", strength: 1, locked: true },
];

function WifiIcon({ strength, size = 14 }: { strength: 1 | 2 | 3; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {/* Bottom dot - always visible */}
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
      {/* Arc 1 - strength >= 1 */}
      <path d="M9 15a4 4 0 0 1 6 0" opacity={strength >= 1 ? 1 : 0.2} />
      {/* Arc 2 - strength >= 2 */}
      <path d="M6 12a8 8 0 0 1 12 0" opacity={strength >= 2 ? 1 : 0.2} />
      {/* Arc 3 - strength >= 3 */}
      <path d="M3 9a12 12 0 0 1 18 0" opacity={strength >= 3 ? 1 : 0.2} />
    </svg>
  );
}

export function WifiMenu({ isOpen, onClose }: WifiMenuProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [connected, setConnected] = useState("Antoine's MacBook");
  const [connecting, setConnecting] = useState<string | null>(null);

  const connectTo = (name: string) => {
    setConnecting(name);
    setTimeout(() => {
      setConnected(name);
      setConnecting(null);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[70]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.12 }}
            className="fixed right-24 top-[28px] z-[71] w-[260px] overflow-hidden rounded-xl py-1.5 shadow-[0_5px_30px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: "#ececec" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 pb-1.5">
              <span className="text-[11px] font-semibold text-[#1d1d1f]">Wi-Fi</span>
              <div className="relative h-[22px] w-[40px] rounded-full bg-[#34c759]">
                <div className="absolute right-[2px] top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
              </div>
            </div>

            <div className="mx-2 h-px bg-black/10" />

            {/* Connected network */}
            <div className="px-1.5 pt-1.5">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                {isFr ? "Réseau actuel" : "Current Network"}
              </p>
              {networks
                .filter((n) => n.name === connected)
                .map((network) => (
                  <div
                    key={network.name}
                    className="mt-1 flex items-center gap-2.5 rounded-md bg-[#007aff]/10 px-2 py-1.5"
                  >
                    <WifiIcon strength={network.strength} />
                    <span className="flex-1 text-[13px] font-medium text-[#1d1d1f]">
                      {network.name}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ))}
            </div>

            <div className="mx-2 mt-1.5 h-px bg-black/10" />

            {/* Other networks */}
            <div className="px-1.5 pt-1.5 pb-1">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                {isFr ? "Autres réseaux" : "Other Networks"}
              </p>
              <div className="mt-1">
                {networks
                  .filter((n) => n.name !== connected)
                  .map((network) => (
                    <button
                      key={network.name}
                      onClick={() => connectTo(network.name)}
                      disabled={connecting !== null}
                      className="flex w-full items-center gap-2.5 rounded-md px-2 py-[5px] transition-colors hover:bg-black/5 disabled:opacity-50"
                    >
                      <WifiIcon strength={network.strength} />
                      <span className="flex-1 text-left text-[13px] text-[#1d1d1f]">
                        {network.name}
                      </span>
                      {connecting === network.name ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      ) : network.locked ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      ) : null}
                    </button>
                  ))}
              </div>
            </div>

            <div className="mx-2 h-px bg-black/10" />

            {/* Footer */}
            <button className="flex w-full items-center gap-2 px-3.5 py-1.5 text-[13px] text-[#007aff] transition-colors hover:bg-black/5">
              {isFr ? "Préférences réseau..." : "Network Preferences..."}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
