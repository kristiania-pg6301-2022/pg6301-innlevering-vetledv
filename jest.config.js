// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{jsx,tsx,ts,js}',
    '!server/src/server.ts',
    '!client/dist/**',
    '!dist/**',
    '!client/src/index.tsx',
    '!client/coverage/**',
    '!server/coverage/**',
    '!coverage/**',
    '!server/**.config.js',
    '!client/**.config.js',
    '!**.config.js',
    '!client/**.setup.ts',
    '!client/src/mocks/**'
  ],
  testMatch: ['**/__tests__/**.test.{jsx,tsx,ts,js}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
