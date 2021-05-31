export const SITE_URL = '<%= url %>';
<% if (features.prismic) { -%>
export const PRISMIC_REPO = `<%= prismic %>`;
<% } -%>
export const ICON_PROPS = {
  width: '1em',
  height: '1em',
  fill: 'currentColor'
};
