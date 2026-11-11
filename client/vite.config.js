import { privacySections, privacyReviewDate } from './src/content/privacy.js';
import { privacyHtml } from './src/utils/privacyHtml.js';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_PROXY || 'http://localhost:5000';

  return {
    plugins: [react(), tailwindcss(), {
      name: 'crownatech-script-free-privacy',
      apply: 'build',
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'privacy-policy.html', source: privacyHtml(privacySections, privacyReviewDate) });
      },
    }],
    server: {
      port: 5173,
      // Forward /api requests to the Express backend in dev so we don't
      // need CORS in development and the front-end can call same-origin paths.
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Split admin + heavy libs into their own chunks
      rollupOptions: {
        output: {
          manualChunks: {
            quill: ['react-quill-new'],
          },
        },
      },
    },
  };
});
