///<reference types="vitest" />
///<reference types="vite/client" />

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/**/*.d.ts'],
      include: ['src'],
    },
    globals: true,
    environment: 'jsdom',
  },
});
