"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { MenuBar } from "@/components/macos/menu-bar";
import { Dock } from "@/components/macos/dock";
import { Terminal } from "@/components/macos/terminal";
import { StickyNote } from "@/components/macos/sticky-note";
import { DesktopIcon } from "@/components/macos/desktop-icon";
import { FinderWindow } from "@/components/macos/finder-window";
import { MailWindow } from "@/components/macos/mail-window";
import { ProjectWindow } from "@/components/macos/project-window";
import { PhotoPreviewWindow } from "@/components/macos/photo-preview-window";
import { PdfWindow } from "@/components/macos/pdf-window";
import { TrashWindow } from "@/components/macos/trash-window";
import { TrashDialog } from "@/components/macos/trash-dialog";
import { Launchpad } from "@/components/macos/launchpad";
import { ContextMenu } from "@/components/macos/context-menu";
import { WifiMenu } from "@/components/macos/wifi-menu";
import { Spotlight } from "@/components/macos/spotlight";
import { NotificationCenter } from "@/components/macos/notification-center";
import { WallpaperPicker, wallpapers, type Wallpaper } from "@/components/macos/wallpaper-picker";
import { SkillsWindow } from "@/components/macos/skills-window";
import { RemindersWindow } from "@/components/macos/reminders-window";
import { NotesWindow } from "@/components/macos/notes-window";
import { SettingsWindow } from "@/components/macos/settings-window";
import { ClaudeWindow } from "@/components/macos/claude-window";
import { ZedWindow } from "@/components/macos/zed-window";
import { FigmaWindow } from "@/components/macos/figma-window";
import { MusicWindow } from "@/components/macos/music-window";
import { AppStoreWindow } from "@/components/macos/appstore-window";
import { Draggable } from "@/components/macos/draggable";
import { HandwrittenTitle } from "@/components/macos/handwritten-title";
import { WireframeSketch } from "@/components/macos/wireframe-sketch";
import { SkillsSketch } from "@/components/macos/skills-sketch";

import { MobileLayout } from "@/components/mobile/mobile-layout";
import { BootScreen } from "@/components/macos/boot-screen";

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

interface DesktopProps {
  projects: ProjectData[];
  initialIsMobile?: boolean;
}

type WindowId = "finder" | "terminal" | "contact" | "cv" | "trash" | "skills" | "reminders" | "notes" | "settings" | "claude" | "zed" | "figma" | "music" | "appstore";

