/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "import", "@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": [0, "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/prop-types": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
