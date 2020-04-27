import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './modules';
import './registerServiceWorker';
import { TwComponents } from './library';
import { BrowserStorage } from './plugins/browserStorage';
import { browserStorageSetup } from './servicesApp/constants/browserStorageSetup';
import store from './store';

Vue.use(TwComponents);
Vue.use(BrowserStorage, { browserStorageSetup });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
