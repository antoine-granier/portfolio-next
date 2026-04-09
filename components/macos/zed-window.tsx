"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Window } from "./window";

interface ZedWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

interface FileTab {
  name: string;
  language: string;
  content: string[];
}

const files: FileTab[] = [
  {
    name: "page.tsx",
    language: "tsx",
    content: [
      'import { getProjects } from "@/lib/mdx";',
      'import { Desktop } from "./desktop";',
      "",
      "export default function Home() {",
      "  const projects = getProjects();",
      "  const projectData = projects.map((p) => ({",
      "    slug: p.slug,",
      "    title: p.frontmatter.title,",
      "    description: p.frontmatter.description,",
      "    tech: p.frontmatter.tech,",
      "    github: p.frontmatter.github,",
      "    content: p.content,",
      "  }));",
      "",
      "  return <Desktop projects={projectData} />;",
      "}",
    ],
  },
  {
    name: "layout.tsx",
    language: "tsx",
    content: [
      'import type { Metadata } from "next";',
      'import { Geist } from "next/font/google";',
      'import "./globals.css";',
      "",
      "const geistSans = Geist({",
      '  variable: "--font-geist-sans",',
      '  subsets: ["latin"],',
      "});",
      "",
      "export const metadata: Metadata = {",
      "  title: {",
      '    default: "Antoine Granier",',
      '    template: "%s | Antoine Granier",',
      "  },",
      "};",
      "",
      "export default function RootLayout({",
      "  children,",
      "}: {",
      "  children: React.ReactNode;",
      "}) {",
      "  return (",
      '    <html lang="fr">',
      "      <body>{children}</body>",
      "    </html>",
      "  );",
      "}",
    ],
  },
  {
    name: "globals.css",
    language: "css",
    content: [
      '@import "tailwindcss";',
      "",
      ":root {",
      "  --background: #e8e4dc;",
      "  --foreground: #1d1d1f;",
      "  --card: rgba(255,255,255,0.85);",
      "  --muted: #86868b;",
      "  --accent: #0071e3;",
      "}",
      "",
      ".grid-background {",
      "  background-image:",
      "    linear-gradient(var(--grid-color) 1px,",
      "      transparent 1px),",
      "    linear-gradient(90deg,",
      "      var(--grid-color) 1px,",
      "      transparent 1px);",
      "  background-size: 24px 24px;",
      "}",
    ],
  },
];

function highlightLine(line: string, lang: string): React.ReactNode[] {
  if (!line) return [<span key="empty">&nbsp;</span>];

  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const rules =
    lang === "css"
      ? [
          { regex: /(@import|:root)/g, color: "#c586c0" },
          { regex: /(--[\w-]+)/g, color: "#9cdcfe" },
          { regex: /(#[0-9a-fA-F]{3,8})/g, color: "#ce9178" },
          { regex: /(".*?")/g, color: "#ce9178" },
          { regex: /(\{|\}|;|:)/g, color: "#808080" },
        ]
      : [
          { regex: /(import|export|default|function|const|return|from|type)/g, color: "#c586c0" },
          { regex: /(".*?"|'.*?'|`.*?`)/g, color: "#ce9178" },
          { regex: /(\/\/.*$)/g, color: "#6a9955" },
          { regex: /(<\/?[\w.]+|\/?>)/g, color: "#569cd6" },
          { regex: /(\{|\}|\(|\)|;|=>|\.)/g, color: "#808080" },
        ];

  // Simple approach: just colorize keywords
  const tokens = remaining.split(/(\s+)/);
  for (const token of tokens) {
    let colored = false;
    for (const rule of rules) {
      rule.regex.lastIndex = 0;
      if (rule.regex.test(token)) {
        parts.push(
          <span key={key++} style={{ color: rule.color }}>
            {token}
          </span>
        );
        colored = true;
        break;
      }
    }
    if (!colored) {
      // Check for strings
      if (/^["'`]/.test(token)) {
        parts.push(
          <span key={key++} style={{ color: "#ce9178" }}>
            {token}
          </span>
        );
      } else {
        parts.push(<span key={key++}>{token}</span>);
      }
    }
  }

  return parts;
}

const sidebarFiles = [
  { name: "app", indent: 0, isDir: true },
  { name: "page.tsx", indent: 1, isDir: false },
  { name: "layout.tsx", indent: 1, isDir: false },
  { name: "desktop.tsx", indent: 1, isDir: false },
  { name: "globals.css", indent: 1, isDir: false },
  { name: "components", indent: 0, isDir: true },
  { name: "macos", indent: 1, isDir: true },
  { name: "lib", indent: 0, isDir: true },
  { name: "content", indent: 0, isDir: true },
  { name: "public", indent: 0, isDir: true },
];

export function ZedWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: ZedWindowProps) {
  const [activeTab, setActiveTab] = useState(0);
  const file = files[activeTab];

  return (
    <Window
      title={`${file.name} — portfolio`}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[500px] bg-[#1e1e1e]">
        {/* File explorer sidebar */}
        <div className="w-44 border-r border-[#2d2d2d] bg-[#181818] py-2">
          <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Explorer
          </p>
          {sidebarFiles.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                const tabIdx = files.findIndex((t) => t.name === f.name);
                if (tabIdx >= 0) setActiveTab(tabIdx);
              }}
              className={`flex w-full items-center gap-1.5 py-[2px] text-[11px] transition-colors hover:bg-white/5 ${
                file.name === f.name ? "bg-white/10 text-white" : "text-white/50"
              }`}
              style={{ paddingLeft: `${12 + f.indent * 12}px` }}
            >
              {f.isDir ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              ) : (
                <span className="w-[10px]" />
              )}
              <span className={f.isDir ? "font-medium" : ""}>
                {f.name}
              </span>
            </button>
          ))}
        </div>

        {/* Editor area */}
        <div className="flex flex-1 flex-col">
          {/* Tabs */}
          <div className="flex border-b border-[#2d2d2d] bg-[#1e1e1e]">
            {files.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-1.5 border-r border-[#2d2d2d] px-3 py-1.5 text-[11px] transition-colors ${
                  i === activeTab
                    ? "bg-[#1e1e1e] text-white"
                    : "bg-[#181818] text-white/40 hover:text-white/60"
                }`}
              >
                {f.name}
                {i === activeTab && (
                  <div className="h-1 w-1 rounded-full bg-white/30" />
                )}
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="flex-1 overflow-y-auto p-0 font-mono text-[11px] leading-[18px] macos-scrollbar">
            {file.content.map((line, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.015, duration: 0.1 }}
                className="flex hover:bg-white/[0.03]"
              >
                <span className="w-10 shrink-0 select-none pr-3 text-right text-white/20">
                  {i + 1}
                </span>
                <span className="flex-1 text-[#d4d4d4]">
                  {highlightLine(line, file.language)}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-[#2d2d2d] bg-[#181818] px-3 py-[2px] text-[10px] text-white/30">
            <div className="flex items-center gap-3">
              <span>{file.language.toUpperCase()}</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
