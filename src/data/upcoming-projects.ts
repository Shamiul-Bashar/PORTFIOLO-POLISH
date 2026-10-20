export type UpcomingProject = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  repository: string;
  cover: "agent" | "genome" | "academic";
};

export const upcomingProjects: UpcomingProject[] = [
  {
    name: "AGENT PRIME",
    category: "AI AGENT / AUTOMATION",
    description:
      "A modular personal AI operating system exploring intelligent task automation, persistent memory, AI routing, and Telegram-based assistance.",
    technologies: ["Python", "AI Agents", "Telegram Bot", "Automation"],
    repository: "https://github.com/Shamiul-Bashar/personal-ai-agent",
    cover: "agent",
  },
  {
    name: "GENOSEARCH",
    category: "BIOINFORMATICS",
    description:
      "An evolving bioinformatics platform designed to simplify DNA sequence exploration, mutation analysis, and biological pattern searching.",
    technologies: ["Next.js", "FastAPI", "Python", "PostgreSQL"],
    repository: "https://github.com/Shamiul-Bashar/genosearch",
    cover: "genome",
  },
  {
    name: "ACADEMICOS",
    category: "STUDENT PRODUCTIVITY / MOBILE & WEB",
    description:
      "A cross-platform academic productivity application in development, focused on editable class routines, attendance tracking, and student workflows.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase"],
    repository: "https://github.com/Shamiul-Bashar/AcademicOS",
    cover: "academic",
  },
];
