module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "jest-axe/extend-expect"],
  testMatch: ["**/*.test.{ts,tsx,js,jsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
