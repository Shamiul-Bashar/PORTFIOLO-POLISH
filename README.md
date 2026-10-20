# SIAM — Portfolio 2.0 · Reference Edition

A **new, independent** portfolio codebase for **MD SHAMIUL BASHAR SIAM**, a CSE undergraduate at KUET. This starter translates the *supplied design analysis* of `https://mahin290.vercel.app/` into a dark, bold-type portfolio with a consistent premium-yellow identity. The old `Shamiul-Bashar/PORTFOLIO` repository was **not modified**.

> This is a built-out architectural / visual **foundation for VS Code + Codex / Antigravity polishing**, not a claim of pixel-identical replication or a verified production deployment. No fabricated work history, client testimonials, performance statistics, or certificates are included.

## Quick start

Requirements: Node.js 20.9+ (Node 22 LTS preferred) and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

*Fonts:* `next/font/google` downloads **Bebas Neue** and **Inter** at build time; a first build needs network access. If the download fails in a restricted environment, run locally on a network-connected machine; do not distribute bundled font binaries.

## Sections (as requested in the supplied reference analysis)

| Location | Component | Designed behavior |
|---|---|---|
| `/#top` | `sections/hero.tsx` | Full-height typographic hero, GSAP entrance, scroll cue, infinite real-tech marquee |
| `/#expertise` | `sections/expertise.tsx` | Two-domain Expertise Map, honest skill tags and counters |
| `/#work` | `sections/work.tsx` | Horizontal selected-work carousel: swipe, mouse drag, arrows, paging |
| `/#capabilities` | `sections/capabilities.tsx` | Six **verified practice areas** instead of made-up agency service promises |
| `/#about` | `sections/about.tsx` | Personal context with large typographic statement |
| `/#education` | `sections/education.tsx` | KUET degree information |
| optional | `sections/credentials.tsx` | Certificates / achievements appear only after real entries are added |
| `/#contact` | `sections/contact.tsx` | Oversized dark CTA and genuine contact links |
| `/projects` | `app/projects/page.tsx` | Archive of all six projects |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Data-driven detailed project case study |

## Repository structure

```text
public/
  projects/                  # Put screenshots here; don't invent them
src/
  app/
    globals.css              # Exact target colors / typography / responsive design
    layout.tsx               # next/font/google, global chrome, metadata
    page.tsx                 # Homepage composition
    projects/page.tsx        # Archive
    projects/[slug]/page.tsx # Case studies
  components/
    animations/reveal.tsx    # Reduced-motion-friendly Framer Motion reveal
    layout/site-header.tsx   # Glass-on-scroll navbar
    layout/site-footer.tsx
    providers/smooth-scroll.tsx # Lenis, native fallback
    ui/tech-marquee.tsx      # Infinite real-tech marquee
    ui/project-card.tsx
    ui/section-heading.tsx
    ui/container.tsx
  data/
    site.ts                  # Name, actual socials, résumé
    navigation.ts
    skills.ts
    projects.ts
    capabilities.ts
    certificates.ts          # Empty until verified
    achievements.ts          # Empty until verified
  sections/
    hero.tsx
    expertise.tsx
    work.tsx
    capabilities.tsx
    about.tsx
    education.tsx
    credentials.tsx
    contact.tsx
  types/project.ts
DESIGN_SYSTEM.md
POLISHING_BRIEF.md
```

## Source-of-truth design rules

- Palette: `#0A0A0A` / `#121212` / `#191919` / **`#F4CC27`** / `#F5F5F5` / `#A3A3A3`.
- Display typography: **Bebas Neue**; body: **Inter**.
- Desktop rhythm: ~90–152px vertical sections; horizontal padding `clamp(20px, 5.3vw, 84px)`.
- GSAP: *hero mask/word entrance only*; Framer Motion: *once-per-section entry*; CSS: marquee/transitions; Lenis: progressive enhancement for scrolling.
- Respect `prefers-reduced-motion`, keyboard nav, visible focus, screen-reader heading labels, and touch swipes.
- No heavy 3D, multicolor neon, fake stock photography, fabricated project screenshots, or made-up metrics.

## Update genuine content

1. **Profile:** `src/data/site.ts` — check link targets before publishing.
2. **Project narratives:** `src/data/projects.ts` — edit authorship/contributions and links.
3. **Project images:** place real images under `public/projects` and set `image: "/projects/filename.webp"` per entry in `src/data/projects.ts`. Typographic project art is the fallback.
4. **Capabilities/skills:** `src/data/capabilities.ts`, `src/data/skills.ts`.
5. **Credentials:** add only verified content to `src/data/certificates.ts` and `src/data/achievements.ts`. Empty content produces no fake section.
6. **SEO:** set the new actual deployed domain in `metadataBase` once known. Add actual OG artwork and favicon as needed.

## New repository (do not touch the old one)

Create an **empty** GitHub repository. In the extracted new folder run:

```bash
git init
git add .
git commit -m "Initialize SIAM reference-edition portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPO.git
git push -u origin main
```

Replace the remote URL with your own new repository. Before sharing publicly, validate on mobile widths **360 / 390 / 768 / 1280 / 1440** and make sure `npm run build` succeeds on your local machine.

## Agent refinement

Read **[`POLISHING_BRIEF.md`](./POLISHING_BRIEF.md)**, **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)** and **[`docs/reference-analysis.md`](./docs/reference-analysis.md)** first. Improve **one section at a time**, preserve data contracts and functional routes. The user's supplied reference analysis is the specification; it is not a license to copy the reference owner's content.
