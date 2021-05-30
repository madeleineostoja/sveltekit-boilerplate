import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $src: path.resolve('./src'),
          $types: path.resolve('./@types')
        }
      }
    }
  },
  preprocess: preprocess({
    postcss: true,
    defaults: { style: 'postcss', script: 'typescript' }
  })
};
