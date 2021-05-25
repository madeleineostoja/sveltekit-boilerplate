import { prefetch } from '$app/navigation';

export default function link(anchor: HTMLAnchorElement) {
  const isExternal =
      anchor.href &&
      new URL(anchor.href, `${location.protocol}//${location.host}`).host !==
        location.host,
    prefetchLink = () => !isExternal && prefetch(anchor.href);

  if (isExternal) {
    anchor.target = '_blank';
    anchor.rel = `${anchor.rel} noopener noreferrer`;
  }

  anchor.addEventListener('mouseenter', prefetchLink);
  anchor.addEventListener('touchstart', prefetchLink);

  return {
    destroy() {
      anchor.removeEventListener('mouseenter', prefetchLink);
      anchor.removeEventListener('touchstart', prefetchLink);
    }
  };
}
