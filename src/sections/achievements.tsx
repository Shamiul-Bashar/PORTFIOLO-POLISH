import { GraduationCap, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section
      id="milestones"
      className="section-block milestones-section"
      aria-labelledby="milestones-heading"
    >
      <Container className="milestones-layout">
        <Reveal className="milestones-intro">
          <h2 id="milestones-heading" className="display milestones-heading">
            <span>BUILT ON</span>
            <span className="accent">PROGRESS.</span>
          </h2>
          <p className="milestones-description">
            A record of academic milestones and competitive experiences that
            shaped my engineering journey.
          </p>
        </Reveal>

        <ol className="milestone-list">
          {achievements.map((achievement, index) => {
            const Icon =
              achievement.category === "ACADEMIC" ? GraduationCap : Trophy;

            return (
              <li className="milestone-entry" key={achievement.title}>
                <span className="milestone-marker" aria-hidden="true" />
                <Reveal delay={index * 0.07}>
                  <article>
                    <div className="milestone-meta">
                      <span className="milestone-category">
                        <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                        {achievement.category}
                      </span>
                      {achievement.year && (
                        <time className="milestone-year">
                          {achievement.year}
                        </time>
                      )}
                    </div>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    {achievement.institution && (
                      <span className="milestone-institution">
                        {achievement.institution}
                      </span>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
