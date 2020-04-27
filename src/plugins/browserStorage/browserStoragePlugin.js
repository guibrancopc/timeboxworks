import { BrowserStorage } from './BrowserStorage';

export default {
  install(Vue, config = {}) {
    BrowserStorage.prototype.config = config;
    Vue.prototype.$TwBrowserStorage = BrowserStorage;
  },
};
