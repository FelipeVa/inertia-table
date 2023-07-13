import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'resources/js/index.ts'),
      name: 'Inertia.js Tables for Laravel Query Builder',
      fileName: (format) => `inertiajs-table-react.${format}.js`,
    },
    rollupOptions: {
      external: [/^@lifespikes.*/, /^@inertiajs.*/, 'react'],
      output: {
        globals: {
          react: 'React',
          '@lifespikes/cogent-ts': 'cogentTs',
          '@inertiajs/core': 'InertiaCore',
          '@inertiajs/react': 'InertiaReact',
        },
      },
    },
  },
});
