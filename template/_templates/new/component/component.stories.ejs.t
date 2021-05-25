---
to: src/components/<%= name %>/<%= name %>.stories.svelte
---
<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import <%= name %> from './<%= name %>.svelte';
</script>

<Meta title="<%= name %>" component={<%= name %>}/>

<Template let:args>
  <<%= name %> {...args}/>
</Template>

<Story name="Default" />

