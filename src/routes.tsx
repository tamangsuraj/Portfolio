import type { RouteRecord } from "vite-react-ssg";
import { SiteLayout } from "./layouts/SiteLayout";

/**
 * Route definitions for both the SSG build and the browser router.
 *
 * Every page uses `lazy` so Rollup splits it into its own chunk. That is what
 * keeps the 815kb three.js bundle — pulled in only by the home page hero —
 * off every other route.
 *
 * Paths here are written without trailing slashes (React Router's convention);
 * `dirStyle: "nested"` in vite.config.ts emits them as `<path>/index.html`, and
 * vercel.json redirects the non-slash form to the canonical slashed URL.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <SiteLayout />,
    entry: "src/layouts/SiteLayout.tsx",
    children: [
      { index: true, lazy: () => import("./pages/Home") },
      { path: "about", lazy: () => import("./pages/About") },

      { path: "services", lazy: () => import("./pages/Services") },
      { path: "services/data", lazy: () => import("./pages/ServicesData") },
      { path: "services/web", lazy: () => import("./pages/ServicesWeb") },

      { path: "work", lazy: () => import("./pages/Work") },
      { path: "contact", lazy: () => import("./pages/Contact") },

      // "/blog" is intentionally absent until the launch articles land. Its
      // record already exists in src/seo/routes.ts with published:false, so
      // adding the route here is the only step needed to switch it on.

      { path: "privacy", lazy: () => import("./pages/Privacy") },
      { path: "sitemap", lazy: () => import("./pages/SitemapPage") },

      // Catch-all. Rendered as /404/index.html and wired up as the Vercel
      // 404 handler so unknown URLs return a real 404 status instead of the
      // soft-404 redirect the old GitHub Pages setup produced.
      { path: "*", lazy: () => import("./pages/NotFound") },
    ],
  },
];
