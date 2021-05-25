export const SITE_URL = '<%= url %>';
<% if (features.prismic) { -%>
export const PRISMIC_API = `https://<%= prismic %>.cdn.prismic.io/api/v2`;
<% } -%>
export const ICON_PROPS = {
  width: '1em',
  height: '1em',
  fill: 'currentColor'
};
