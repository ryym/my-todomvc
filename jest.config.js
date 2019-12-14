/* eslint-env node */

module.exports = {
  roots: ['src'],

  verbose: true,

  moduleFileExtensions: ['js', 'ts', 'tsx'],

  preset: 'ts-jest',

  testMatch: ['**/*.test.(ts|tsx)'],

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
};
