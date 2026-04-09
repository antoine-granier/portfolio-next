"use client";

import React, { useEffect, useRef, useState } from "react";

type StaggerIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface RevealProps {
  children: React.ReactNode;
  /** Stagger index. Multiplied by 80ms for the transition delay. */
  delay?: StaggerIndex;
  className?: string;
  width?: "fit-content" | "100%";
  as?: "div" | "section" | "article" | "p" | "h1" | "h2" | "h3";
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  width = "100%",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    // If already in view at mount, reveal synchronously instead of waiting
    // a frame for IntersectionObserver to fire its initial callback.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const widthClass = width === "fit-content" ? "w-fit" : "w-full";
  const Component = Tag as "div";

  const style =
    delay > 0
      ? ({ "--reveal-delay": `${delay * 80}ms` } as React.CSSProperties)
      : undefined;

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal-scroll ${visible ? "reveal-in" : ""} ${widthClass} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
