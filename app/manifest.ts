import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Antoine Granier — Développeur Fullstack",
    short_name: "Antoine Granier",
    description:
      "Portfolio d'Antoine Granier, développeur fullstack basé en France. Spécialisé en React, Next.js et Node.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#e8e4dc",
    theme_color: "#e8e4dc",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/memoji.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/memoji.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["portfolio", "developer", "design"],
    lang: "fr-FR",
  };
}
