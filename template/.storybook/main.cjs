const preprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
  core: { builder: 'storybook-builder-vite' },
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
  },
  async viteFinal(config) {
    config.resolve.alias = {
      $app: path.resolve('./.svelte-kit/dev/runtime/app'),
      $src: path.resolve('./src'),
      $types: path.resolve('./@types')
    };

    // Allow files outside root for any aliased modules
    config.server.fsServe.strict = false;

    return config;
  }
};
