import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://www.openstreetmap.org/*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          '@violentmonkey/url': cdn.jsdelivr('VM', 'dist/index.js'),
        },
      },
    }),
  ],
});
