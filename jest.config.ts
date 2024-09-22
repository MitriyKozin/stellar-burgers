import { JestConfigWithTsJest } from 'ts-jest';
const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: "jsdom",
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@pages': ['<rootDir>/src/pages'],
    '@components': ['<rootDir>/src/components'],
    '@ui': ['<rootDir>/src/components/ui'],
    '@ui-pages': ['<rootDir>/src/components/ui/pages'],
    '@utils-types': ['<rootDir>/src/utils/types'],
    '@api': ['<rootDir>/src/utils/burger-api.ts'],
    '@slices': ['<rootDir>/src/services/slices'],
    '@store': ['<rootDir>/src/services/store.ts'],
    '@selectors': ['<rootDir>/src/services/selectors'],
    '@hooks': ['<rootDir>/src/hooks/hooks']
  },
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,
  // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: 'v8'
};

export default jestConfig;
