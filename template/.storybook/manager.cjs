import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: '<%= name %>',
    brandUrl: '<%= url %>',
    brandImage: '../static/icon.png',
    colorPrimary: '<%= brandColour %>',
    colorSecondary: '<%= brandColour %>'
  }),
  showRoots: true,
  viewMode: 'docs'
});
