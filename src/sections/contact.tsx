"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/data/site";

const contactSocials: {
  label: string;
  href: string;
  Icon: LucideIcon;
  external?: boolean;
}[] = [
  { label: "GitHub", href: site.links.github, Icon: Github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: Linkedin, external: true },
  { label: "Codeforces", href: site.links.codeforces, Icon: Code2, external: true },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: Phone, external: true },
  { label: "Facebook", href: site.links.facebook, Icon: Facebook, external: true },
  { label: "Instagram", href: site.links.instagram, Icon: Instagram, external: true },
];

export function Contact() {
  const [isPreparing, setIsPreparing] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) {
      setFormStatus("Unable to prepare this message. Please contact me directly.");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsPreparing(true);
    setFormStatus(
      "Opening your email app. Review and send the message there to complete delivery.",
    );
    window.setTimeout(() => {
      window.location.href = mailto;
      window.setTimeout(() => {
        setIsPreparing(false);
        setFormStatus(
          `If your email app doesn't open, email ${site.email} directly.`,
        );
      }, 1600);
    }, 150);
  }

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <Container>
        <Reveal>
          <div className="contact-topline">
            <span>HAVE AN IDEA? LET&apos;S TALK.</span>
          </div>
          <h2 id="contact-title" className="display">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            <span className="accent">EXTRAORDINARY.</span>
          </h2>
          <p className="contact-introduction">
            Open to discussions about internships, technical projects,
            collaborative work, and meaningful digital products.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-panel contact-information">
            <p className="contact-panel-kicker">GET IN TOUCH</p>
            <h3 className="display">LET&apos;S CONNECT</h3>
            <p className="contact-panel-description">
              I&apos;m open to conversations about internships, software
              projects, research collaborations, and opportunities to build
              meaningful technology.
            </p>

            <dl className="contact-details">
              <div className="contact-detail">
                <dt><Mail size={16} aria-hidden="true" /> EMAIL</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div className="contact-detail">
                <dt><Phone size={16} aria-hidden="true" /> WHATSAPP</dt>
                <dd><a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer">+880 1521 729325</a></dd>
              </div>
              <div className="contact-detail">
                <dt><MapPin size={16} aria-hidden="true" /> LOCATION</dt>
                <dd>KUET Campus, Khulna, Bangladesh</dd>
              </div>
            </dl>

            <a
              className="contact-resume"
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD RESUME <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <nav className="contact-icon-links" aria-label="Social media links">
              {contactSocials.map(({ label, href, Icon, external }) => (
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
          </Reveal>

          <Reveal className="contact-panel contact-form-panel" delay={0.1}>
            <p className="contact-panel-kicker">START A CONVERSATION</p>
            <h3 className="display">SEND A MESSAGE</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="contact-form-fields">
                <label className="contact-field">
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={120}
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
                <label className="contact-field contact-field-wide">
                  <span>Subject</span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    maxLength={180}
                    required
                  />
                </label>
                <label className="contact-field contact-field-wide">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Tell me about your idea, project, or opportunity..."
                    maxLength={5000}
                    required
                  />
                </label>
              </div>
              <button
                className="contact-submit"
                type="submit"
                disabled={isPreparing}
              >
                {isPreparing ? "OPENING EMAIL..." : "SEND MESSAGE"}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <p
                id="contact-form-status"
                className="contact-form-status"
                role="status"
                aria-live="polite"
              >
                {formStatus}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
