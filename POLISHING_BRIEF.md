# Codex / Antigravity · Professional Portfolio Polishing Brief

You are a senior front-end engineer and product designer operating inside the **new standalone** SIAM portfolio repository. **Do not touch** the old `Shamiul-Bashar/PORTFOLIO` repository or swap this app for an unrelated template.

## Specification

The complete original user-supplied analysis is preserved in `docs/reference-analysis.md` (interpret its “observed/approximate/not verified” caveats as written). The user provided a detailed assessment of `https://mahin290.vercel.app/`: nearly black cinematic composition, giant Bebas Neue typography, Inter body, generous negative space, premium scroll reveals, transparent-to-glass fixed navigation, infinitely scrolling skill pills, two-domain expertise, horizontal selected-work carousel, numbered capabilities and oversized contact heading.

Translate that hierarchy and motion language into this *original portfolio identity*. The reference's orange is replaced with **premium yellow `#F4CC27`**. Preserve real owner content. Use `DESIGN_SYSTEM.md` and current `src/data` files as implementation constraints.

## Current structural implementation

- Homepage: Hero → Expertise Map → Selected Work → Capability Areas → About → Education → Credentials (if populated) → Contact.
- Hero includes large name, GSAP entrance, skill marquee, scroll cue.
- Header has glass-on-scroll effect, active link, mobile menu and mail CTA.
- Projects carousel includes native swipe, desktop mouse drag, arrow controls, pager and link to archive.
- `/projects` lists all projects; `/projects/[slug]` contains each case study.
- Framer Motion section reveals + optional Lenis smoothing; `prefers-reduced-motion` path is present.
- Certificate and achievement sections render only with verified records. Do not invent them.

## Instructions

1. **First inspect the repository and run checks**. Do not assume unsupported claims or modify the architecture before understanding it.
2. **Work incrementally**, one feature or section at a time. Keep site functioning after every change.
3. Audit at **360, 390, 768, 1280, and 1440 px**. Focus on text overflow, carousel snapping, nav stacking, contrast, and line wrapping.
4. Polish spacing/typography and CSS detailing before adding new animations. Use motion only to communicate hierarchy or meaningful interaction.
5. Keep all content in `src/data/*`, all layout tokens in `src/app/globals.css`, section composition in `src/app/page.tsx`.
6. Keep semantic headings, keyboard controls, accessible names, focus indicators, and reduced-motion behavior intact.
7. Replace only with **real project screenshots** from the owner; never generate screenshots and present them as deployed products.
8. Verify code quality using `npm run typecheck`, `npm run lint`, and `npm run build`; report pass/fail accurately.
9. Do **not** commit, push, deploy, or change remote repositories unless the user explicitly requests it.

## Suggested safe refinement order

**Phase 1:** Typography, hero balance, navbar transition, responsive headline fit.
**Phase 2:** Projects carousel UX, refined cards, real screenshots, case studies.
**Phase 3:** Expertise and capability card rhythm, spacing, small icon/tags.
**Phase 4:** About, Education, Contact CTA, footer.
**Phase 5:** End-to-end accessibility, reduced motion, SEO, image performance, cross-screen testing.

## Completion report

For each phase provide (a) files changed, (b) visual improvements, (c) what remains unverified, and (d) real check outputs. Changes must look like careful hand-designed editorial frontend work, **not** an AI aesthetic defined by neon glows, generic badges and animations everywhere.
