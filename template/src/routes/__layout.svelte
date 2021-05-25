<script>
  import Meta from 'svelte-meta';
  import '../styles';
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: var(--grid-page);
    grid-auto-rows: min-content;
    & > :global(*) {
      grid-column: 2 / 3;
    }
  }

  main {
    position: relative;
    min-height: 100vh;
    padding: var(--spacing-3) 0;
  }

  .content {
    grid-column: 1 / -1;
    align-items: start;
    align-self: stretch;
  }
</style>

<Meta
  siteUrl="<%= url %>"
  logo="<%= url %>/icon.png"
  openGraph={{
    type: 'website',
    locale: 'en_NZ'
  }}
/>

<main class="grid">
  <div class="grid content">
    <slot />
  </div>
</main>
