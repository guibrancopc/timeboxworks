import { Time } from './Time';

export default {
  install(Vue) {
    Vue.prototype.$TwTime = Time;
  },
};
