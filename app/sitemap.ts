import type { MetadataRoute } from "next";

const BASE_URL = "https://antoine-granier.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          fr: `${BASE_URL}?lang=fr`,
          en: `${BASE_URL}?lang=en`,
        },
      },
    },
  ];
}
