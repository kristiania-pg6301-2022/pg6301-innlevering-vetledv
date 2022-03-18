// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{jsx,tsx,ts,js}',
    '!dist/**',
    '!babel.config.js',
    '!questions.ts',
    '!client/tailwind.config.js',
    '!client/postcss.config.js',
    '!coverage/**',
    '!jest.config.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
