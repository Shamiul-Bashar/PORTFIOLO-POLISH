import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";

export function SectionHeading({ index, overline, title, highlight, description, headingId }: {
  index: string;
  overline: string;
  title: string;
  highlight?: string;
  description?: string;
  headingId: string;
}) {
  return (
    <Container>
      <Reveal>
        <p className="section-kicker"><span className="kicker-dash" /> {overline.toUpperCase()} / {index}</p>
        <div className="split-heading section-heading">
          <h2 id={headingId} className="display giant-heading">{title} {highlight && <span className="accent">{highlight}</span>}</h2>
          {description && <p>{description}</p>}
        </div>
      </Reveal>
    </Container>
  );
}
