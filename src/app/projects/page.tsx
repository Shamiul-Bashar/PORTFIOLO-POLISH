import type { Metadata } from "next";
import { ProjectArchive } from "@/components/projects/project-archive";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Explore completed software and hardware projects alongside AI, bioinformatics, and academic products currently in development.",
};

export default function ProjectsPage() {
  return <main className="all-projects-page"><ProjectArchive /></main>;
}
