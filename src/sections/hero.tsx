"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Facebook, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { CodeforcesBrandIcon, WhatsAppBrandIcon, XBrandIcon } from "@/components/ui/brand-icons";

const heroSocialLinks = [
  { label: "GitHub", href: site.links.github, Icon: Github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: Linkedin, external: true },
  { label: "Codeforces", href: site.links.codeforces, Icon: CodeforcesBrandIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: WhatsAppBrandIcon, external: true },
  { label: "Facebook", href: site.links.facebook, Icon: Facebook, external: true },
  { label: "X", href: site.links.x, Icon: XBrandIcon, external: true },
] as const;

const PROFESSIONAL_ROLES = [
  "Aspiring Software Engineer",
  "Problem Solver & Tech Enthusiast",
  "Computer Science & Engineering",
] as const;

function TypewriterRole() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let roleIndex = 0;
    let characterCount = 0;
    let introReady = !document.querySelector("[data-intro-overlay='true']");

    const schedule = (callback: () => void, delay: number) => {
      timeout = setTimeout(callback, delay);
    };

    function startAnimation() {
      if (motionPreference.matches) {
        setDisplayedText(PROFESSIONAL_ROLES[0]);
        return;
      }
      roleIndex = 0;
      characterCount = 0;
      setDisplayedText("");
      schedule(typeNext, 75);
    }

    function typeNext() {
      const role = PROFESSIONAL_ROLES[roleIndex];
      characterCount += 1;
      setDisplayedText(role.slice(0, characterCount));

      if (characterCount === role.length) {
        schedule(deleteNext, 1800);
      } else {
        schedule(typeNext, 75);
      }
    }

    function deleteNext() {
      characterCount -= 1;
      setDisplayedText(PROFESSIONAL_ROLES[roleIndex].slice(0, characterCount));

      if (characterCount === 0) {
        roleIndex = (roleIndex + 1) % PROFESSIONAL_ROLES.length;
        schedule(typeNext, 400);
      } else {
        schedule(deleteNext, 40);
      }
    }

    const handleMotionChange = () => {
      if (timeout) clearTimeout(timeout);
      if (motionPreference.matches) {
        setDisplayedText(PROFESSIONAL_ROLES[0]);
        return;
      }
      if (introReady) startAnimation();
    };

    const handleIntroComplete = () => {
      introReady = true;
      startAnimation();
    };

    if (motionPreference.matches) {
      schedule(() => setDisplayedText(PROFESSIONAL_ROLES[0]), 0);
    } else if (introReady) {
      schedule(typeNext, 75);
    } else {
      window.addEventListener("portfolio:intro-complete", handleIntroComplete, { once: true });
    }
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      if (timeout) clearTimeout(timeout);
      motionPreference.removeEventListener("change", handleMotionChange);
      window.removeEventListener("portfolio:intro-complete", handleIntroComplete);
    };
  }, []);

  return (
    <p
      className="hero-professional-title hero-support-reveal"
      aria-label="Professional role: Aspiring Software Engineer"
    >
      <span className="hero-role-text" aria-hidden="true">
        {displayedText}
        <span className="hero-role-cursor" />
      </span>
      <span className="hero-role-measure" aria-hidden="true">
        Problem Solver &amp; Tech Enthusiast
      </span>
    </p>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let started = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;
    const startHeroEntrance = () => {
      if (disposed || started) return;
      started = true;
      if (reduce) {
        return;
      }
      void import("gsap").then(({ default: gsap }) => {
        if (disposed || !sectionRef.current) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(".hero-portrait-image", { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", clearProps: "opacity,transform" });
          gsap.fromTo(".hero-word", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, ease: "power3.out", stagger: 0.11, delay: 0.13 });
          gsap.fromTo(".hero-reveal", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, delay: 0.54 });
          gsap.fromTo(".hero-support-reveal", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.08, delay: 0.75 });
          gsap.fromTo(".hero-socials a", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.045, delay: 1.05 });
        }, sectionRef);
        cleanup = () => ctx.revert();
      }).catch((error: unknown) => {
        console.error("Unable to load the Hero entrance animation.", error);
      });
    };
    if (document.querySelector("[data-intro-overlay='true']")) {
      window.addEventListener("portfolio:intro-complete", startHeroEntrance, { once: true });
    } else {
      frame = requestAnimationFrame(startHeroEntrance);
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("portfolio:intro-complete", startHeroEntrance);
      cleanup?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-portrait" aria-hidden="true">
        <Image
          className="hero-portrait-image"
          src="/images/siam-portrait-cutout.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 630px) 56vw, (max-width: 1120px) 53vw, (max-width: 1733px) 60vw, 1040px"
        />
      </div>
      <Container className="hero-inner">
        <div className="hero-topline hero-reveal"><span><span className="status-dot" aria-hidden="true" /> PORTFOLIO </span><span>KUET · CSE / BANGLADESH</span></div>
        <div className="hero-main">
          <div className="hero-meta hero-reveal"><span className="eyebrow">ENGINEERING IDEAS INTO REALITY</span></div>
          <h1 id="hero-title" className="display hero-title" aria-label={site.name}>
            <span className="hero-line"><span className="hero-word">MD SHAMIUL</span></span>
            <span className="hero-line"><span className="hero-word hero-accent">BASHAR</span></span>
            <span className="hero-line"><span className="hero-word">SIAM<span className="hero-period"></span></span></span>
          </h1>
          <div className="hero-bottom hero-reveal">
            <TypewriterRole />
            <p className="hero-introduction hero-support-reveal">I&apos;m a Computer Science &amp; Engineering student at Khulna University of Engineering &amp; Technology (KUET), passionate about software engineering, problem solving, and building modern digital experiences. I enjoy transforming ideas into reliable, user-focused applications while continuously exploring new technologies and improving my development skills.</p>
            <div className="hero-actions hero-support-reveal">
              <a href={site.links.resume} download="MD_Shamiul_Basher_Siam_Resume.pdf" className="hero-resume-button">Download Resume <MoveUpRight size={15} aria-hidden="true" /></a>
              <Link href="/#work" className="hero-project-button">View Projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link href="/#contact" className="hero-contact-button">Contact Me <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
            <nav className="hero-socials hero-support-reveal" aria-label="Social media">
              {heroSocialLinks.map(({ label, href, Icon, external }) => (
                <a key={label} href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="hero-scroll hero-reveal"><span>SCROLL TO EXPLORE</span><Link href="/#about" aria-label="Scroll to about section"><ArrowDown size={17} aria-hidden="true" /></Link></div>
      </Container>
    </section>
  );
}
