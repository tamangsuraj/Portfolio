import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",      // Ensures that the server is accessible externally (if needed)
    port: 8080,           // Port for the dev server
    strictPort: true,     // Ensures that the server uses only the specified port
    fs: {
      allow: [path.resolve(__dirname, "../")]  // Allow Vite to serve files outside of the default directory (e.g., index.html)
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Alias for easier imports from the src folder
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Ensure dependencies are optimized
  },
  build: {
    target: "esnext",  // Ensure modern JS features are targeted
    minify: "esbuild", // Minify the code with esbuild
  },
});
