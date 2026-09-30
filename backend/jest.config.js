/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  // Tests share one MySQL database (see .env.test); run files sequentially.
  maxWorkers: 1,
  testTimeout: 20000,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.js", "app.js", "scripts/**/*.js"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@dao/(.*)$": "<rootDir>/src/lib/dao/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@sockets/(.*)$": "<rootDir>/src/sockets/$1",
  },
  setupFiles: ["<rootDir>/tests/setup/env.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup/afterEnv.js"],
  globalSetup: "<rootDir>/tests/setup/globalSetup.js",
};

module.exports = config;
