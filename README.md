# Suraj Tamang — Portfolio

Personal portfolio of Suraj Tamang, DevOps Engineer. Designed as a **control plane**: the
site reads like a beautifully-crafted observability console — terminal boot sequence,
interactive 3D node cluster, pipeline-styled career timeline, orbital skill system, and
glass status-bar navigation with a live clock.

Live at [www.suraj-tamang.com.np](https://www.suraj-tamang.com.np).

## Stack

- [Vite](https://vitejs.dev) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com) — design tokens in `tailwind.config.ts`
- [Framer Motion](https://www.framer.com/motion/) — reveals, magnetic buttons, tilt cards
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + three.js — hero node cluster
- [Lenis](https://lenis.darkroom.engineering/) — inertial smooth scrolling

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Architecture

```
src/
  data/content.ts        # every fact on the site — edit content here only
  hooks/useCapabilities  # reduced-motion / pointer / WebGL device detection
  three/ClusterScene     # lazy-loaded R3F scene (desktop, WebGL-capable only)
  components/            # Nav, Footer, Reveal, Magnetic, TiltCard, CursorGlow, …
  sections/              # Hero, About, Experience, Projects, Skills, Writing,
                         # Signals (testimonials), Contact
public/                  # CNAME, Resume.pdf, robots.txt, photos, favicon
```

## Performance notes

- The three.js bundle (~219 kB gz) is **lazy-loaded** and only on desktop devices that
  pass the WebGL capability check; phones and reduced-motion users get a static
  ambient-glow fallback. Eager JS is ~101 kB gz.
- The WebGL canvas unmounts when the hero scrolls out of view; the skills orbit pauses
  off-screen via IntersectionObserver.
- All animations are transform/opacity only (GPU-composited); `prefers-reduced-motion`
  disables the boot sequence, typing, orbit, tilt, magnetic and scroll effects.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push
to `main` (set the repo's Pages source to "GitHub Actions"). The custom-domain `CNAME`
ships from `public/`.

The previous compiled site is archived in `_legacy-site/` and can be deleted once the new
site is live.
