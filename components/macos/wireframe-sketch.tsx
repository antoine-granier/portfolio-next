"use client";

import { motion } from "framer-motion";

export function WireframeSketch({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -3 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 0.5 }}
      className="w-[200px] select-none"
    >
      <div
        className="rounded-sm bg-white p-4 shadow-md"
        style={{ transform: "rotate(-1deg)" }}
      >
        <svg
          viewBox="0 0 180 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          {/* ── Window chrome ── */}
          <motion.rect
            x="10" y="8" width="160" height="14" rx="3"
            stroke="#333" strokeWidth="0.8" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.6 }}
          />
          <circle cx="20" cy="15" r="2" fill="#ccc" />
          <circle cx="27" cy="15" r="2" fill="#ccc" />
          <circle cx="34" cy="15" r="2" fill="#ccc" />
          <motion.line
            x1="55" y1="15" x2="105" y2="15"
            stroke="#aaa" strokeWidth="0.6" strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.4 }}
          />

          {/* ── Hero section ── */}
          <motion.rect
            x="18" y="34" width="80" height="7" rx="1" fill="#ddd"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: delay + 0.6, duration: 0.3 }}
            style={{ transformOrigin: "18px 34px" }}
          />
          <motion.rect
            x="18" y="45" width="55" height="4" rx="1" fill="#e8e8e8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: delay + 0.7, duration: 0.3 }}
            style={{ transformOrigin: "18px 45px" }}
          />

          {/* Image placeholder */}
          <motion.rect
            x="120" y="30" width="40" height="30" rx="3"
            stroke="#bbb" strokeWidth="0.8" fill="none" strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.8, duration: 0.5 }}
          />
          <line x1="124" y1="34" x2="156" y2="56" stroke="#ddd" strokeWidth="0.5" />
          <line x1="156" y1="34" x2="124" y2="56" stroke="#ddd" strokeWidth="0.5" />

          {/* CTA buttons */}
          <motion.rect
            x="18" y="56" width="32" height="9" rx="4.5"
            stroke="#333" strokeWidth="0.8" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.9, duration: 0.3 }}
          />
          <motion.rect
            x="55" y="56" width="32" height="9" rx="4.5"
            stroke="#aaa" strokeWidth="0.6" fill="none" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.0, duration: 0.3 }}
          />

          {/* ── Cards grid ── */}
          <motion.rect
            x="10" y="80" width="50" height="38" rx="4"
            stroke="#333" strokeWidth="0.7" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.1, duration: 0.4 }}
          />
          <rect x="16" y="87" width="28" height="3" rx="1" fill="#ddd" />
          <rect x="16" y="93" width="36" height="2" rx="1" fill="#eee" />
          <rect x="16" y="98" width="22" height="2" rx="1" fill="#eee" />

          <motion.rect
            x="65" y="80" width="50" height="38" rx="4"
            stroke="#333" strokeWidth="0.7" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.2, duration: 0.4 }}
          />
          <rect x="71" y="87" width="28" height="3" rx="1" fill="#ddd" />
          <rect x="71" y="93" width="36" height="2" rx="1" fill="#eee" />
          <rect x="71" y="98" width="22" height="2" rx="1" fill="#eee" />

          <motion.rect
            x="120" y="80" width="50" height="38" rx="4"
            stroke="#333" strokeWidth="0.7" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.3, duration: 0.4 }}
          />
          <rect x="126" y="87" width="28" height="3" rx="1" fill="#ddd" />
          <rect x="126" y="93" width="36" height="2" rx="1" fill="#eee" />
          <rect x="126" y="98" width="22" height="2" rx="1" fill="#eee" />

          {/* ── Annotations ── */}

          {/* Circle on first card */}
          <motion.ellipse
            cx="35" cy="99" rx="22" ry="16"
            stroke="#888" strokeWidth="0.8" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.8, duration: 0.5 }}
          />

          {/* Arrow from annotation text to second card */}
          <motion.path
            d="M 80 135 C 90 143, 110 143, 120 132"
            stroke="#999" strokeWidth="0.8" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 2.0, duration: 0.5 }}
          />
          <motion.path
            d="M 118 135 L 120 132 L 116 133"
            stroke="#999" strokeWidth="0.8" fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 2.4 }}
          />

          {/* "bento grid ?" text */}
          <motion.text
            x="15" y="138"
            fontSize="7"
            fontFamily="'Georgia', serif"
            fontStyle="italic"
            fill="#999"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 2.2, duration: 0.4 }}
          >
            bento grid ?
          </motion.text>

          {/* Check mark on third card */}
          <motion.path
            d="M 148 122 L 152 127 L 160 116"
            stroke="#999" strokeWidth="1.2" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 2.5, duration: 0.3 }}
          />

          {/* ── Footer ── */}
          <motion.line
            x1="10" y1="150" x2="170" y2="150"
            stroke="#ddd" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.5, duration: 0.3 }}
          />
          <rect x="70" y="155" width="40" height="3" rx="1" fill="#e8e8e8" />
        </svg>

        <p className="mt-1 text-center font-serif text-[9px] italic text-[#999]">
          v1 — draft
        </p>
      </div>
    </motion.div>
  );
}
