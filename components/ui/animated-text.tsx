"use client";

import { motion } from "framer-motion";
import { wordAnimation, wordChild } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className = "",
  as: Tag = "p",
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        variants={wordAnimation}
        initial="hidden"
        animate="visible"
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordChild} className="inline-block">
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
