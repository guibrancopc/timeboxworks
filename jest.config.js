module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|html|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub-named',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/*.test.js',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverage: true,
  restoreMocks: true,
  coverageReporters: [
    'lcov',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  collectCoverageFrom: [
    'src/**/*/*.{js,vue}',
    '!src/components/index.js',
    '!src/modules/index.js',
    '!src/main.js',
    '!src/router.js',
    '!src/store.js',
    '!src/__dev__/**',
    '!**/routes.js',
    '!**/__mocks__/**',
    '!**/node_modules/**',
  ],
};
