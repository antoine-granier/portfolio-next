"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function HandwrittenTitle() {
  const { t } = useI18n();

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        className="mb-1 text-center text-lg opacity-40"
      >
        {t("hero.welcome")}
      </motion.p>
      <div className="relative">
        {/* SVG with stroke-draw animation */}
        <svg
          viewBox="0 0 500 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[420px] lg:w-[520px]"
        >
          <motion.text
            x="250"
            y="85"
            textAnchor="middle"
            fontSize="80"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontStyle="italic"
            fontWeight="300"
            className="opacity-80"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 2.5,
              ease: [0.45, 0, 0.15, 1],
              delay: 0.3,
            }}
          >
            portfolio.
          </motion.text>
          {/* Fill that appears after stroke */}
          <motion.text
            x="250"
            y="85"
            textAnchor="middle"
            fontSize="80"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontStyle="italic"
            fontWeight="300"
            className="opacity-80"
            fill="currentColor"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            portfolio.
          </motion.text>
        </svg>
      </div>
    </div>
  );
}
