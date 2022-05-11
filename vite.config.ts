import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

import { resolve } from 'path';

const ENV_PATH = './env';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, ENV_PATH) };

  return defineConfig({
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: require('./antd/vars.json'),
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    envDir: resolve(__dirname, ENV_PATH),
    server: {
      port: parseInt(process.env.VITE_APP_PORT) || 3000,
      https: true,
      hmr: {
        host: 'localhost',
      },
    },
  });
};
