import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter(),
    target: '#svelte'
  },
  preprocess: preprocess({
    postcss: true,
    defaults: { style: 'postcss', script: 'typescript' }
  })
};
