import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { certificates } from "@/data/certificates";

export function Credentials() {
  if (!certificates.length) return null;
  return (
    <section className="section-block credentials-section" aria-labelledby="credentials-heading"><Container>
      <Reveal><p className="section-kicker"><span className="kicker-dash" /> CREDENTIALS</p><h2 id="credentials-heading" className="display giant-heading">BEYOND THE <span className="accent">CODE.</span></h2></Reveal>
      <div className="credentials-grid">
        {certificates.map(item => <div key={item.name} className="credential-entry"><strong>{item.name}</strong><span>{item.issuer}{item.year ? ` / ${item.year}` : ""}</span>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">Certificate ↗</a>}</div>)}
      </div>
    </Container></section>
  );
}
