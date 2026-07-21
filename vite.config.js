import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  base: '/Alanas-hair-boutique/', 
  plugins: [
    tailwindcss(),
    injectHTML(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})