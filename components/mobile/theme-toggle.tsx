"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Sun/moon button that toggles between light and dark themes via next-themes.
 *
 * Uses a `mounted` gate to avoid hydration mismatch: on the server we don't
 * know the resolved theme, so we render the button shell with an invisible
 * icon. After mount we know the real theme and fade the correct icon in.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-opacity duration-200 ${
          mounted ? "opacity-70" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {isDark ? (
          // Sun — visible while in dark mode (button takes you back to light)
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          // Moon — visible while in light mode
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