function DesktopInner({ projects, initialIsMobile = false }: DesktopProps) {
  const { t, toggle: toggleLang } = useI18n();
  // Initialized from server-side User-Agent so SSR HTML matches the device.
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(
    () => new Set(["terminal"])
  );
  const [finderInitialTab, setFinderInitialTab] = useState<
    "projects" | "photos"
  >("projects");
  const [openProjectSlugs, setOpenProjectSlugs] = useState<Set<string>>(
    () => new Set()
  );
  const [openPhotos, setOpenPhotos] = useState<
    { src: string; alt: string }[]
  >([]);
  const [trashDialog, setTrashDialog] = useState(false);
  const [launchpad, setLaunchpad] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    open: boolean;
  }>({ x: 0, y: 0, open: false });
  const [wifiOpen, setWifiOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [notifCenter, setNotifCenter] = useState(false);
  const [wallpaper, setWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [wallpaperPicker, setWallpaperPicker] = useState(false);
  const [a11y, setA11y] = useState({
    reduceMotion: false,
    largeText: false,
    highContrast: false,
  });

  // Cmd+K to open Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Apply accessibility settings on the <html> element so they cascade everywhere
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("a11y-reduce-motion", a11y.reduceMotion);
    html.classList.toggle("a11y-large-text", a11y.largeText);
    html.classList.toggle("a11y-high-contrast", a11y.highContrast);
  }, [a11y]);

  const openFinder = useCallback((tab: "projects" | "photos") => {
    setFinderInitialTab(tab);
    setOpenWindows((prev) => new Set(prev).add("finder"));
  }, []);

  const toggle = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const close = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const openProject = useCallback((slug: string) => {
    setOpenProjectSlugs((prev) => new Set(prev).add(slug));
  }, []);

  const closeProject = useCallback((slug: string) => {
    setOpenProjectSlugs((prev) => {
      const next = new Set(prev);
      next.delete(slug);
      return next;
    });
  }, []);

  const openPhoto = useCallback((src: string, alt: string) => {
    setOpenPhotos((prev) => {
      if (prev.some((p) => p.src === src)) return prev;
      return [...prev, { src, alt }];
    });
  }, []);

  const closePhoto = useCallback((src: string) => {
    setOpenPhotos((prev) => prev.filter((p) => p.src !== src));
  }, []);

  const handleAction = useCallback(
    (action: string) => {
      if (action.startsWith("project:")) {
        const slug = action.replace("project:", "");
        openFinder("projects");
        openProject(slug);
      } else if (action === "projects") {
        openFinder("projects");
      } else if (action === "photos") {
        openFinder("photos");
      } else if (action === "trash") {
        setTrashDialog(true);
      } else if (action === "launchpad") {
        setLaunchpad(true);
      } else if (action === "lang") {
        toggleLang();
      } else if (action === "wallpaper") {
        setWallpaperPicker(true);
      } else if (
        action === "terminal" ||
        action === "contact" ||
        action === "cv" ||
        action === "skills" ||
        action === "reminders" ||
        action === "notes" ||
        action === "settings" ||
        action === "claude" ||
        action === "zed" ||
        action === "figma" ||
        action === "music" ||
        action === "appstore"
      ) {
        toggle(action as WindowId);
      }
    },
    [openFinder, toggle]
  );

  if (isMobile) {
    return (
      <MobileLayout
        projects={projects}
        onOpenContact={() => {
          window.location.href = "mailto:antoine.granier@outlook.com";
        }}
      />
    );
  }

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden ${wallpaper.dark ? "text-white" : "text-[#1d1d1f]"}`}
      style={wallpaper.style}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, open: true });
      }}
    >
      {/* Grid overlay */}
      {wallpaper.grid && (
        <div className="pointer-events-none absolute inset-0 z-0 grid-background" />
      )}

      <MenuBar onAction={handleAction} isDark={wallpaper.dark} onWifiToggle={() => setWifiOpen(!wifiOpen)} onDateClick={() => setNotifCenter(!notifCenter)} onSpotlightToggle={() => setSpotlightOpen(!spotlightOpen)} />
      <WifiMenu isOpen={wifiOpen} onClose={() => setWifiOpen(false)} />
      <NotificationCenter isOpen={notifCenter} onClose={() => setNotifCenter(false)} />

      <div className="relative z-[1] h-full w-full pt-7 pb-20">
        <HandwrittenTitle />

        {/* Sticky note - to do */}
        <Draggable handleOnly={false} className="absolute top-12 left-6">
          <StickyNote color="yellow" rotate={-2} delay={0.3}>
            <p className="mb-1 text-sm font-bold">{t("todo.title")}</p>
            <ul className="space-y-0.5 text-[12px]">
              <li>{t("todo.1")}</li>
              <li>{t("todo.2")}</li>
              <li className="line-through opacity-50">{t("todo.3")}</li>
              <li className="line-through opacity-50">{t("todo.4")}</li>
              <li>{t("todo.5")}</li>
              <li>{t("todo.6")}</li>
            </ul>
          </StickyNote>
        </Draggable>

        {/* Desktop icons */}
        <Draggable handleOnly={false} className="absolute top-12 right-8">
          <div className="flex flex-col gap-4">
            <DesktopIcon
              label={t("menu.projects")}
              onClick={() => openFinder("projects")}
              icon="/icons/folder.png"
              delay={0.5}
            />
            <DesktopIcon
              label={t("dock.photos")}
              onClick={() => openFinder("photos")}
              icon="/icons/folder-purple.png"
              delay={0.6}
            />
          </div>
        </Draggable>

        {/* Files */}
        <Draggable handleOnly={false} className="absolute" style={{ left: "280px", top: "60px" }}>
          <div className="flex flex-col gap-4">
            <DesktopIcon
              label="Resume.pdf"
              onClick={() => toggle("cv")}
              variant="file"
              delay={0.7}
            />
            <DesktopIcon
              label="competences.txt"
              onClick={() => toggle("skills")}
              icon="/icons/txt.png"
              delay={0.8}
            />
          </div>
        </Draggable>

        {/* Skills keywords scattered around competences.txt */}
        <SkillsSketch />


        {/* Wireframe sketch - bottom left */}
        <Draggable handleOnly={false} className="absolute bottom-24 left-6">
          <WireframeSketch delay={0.9} />
        </Draggable>

        {/* About sticky */}
        <Draggable
          handleOnly={false}
          className="absolute"
          style={{ right: "120px", bottom: "140px" }}
        >
          <StickyNote color="pink" rotate={3} delay={0.8}>
            <p className="text-sm font-bold">{t("about.title")}</p>
            <p className="mt-1 text-[11px] leading-relaxed">
              {t("about.text")}
            </p>
          </StickyNote>
        </Draggable>

        {/* Windows */}
        <AnimatePresence>
          {openWindows.has("terminal") && (
            <Draggable key="terminal" className="absolute top-16 right-[140px]">
              <Terminal
                delay={0}
                className="w-[380px]"
                isOpen
                onClose={() => close("terminal")}
              />
            </Draggable>
          )}

          {openWindows.has("finder") && (
            <Draggable key="finder" className="absolute bottom-28 left-8">
              <FinderWindow
                projects={projects}
                delay={0}
                className="w-[620px]"
                isOpen
                onClose={() => close("finder")}
                onSelectProject={openProject}
                onSelectPhoto={openPhoto}
                initialTab={finderInitialTab}
              />
            </Draggable>
          )}

          {openWindows.has("contact") && (
            <Draggable
              key="contact"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <MailWindow
                className="w-[480px]"
                isOpen
                onClose={() => close("contact")}
              />
            </Draggable>
          )}

          {openWindows.has("cv") && (
            <Draggable
              key="cv"
              className="absolute"
              style={{ top: "60px", left: "350px" }}
            >
              <PdfWindow
                src="/cv-antoine-granier.pdf"
                title="Resume.pdf — Aperçu"
                className="w-[680px]"
                isOpen
                onClose={() => close("cv")}
              />
            </Draggable>
          )}

          {openWindows.has("appstore") && (
            <Draggable
              key="appstore"
              className="absolute"
              style={{ top: "60px", left: "280px" }}
            >
              <AppStoreWindow
                className="w-[620px]"
                isOpen
                onClose={() => close("appstore")}
              />
            </Draggable>
          )}

          {openWindows.has("music") && (
            <Draggable
              key="music"
              className="absolute"
              style={{ top: "80px", left: "350px" }}
            >
              <MusicWindow
                className="w-[400px]"
                isOpen
                onClose={() => close("music")}
              />
            </Draggable>
          )}

          {openWindows.has("figma") && (
            <Draggable
              key="figma"
              className="absolute"
              style={{ top: "40px", left: "150px" }}
            >
              <FigmaWindow
                className="w-[1100px]"
                isOpen
                onClose={() => close("figma")}
              />
            </Draggable>
          )}

          {openWindows.has("zed") && (
            <Draggable
              key="zed"
              className="absolute"
              style={{ top: "50px", left: "200px" }}
            >
              <ZedWindow
                className="w-[700px]"
                isOpen
                onClose={() => close("zed")}
              />
            </Draggable>
          )}

          {openWindows.has("claude") && (
            <Draggable
              key="claude"
              className="absolute"
              style={{ top: "100px", left: "400px" }}
            >
              <ClaudeWindow
                className="w-[400px]"
                isOpen
                onClose={() => close("claude")}
              />
            </Draggable>
          )}

          {openWindows.has("settings") && (
            <Draggable
              key="settings"
              className="absolute"
              style={{ top: "100px", left: "350px" }}
            >
              <SettingsWindow
                className="w-[520px]"
                isOpen
                onClose={() => close("settings")}
                wallpaper={wallpaper}
                onWallpaperChange={setWallpaper}
                accessibility={a11y}
                onAccessibilityChange={setA11y}
              />
            </Draggable>
          )}

          {openWindows.has("notes") && (
            <Draggable
              key="notes"
              className="absolute"
              style={{ top: "60px", left: "250px" }}
            >
              <NotesWindow
                className="w-[600px]"
                isOpen
                onClose={() => close("notes")}
              />
            </Draggable>
          )}

          {openWindows.has("reminders") && (
            <Draggable
              key="reminders"
              className="absolute"
              style={{ top: "80px", left: "200px" }}
            >
              <RemindersWindow
                className="w-[480px]"
                isOpen
                onClose={() => close("reminders")}
              />
            </Draggable>
          )}

          {openWindows.has("skills") && (
            <Draggable
              key="skills"
              className="absolute"
              style={{ top: "80px", left: "400px" }}
            >
              <SkillsWindow
                className="w-[380px]"
                isOpen
                onClose={() => close("skills")}
              />
            </Draggable>
          )}

          {openWindows.has("trash") && (
            <Draggable
              key="trash"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <TrashWindow
                className="w-[360px]"
                isOpen
                onClose={() => close("trash")}
                onOpenContact={() => toggle("contact")}
              />
            </Draggable>
          )}

          {/* Project detail windows */}
          {projects
            .filter((p) => openProjectSlugs.has(p.slug))
            .map((project, i) => (
              <Draggable
                key={`project-${project.slug}`}
                className="absolute"
                style={{
                  top: `${100 + i * 30}px`,
                  left: `${350 + i * 30}px`,
                }}
              >
                <ProjectWindow
                  project={project}
                  className="w-[500px]"
                  isOpen
                  onClose={() => closeProject(project.slug)}
                />
              </Draggable>
            ))}

          {/* Photo preview windows */}
          {openPhotos.map((photo, i) => (
            <Draggable
              key={`photo-${photo.src}`}
              className="absolute"
              style={{
                top: `${80 + i * 25}px`,
                left: `${400 + i * 25}px`,
              }}
            >
              <PhotoPreviewWindow
                src={photo.src}
                alt={photo.alt}
                className="w-auto"
                isOpen
                onClose={() => closePhoto(photo.src)}
              />
            </Draggable>
          ))}
        </AnimatePresence>
      </div>

      <Dock
        onAction={handleAction}
        openActions={new Set([
          ...(openWindows.has("finder") ? ["projects", "photos"] : []),
          ...(openWindows.has("terminal") ? ["terminal"] : []),
          ...(openWindows.has("contact") ? ["contact"] : []),
          ...(openWindows.has("cv") ? ["cv"] : []),
          ...(openWindows.has("skills") ? ["skills"] : []),
          ...(openWindows.has("reminders") ? ["reminders"] : []),
          ...(openWindows.has("notes") ? ["notes"] : []),
          ...(openWindows.has("settings") ? ["settings"] : []),
          ...(openWindows.has("claude") ? ["claude"] : []),
          ...(openWindows.has("zed") ? ["zed"] : []),
          ...(openWindows.has("figma") ? ["figma"] : []),
          ...(openWindows.has("music") ? ["music"] : []),
          ...(openWindows.has("appstore") ? ["appstore"] : []),
        ])}
      />

      <Launchpad isOpen={launchpad} onClose={() => setLaunchpad(false)} />

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onAction={handleAction}
      />

      <WallpaperPicker
        isOpen={wallpaperPicker}
        onClose={() => setWallpaperPicker(false)}
        currentId={wallpaper.id}
        onSelect={setWallpaper}
      />

      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.open}
        onClose={() => setContextMenu((p) => ({ ...p, open: false }))}
        onAction={handleAction}
      />

      <TrashDialog
        isOpen={trashDialog}
        onCancel={() => setTrashDialog(false)}
        onComplete={() => {
          setTrashDialog(false);
          setOpenWindows((prev) => new Set(prev).add("trash"));
        }}
      />

      {booting && <BootScreen onComplete={() => setBooting(false)} />}
    </div>
  );
}

export function Desktop({ projects, initialIsMobile }: DesktopProps) {
  return (
    <I18nProvider>
      <DesktopInner projects={projects} initialIsMobile={initialIsMobile} />
    </I18nProvider>
  );
}
