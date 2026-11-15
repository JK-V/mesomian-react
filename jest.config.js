module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "jest-axe/extend-expect"],
  testMatch: ["**/*.test.jsx", "**/*.test.js"],
  moduleFileExtensions: ["js", "jsx"],
};
