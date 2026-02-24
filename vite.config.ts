import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/medgemma': {
            target: 'https://nonprofessed-marleigh-tachygraphically.ngrok-free.dev',
            changeOrigin: true,
            secure: false,
            headers: {
              'ngrok-skip-browser-warning': 'true'
            },
            rewrite: (path) => path.replace(/^\/api\/medgemma/, '')
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.MEDGEMMA_API_URL': JSON.stringify(env.MEDGEMMA_API_URL)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
