**PART A — Reference Website Overview**

**Observed design identity (https://mahin290.vercel.app/):**  
Dark, high-contrast, minimalist-premium portfolio with strong typographic hierarchy. Primary background is near-black (`#050505` / `#060606`). Accent is a saturated orange (Tailwind `orange-600` / oklch ≈ `0.646 0.222 41.116`, roughly `#ea580c`). Large display headings use **Bebas Neue** (condensed, heavy, all-caps feel). Body text uses Inter (or system sans). Smooth scrolling via Lenis. Animations driven by GSAP + ScrollTrigger (tech tags and class names confirm GSAP/Lenis).  

Page structure (top to bottom, observed):
1. Fixed navigation (appears/gains glass on scroll)
2. Full-viewport Hero (pinned/split behavior with name reveal + scroll indicator + infinite tech marquee)
3. Skills / Expertise Map section
4. Selected Work / Recent Projects (horizontal/drag-capable carousel or slider with pagination)
5. “All Projects” link/button
6. Services / What We Deliver (large grid of service cards)
7. Contact / Let’s Connect CTA section
8. Implicit footer area (minimal)

Overall UX: cinematic, scroll-driven reveals, large negative space, bold type hierarchy, interactive project exploration, professional-but-bold agency feel. No heavy 3D/canvas observed in the inspected viewport; interactions rely on CSS + GSAP + Lenis.

**Adaptation note:** Replace orange with Premium Yellow `#F4CC27`. Keep matte blacks. Preserve layout geometry, type scale, spacing rhythm, and motion language. Inject your personal data (MD SHAMIUL BASHAR SIAM, KUET CSE, your projects/skills/education/certificates/socials).

---

**PART B — Complete Section-by-Section Analysis**

**1. Navigation (fixed)**  
- Position: `fixed top-0 left-0 right-0 z-50`.  
- Padding: `px-6 py-4`.  
- Initial state: transparent/light. On scroll: `bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg`.  
- Links: HOME · PROJECTS · ABOUT (uppercase, tracking, active underline observed).  
- CTA: “Hire Me” pill button (right-aligned, rounded-full, light fill).  
- Behavior: smooth transition `duration-500`. Mobile: collapses (hamburger not fully verified in narrow viewport).  
- OBSERVED: glass morphism on scroll; active state underline.

**2. Hero**  
- Full viewport height (`h-screen` / absolute inset-0 layers). Background `#050505` / black.  
- Layout: left-aligned large name block (bottom-left-ish), scroll indicator centered bottom, infinite horizontal tech-skill marquee along the bottom edge.  
- Name (H1):  
  ```html
  <h1 class="font-['Bebas_Neue'] text-[clamp(80px,15vw,160px)] text-white leading-none">
    Mubas<span class="text-orange-600">hshir</span><br><span>Khan</span>
  </h1>
  ```  
  Font-size at inspected width ≈ 117 px. Leading-none. Part of the name (“HSHIR”) in accent orange.  
- Scroll indicator: small “SCROLL” + thin vertical line.  
- Tech marquee: continuous horizontal strip of rounded pills with icons + labels (PYTHON, JAVA, NEXT.JS, REACT, NODE.JS, GSAP, LENIS …) in orange outline/text on dark.  
- Dynamic behavior: name has GSAP transform/opacity (style attributes show `translate`/`opacity`). Likely entrance + possible scroll-linked movement. Marquee is infinite CSS or GSAP.  
- Right side: large empty/white or image area in some captures (NOT fully verified due to viewport constraints; may be a large visual or pure split).  

**3. Skills / Expertise Map**  
- Background `#050505`. Horizontal padding `clamp(20px–80px)`. Vertical padding generous (`py-28`).  
- Label: small orange “— EXPERTISE MAP”.  
- Giant heading: “WHAT I KNOW & BUILD” (Bebas Neue style, mixed white/gray/orange).  
- Description paragraph (secondary text).  
- Two-column domain cards: Frontend (8 skills) and Backend (8 skills) with numbered labels (“01 · INTERFACE & EXPERIENCE”, “02 · SYSTEMS & INFRASTRUCTURE”). Skill tags listed.  
- Bottom stats: “16 skills · 2 domains · Always expanding”.  
- Infinite tech marquee continues or reappears.  
- Scroll-triggered reveals (GSAP/Framer style).

**4. Selected Work / Projects**  
- Background `#050505`.  
- Label “— SELECTED WORK”.  
- Giant heading “RECENT PROJECTS & WORK” (white + orange “WORK”).  
- Subcopy: “A curated selection of builds — drag to explore or use the arrows.”  
- Horizontal/drag-capable project cards (3 observed: StyleDecor SaaS, Habit Tracker, SubBurn). Each card shows year, title, short description, tech tags, category.  
- Pagination “01 / 03” + circular controls.  
- “All Projects” button below.  
- Cards have hover states; drag interaction confirmed by copy.

**5. Services**  
- Background `#060606`. Generous padding.  
- Label “SERVICES / WHAT WE DELIVER”.  
- Giant heading “SOLUTIONS BUILT FOR REAL IMPACT”.  
- Intro paragraph.  
- Grid of 8 service cards (numbered 01–08): Smart Web Solutions, User-Friendly Design, Transparent Pricing, Reliable Cloud Infra, Integrated Ecosystem, Dedicated Support, Automation & AI, Partnership That Lasts. Each has short description + 3 tags.  
- Additional “Specialized In” and “What We Build” sub-sections with featured services.

**6. Contact / Let’s Connect**  
- Split or full-width dark panel.  
- Label “LET’S CONNECT”.  
- Giant stacked heading: “LET’S BUILD SOMETHING EXTRAORDINARY” (white + orange “EXTRAORDINARY”).  
- Short supporting text.  
- Primary CTA button “GET IN TOUCH” (outlined/rounded).  
- Clean, high-impact closing section.

**Footer**  
Minimal / not heavily detailed in captures (likely simple branding + links). Marked partially observed.

---

**PART C — Design System**

**Colors (reference → your adaptation)**  
| Role                  | Reference (approx)      | Your Target                  |
|-----------------------|-------------------------|------------------------------|
| Primary BG            | `#050505` / black      | `#0A0A0A` (Matte Black)     |
| Secondary BG          | `#060606`              | `#121212`                   |
| Elevated / Card       | slightly lighter dark  | `#191919`                   |
| Accent                | orange-600 ≈ `#ea580c` | `#F4CC27` (Premium Yellow)  |
| Primary Text          | white / near-white     | `#F5F5F5`                   |
| Secondary Text        | muted gray             | `#A3A3A3`                   |
| Border / subtle       | white/10–20            | yellow/10 or neutral        |
| Hover / active        | brighter orange        | brighter yellow / white     |

No heavy neon glows or multi-color gradients observed as dominant. Subtle backdrop-blur glass on nav. Dotted/grid texture possible on dark sections (subtle).

**Typography**  
| Element          | Font Family   | Weight | Desktop Size (est.) | Mobile (est.) | Line Height | Letter Spacing | Notes |
|------------------|---------------|--------|---------------------|---------------|-------------|----------------|-------|
| Main Heading (Hero name) | Bebas Neue   | 400   | clamp(80px, 15vw, 160px) | smaller clamp | 1.0 / none | normal / tight | OBSERVED exact clamp |
| Section Headings | Bebas Neue   | 400   | 64–96 px+          | 40–56 px     | tight      | normal        | Large, stacked |
| Body / Paragraph | Inter        | 400   | 16–18 px           | 15–16 px     | 1.5–1.6    | normal        | Secondary color |
| Labels / Small   | Inter / sans | 500–600 | 12–14 px         | 11–13 px     | —          | wide tracking | Orange accent |
| Buttons / Nav    | Inter        | 500   | 14–16 px           | 14 px        | —          | uppercase / tracking | — |
| Tech pills       | Inter        | 500   | 12–14 px           | —            | —          | —             | Orange border/text |

Closest Google Fonts: **Bebas Neue** (exact), **Inter**.

**Spacing & Grid**  
- Horizontal padding: `clamp(20–24px, 5–6vw, 80–96px)`.  
- Section vertical: `py-24` to `py-28` / generous.  
- Container: full-width with clamp padding (no strict max-width observed as primary).  
- Border radius: pills (rounded-full / large) for buttons and tech tags; cards softer.  
- Shadows: subtle on nav; minimal elsewhere.

---

**PART D — Animation Specification**

| Component              | Trigger          | Initial State                  | Final State                     | Duration (est.) | Delay | Easing          | Loop | Notes / Implementation |
|------------------------|------------------|--------------------------------|---------------------------------|-----------------|-------|-----------------|------|------------------------|
| Page load / Hero name | Load / mount    | opacity 0 + y offset / mask   | opacity 1, y 0                 | 0.8–1.2 s      | staggered | power2/3.out   | no   | GSAP; letter or word reveal |
| Tech marquee           | Continuous      | —                              | horizontal scroll              | slow           | —     | linear          | yes  | CSS animation or GSAP |
| Nav glass              | Scroll > 50 px  | transparent                    | backdrop-blur + bg/border      | 0.5 s          | —     | ease            | no   | CSS transition |
| Section headings       | Scroll into view| opacity 0 + y 40–60            | opacity 1, y 0                 | 0.7–1.0 s      | 0–0.2 | power2.out      | no   | GSAP ScrollTrigger or Framer whileInView |
| Skill / Service cards  | Scroll / hover  | opacity 0 or scale 0.95       | full + hover lift/scale        | 0.4–0.6 s      | stagger | —               | no   | Framer or GSAP |
| Project cards          | Drag / hover / scroll | —                           | drag free, hover scale/glow    | —              | —     | —               | no   | Pointer events + Framer/GSAP |
| Scroll indicator       | Always          | subtle pulse or static         | —                              | —              | —     | —               | yes? | CSS |
| Reduced motion         | prefers-reduced-motion | static                      | no motion                      | —              | —     | —               | —    | Required |

Priority: CSS for simple transitions; Framer Motion for React component entrance/hover; GSAP + ScrollTrigger for complex scroll-linked and pinned hero if needed. Lenis already in your repo — keep it.

**NOT VERIFIED:** exact keyframe curves, precise mouse-tracking, or any canvas/WebGL.

---

**PART E — Responsive Behavior**

- **Desktop (≥1280–1440 px):** Large type (clamp up to 160 px), multi-column skills/services, horizontal project exploration, full nav.  
- **Laptop (≈1280 px):** Same structure, slightly tighter clamps.  
- **Tablet (768 px):** Headings scale down, skills/services move toward single column or 2-col, project cards stack or remain swipeable, nav may start collapsing.  
- **Mobile (390 / 360 px):** Full stack, large but clamped type still impactful, marquee still present (smaller), touch-friendly drag/swipe for projects, hamburger menu (assumed), generous vertical padding retained.  
Breakpoints follow Tailwind defaults + clamp(). Overflow prevented; images/cards maintain aspect ratios.

---

**PART F — Existing Portfolio Mapping**

Your repo (`Shamiul-Bashar/PORTFOLIO`) is already a mature Next.js 16 + TypeScript + Tailwind v4 + GSAP + Framer Motion + Lenis setup with:
- Design tokens in `globals.css` / `@theme`
- Sections: Hero (NameReveal, RotatingTitles, etc.), About, Education (timeline), Skills (cards + tilt), Certificates, loading screen, navbar, smooth scroll, reduced-motion support
- Data-driven architecture (`src/data/*`)

**Mapping recommendations:**
- **Rebuild / heavily restyle:** Hero (replace cyberpunk grid/portrait/rotating titles with large Bebas-style name + accent letter + marquee + scroll indicator), Skills (move toward “Expertise Map” two-domain layout), Projects (add drag/horizontal selected-work treatment), add a Services-style section if desired or map to existing achievements.
- **Refactor / restyle:** Navbar (glass + Hire Me CTA), color tokens (swap cyan/purple for matte black + `#F4CC27`), typography (add Bebas Neue, adjust scales), card surfaces, spacing rhythm.
- **Preserve:** Education timeline, Certificates (empty but ready), data files, providers (Lenis + GSAP), reduced-motion handling, component primitives, About content structure, social links, CV link, all personal data.
- **Do not replace content** with placeholders. Keep KUET, your projects, skills, etc.

File map focus: `src/app/globals.css` (tokens), `src/sections/*`, `src/data/*`, `src/components/layout/navbar.tsx`, animation utilities.

---

**PART G — Recommended Component Architecture**

```
src/
  app/
    layout.tsx          # fonts (Bebas Neue + Inter), providers, metadata
    page.tsx            # compose sections
    globals.css         # tokens: --bg-primary #0A0A0A, --accent #F4CC27, etc.
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    ui/
      Button.tsx, Card.tsx, Container.tsx, Marquee.tsx, ...
    animations/         # shared GSAP/Framer helpers
  sections/
    Hero.tsx            # name + marquee + scroll indicator
    ExpertiseMap.tsx    # skills domains
    SelectedWork.tsx    # drag projects
    Services.tsx        # optional grid
    About.tsx
    Education.tsx
    Certificates.tsx
    Contact.tsx
  data/                 # profile, projects, skills, education, certificates, social
  hooks/
  lib/                  # cn, motion tokens
```

Animation strategy: Lenis (already present) + Framer Motion for component-level + GSAP ScrollTrigger only where complex scroll/pin is required. Prefer CSS transitions for hover. Always respect `prefers-reduced-motion`.

Performance: avoid heavy continuous animations; use `will-change` sparingly; optimize images with `next/image`.

---

**PART H — Pixel-Accuracy Checklist**

- [ ] Hero name uses Bebas Neue, clamp sizing, leading-none, one accent letter/span in Premium Yellow
- [ ] Exact padding clamps match reference rhythm
- [ ] Nav gains glass + border on scroll
- [ ] Tech marquee infinite and continuous
- [ ] Section labels small + accent + line
- [ ] Giant headings stacked with mixed colors
- [ ] Project cards support drag / arrows + pagination
- [ ] Services/cards numbered and tag-rich
- [ ] Contact CTA large and impactful
- [ ] Color tokens strictly Matte Black + Premium Yellow (no leftover cyan/purple)
- [ ] All personal data from your existing data files
- [ ] Reduced-motion paths present
- [ ] Mobile stacking and touch targets correct
- [ ] Smooth Lenis scroll preserved

---

**PART I — AI-to-AI Implementation Brief**

**Target:** Rebuild / restyle the existing Next.js portfolio of MD SHAMIUL BASHAR SIAM (KUET CSE undergraduate) to match the visual language, layout composition, typography scale, spacing, and interaction model of https://mahin290.vercel.app/, while using the Matte Black + Premium Yellow palette and 100% of the owner’s real content.

**Non-negotiable visual rules**
- Backgrounds: `#0A0A0A` (primary), `#121212` (secondary), `#191919` (elevated).
- Accent: `#F4CC27` only. Primary text `#F5F5F5`, secondary `#A3A3A3`.
- Display font: Bebas Neue for all major headings and the hero name. Body: Inter.
- Hero name must read **MD SHAMIUL BASHAR SIAM** with a refined typewriter-style or staggered letter/mask reveal (adapt the reference’s bold condensed treatment). One or more letters may use the yellow accent for visual interest, matching the reference’s “HSHIR” treatment.
- Horizontal padding: `clamp(20px, 5vw, 80px)` or `clamp(24px, 6vw, 96px)`.
- Section vertical rhythm: generous (`py-24`–`py-28`).
- Nav: fixed, transparent → glass (`backdrop-blur-md bg-white/10 border-white/20`) on scroll. Links + “Hire Me” / equivalent CTA.
- Infinite tech/skill marquee at hero bottom (or skills) using the owner’s actual skills.
- Skills section: “Expertise Map” style — two domain columns (Frontend / Backend or Programming / Tools / etc.) with numbered labels and skill lists. Large heading “WHAT I KNOW & BUILD” style.
- Projects: “Selected Work” treatment with drag-to-explore or horizontal scroll + pagination. Keep all existing project data, live links, GitHub links, tech tags.
- Contact: large stacked heading “LET’S BUILD SOMETHING EXTRAORDINARY” (or equivalent with your voice) + clear CTA.
- Preserve existing Education timeline, Certificates, About content, social links, CV, loading screen, Lenis, GSAP wiring, and reduced-motion support.
- Do **not** invent new personal data. Do **not** keep cyberpunk cyan/purple tokens or neon glow language.

**Component & implementation priorities**
1. Update design tokens in `globals.css` / `@theme`.
2. Add Bebas Neue via `next/font/google`.
3. Rebuild Hero: large name (typewriter or staggered reveal), scroll indicator, marquee. Remove or de-emphasize previous cyberpunk grid/portrait if they conflict.
4. Restyle Navbar to glass + new CTA.
5. Adapt Skills to Expertise Map layout.
6. Enhance Projects with selected-work horizontal/drag presentation while keeping the full grid/filter if already present.
7. Restyle all cards, buttons, labels to the new radius, border, and accent language.
8. Ensure every animation has a reduced-motion fallback.
9. Mobile-first responsive checks at 360 / 390 / 768 / 1280 / 1440.

**Critical mistakes to avoid**
- Leaving any cyan/purple or neon effects.
- Using generic “modern” spacing instead of the reference’s large type + generous negative space.
- Hard-coding content instead of reading from `src/data/*`.
- Skipping the marquee or the large condensed headings.
- Ignoring the existing Lenis + GSAP + Framer setup (extend, do not replace).
- Producing a design that looks “inspired by” rather than proportionally faithful to the reference’s hierarchy and rhythm.

**Deliverable expectation:** A fully functional, production-ready portfolio that a visitor immediately recognizes as the same sophisticated dark + bold-type language as the reference, but branded to MD SHAMIUL BASHAR SIAM with Matte Black + Premium Yellow and all of his real projects, education, skills, and contact information.

This specification is self-contained. Implement from it without needing to re-open the reference site.