module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 1,
      browsers: 'supports css-variables',
      importFrom: ['src/styles/breakpoints.json']
    })
  ]
};
