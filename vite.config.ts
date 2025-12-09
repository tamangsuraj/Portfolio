import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::',      // This allows connections from any IPv6 address
    port: 8080,      // Default Vite dev server port
    strictPort: true, // Enforces using only the specified port
    fs: {
      allow: ['src'], // Ensure Vite allows serving from the "src" directory
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for easier imports
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Ensures React dependencies are included for optimization
  },
  build: {
    target: 'esnext', // Use ESNext to target modern JavaScript
    minify: 'esbuild', // Use ESBuild for fast minification
  },
});
