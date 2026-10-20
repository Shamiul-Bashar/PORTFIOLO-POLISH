"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import styles from "./loading-screen.module.css";

const BRAND = "SIAMBASHER";
const START_DELAY_MS = 250;
const LETTER_MS = 105;
const HOLD_MS = 450;
const EXIT_MS = 550;
const REDUCED_EXIT_MS = 120;
const ASSET_WAIT_MS = 500;
const FAILSAFE_MS = 4500;

// Fixed positions keep server/client markup identical and avoid work on each frame.
const PARTICLES = Array.from({ length: 40 }, (_, index) => ({
  left: `${(index * 47 + 5) % 100}%`,
  top: `${(index * 29 + 13) % 100}%`,
  width: `${1.5 + (index % 4) * 0.5}px`,
  height: `${1.5 + (index % 4) * 0.5}px`,
  "--drift-x": `${(index % 2 ? 1 : -1) * (10 + index % 16)}px`,
  "--drift-y": `${(index % 3 ? -1 : 1) * (12 + index % 19)}px`,
  "--dust-opacity": 0.42 + (index % 4) * 0.1,
  "--dust-dim-opacity": (0.42 + (index % 4) * 0.1) * 0.65,
  animationDuration: `${5 + index % 5}s`,
  animationDelay: `${-(index % 7)}s`,
} as CSSProperties));

function IntroOverlay({
  contentRef,
  onComplete,
}: {
  contentRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"loading" | "exiting" | "complete">("loading");
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let disposed = false;
    let exitStarted = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let readinessTimer: ReturnType<typeof setTimeout> | undefined;
    let completionFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousInert = content.inert;
    content.inert = true;

    const schedule = (callback: () => void, milliseconds: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!disposed) callback();
      }, milliseconds);
      timers.add(timer);
    };

    const heroImages = Array.from(content.querySelectorAll<HTMLImageElement>(".hero img"));
    const assetsReady = Promise.allSettled([
      document.fonts.ready,
      ...heroImages.map((image) => image.decode()),
    ]);

    const finishExit = () => {
      if (disposed) return;
      content.inert = previousInert;
      setPhase("complete");
      completionFrame = requestAnimationFrame(() => {
        if (!disposed) onComplete();
      });
    };
    const startExit = () => {
      if (disposed || exitStarted) return;
      exitStarted = true;
      if (readinessTimer) clearTimeout(readinessTimer);
      readinessTimer = undefined;
      timers.forEach(clearTimeout);
      timers.clear();
      setTypedCharacters(BRAND.length);
      setPortfolioVisible(true);
      setPhase("exiting");
      schedule(finishExit, reducedMotion.matches ? REDUCED_EXIT_MS : EXIT_MS);
    };
    skipRef.current = startExit;

    if (reducedMotion.matches) {
      schedule(() => {
        setTypedCharacters(BRAND.length);
        setPortfolioVisible(true);
        startExit();
      }, 0);
    } else {
      schedule(() => {
        let count = 0;
        const typeNextCharacter = () => {
          count += 1;
          setTypedCharacters(count);
          if (count < BRAND.length) {
            schedule(typeNextCharacter, LETTER_MS);
            return;
          }
          setPortfolioVisible(true);
          void Promise.race([
            assetsReady,
            new Promise<void>((resolve) => {
              readinessTimer = setTimeout(resolve, ASSET_WAIT_MS);
            }),
          ]).then(() => {
            if (readinessTimer) clearTimeout(readinessTimer);
            readinessTimer = undefined;
            if (!exitStarted) schedule(startExit, HOLD_MS);
          });
        };
        typeNextCharacter();
      }, START_DELAY_MS);
      schedule(startExit, FAILSAFE_MS);
    }

    return () => {
      disposed = true;
      if (readinessTimer) clearTimeout(readinessTimer);
      cancelAnimationFrame(completionFrame);
      timers.forEach(clearTimeout);
      content.inert = previousInert;
      skipRef.current = () => {};
    };
  }, [contentRef, onComplete]);

  if (phase === "complete") return null;

  return (
    <div
      className={styles.overlay}
      data-phase={phase}
      data-intro-overlay="true"
      data-portfolio-visible={portfolioVisible}
      data-lenis-prevent
      role="status"
      aria-label="Loading SIAMBASHER portfolio"
      style={{ "--exit-duration": `${EXIT_MS}ms` } as CSSProperties}
    >
      <div className={styles.dust} aria-hidden="true">
        {PARTICLES.map((style, index) => <span key={index} className={styles.particle} data-intro-particle="true" style={style} />)}
      </div>
      <div className={styles.composition} aria-hidden="true">
        <div className={styles.brand} data-intro-name="true">
          {Array.from(BRAND).map((letter, index) => (
            <span
              key={index}
              className={`${styles.letter} ${index < 4 ? styles.nameLight : styles.nameAccent}${index < typedCharacters ? ` ${styles.letterVisible}` : ""}`}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={`${styles.subtitle}${portfolioVisible ? ` ${styles.subtitleVisible}` : ""}`} data-intro-subtitle="true">PORTFOLIO</div>
        <div className={`${styles.accent}${portfolioVisible ? ` ${styles.accentVisible}` : ""}`} />
      </div>
      <button className={styles.skip} type="button" onClick={() => skipRef.current()}>
        Skip intro
      </button>
    </div>
  );
}

/** Homepage intro. The page mounts underneath so its critical assets load in parallel. */
export function LoadingScreen({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const handleIntroComplete = useCallback(() => {
    window.dispatchEvent(new Event("portfolio:intro-complete"));
  }, []);

  return (
    <>
      <div ref={contentRef} className={styles.content}>{children}</div>
      {pathname === "/" ? <IntroOverlay contentRef={contentRef} onComplete={handleIntroComplete} /> : null}
      <noscript><style>{`.${styles.overlay} { display: none !important; } html:has(.${styles.overlay}) { overflow: auto !important; } html:has(.${styles.overlay}) .hero { visibility: visible !important; }`}</style></noscript>
    </>
  );
}
