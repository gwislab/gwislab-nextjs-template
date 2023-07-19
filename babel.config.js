module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["next/babel"],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [
            ".ts",
            ".tsx",
            ".jsx",
            ".js",
            ".json"
          ],
          "alias": {
            "screens": "./src/screens",
            "components": "./src/components",
            "assets": "./src/assets",
            "configs": "./src/configs",
            "src": "./src",
            "tests": ".src/tests",
            "hooks": "./src/hooks",
            "redux": "./src/redux",
            "utils": "./src/utils",
          }
        }
      ]
    ]
  };
};
