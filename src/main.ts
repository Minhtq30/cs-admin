import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router';
import App from './App.vue';

import 'ant-design-vue/es/style/default.less';
import './assets/scss/app.scss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#__app');
