import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/data/site";

const profileDetails = [
  ["NAME", site.profile.fullName],
  ["NATIONALITY", site.profile.nationality],
  ["CURRENT DEGREE", site.profile.degree],
  ["DEPARTMENT", site.profile.department],
  ["UNIVERSITY", site.institution],
  ["CAREER GOAL", site.profile.careerGoal],
  ["PERMANENT LOCATION", site.profile.permanentLocation],
  ["PRESENT LOCATION", site.profile.presentLocation],
] as const;

export function About() {
  return (
    <section id="about" className="section-block about-section" aria-labelledby="about-heading">
      <Container>
        <div className="about-layout">
          <div className="about-editorial">
            <Reveal>
              <h2 id="about-heading" className="display about-title">
                <span>MORE THAN</span>
                <span className="accent">A TITLE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="display about-statement">
                I THINK IN <span>LOGIC.</span><br />
                I BUILD WITH <span>INTENT.</span>
              </p>
            </Reveal>
          </div>
          <Reveal className="about-body" delay={0.12}>
            <p className="about-lead">An engineering student interested in both the software people use and the systems that make it work.</p>
            <p>I&apos;m studying Computer Science &amp; Engineering at Khulna University of Engineering &amp; Technology (KUET). My interests span algorithms, applications, system design, and digital architecture.</p>
            <p>I like following a problem all the way from the first diagram to a working implementation — testing assumptions, improving interactions, and understanding the trade-offs behind each decision.</p>
          </Reveal>
        </div>
        <section className="about-glance" aria-labelledby="about-glance-heading">
          <Reveal>
            <h3 id="about-glance-heading" className="section-kicker">
              <span className="kicker-dash" /> AT A GLANCE
            </h3>
          </Reveal>
          <dl className="about-details">
            {profileDetails.map(([label, value], index) => (
              <Reveal
                key={label}
                className="about-detail"
                delay={index * 0.035}
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
        <Reveal className="about-interests" delay={0.08}>
          <h3>BEYOND ENGINEERING</h3>
          <ul aria-label="Personal interests">
            {site.interests.map((interest) => <li key={interest}>{interest}</li>)}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
