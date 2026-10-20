import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { PortfolioProject } from "@/types/project";

export function ProjectCard({ project, index, compact = false, variant }: {
  project: PortfolioProject;
  index: number;
  compact?: boolean;
  variant?: "carousel";
}) {
  if (variant === "carousel") {
    return (
      <article className="project-card project-card-carousel">
        <Link href={`/projects/${project.slug}`} className="project-card-preview" aria-label={`Open ${project.title} project details`}>
          <div className="project-art">
            {project.image ? (
              <Image src={project.image} alt="" fill sizes="(max-width: 630px) 88vw, (max-width: 1000px) 46vw, 31vw" className="project-art-image" />
            ) : (
              <div className="project-preview-fallback">
                <span className="project-preview-note">NO SCREENSHOT</span>
                <strong className="display">{project.title}</strong>
              </div>
            )}
            <span className="project-preview-category">{project.category}</span>
          </div>
        </Link>
        <div className="project-card-content">
          <div className="project-card-heading">
            <h3 className="display">{project.title}</h3>
            <span className="project-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <p>{project.shortDescription}</p>
          <div className="skill-pills project-tags" aria-label="Technologies">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="project-card-actions">
            <Link href={`/projects/${project.slug}`} className="project-details-link">Project details <ArrowUpRight size={15} aria-hidden="true" /></Link>
            <div className="project-external-links">
              {project.repository && <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.title} source code on GitHub`}><Github size={16} aria-hidden="true" /></a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}><ExternalLink size={15} aria-hidden="true" /></a>}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className={`project-card ${compact ? "project-card-compact" : ""}`} aria-label={`Read case study: ${project.title}`}>
      <div className="project-art" aria-hidden="true">
        {project.image ? (
          <Image src={project.image} alt="" fill sizes="(max-width: 780px) 84vw, 46vw" className="project-art-image" />
        ) : (
          <div className="project-art-fallback">
            <div className="art-topline"><span>BUILD / {String(index + 1).padStart(2,"0")}</span><span>{project.category.toUpperCase()}</span></div>
            <div className="art-center"><span className="art-orbit" /><strong className="display">{project.title}</strong></div>
            <div className="art-bottomline"><span>ENGINEERING CASE STUDY</span><span>↗</span></div>
          </div>
        )}
      </div>
      <div className="project-card-meta"><span>{String(index + 1).padStart(2,"0")} / {project.category}</span><ArrowUpRight size={19} aria-hidden="true" /></div>
      <h3 className="display">{project.title}</h3>
      <p>{project.shortDescription}</p>
      <div className="skill-pills project-tags" aria-label="Technologies">{project.technologies.slice(0, compact ? 3 : 4).map(t => <span key={t}>{t}</span>)}</div>
    </Link>
  );
}
