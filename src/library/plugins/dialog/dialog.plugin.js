import DialogAlert from './DialogAlert.vue';
import DialogConfirm from './DialogConfirm.vue';

function getContent(args) {
  if (typeof args === 'object') {
    return args;
  }

  if (typeof args === 'string') {
    return {
      title: '',
      text: args,
    };
  }

  return {};
}

export default {
  install(Vue) {
    Vue.prototype.$twDialog = {
      alert(args) {
        const vueInstance = new Vue();
        vueInstance.$twAppend(DialogAlert, {
          props: {
            ...getContent(args),
          },
        }).open();
      },
      confirm(args) {
        const vueInstance = new Vue();
        vueInstance.$twAppend(DialogConfirm, {
          props: {
            ...args,
          },
        }).open();
      },
    };
  },
};
