import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import request from './utils/request';
import storage from './utils/storage';

console.log('環境變量=>', import.meta.env);

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.use(router).use(ElementPlus).mount('#app');
