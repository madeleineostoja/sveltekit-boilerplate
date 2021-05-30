---
to: src/routes/<%= name %>/<%= name %>.json.ts
---
import { queryAt } from '$src/lib/prismic';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const { data } = await queryAt('document.type', '<%= prismic %>');

  return {
    ...(data ? { body: { data } } : { status: 404 })
  };
};
