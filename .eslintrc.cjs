module.exports = {
  extends: [
    '@meludi/eslint-config-ts-base',

    // Make sure to put prettier last, so it gets the chance to override other configs.
    '@meludi/eslint-config-prettier/base',
  ],
  // Adjust it to your project
  // https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'es2022',
  },

  rules: {
    // 'import/extensions': ['error', 'always', { ignorePackages: true }],
    'import/no-unresolved': [2, { ignore: ['\\.js$'] }],
  },
};
