const withImages = require('next-images');
const withAntdLess = require('next-plugin-antd-less');

module.exports = withImages(
  withAntdLess({
    // optional
    lessVarsFilePath: './src/assets/styles/variables.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: true,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
      return config;
    },

    // ONLY for Next.js 10, if you use Next.js 11, delete this block
    // future: {
    //   webpack5: true
    // },
    reactStrictMode: true
  })
);
