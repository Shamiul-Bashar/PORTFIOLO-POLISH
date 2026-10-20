import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { learningTracks } from "@/data/learning";

export function CurrentlyLearning() {
  return (
    <section
      id="currently-learning"
      className="section-block learning-section"
      aria-labelledby="learning-heading"
    >
      <Container>
        <Reveal className="learning-heading-layout">
          <div>
            <h2 id="learning-heading" className="display learning-heading">
              <span>WHAT I&apos;M</span>
              <span className="accent">LEARNING NOW.</span>
            </h2>
          </div>
          <p className="learning-introduction">
            A closer look at the technologies, concepts, and engineering
            disciplines I&apos;m actively exploring beyond my coursework and
            projects.
          </p>
        </Reveal>

        <div className="learning-tracks">
          {learningTracks.map((track, trackIndex) => (
            <section
              className="learning-track"
              key={track.id}
              aria-labelledby={`learning-track-${track.id}`}
            >
              <Reveal className="learning-track-heading" delay={trackIndex * 0.08}>
                <h3 id={`learning-track-${track.id}`}>{track.title}</h3>
                <span aria-hidden="true">0{trackIndex + 1}</span>
              </Reveal>
              <ol className="learning-topic-list">
                {track.topics.map((topic, topicIndex) => (
                  <li className="learning-topic" key={topic.id}>
                    <Reveal delay={trackIndex * 0.08 + topicIndex * 0.06}>
                      <article>
                        <div className="learning-topic-meta">
                          <span className="learning-topic-index">{topic.id}</span>
                          <span className="learning-topic-status">EXPLORING</span>
                          <span className="learning-topic-domain">{topic.domain}</span>
                        </div>
                        <h4>{topic.title}</h4>
                        <p>{topic.description}</p>
                        <ul className="learning-focus" aria-label="Technical focus">
                          {topic.focus.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
