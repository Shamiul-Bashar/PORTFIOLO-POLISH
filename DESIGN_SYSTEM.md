# SIAM · Portfolio Design System

## Intent
Translate the user's supplied reference-site analysis into a *distinct personal brand*: strong condensed type, intentional empty space, lightweight scroll-led movement, and a restrained editorial black/yellow palette.

## Visual tokens

| Token | Color | Usage |
| --- | --- | --- |
| `--bg` | `#0A0A0A` | base canvas, hero, contact |
| `--surface` | `#121212` | alternate section / expertise |
| `--elevated` | `#191919` | hover / elevated panels |
| `--accent` | `#F4CC27` | intentional typography emphasis and CTA |
| `--text` | `#F5F5F5` | headline and readable text |
| `--muted` | `#A3A3A3` | descriptive secondary copy |

**Never** introduce cyan, purple, orange, heavy neon glow, random gradients or busy stock imagery. Background technical texture should stay very faint and meaningful.

## Font system

- **Display:** Bebas Neue 400 from `next/font/google` via `--font-display`.
- **Body/UI:** Inter from `next/font/google` via `--font-body`.
- Massive section headings: `clamp(4rem, 7.65vw, 8.8rem)`, line-height `.9`.
- Hero name: `clamp(5.1rem, 12.6vw, 12.1rem)` on large viewports, responsively constrained on mobile.
- Eyebrows: 10–11px uppercase tracking `.14em–.18em`.
- Descriptive copy: 14–16px / line-height `1.8–1.9`.

## Layout language

- Full-width fluid composition with horizontal inset `--side: clamp(20px, 5.3vw, 84px)`.
- Section vertical whitespace: `clamp(90px, 10vw, 152px)`.
- Key geometry: split-heading introduction, two equal expertise domains, horizontal project cards, three-column capabilities grid (collapses to two and one), one big closing invitation.
- Round pills only for CTA and tech tags; cards largely rectilinear.

## Motion hierarchy

1. GSAP in `hero.tsx` — mask/word entrance only, once on mount.
2. Framer Motion in `reveal.tsx` — subtle `y=36` + opacity, once on entry.
3. CSS tech marquee — one slow continuous loop, pausable on hover.
4. Native horizontal scroll snapping + mouse drag + arrow buttons in selected work.
5. Lenis scroll smoothing (progressive enhancement). Native browser scrolling remains available.
6. On reduced-motion preference, disable scroll library and CSS movement; section components do not hide or animate.

**Avoid** long loaders, moving glows, free-floating portraits, flashing text, repeating typewriter loops, and full-page parallax.

## Content integrity

- Real KUET / CSE identity from `data/site.ts`.
- Show real code projects, not invented client work or "10 years of experience".
- Practice-area cards represent demonstrated skills, **not promises of paid services**.
- Empty certificates and achievements data are intentionally hidden until evidenced.
- Project cards with no screenshots use **typographic CSS art**, not fabricated screenshots.

## QA checklist

- [ ] `npm run typecheck`, `npm run lint`, `npm run build`
- [ ] Keyboard Tab and Shift+Tab through all controls
- [ ] Arrow keys on carousel (focus it first)
- [ ] Mouse-drag carousel doesn't accidentally open a card
- [ ] Touch scroll works on mobile
- [ ] Nav links work from homepage and all project routes
- [ ] Reduced-motion mode is static/readable
- [ ] 360 / 390 / 768 / 1280 / 1440px widths have no page overflow
- [ ] Real screenshot URLs point to existing files
- [ ] Email, CV, social and repository URLs work
- [ ] Site metadata base / favicon updated before launch
