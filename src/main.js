import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { TwModules } from './modules';
import { TwComponents } from './library';
import { BrowserStorage } from './plugins/browserStorage';
import { browserStorageSetup } from './servicesApp/constants/browserStorageSetup';
import './registerServiceWorker';

Vue.use(TwComponents);
Vue.use(TwModules);
Vue.use(BrowserStorage, { browserStorageSetup });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
