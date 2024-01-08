import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://landing-page-envato.vercel.app',
  image: {
    domains: ['loremflickr', 'preview.colorlib'],
    service: sharpImageService(),
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '_astro/[name]-[hash][extname]',
        },
      },
    },
  },
});
