const preprocess = require('svelte-preprocess');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  svelteOptions: {
    preprocess: preprocess({
      postcss: true,
      defaults: { style: 'postcss', script: 'typescript' }
    })
  }
};
