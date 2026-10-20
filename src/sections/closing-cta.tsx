import { ArrowDownToLine, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/data/site";

export function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-heading">
      <Container>
        <Reveal className="closing-cta-content">
          <p className="closing-cta-label">LET&apos;S CONNECT</p>
          <h2 id="closing-cta-heading">
            <span>Let&apos;s Build Something</span>
            <span className="accent">Amazing Together</span>
          </h2>
          <p className="closing-cta-description">
            Whether it&apos;s an internship opportunity, software project,
            research collaboration, or simply a friendly conversation — I&apos;d
            love to hear from you.
          </p>
          <div className="closing-cta-actions">
            <a
              className="closing-cta-primary"
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownToLine size={17} aria-hidden="true" />
              Download Resume
            </a>
            <a className="closing-cta-secondary" href={`mailto:${site.email}`}>
              <Mail size={17} aria-hidden="true" />
              Email Me
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
