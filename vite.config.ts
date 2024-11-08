import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        ui: resolve(__dirname, 'src/ui/main.tsx'),
        controller: resolve(__dirname, 'src/plugin/controller.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'controller' 
            ? 'plugin/[name].js'
            : 'ui/[name].js';
        },
        dir: 'dist'
      }
    }
  }
});
