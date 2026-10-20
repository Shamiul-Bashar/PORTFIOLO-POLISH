"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.2, 0.5] });
    for (const item of navigation) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <Container className="header-inner">
        <Link href="/#top" className="logo" aria-label={`${site.shortName}, homepage`} onClick={() => setMenuOpen(false)}>SIAMBASHER<span></span></Link>
        <nav id="main-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.id} className={active === item.id ? "active" : ""} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <a className="header-cta" href={`mailto:${site.email}?subject=Portfolio%20Inquiry`}>Hire Me <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button type="button" className="nav-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </Container>
    </header>
  );
}
