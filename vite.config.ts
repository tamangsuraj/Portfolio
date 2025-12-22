import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// GitHub Pages Configuration
// CUSTOM DOMAIN (www.suraj-tamang.com.np via CNAME):
//   → base MUST be "/"
// 
// WITHOUT custom domain (tamangsura.github.io/Portfolio):
//   → base would be "/Portfolio/"
//
// Since CNAME exists, using base: "/"
export default defineConfig({
  base: "/",   // ✅ Correct for custom domain

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 8080,
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  build: {
    target: "esnext",
    minify: "esbuild",
    outDir: "dist",
  },
});
