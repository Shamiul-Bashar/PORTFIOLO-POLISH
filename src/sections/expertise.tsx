import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { developerTools, expertise } from "@/data/skills";

const totalSkills = expertise.reduce((total, group) => total + group.items.length, 0);

export function Expertise() {
  return (
    <section id="expertise" className="section-block expertise-section" aria-labelledby="expertise-heading">
      <span className="expertise-watermark" aria-hidden="true">SKILLS</span>
      <Container className="expertise-container">
        <Reveal className="expertise-intro">
          <p className="section-kicker"><span className="kicker-dash" /> EXPERTISE MAP</p>
          <div className="expertise-heading-row">
            <h2 id="expertise-heading" className="display expertise-heading">
              <span>WHAT I</span>
              <span><span className="expertise-heading-muted">KNOW</span> <span className="expertise-heading-accent">&amp;</span> BUILD.</span>
            </h2>
            <p className="expertise-intro-copy">
              Technology is a toolkit. I focus on understanding the problems behind it — from interface behavior to algorithms and hardware logic.
            </p>
          </div>
          <div className="expertise-divider" />
        </Reveal>

        <div className="expertise-grid">
          {expertise.map((group, index) => (
            <Reveal key={group.number} delay={index * 0.1} className="expertise-card">
              <div className="expertise-card-top">
                <span>{group.number} <span aria-hidden="true">/</span> {group.label}</span>
                <span className="expertise-index" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="display">{group.title}</h3>
              <p className="expertise-card-subtitle">{index === 0 ? "APPLICATION DEVELOPMENT" : "ALGORITHMS & DIGITAL SYSTEMS"}</p>
              <p className="expertise-card-description">{group.description}</p>
              <div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="expertise-foot">
          <div className="expertise-stat">
            <strong>{String(totalSkills).padStart(2, "0")}</strong>
            <span>SKILLS IN PRACTICE</span>
          </div>
          <div className="expertise-stat">
            <strong>{String(expertise.length).padStart(2, "0")}</strong>
            <span>AREAS OF FOCUS</span>
          </div>
          <div className="expertise-tools">
            <span className="expertise-tools-label">IN MY TOOLKIT</span>
            <span className="expertise-tools-list">{developerTools.map((tool) => <span key={tool}>{tool}</span>)}</span>
          </div>
        </Reveal>
      </Container>
      <TechMarquee />
    </section>
  );
}
