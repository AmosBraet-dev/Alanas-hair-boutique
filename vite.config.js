import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        nak: resolve(__dirname, 'nak.html'),
        appointment: resolve(__dirname, 'appointment.html'),
        redirect: resolve(__dirname, 'redirect.html'),
      },
    },
  },
})