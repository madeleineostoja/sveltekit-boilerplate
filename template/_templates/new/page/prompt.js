module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name'
  }<% if (features.prismic) { %>,
  {
    type: 'input',
    name: 'prismic',
    message: 'Prismic type'
  }<% } %>
];
