import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';
import modules from './modules';
import './registerServiceWorker';

Vue.config.productionTip = false;

components(Vue);
modules(Vue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
