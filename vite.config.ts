import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// IMPORTANT: You are using a custom domain (suraj-tamang.com.np)
// Therefore, base MUST be "/"  
// (Only GitHub username pages need a subpath.)
export default defineConfig({
  base: "/Portfolio",   // ✔ Correct for custom domain

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
