import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  moduleDirectories: ['node_modules', 'app'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/app'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
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
    '!<rootDir>/app/assets/**',
    '!<rootDir>/app/ui/components/Icons/**',
    '!<rootDir>/app/themes/**',
    '!<rootDir>/app/lib/constants/**',
    '!<rootDir>/app/lib/interfaces/**',
    '!<rootDir>/app/ui/providers/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/public/**',
    '!**/.next/**',
    '!<rootDir>/app/ui/themes/**',
    '!<rootDir>/app/**/loading.tsx',
    '!**/*.config.ts',
  ],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
};

export default createJestConfig(config);
