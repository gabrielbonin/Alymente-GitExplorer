module.exports = {
  root: true,
  extends: [
    "expo",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    // Design System: evitar style inline solto
    "react-native/no-inline-styles": "warn",
    // Segurança de tipos
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // Boas práticas React
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: ["node_modules/", "dist/", ".expo/", "jest.config.js", "babel.config.js"],
};
