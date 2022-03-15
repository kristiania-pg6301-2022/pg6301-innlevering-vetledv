// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{jsx,tsx,ts,js}',
    '!dist/**',
    '!babel.config.js',
    '!index.tsx',
    '!interfaces/',
    '!postcss.config.js',
    '!tailwind.config.js',
    '!jest.config.js',
    '!coverage/**',
    "!utils.tsx"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
