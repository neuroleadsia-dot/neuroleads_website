import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages: use repo name as base path
  // Remplacer '/neuroleads/' par le nom de votre repo
  base: mode === 'production' ? '/neuroleads/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Security: Disable source maps in production
    sourcemap: false,
    // Minification
    minify: true,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    // Asset naming with hash for cache busting
    assetsDir: 'assets',
    cssCodeSplit: true,
  },
  server: {
    // Security headers for dev server
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
}))
