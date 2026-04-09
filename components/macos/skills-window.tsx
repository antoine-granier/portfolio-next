"use client";

import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface SkillsWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST API"],
  tools: ["Git", "Docker", "Figma", "VS Code", "Zed"],
  other: ["SEO", "CI/CD", "Agile", "UI/UX Design"],
};

export function SkillsWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: SkillsWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";

  return (
    <Window
      title="competences.txt"
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="bg-white p-5 font-mono text-[12px] leading-relaxed text-[#1d1d1f]">
        <p className="text-[#86868b]">
          # {isFr ? "Compétences techniques" : "Technical skills"}
        </p>
        <p className="text-[#86868b]">
          # Antoine Granier
        </p>
        <br />

        <p className="font-semibold text-[#007aff]">
          ## Frontend
        </p>
        {skills.frontend.map((s) => (
          <p key={s} className="text-[#1d1d1f]">  - {s}</p>
        ))}
        <br />

        <p className="font-semibold text-[#34c759]">
          ## Backend
        </p>
        {skills.backend.map((s) => (
          <p key={s} className="text-[#1d1d1f]">  - {s}</p>
        ))}
        <br />

        <p className="font-semibold text-[#ff9500]">
          ## {isFr ? "Outils" : "Tools"}
        </p>
        {skills.tools.map((s) => (
          <p key={s} className="text-[#1d1d1f]">  - {s}</p>
        ))}
        <br />

        <p className="font-semibold text-[#af52de]">
          ## {isFr ? "Autres" : "Other"}
        </p>
        {skills.other.map((s) => (
          <p key={s} className="text-[#1d1d1f]">  - {s}</p>
        ))}
      </div>
    </Window>
  );
}
