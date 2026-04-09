"use client";

import dynamic from "next/dynamic";

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  tech: string[];
  content: string;
  contentEn?: string;
  github?: string;
  url?: string;
  android?: string;
  ios?: string;
  chrome?: string;
  firefox?: string;
  donate?: string;
}

interface PageClientProps {
  projects: ProjectData[];
  initialIsMobile: boolean;
}

// Lazy-load each variant in its own chunk so mobile users never download the
// macOS desktop bundle (and vice-versa). next/dynamic in a Client Component
// gets real code-splitting; doing this in a Server Component would NOT split
// the chunks (documented Next.js limitation as of 16.x).
const Desktop = dynamic(() =>
  import("./desktop").then((m) => ({ default: m.Desktop })),
);
const MobileApp = dynamic(() =>
  import("./mobile-app").then((m) => ({ default: m.MobileApp })),
);

export function PageClient({ projects, initialIsMobile }: PageClientProps) {
  return initialIsMobile ? (
    <MobileApp projects={projects} />
  ) : (
    <Desktop projects={projects} initialIsMobile={false} />
  );
}
