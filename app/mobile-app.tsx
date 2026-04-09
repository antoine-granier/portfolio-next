"use client";

import { I18nProvider } from "@/lib/i18n";
import { MobileLayout } from "@/components/mobile/mobile-layout";

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

interface MobileAppProps {
  projects: ProjectData[];
}

export function MobileApp({ projects }: MobileAppProps) {
  return (
    <I18nProvider>
      <MobileLayout
        projects={projects}
        onOpenContact={() => {
          window.location.href = "mailto:antoine.granier@outlook.com";
        }}
      />
    </I18nProvider>
  );
}
