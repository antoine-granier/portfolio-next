"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Window } from "./window";
import { useI18n } from "@/lib/i18n";

interface FigmaWindowProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

interface Layer {
  name: string;
  type: "frame" | "text" | "rect" | "image" | "component";
  indent: number;
  visible?: boolean;
}

const layers: Layer[] = [
  { name: "Desktop", type: "frame", indent: 0 },
  { name: "Menu Bar", type: "frame", indent: 1 },
  { name: "Logo", type: "image", indent: 2 },
  { name: "Nav Links", type: "frame", indent: 2 },
  { name: "Hero Section", type: "frame", indent: 1 },
  { name: "portfolio.", type: "text", indent: 2 },
  { name: "welcome to my", type: "text", indent: 2 },
  { name: "Terminal", type: "component", indent: 1 },
  { name: "Sticky Note", type: "component", indent: 1 },
  { name: "Finder Window", type: "component", indent: 1 },
  { name: "Dock", type: "frame", indent: 1 },
  { name: "Icon Grid", type: "frame", indent: 2 },
];

const typeIcons: Record<string, { color: string; label: string }> = {
  frame: { color: "#0c8ce9", label: "#" },
  text: { color: "#e06666", label: "T" },
  rect: { color: "#666", label: "□" },
  image: { color: "#b07cd8", label: "◇" },
  component: { color: "#49c36e", label: "◆" },
};

// Selection box positions mapped to layer indices (approximate CSS)
const selectionBoxes: Record<number, { top: string; left: string; width: string; height: string }> = {
  1: { top: "0", left: "0", width: "100%", height: "10px" }, // Menu Bar
  2: { top: "18px", left: "96px", width: "40px", height: "36px" }, // Logo/Files
  3: { top: "0", left: "50px", width: "80px", height: "10px" }, // Nav Links
  4: { top: "35%", left: "30%", width: "40%", height: "30%" }, // Hero Section
  5: { top: "42%", left: "32%", width: "36%", height: "14%" }, // portfolio.
  6: { top: "36%", left: "38%", width: "24%", height: "6%" }, // welcome to my
  7: { top: "12px", left: "calc(100% - 160px)", width: "112px", height: "80px" }, // Terminal
  8: { top: "12px", left: "8px", width: "64px", height: "56px" }, // Sticky Note
  9: { top: "12px", left: "calc(100% - 40px)", width: "32px", height: "70px" }, // Finder / Icons
  10: { top: "calc(100% - 28px)", left: "20%", width: "60%", height: "22px" }, // Dock
  11: { top: "calc(100% - 28px)", left: "25%", width: "50%", height: "18px" }, // Icon Grid
};

function SelectionOutline({ layerIndex }: { layerIndex: number }) {
  const box = selectionBoxes[layerIndex];
  if (!box) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none absolute border border-[#0c8ce9]"
      style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
    >
      <div className="absolute -top-[3px] -left-[3px] h-[6px] w-[6px] border border-[#0c8ce9] bg-white" />
      <div className="absolute -top-[3px] -right-[3px] h-[6px] w-[6px] border border-[#0c8ce9] bg-white" />
      <div className="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] border border-[#0c8ce9] bg-white" />
      <div className="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] border border-[#0c8ce9] bg-white" />
    </motion.div>
  );
}

