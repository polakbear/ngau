import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(
            __dirname,
            'node_modules/@fortawesome/fontawesome-free/webfonts'
          ),
          dest: '', // puts them into dist/webfonts/
        },
      ],
    }),
  ],
});
