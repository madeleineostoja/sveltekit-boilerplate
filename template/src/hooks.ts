import { prerendering } from '$app/env';
import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';

const CONFIG = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true
};

const handle: Handle = async ({ request, render }) => {
  const response = await render(request);

  if (prerendering && response.headers['content-type'] === 'text/html') {
    response.body = minify(response.body as string, CONFIG);
  }

  return response;
};

export default handle;
