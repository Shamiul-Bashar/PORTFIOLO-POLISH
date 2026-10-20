export type ProjectCategory = "Web Application" | "Software Systems" | "Mobile & Web" | "Computer Architecture" | "Embedded Systems";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  shortDescription: string;
  overview: string;
  contribution: string;
  highlights: string[];
  technologies: string[];
  repository?: string;
  demo?: string;
  image?: string; // Put real screenshots under /public/projects, then update here.
  featured: boolean;
};
