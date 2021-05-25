---
to: src/components/<%%= name %%>/<%%= name %%>.svelte
---
<!--
  @component
  <%%= description %%>
-->
<script>
<%% props && props.forEach(prop => { -%%>
  /** <%%= prop.description %%> @type {<%%= prop.type %%>} */
  export let <%%= prop.name %%>: <%%= prop.type %%>;
<%% }) -%%>
</script>

<div class="{$$props.class}">
</div>
