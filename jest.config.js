module.exports = {
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/mocks/styleMock.ts',
  },
  globalSetup: '<rootDir>/dotenv-test.js',
};
