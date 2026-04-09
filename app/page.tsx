import { headers } from "next/headers";
import { getProjects } from "@/lib/mdx";
import { PageClient } from "./page-client";

export default async function Home() {
  const ua = (await headers()).get("user-agent") ?? "";
  const initialIsMobile =
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  const projects = getProjects();
  const projectData = projects.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    descriptionEn: p.frontmatter.descriptionEn,
    image: p.frontmatter.image,
    tech: p.frontmatter.tech,
    github: p.frontmatter.github,
    url: p.frontmatter.url,
    android: p.frontmatter.android,
    ios: p.frontmatter.ios,
    chrome: p.frontmatter.chrome,
    firefox: p.frontmatter.firefox,
    donate: p.frontmatter.donate,
    content: p.content,
    contentEn: p.frontmatter.contentEn,
  }));

  return (
    <>
      {/* SEO: Server-rendered content for search engine crawlers */}
      <div className="sr-only">
        <h1>Antoine Granier — Développeur Fullstack</h1>
        <p>
          Développeur fullstack basé en France, passionné par le design, la
          photographie et les technologies web modernes. Spécialisé en React,
          Next.js, TypeScript et Node.js.
        </p>

        <h2>À propos</h2>
        <p>
          Je conçois et développe des applications web et mobiles modernes avec
          une attention particulière au design et à l&apos;expérience
          utilisateur. Basé à Paris, en Île-de-France.
        </p>

        <h2>Compétences techniques</h2>
        <ul>
          <li>Frontend : React, Next.js, TypeScript, Tailwind CSS, Framer Motion</li>
          <li>Backend : Node.js, Express, PostgreSQL, Prisma, REST API</li>
          <li>Mobile : React Native, Expo</li>
          <li>Outils : Git, Docker, Figma, VS Code, Zed</li>
          <li>Autres : SEO, CI/CD, UI/UX Design</li>
        </ul>

        <h2>Projets</h2>
        {projectData.map((project) => (
          <article key={project.slug}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies : {project.tech.join(", ")}</p>
            {project.url && (
              <p>
                Site :{" "}
                <a href={project.url} rel="noopener noreferrer">
                  {project.url}
                </a>
              </p>
            )}
          </article>
        ))}

        <h2>Contact</h2>
        <ul>
          <li>
            Email :{" "}
            <a href="mailto:antoine.granier@outlook.com">
              antoine.granier@outlook.com
            </a>
          </li>
          <li>
            GitHub :{" "}
            <a
              href="https://github.com/antoine-granier"
              rel="noopener noreferrer"
            >
              github.com/antoine-granier
            </a>
          </li>
          <li>
            LinkedIn :{" "}
            <a
              href="https://www.linkedin.com/in/antoine-granier"
              rel="noopener noreferrer"
            >
              linkedin.com/in/antoine-granier
            </a>
          </li>
        </ul>
      </div>

      <PageClient projects={projectData} initialIsMobile={initialIsMobile} />
    </>
  );
}
