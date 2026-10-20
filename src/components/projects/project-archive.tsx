"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Dna,
  GraduationCap,
  Github,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { upcomingProjects, type UpcomingProject } from "@/data/upcoming-projects";

type ProjectFilter = "all" | "completed" | "development";
const TOTAL_PROJECTS = projects.length + upcomingProjects.length;
const filters: { key: ProjectFilter; label: string; count: number }[] = [
  { key: "all", label: "All Projects", count: TOTAL_PROJECTS },
  { key: "completed", label: "Completed", count: projects.length },
  { key: "development", label: "In Development", count: upcomingProjects.length },
];

function UpcomingArchiveCard({ project, index }: { project: UpcomingProject; index: number }) {
  const Icon =
    project.cover === "agent" ? Terminal :
    project.cover === "genome" ? Dna : GraduationCap;
  return (
    <article className="archive-upcoming-card">
      <a
        className={`archive-upcoming-visual archive-upcoming-visual-${project.cover}`}
        href={project.repository}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Explore ${project.name} source repository (opens in a new tab)`}
      >
        <span className="archive-art-overline">EXPLORATION / {String(index + 1).padStart(2, "0")}</span>
        <span className="archive-upcoming-symbol" aria-hidden="true"><Icon strokeWidth={1.05} /></span>
        <span className="archive-art-word display" aria-hidden="true">{project.name}</span>
        <span className="archive-art-footnote">CONCEPT / ACTIVE DEVELOPMENT</span>
        <ArrowUpRight className="archive-art-arrow" size={20} aria-hidden="true" />
      </a>
      <div className="archive-upcoming-body">
        <p className="archive-upcoming-meta">
          <span>{project.category}</span>
          <span className="archive-upcoming-index">{String(index + 1).padStart(2, "0")} / 0{upcomingProjects.length}</span>
        </p>
        <h3 className="display">{project.name}</h3>
        <p className="archive-upcoming-description">{project.description}</p>
        <ul className="archive-tech-list" aria-label={`${project.name} technologies`}>
          {project.technologies.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="archive-repository-link" href={project.repository} target="_blank" rel="noopener noreferrer">
          <Github size={16} aria-hidden="true" /> Explore Repository <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ProjectArchive() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const matchingCompleted = useMemo(() => projects.filter((project) =>
    [project.title, project.category, project.eyebrow, project.shortDescription, ...project.technologies]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
  ), [normalizedQuery]);

  const matchingUpcoming = useMemo(() => upcomingProjects.filter((project) =>
    [project.name, project.category, project.description, ...project.technologies]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
  ), [normalizedQuery]);

  const showCompleted = filter !== "development";
  const showUpcoming = filter !== "completed";
  const completedVisible = showCompleted ? matchingCompleted : [];
  const upcomingVisible = showUpcoming ? matchingUpcoming : [];
  const visibleCount = completedVisible.length + upcomingVisible.length;
  const reset = () => { setFilter("all"); setQuery(""); };

  return (
    <Container className="archive-container">
      <Link href="/#work" className="back-link archive-back-link">
        <ArrowLeft size={17} aria-hidden="true" /> Back to Selected Work
      </Link>

      <div className="archive-hero">
        <div className="archive-hero-main">
          <p className="section-kicker"><span className="kicker-dash" /> COMPLETE PROJECT INDEX</p>
          <h1 className="display archive-page-title">ALL <span>PROJECTS.</span></h1>
          <p className="archive-description">
            From shipped applications and digital systems to ideas still taking shape.
            Explore the complete collection, organized by development status.
          </p>
        </div>
        <dl className="archive-stats" aria-label="Portfolio project totals">
          <div><dt>Total Projects</dt><dd>{String(TOTAL_PROJECTS).padStart(2, "0")}</dd></div>
          <div><dt>Completed</dt><dd>{String(projects.length).padStart(2, "0")}</dd></div>
          <div><dt>In Development</dt><dd>{String(upcomingProjects.length).padStart(2, "0")}</dd></div>
        </dl>
      </div>

      <div className="archive-toolbar">
        <div className="archive-filters" role="group" aria-label="Filter projects by status">
          {filters.map((item) => (
            <button
              type="button"
              key={item.key}
              data-project-filter={item.key}
              className={filter === item.key ? "archive-filter is-selected" : "archive-filter"}
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
            >
              {item.label} <span aria-hidden="true">{String(item.count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="archive-search">
          <label className="sr-only" htmlFor="archive-project-search">Search projects by name or technology</label>
          <Search size={18} aria-hidden="true" />
          <input
            id="archive-project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects or technologies..."
            autoComplete="off"
          />
          {query.length > 0 && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="archive-result-count" role="status" aria-live="polite">
        SHOWING <strong>{String(visibleCount).padStart(2, "0")}</strong> OF {String(TOTAL_PROJECTS).padStart(2, "0")} PROJECTS
      </p>

      {visibleCount === 0 ? (
        <div className="archive-no-results">
          <Search size={26} aria-hidden="true" />
          <h2>No matching projects.</h2>
          <p>Try another project name or technology, or return to the complete index.</p>
          <button type="button" onClick={reset}>Show All Projects <ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
      ) : (
        <div className="archive-results">
          {completedVisible.length > 0 && (
            <section className="archive-project-group" aria-labelledby="archive-completed-heading">
              <div className="archive-group-heading">
                <div>
                  <p className="archive-group-status"><CheckCircle2 size={15} aria-hidden="true" /> COMPLETED WORK</p>
                  <h2 id="archive-completed-heading" className="display">BUILT <span>&amp; DELIVERED.</span></h2>
                </div>
                <span className="archive-group-total">{String(completedVisible.length).padStart(2, "0")} PROJECTS</span>
              </div>
              <div className="archive-grid" data-archive-section="completed">
                {completedVisible.map((project) => (
                  <div className="archive-completed-entry" key={project.slug}>
                    <div className="archive-entry-status"><CheckCircle2 size={14} aria-hidden="true" /> COMPLETED</div>
                    <ProjectCard project={project} index={projects.findIndex((p) => p.slug === project.slug)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {upcomingVisible.length > 0 && (
            <section className="archive-project-group" aria-labelledby="archive-development-heading">
              <div className="archive-group-heading">
                <div>
                  <p className="archive-group-status archive-group-status-development"><Clock3 size={15} aria-hidden="true" /> IN DEVELOPMENT</p>
                  <h2 id="archive-development-heading" className="display">WHAT'S <span>NEXT.</span></h2>
                </div>
                <span className="archive-group-total">{String(upcomingVisible.length).padStart(2, "0")} PROJECTS</span>
              </div>
              <div className="archive-grid archive-upcoming-grid" data-archive-section="development">
                {upcomingVisible.map((project) => (
                  <div className="archive-upcoming-entry" key={project.name}>
                    <div className="archive-entry-status archive-entry-status-development"><Clock3 size={14} aria-hidden="true" /> IN DEVELOPMENT</div>
                    <UpcomingArchiveCard project={project} index={upcomingProjects.findIndex((p) => p.name === project.name)} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      <div className="archive-footer-nav">
        <Link href="/#work"><ArrowLeft size={17} aria-hidden="true" /> Return to Portfolio</Link>
        <a href="https://github.com/Shamiul-Bashar" target="_blank" rel="noopener noreferrer">
          View My GitHub <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </Container>
  );
}
