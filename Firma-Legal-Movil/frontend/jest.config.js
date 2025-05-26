module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo-constants|expo-modules-core)/)",
  ],
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "^expo-constants$": "<rootDir>/__mocks__/expo-constants.js",
  },
};
