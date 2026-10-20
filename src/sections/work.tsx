"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, start: 0, left: 0, moved: false });
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".carousel-slide"));
    if (!cards.length) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const isAtStart = track.scrollLeft <= 1;
    const isAtEnd = track.scrollLeft >= maxScroll - 1;
    setProgress(maxScroll <= 1 ? 100 : (track.scrollLeft / maxScroll) * 100);
    const origin = cards[0].offsetLeft;
    let nearest = 0;
    let best = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - origin - track.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
    setAtStart(isAtStart);
    setAtEnd(isAtEnd);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateActive();
    const observer = new ResizeObserver(updateActive);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateActive]);

  function goTo(index: number) {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>(".carousel-slide");
    if (!track || !cards?.length) return;
    const target = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({
      left: cards[target].offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.pointerType === "mouse" && event.button !== 0) || !trackRef.current) return;
    dragRef.current = { active: true, start: event.clientX, left: trackRef.current.scrollLeft, moved: false };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = dragRef.current;
    const track = trackRef.current;
    if (!state.active || !track) return;
    const movedBy = event.clientX - state.start;
    if (Math.abs(movedBy) > 7) {
      state.moved = true;
      if (event.pointerType === "mouse") {
        if (!track.classList.contains("is-dragging")) event.currentTarget.setPointerCapture(event.pointerId);
        track.classList.add("is-dragging");
        track.scrollLeft = state.left - movedBy;
      }
    }
  }

  function endDrag() {
    dragRef.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  }

  return (
    <section id="work" className="section-block work-section" aria-labelledby="work-heading">
      <Container>
        <Reveal className="work-heading-layout">
          <div className="work-heading-copy">
            <p className="section-kicker"><span className="kicker-dash" /> SELECTED WORK</p>
            <h2 id="work-heading" className="display work-heading">
              <span>RECENT</span>
              <span><span className="work-heading-muted">PROJECTS &amp;</span> <span className="work-heading-accent">WORK.</span></span>
            </h2>
            <p className="work-description">A curated selection of projects exploring software engineering, algorithms, web development, and digital systems.</p>
          </div>
          <div className="work-navigation" aria-label="Project carousel controls">
            <div className="work-counter" aria-live="polite" aria-atomic="true">
              <strong>{String(active + 1).padStart(2, "0")}</strong>
              <span>/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
              <span className="work-meter" aria-hidden="true"><span style={{ width: `${progress}%` }} /></span>
            </div>
            <div className="work-arrows">
              <button type="button" aria-label="Previous project" onClick={() => goTo(active - 1)} disabled={atStart}><ArrowLeft size={18} aria-hidden="true" /></button>
              <button type="button" aria-label="Next project" onClick={() => goTo(active + 1)} disabled={atEnd}><ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          </div>
        </Reveal>

        <div className="carousel-shell">
          <div
            className="carousel-track"
            ref={trackRef}
            onScroll={updateActive}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={(event) => {
              if (dragRef.current.moved) {
                event.preventDefault();
                event.stopPropagation();
                dragRef.current.moved = false;
              }
            }}
            aria-label="Projects, horizontally scrollable"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(active + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(active - 1);
              }
            }}
          >
            {projects.map((project, index) => (
              <div className="carousel-slide" key={project.slug}>
                <Reveal className="work-card-reveal" delay={index * 0.055}>
                  <ProjectCard project={project} index={index} variant="carousel" />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <div className="all-work-line">
          <Link href="/projects" className="all-work-link">VIEW ALL PROJECTS <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </Container>
    </section>
  );
}