export function FigmaWindow({
  className,
  style,
  isOpen = true,
  onClose,
}: FigmaWindowProps) {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [tool, setTool] = useState("cursor");

  const tools = [
    { id: "cursor", icon: "V", label: "Move" },
    { id: "frame", icon: "#", label: "Frame" },
    { id: "rect", icon: "□", label: "Rectangle" },
    { id: "text", icon: "T", label: "Text" },
    { id: "pen", icon: "P", label: "Pen" },
  ];

  return (
    <Window
      title="Portfolio — Figma"
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-h-[650px] bg-[#2c2c2c]">
        {/* Left sidebar - layers */}
        <div className="w-48 border-r border-[#3d3d3d] bg-[#252525]">
          {/* Layers header */}
          <div className="flex items-center justify-between border-b border-[#3d3d3d] px-3 py-1.5">
            <span className="text-[10px] font-semibold text-white/50">
              {isFr ? "Calques" : "Layers"}
            </span>
            <span className="text-[10px] text-white/30">{layers.length}</span>
          </div>

          {/* Layer list */}
          <div className="overflow-y-auto py-1 macos-scrollbar">
            {layers.map((layer, i) => {
              const info = typeIcons[layer.type];
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  onClick={() => setSelectedLayer(i)}
                  className={`flex w-full items-center gap-1.5 py-[3px] text-[11px] transition-colors ${
                    selectedLayer === i
                      ? "bg-[#0c8ce9]/20 text-white"
                      : "text-white/60 hover:bg-white/5"
                  }`}
                  style={{ paddingLeft: `${8 + layer.indent * 14}px` }}
                >
                  <span
                    className="text-[9px] font-bold"
                    style={{ color: info.color }}
                  >
                    {info.label}
                  </span>
                  <span className="truncate">{layer.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex flex-1 flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-[#3d3d3d] bg-[#2c2c2c] px-2 py-1">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`flex h-6 w-6 items-center justify-center rounded text-[11px] font-medium transition-colors ${
                  tool === t.id
                    ? "bg-[#0c8ce9] text-white"
                    : "text-white/50 hover:bg-white/10"
                }`}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}

            <div className="mx-2 h-4 w-px bg-[#3d3d3d]" />

            <span className="text-[10px] text-white/30">100%</span>
          </div>

          {/* Canvas */}
          <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#1a1a1a] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-[640px] overflow-hidden rounded-lg bg-[#e8e4dc] shadow-2xl"
              style={{ aspectRatio: "16/10" }}
            >
              {/* Grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* Clickable canvas elements mapped to layers */}
              {/* 0: Desktop (whole frame) */}
              <button className="absolute inset-0" onClick={() => setSelectedLayer(0)} />

              {/* 1: Menu Bar */}
              <button
                onClick={() => setSelectedLayer(1)}
                className="absolute top-0 right-0 left-0 flex h-[10px] items-center justify-between bg-white/60 px-2"
              >
                <div className="flex items-center gap-1">
                  <div className="h-[4px] w-[4px] rounded-full bg-black/20" />
                  <div className="h-[2px] w-8 rounded bg-black/15" />
                </div>
                <div className="h-[2px] w-12 rounded bg-black/10" />
              </button>

              <div className="relative h-full px-3 pt-2">
                {/* 8: Sticky Note */}
                <button
                  onClick={() => setSelectedLayer(8)}
                  className="absolute top-2 left-2 h-14 w-16 rounded-[2px] bg-[#fff9b1] p-1 shadow-sm text-left"
                >
                  <div className="h-[2px] w-8 rounded bg-black/15" />
                  <div className="mt-[3px] h-[2px] w-10 rounded bg-black/10" />
                  <div className="mt-[3px] h-[2px] w-6 rounded bg-black/10" />
                  <div className="mt-[3px] h-[2px] w-9 rounded bg-black/10" />
                </button>

                {/* 7: Terminal */}
                <button
                  onClick={() => setSelectedLayer(7)}
                  className="absolute top-2 right-12 h-20 w-28 overflow-hidden rounded-[4px] bg-[#1e1e1e] text-left shadow-lg"
                >
                  <div className="flex h-[8px] items-center gap-[2px] bg-[#333] px-1">
                    <div className="h-[3px] w-[3px] rounded-full bg-[#ff5f57]" />
                    <div className="h-[3px] w-[3px] rounded-full bg-[#ffbd2e]" />
                    <div className="h-[3px] w-[3px] rounded-full bg-[#28c840]" />
                  </div>
                  <div className="space-y-[2px] p-1">
                    <div className="flex gap-1">
                      <div className="h-[2px] w-2 rounded bg-green-400/60" />
                      <div className="h-[2px] w-6 rounded bg-white/30" />
                    </div>
                    <div className="h-[2px] w-14 rounded bg-white/15" />
                    <div className="flex gap-1">
                      <div className="h-[2px] w-2 rounded bg-green-400/60" />
                      <div className="h-[2px] w-8 rounded bg-white/30" />
                    </div>
                    <div className="h-[2px] w-16 rounded bg-white/15" />
                  </div>
                </button>

                {/* 9: Finder Window (desktop icons as proxy) */}
                <button
                  onClick={() => setSelectedLayer(9)}
                  className="absolute top-2 right-2 flex flex-col items-center gap-2"
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-5 w-6 rounded-[2px] bg-[#5ac8fa]" />
                    <div className="h-[2px] w-6 rounded bg-black/15" />
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-5 w-6 rounded-[2px] bg-[#af52de]" />
                    <div className="h-[2px] w-6 rounded bg-black/15" />
                  </div>
                </button>

                {/* Files */}
                <button
                  onClick={() => setSelectedLayer(2)}
                  className="absolute top-3 left-24 flex flex-col items-center gap-0.5"
                >
                  <div className="h-6 w-5 rounded-[1px] bg-white shadow-sm" />
                  <div className="h-[2px] w-8 rounded bg-black/15" />
                </button>

                {/* 4: Hero Section */}
                <button
                  onClick={() => setSelectedLayer(4)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  {/* 6: welcome text */}
                  <p className="text-[6px] text-[#1d1d1f]/30">bienvenue sur mon</p>
                  {/* 5: portfolio. text */}
                  <p className="font-serif text-[22px] font-light italic text-[#1d1d1f]/60">
                    portfolio.
                  </p>
                </button>

                {/* About sticky */}
                <button
                  onClick={() => setSelectedLayer(8)}
                  className="absolute right-3 bottom-12 h-10 w-16 rounded-[2px] bg-[#ffb3c6] p-1 text-left shadow-sm"
                >
                  <div className="h-[2px] w-6 rounded bg-black/15" />
                  <div className="mt-[2px] h-[2px] w-10 rounded bg-black/10" />
                  <div className="mt-[2px] h-[2px] w-8 rounded bg-black/10" />
                </button>

                {/* Wireframe */}
                <button
                  onClick={() => setSelectedLayer(9)}
                  className="absolute bottom-10 left-2 h-16 w-14 rounded-[2px] bg-white p-1 text-left shadow-sm"
                >
                  <div className="h-[3px] w-full rounded border border-black/10" />
                  <div className="mt-1 flex gap-[2px]">
                    <div className="h-4 w-4 rounded-[1px] border border-black/10" />
                    <div className="h-4 w-4 rounded-[1px] border border-black/10" />
                  </div>
                </button>

                {/* 10: Dock */}
                <button
                  onClick={() => setSelectedLayer(10)}
                  className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-[3px] rounded-lg bg-white/25 px-2.5 py-1.5"
                >
                  {Array.from({ length: 13 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-3.5 w-3.5 rounded-[3px]"
                      style={{
                        backgroundColor: [
                          "#3b9ff5", "#8b5cf6", "#333", "#5ac8fa",
                          "#ffcc02", "#f5f5f5", "#007aff", "#333",
                          "#f97316", "#6366f1", "#ec4899", "#0a66c2",
                          "#6b7280",
                        ][i],
                      }}
                    />
                  ))}
                </button>
              </div>

              {/* Selection outline on any selected element */}
              {selectedLayer > 0 && <SelectionOutline layerIndex={selectedLayer} />}
            </motion.div>
          </div>
        </div>

        {/* Right sidebar - properties */}
        <div className="w-48 border-l border-[#3d3d3d] bg-[#252525] p-3">
          <p className="text-[10px] font-semibold text-white/50">
            {isFr ? "Propriétés" : "Properties"}
          </p>

          <div className="mt-3 space-y-3">
            {/* Position */}
            <div>
              <p className="mb-1 text-[9px] uppercase tracking-wider text-white/30">
                Position
              </p>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex items-center gap-1 rounded bg-[#1e1e1e] px-2 py-1">
                  <span className="text-[9px] text-white/30">X</span>
                  <span className="text-[10px] text-white/60">128</span>
                </div>
                <div className="flex items-center gap-1 rounded bg-[#1e1e1e] px-2 py-1">
                  <span className="text-[9px] text-white/30">Y</span>
                  <span className="text-[10px] text-white/60">96</span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="mb-1 text-[9px] uppercase tracking-wider text-white/30">
                {isFr ? "Taille" : "Size"}
              </p>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex items-center gap-1 rounded bg-[#1e1e1e] px-2 py-1">
                  <span className="text-[9px] text-white/30">W</span>
                  <span className="text-[10px] text-white/60">1440</span>
                </div>
                <div className="flex items-center gap-1 rounded bg-[#1e1e1e] px-2 py-1">
                  <span className="text-[9px] text-white/30">H</span>
                  <span className="text-[10px] text-white/60">900</span>
                </div>
              </div>
            </div>

            {/* Fill */}
            <div>
              <p className="mb-1 text-[9px] uppercase tracking-wider text-white/30">
                Fill
              </p>
              <div className="flex items-center gap-2 rounded bg-[#1e1e1e] px-2 py-1">
                <div className="h-3 w-3 rounded border border-white/10 bg-[#e8e4dc]" />
                <span className="text-[10px] text-white/60">#E8E4DC</span>
              </div>
            </div>

            {/* Typography */}
            <div>
              <p className="mb-1 text-[9px] uppercase tracking-wider text-white/30">
                {isFr ? "Typographie" : "Typography"}
              </p>
              <div className="rounded bg-[#1e1e1e] px-2 py-1.5">
                <p className="text-[10px] text-white/60">Geist Sans</p>
                <p className="text-[9px] text-white/30">Regular — 16px</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
