// __mocks__/react-native.js
module.exports = {
  Animated: {
    View: jest.fn(),
    Value: jest.fn(),
    timing: jest.fn().mockReturnValue({
      start: jest.fn(),
    }),
  },
  Platform: {
    OS: "android",
  },
  ToastAndroid: {
    show: jest.fn(),
  },
};
