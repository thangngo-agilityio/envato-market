import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
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
