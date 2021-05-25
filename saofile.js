const FEATURES = {
  prismic: ['src/lib/prismic', 'codegen.yaml'],
};

module.exports = {
  prompts() {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name:',
      },
      {
        type: 'input',
        name: 'url',
        message: 'URL:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: 'Peppercorn Studio <madi@peppercorn.studio>',
      },
      {
        type: 'input',
        name: 'brandColour',
        message: 'Brand colour:',
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Features:',
        choices: [
          {
            name: 'Prismic',
            value: 'prismic',
            checked: true,
          },
        ],
        filter: (features) =>
          features.reduce((ac, a) => ({ ...ac, [a]: true }), {}),
      },
      {
        type: 'input',
        name: 'prismic',
        message: 'Prismic repository name:',
        when: ({ features }) => features.prismic,
      },
    ];
  },
  actions: ({ answers }) => {
    return [
      {
        type: 'add',
        files: [
          '**',
          ...Object.keys(FEATURES)
            .filter((feature) => !answers.features[feature])
            .map((feature) =>
              Array.isArray(feature)
                ? FEATURES[feature].map((file) => `!${file}`)
                : `!${FEATURES[feature]}`
            ),
        ].flat(),
      },
    ];
  },

  async completed() {
    this.gitInit();
    await this.npmInstall();
    this.showProjectTips();
  },
};
