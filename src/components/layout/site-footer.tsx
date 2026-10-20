import {
  ArrowUp,
  Facebook,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { CodeforcesBrandIcon, WhatsAppBrandIcon, XBrandIcon } from "@/components/ui/brand-icons";

const footerSocials: {
  label: string;
  href: string;
  Icon: ComponentType<LucideProps>;
  external?: boolean;
}[] = [
  { label: "GitHub", href: site.links.github, Icon: Github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: Linkedin, external: true },
  { label: "Codeforces", href: site.links.codeforces, Icon: CodeforcesBrandIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: WhatsAppBrandIcon, external: true },
  { label: "Facebook", href: site.links.facebook, Icon: Facebook, external: true },
  { label: "X", href: site.links.x, Icon: XBrandIcon, external: true },
];

const footerLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Education", href: "/#education" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Selected Work", href: "/#work" },
  { label: "Upcoming Projects", href: "/#upcoming-projects" },
  { label: "Areas of Work", href: "/#capabilities" },
  { label: "Achievements", href: "/#milestones" },
  { label: "Currently Learning", href: "/#currently-learning" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-columns">
          <section className="footer-brand-column" aria-labelledby="footer-brand-title">
            <h2 id="footer-brand-title">Shamiul Bashar Siam</h2>
            <p>
              Computer Science &amp; Engineering student at Khulna University of
              Engineering &amp; Technology (KUET), focused on software
              development, problem solving, and building meaningful digital
              solutions.
            </p>
            <nav className="footer-socials" aria-label="Social media links">
              {footerSocials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </section>

          <nav className="footer-quick-links" aria-labelledby="footer-links-title">
            <h2 id="footer-links-title">Quick Links</h2>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-contact-details" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact</h2>
            <dl>
              <div>
                <dt>EMAIL</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div>
                <dt>LOCATION</dt>
                <dd>KUET Campus, Khulna, Bangladesh</dd>
              </div>
              <div>
                <dt>CAREER GOAL</dt>
                <dd>{site.profile.careerGoal}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} MD Shamiul Bashar Siam. All Rights Reserved.</p>
            <p>Built with Next.js, React, TypeScript &amp; Tailwind CSS.</p>
          </div>
          <Link className="footer-back-top" href="/#top">
            Back to Top <ArrowUp size={15} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
