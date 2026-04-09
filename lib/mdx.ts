import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  descriptionEn?: string;
  tech: string[];
  image?: string;
  github?: string;
  url?: string;
  date: string;
  featured?: boolean;
  contentEn?: string;
  android?: string;
  ios?: string;
  chrome?: string;
  firefox?: string;
  donate?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, "projects");

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
}
