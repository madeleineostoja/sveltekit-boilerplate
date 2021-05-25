---
to: src/routes/<%%= name %%>.svelte
---
<script <%- features.prismic ? 'context="module"' : '' %>>
  import Meta from 'svelte-meta';
  import type { Load } from '@sveltejs/kit';
<% if (features.prismic) { -%>
  import { queryAt } from '../lib/prismic';
  import type { <%%= h.changeCase.pascal(name) %%> } from '../../@types/_generated/prismic';

  export const load: Load = async () => {
    const { data } = await queryAt('document.type', '<%%= prismic %%>');

    return {
      props: { data }
    };
  }

</script>

<script>
  export let data: <%%= h.changeCase.pascal(name) %%>;
<% } -%>
</script>

<Meta <%= features.prismic ? 'title={data.meta_title} description={data.meta_description} ' : '' %>/>