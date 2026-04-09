"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./bento-card";

export function LocationCard() {
  return (
    <BentoCard className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="mb-3 text-4xl"
      >
        📍
      </motion.div>
      <p className="text-sm font-semibold">France</p>
      <p className="text-xs text-muted">Paris &amp; Île-de-France</p>
    </BentoCard>
  );
}
