import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import lodash from 'lodash';

import 'ant-design-vue/dist/antd.css';

import './errorHandler';
import './permission';
import '@/utils/http';
import '@/assets/css/baseUtils.css';

Vue.config.productionTip = false;

Vue.prototype._lodash = lodash;


Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
