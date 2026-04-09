"use client";

import { motion } from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

const words = [
  { text: "React", angle: -30, rotate: -5 },
  { text: "Next.js", angle: 5, rotate: 3 },
  { text: "TypeScript", angle: 40, rotate: -4 },
  { text: "Node.js", angle: 75, rotate: 6 },
  { text: "Tailwind", angle: 110, rotate: -3 },
  { text: "Docker", angle: 140, rotate: 5 },
];

const RADIUS = 100;

export function SkillsSketch() {
  return (
    <div
      className={`pointer-events-none absolute select-none ${caveat.className}`}
      style={{ left: "310px", top: "200px" }}
    >
      <div className="relative h-[200px] w-[260px]">
        {/* Arrow above Node.js pointing up-right toward competences.txt */}
        <motion.svg
          width="60"
          height="50"
          viewBox="0 0 60 50"
          fill="none"
          className="absolute"
          style={{ left: "-5px", top: "45px", transform: "rotate(-55deg)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <motion.path
            d="M 10 45 C 20 30, 40 15, 52 8"
            stroke="currentColor"
            className="opacity-40"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          />
          <motion.path
            d="M 46 9 L 53 7 L 55 14"
            stroke="currentColor"
            className="opacity-40"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          />
        </motion.svg>

        {words.map((word, i) => {
          const rad = (word.angle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);

          return (
            <motion.span
              key={word.text}
              className="absolute whitespace-nowrap text-[14px] opacity-50"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${word.rotate}deg)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.4 }}
            >
              {word.text}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
