import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Hardcode the production backend URL here as fallback
const PROD_BACKEND_URL = 'https://proudcitizen-backend-app.grayisland-c2f3c413.eastus2.azurecontainerapps.io';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: { overlay: false },
    // Proxy API requests during development
    proxy: {
      '/api': {
        target: PROD_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  },
  // Only expose the specific env var we need
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || PROD_BACKEND_URL
    )
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Recommended for debugging
  }
});