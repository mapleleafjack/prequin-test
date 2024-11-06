export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json", // Point to tsconfig.app.json
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS imports if necessary
  },
};