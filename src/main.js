import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './modules';
import './registerServiceWorker';
import { TwComponents } from './library';

Vue.use(TwComponents);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
