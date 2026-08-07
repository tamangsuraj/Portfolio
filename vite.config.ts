import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Side-effect type import: vite-react-ssg augments vite's UserConfig with the
// `ssgOptions` key below. Without this, TypeScript rejects it as unknown.
import type {} from "vite-react-ssg";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],

  build: {
    target: "es2020",
    // Inline anything under 4kb as a data URI — saves round trips on the
    // small SVGs used across the section headings.
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Only chunk the client build. During the SSR pass Rollup treats
        // react-router-dom as external, and naming an external module in
        // manualChunks is a hard error.
        manualChunks: isSsrBuild
          ? undefined
          : {
              // three.js is ~815kb raw and is only ever needed by the hero
              // scene on "/". Its own chunk means every other route ships
              // without it, and ClusterScene is lazy()-imported so it stays
              // out of the critical path even on the home page.
              three: ["three", "@react-three/fiber"],
              motion: ["framer-motion"],
              router: ["react-router-dom"],
            },
      },
    },
  },

  ssr: {
    // three and r3f ship ESM that needs transforming for the SSG render pass.
    noExternal: ["three", "@react-three/fiber", "framer-motion", "lenis"],
  },

  ssgOptions: {
    entry: "src/main.tsx",
    // nested => /services/web/ becomes /services/web/index.html, which is what
    // makes the trailing-slash canonical strategy work on a static host.
    dirStyle: "nested",
    // Only pre-render routes we explicitly declare; dynamic params are handled
    // by each route's getStaticPaths.
    includeAllRoutes: false,
    /**
     * The "*" catch-all is a dynamic route, so the default filter drops it and
     * no 404 page gets emitted. Add it explicitly: vercel.json points its 404
     * handler at /404/index.html, which is what makes unknown URLs return a
     * real 404 status instead of the soft 404 the old setup produced.
     */
    includedRoutes: (paths) => [...paths.filter((p) => !p.includes("*")), "/404"],
    script: "defer",
    formatting: "none",
    // Inlines above-the-fold CSS into each page and defers the rest. Directly
    // targets First Contentful Paint / Largest Contentful Paint.
    beastiesOptions: {
      preload: "swap",
      pruneSource: false,
      reduceInlineStyles: false,
      logLevel: "warn",
    },
  },
}));
