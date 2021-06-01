import PrismicDOM from 'prismic-dom';
import { placeholder } from 'svelte-imgix';
import * as prismic from 'ts-prismic';
import { PRISMIC_REPO } from '../consts';
import type { PrismicImg } from './types';

/** Default maxage of page data */
export const maxage = 300;

/** Route resolving */
const routes = (uid: string) => ({
  default: `/${uid}`
});

/** Richtext HTML parser */
const htmlElements = (element?: any, content?: any, children?: any) => ({});

/** Init Prismic API */
const ref = (async () => {
  const endpoint = prismic.defaultEndpoint(PRISMIC_REPO),
    repository = (await fetch(prismic.buildRepositoryURL(endpoint)).then(
      (res: Response) => res.json()
    )) as prismic.Response.Repository,
    { ref } = repository.refs.find((ref) => ref.isMasterRef)!;

  return ref;
})();

/** Queries */
export async function query(
  query: (predicates: typeof prismic.predicate) => string,
  fetcher: any,
  options?: prismic.QueryParams
) {
  const result = await fetcher(
    prismic.buildQueryURL(
      prismic.defaultEndpoint(PRISMIC_REPO),
      await ref,
      query(prismic.predicate),
      {
        pageSize: 100,
        ...options
      }
    )
  ).then((res: Response) => res.json());

  if (!result) {
    throw new Error('Unpublished document');
  }

  return result.results_size === 1
    ? (result.results[0] as any)
    : (result.results as any);
}

/** Predicates.at shorthand */
export function queryAt(
  path: string,
  value: string,
  fetcher: any,
  options?: prismic.QueryParams
) {
  return query((prismic) => prismic.at(path, value), fetcher, options);
}

/** Document resolver */
export function resolveDocument(doc: any) {
  const paths = routes(doc.uid);
  return doc ? paths[doc.type as keyof typeof paths] || paths.default : '';
}

/** Internal link resolver */
export function resolveLink(link: { link_type?: string; url?: string }) {
  return link.link_type && link.link_type !== 'Document'
    ? link.url || ''
    : resolveDocument(link);
}

/** RichText to HTML string */
export function richtext(richtext: object, inline?: boolean) {
  const result = richtext
    ? PrismicDOM.RichText.asHtml(
        richtext,
        resolveLink,
        ((type: keyof typeof htmlElements, ...args: any) =>
          htmlElements(...args)[type] || null) as any
      )
    : '';

  return inline
    ? result.replace(/^<[^>]+>|<\/[^>]+>$|<[^/>][^>]*><\/[^>]+>/g, '')
    : result;
}

/** RichText to plaintext string */
export function plaintext(richtext: object) {
  return richtext ? PrismicDOM.RichText.asText(richtext) : '';
}

/** Image attribute shorthand */
export function prismicImg(img: PrismicImg) {
  return {
    src: placeholder(img.url),
    alt: img.alt,
    ...img.dimensions
  };
}
