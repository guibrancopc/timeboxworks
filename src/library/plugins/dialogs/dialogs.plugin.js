import { dialogs } from './dialogs';

export default {
  install(Vue) {
    Vue.prototype.$twDialog = dialogs;
  },
};
