<script>
  import { browser } from '$app/env';
  import { prefetchRoutes } from '$app/navigation';
  import { SITE_URL } from '$src/lib/consts';
  import Meta from 'svelte-meta';
  import '$src/styles';

  if (browser) {
    prefetchRoutes();
  }
</script>

<style>
  main {
    position: relative;
    display: grid;
    grid-template-columns: var(--grid-page);
    grid-auto-rows: min-content;
    align-items: start;
    min-height: 100%;
    padding: var(--spacing-3) 0;
    & > :global(*) {
      grid-column: 2 / 3;
    }
  }
</style>

<Meta
  siteUrl={SITE_URL}
  logo="{SITE_URL}/icon.png"
  openGraph={{
    type: 'website',
    locale: 'en_NZ'
  }}
/>

<main>
  <slot />
</main>
