module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss"
  ],
  "framework": "@storybook/vue3",
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.less$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              modifyVars: require('./antd/vars.json'),
              javascriptEnabled: true
            }
          }
        }
      ]
    });

    // Return the altered config
    return config;
  },
}