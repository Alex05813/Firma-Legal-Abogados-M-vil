// jest.setup.js
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock alternativo comprobado para RN 0.79.2
jest.mock("react-native/Libraries/Animated/NativeAnimatedModule", () => ({
  addListener: jest.fn(),
  removeListeners: jest.fn(),
}));
