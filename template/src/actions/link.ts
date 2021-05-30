import { prefetch } from '$app/navigation';
import { page } from '$app/stores';

function isExternal(anchor: HTMLAnchorElement) {
  return (
    anchor.href &&
    new URL(anchor.href, `${location.protocol}//${location.host}`).host !==
      location.host
  );
}

export default function link(anchor: HTMLAnchorElement) {
  const prefetchLink = () => !isExternal(anchor) && prefetch(anchor.href);

  if (isExternal(anchor)) {
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

export function active(anchor: HTMLAnchorElement) {
  const unsubscribe = page.subscribe(({ path }) => {
    if (isExternal(anchor)) {
      return;
    }

    if (anchor.pathname == path) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  });

  return {
    destroy() {
      unsubscribe();
    }
  };
}
