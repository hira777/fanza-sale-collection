module.exports = {
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/mocks/styleMock.ts',
  },
  globalSetup: '<rootDir>/dotenv-test.js',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
