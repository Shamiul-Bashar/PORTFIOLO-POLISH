import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { capabilities, specializedSkills } from "@/data/capabilities";

export function Capabilities() {
  return (
    <section id="capabilities" className="section-block capabilities-section" aria-labelledby="capabilities-heading">
      <Container>
        <Reveal className="capabilities-heading-layout">
          <div>
            <h2 id="capabilities-heading" className="display capabilities-heading">
              <span>WHAT I BUILD</span>
              <span className="accent">&amp; EXPLORE.</span>
            </h2>
          </div>
          <p className="capabilities-intro">
            My work spans software applications, algorithms, system architecture,
            and digital hardware — connecting technical concepts with practical
            implementations.
          </p>
        </Reveal>
      </Container>
      <Container className="capabilities-grid">
        {capabilities.map((item, index) => (
          <Reveal key={item.number} className="capability-card" delay={(index % 3) * 0.06}>
            <div className="capability-top">
              <span className="capability-number">{item.number}</span>
              <span className="capability-category">{item.category}</span>
            </div>
            <h3 className="display capability-title">{item.title}</h3>
            <p className="capability-description">{item.description}</p>
            <div className="capability-focus">
              <span>TECHNICAL FOCUS</span>
              <ul className="capability-tags">
                {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
            <div className="capability-related">
              <span>RELATED WORK</span>
              <div>
                {item.relatedProjects.map((project) => (
                  <Link key={project.slug ?? project.href ?? project.name} href={project.href ?? (project.slug ? `/projects/${project.slug}` : "/#upcoming-projects")}>
                    {project.name}<ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
      <Container className="specialized-in">
        <Reveal>
          <div className="specialized-in-heading">
            <h3 className="section-kicker">
              <span className="kicker-dash" /> SPECIALIZED IN
            </h3>
            <span className="specialized-in-aside">CORE STRENGTHS</span>
          </div>
          <ul className="specialized-in-skills">
            {specializedSkills.map((skill, index) => (
              <li
                className={index === 0 ? "specialized-in-primary" : undefined}
                key={skill}
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
