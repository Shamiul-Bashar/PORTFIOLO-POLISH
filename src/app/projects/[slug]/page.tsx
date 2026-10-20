import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.shortDescription } : { title: "Project not found" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <main className="case-study"><Container>
    <Link href="/#work" className="back-link"><ArrowLeft size={17} aria-hidden="true" /> All projects</Link>
    <div className="case-header"><p className="eyebrow">PROJECT CASE STUDY / {project.category.toUpperCase()}</p><h1>{project.title}</h1><p className="case-intro">{project.shortDescription}</p><div className="case-links">{project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer">Source repository <ArrowUpRight size={17} aria-hidden="true" /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live application <ArrowUpRight size={17} aria-hidden="true" /></a>}</div></div>
    <div className="case-visual">{project.image ? <Image src={project.image} alt={`${project.title} project preview`} fill priority unoptimized={project.image.startsWith("https://")} sizes="(max-width: 1100px) 100vw, 1100px" className="project-art-image" /> : <div className="case-visual-placeholder"><span>PROJECT / {project.category.toUpperCase()}</span><strong>{project.title}</strong><span>SOFTWARE / SYSTEMS / PROCESS</span></div>}</div>
    <div className="case-body"><div><p className="eyebrow">01 / OVERVIEW</p><h2>What I built</h2><p>{project.overview}</p></div><div><p className="eyebrow">02 / CONTRIBUTION</p><h2>My involvement</h2><p>{project.contribution}</p></div><div><p className="eyebrow">03 / ENGINEERING NOTES</p><h2>Implementation highlights</h2><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></div><div><p className="eyebrow">04 / TECHNOLOGIES</p><h2>Technology stack</h2><div className="tag-list">{project.technologies.map(item => <span key={item}>{item}</span>)}</div></div></div>
    <div className="case-end"><Link href="/#work">← Back to selected work</Link><a href={`mailto:${"siambashar@gmail.com"}`}>Discuss this project ↗</a></div>
  </Container></main>;
}
