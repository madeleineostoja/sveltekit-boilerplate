import { timestamp, files, build } from '$service-worker';

const ASSETS = `cache${timestamp}`,
  toCache = build.concat(files),
  staticAssets = new Set(toCache);

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches
      .open(ASSETS)
      .then((cache) => cache.addAll(toCache))
      .then(() => {
        (self as any).skipWaiting();
      })
  );
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== ASSETS) await caches.delete(key);
      }

      (self as any).clients.claim();
    })
  );
});

/**
 * Fetch the asset from the network and store it in the cache.
 * Fall back to the cache if the user is offline.
 */
async function fetchAndCache(request: any) {
  const cache = await caches.open(`offline${timestamp}`);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response) return response;

    throw err;
  }
}

self.addEventListener('fetch', (event: any) => {
  if (event.request.method !== 'GET' || event.request.headers.has('range'))
    return;

  const url = new URL(event.request.url),
    isHttp = url.protocol.startsWith('http'),
    isDevServerRequest =
      url.hostname === self.location.hostname &&
      url.port !== self.location.port,
    isStaticAsset =
      url.host === self.location.host && staticAssets.has(url.pathname),
    skipBecauseUncached =
      event.request.cache === 'only-if-cached' && !isStaticAsset;

  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(
      (async () => {
        const cachedAsset =
          isStaticAsset && (await caches.match(event.request));

        return cachedAsset || fetchAndCache(event.request);
      })()
    );
  }
});
