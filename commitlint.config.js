module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'scope-enum': () => [2, 'always', ["*","@scrum/client","@scrum/server" ]],
      'header-max-length': () => [2, 'always', 80],
    },
  };
  