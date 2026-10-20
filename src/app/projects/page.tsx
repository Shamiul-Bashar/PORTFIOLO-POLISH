import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "All Projects", description: "Software, web, algorithm and hardware projects by Shamiul Bashar Siam." };

export default function ProjectsPage() {
  return <main className="all-projects-page"><Container>
    <Link className="back-link" href="/#work"><ArrowLeft size={16} /> Back to home</Link>
    <p className="section-kicker"><span className="kicker-dash" /> PROJECT ARCHIVE</p>
    <h1 className="display giant-heading">ALL <span className="accent">PROJECTS.</span></h1>
    <p className="archive-description">A growing collection of applications, systems, and digital hardware projects.</p>
    <div className="archive-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
  </Container></main>;
}
