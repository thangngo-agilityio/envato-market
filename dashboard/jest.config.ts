import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '.+\\.(png|jpg)$': 'identity-obj-proxy',
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*wdyr.ts',
    '!**/*main.tsx',
    '!**/*.stories.tsx',
    '!**/node_modules/**',
    '!<rootDir>/.storybook/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/src/assets/**',
    '!<rootDir>/src/components/Icons/**',
    '!<rootDir>/src/themes/**',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/interfaces/**',
    '!<rootDir>/src/providers/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/public/**',
    '!**/*.config.ts',
  ],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
};

export default createJestConfig(config);
