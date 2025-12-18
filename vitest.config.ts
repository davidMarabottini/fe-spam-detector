import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',

    coverage: {
    provider: 'v8',
    include: ['src/**/*.tsx', 'src/**/*.ts'], 
    exclude: [
      'src/main.tsx',
      'src/vite-env.d.ts',
      '**/*.types.ts',
      '**/*.module.scss',
      'src/**/index.ts',
    ],
    reporter: ['text', 'html'],
  },
  },
});