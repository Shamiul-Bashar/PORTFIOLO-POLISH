import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { upcomingProjects } from "@/data/upcoming-projects";

export function UpcomingProjects() {
  return (
    <section
      id="upcoming-projects"
      className="upcoming-section"
      aria-labelledby="upcoming-heading"
    >
      <Container>
        <Reveal className="upcoming-heading-layout">
          <div>
            <p className="section-kicker">
              <span className="kicker-dash" /> IN DEVELOPMENT
            </p>
            <h2 id="upcoming-heading" className="display upcoming-heading">
              <span>WHAT&apos;S</span>
              <span>
                <span className="upcoming-heading-muted">COMING</span>{" "}
                <span className="upcoming-heading-accent">NEXT.</span>
              </span>
            </h2>
          </div>
          <p className="upcoming-description">
            A look at the systems I&apos;m currently building — exploring intelligent
            automation, computational biology, and student productivity tools.
          </p>
        </Reveal>

        <div className="upcoming-grid">
          {upcomingProjects.map((project, index) => (
            <Reveal
              key={project.name}
              className="upcoming-card-reveal"
              delay={index * 0.1}
            >
              <article className="upcoming-card">
                <div
                  className={`upcoming-cover upcoming-cover-${project.cover}`}
                  aria-hidden="true"
                >
                  <span className="upcoming-cover-label">
                    ILLUSTRATIVE COVER <i>/</i> NOT A PRODUCT SCREENSHOT
                  </span>
                  {project.cover === "agent" ? (
                    <div className="agent-network">
                      <span className="agent-network-core" />
                      <span className="agent-network-node agent-node-one" />
                      <span className="agent-network-node agent-node-two" />
                      <span className="agent-network-node agent-node-three" />
                      <span className="agent-network-node agent-node-four" />
                      <span className="agent-network-node agent-node-five" />
                      <span className="agent-network-node agent-node-six" />
                    </div>
                  ) : project.cover === "genome" ? (
                    <div className="genome-sequence">
                      <span>ATGCTAGC</span>
                      <span>TAGCGATC</span>
                      <span>CGATGTAC</span>
                      <span>GCTAACGT</span>
                      <span>ATCGGTCA</span>
                      <span>TCGATGCA</span>
                      <span>GATCCGTA</span>
                    </div>
                  ) : (
                    <div className="academic-calendar" aria-hidden="true">
                      <span className="academic-calendar-title">WEEKLY ROUTINE</span>
                      <div className="academic-calendar-days">
                        {["MON", "TUE", "WED", "THU", "FRI"].map((day) => <span key={day}>{day}</span>)}
                      </div>
                      <div className="academic-calendar-slots">
                        {Array.from({ length: 15 }, (_, slot) => (
                          <span key={slot} className={slot % 4 === 0 ? "is-active" : ""} />
                        ))}
                      </div>
                      <span className="academic-calendar-footer">A / ATTENDANCE & ROUTINES</span>
                    </div>
                  )}
                  <span className="upcoming-cover-name display">
                    {project.name}
                  </span>
                </div>

                <div className="upcoming-card-content">
                  <div className="upcoming-card-meta">
                    <span>{project.category}</span>
                    <span className="upcoming-status">IN DEVELOPMENT</span>
                  </div>
                  <div className="upcoming-card-title-row">
                    <h3 className="display">{project.name}</h3>
                    <span className="upcoming-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="upcoming-card-description">
                    {project.description}
                  </p>
                  <ul className="upcoming-tags" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <a
                    className="upcoming-repository-link"
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EXPLORE REPOSITORY
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
