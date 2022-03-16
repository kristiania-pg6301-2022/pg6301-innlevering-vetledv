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
    '!server/**.config.{js,ts}',
    '!client/**.config.{js,ts}',
    '!**.config.{js,ts}',
    '!client/**.setup.{js,ts}',
    '!client/src/mocks/**'
  ],
  testMatch: ['**/__tests__/**.test.{jsx,tsx,ts,js}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
