import services from '../../services';

export default {
  install(Vue) {
    Vue.prototype.$twServices = {
      ...services,
    };
  },
};
