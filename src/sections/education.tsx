import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { ArrowUpRight } from "lucide-react";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="section-block education-section" aria-labelledby="education-heading">
      <Container>
        <Reveal className="education-heading-layout">
          <div>
            <p className="section-kicker"><span className="kicker-dash" /> ACADEMIC JOURNEY</p>
            <h2 id="education-heading" className="display education-heading">
              <span>THE ROAD</span>
              <span className="accent">SO FAR.</span>
            </h2>
          </div>
          <p className="education-introduction">
            From foundational education to engineering — the academic journey
            shaping how I learn, think, and build.
          </p>
        </Reveal>
        <ol className="education-timeline">
          {education.map((record, index) => (
            <li className="education-timeline-item" key={record.id}>
              <span className="education-marker" aria-hidden="true" />
              <Reveal className="education-entry-reveal" delay={index * 0.1}>
                <article
                  className={`education-card${record.status === "CURRENTLY STUDYING" ? " education-card-current" : ""}`}
                >
                  <div className="education-card-meta">
                    <span className="education-period">{record.period}</span>
                    <span className={`education-status${record.status === "CURRENTLY STUDYING" ? " is-current" : ""}`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="education-category">{record.category}</p>
                  <h3>{record.institution}</h3>
                  <p className="education-qualification">{record.qualification}</p>
                  {record.field && <p className="education-field">{record.field}</p>}
                  <div className="education-card-footer">
                    <span className="education-location">{record.location}</span>
                    {record.result && <span className="education-result">{record.result}</span>}
                  </div>
                  <a
                    className="education-website"
                    href={record.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit the official ${record.institution} website (opens in a new tab)`}
                  >
                    Official website <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
