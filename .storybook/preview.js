import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}