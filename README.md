# Dadan Showcase — Next.js

A standalone Next.js 15 (App Router) export of the Dadan personal showcase site. Tailwind CSS v4, TypeScript, Framer Motion, Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx       Root layout & metadata
  page.tsx         The single showcase page
  globals.css      Tailwind v4 + theme variables
components/
  hero.tsx
  projects.tsx
  tech-radar.tsx
  lab-notes.tsx
  graveyard.tsx
  footer.tsx
public/
  images/          Hero + project images
```

## Editing content

- **Projects list** — edit the `PROJECTS` array in `components/projects.tsx`.
- **Tech radar items** — edit `RADAR_ITEMS` in `components/tech-radar.tsx`.
- **Workshop notes** — edit `NOTES` in `components/lab-notes.tsx`.
- **Abandoned projects** — edit `DEAD_PROJECTS` in `components/graveyard.tsx`.
- **Theme colors** — edit the CSS variables in `app/globals.css` (`:root` for light, `.dark` for dark).

## Notes

- Uses `framer-motion`, so all components that animate are marked `"use client"`.
- Tailwind v4 is configured via `@tailwindcss/postcss` (see `postcss.config.mjs`).
- Replace placeholder `#` links in the components with your real project URLs.
