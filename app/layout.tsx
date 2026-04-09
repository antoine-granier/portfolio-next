import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e4dc" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antoine-granier.vercel.app"),
  title: {
    default: "Antoine Granier - Développeur Fullstack",
    template: "%s | Antoine Granier",
  },
  description:
    "Développeur fullstack basé en France, passionné par le design, la photographie et les technologies web modernes. Spécialisé en React, Next.js et Node.js.",
  keywords: [
    "développeur fullstack",
    "développeur web",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "France",
    "Antoine Granier",
  ],
  authors: [{ name: "Antoine Granier", url: "https://antoine-granier.vercel.app" }],
  creator: "Antoine Granier",
  publisher: "Antoine Granier",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    title: "Antoine Granier",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://antoine-granier.vercel.app",
    siteName: "Antoine Granier",
    title: "Antoine Granier - Développeur Fullstack",
    description:
      "Développeur fullstack basé en France, passionné par le design, la photographie et les technologies web modernes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Antoine Granier - Développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antoine Granier - Développeur Fullstack",
    description:
      "Développeur fullstack basé en France, passionné par le design, la photographie et les technologies web modernes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Antoine Granier",
              jobTitle: "Développeur Fullstack",
              description:
                "Développeur fullstack basé en France, spécialisé en React, Next.js et Node.js.",
              url: "https://antoine-granier.vercel.app",
              image: "https://antoine-granier.vercel.app/images/memoji.png",
              sameAs: [
                "https://github.com/antoine-granier",
                "https://www.linkedin.com/in/antoine-granier",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
                addressRegion: "Île-de-France",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Tailwind CSS",
                "React Native",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Antoine Granier — Portfolio",
              url: "https://antoine-granier.vercel.app",
              inLanguage: ["fr-FR", "en-US"],
              author: {
                "@type": "Person",
                name: "Antoine Granier",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
