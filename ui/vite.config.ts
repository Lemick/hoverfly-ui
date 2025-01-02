/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  output: {
    manualChunks(id: string) {
      if (id.indexOf('node_modules') !== -1) {
        const basic = id.toString().split('node_modules/')[1];
        const sub1 = basic.split('/')[0];
        if (sub1 !== '.pnpm') {
          return sub1.toString();
        }
        const name2 = basic.split('/')[1];
        return name2.split('@')[name2[0] === '@' ? 1 : 0].toString();
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    include: ['src/**/*.test.*'],
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: []
    }
  }
});
