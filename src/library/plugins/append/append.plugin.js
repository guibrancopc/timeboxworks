const PLUGIN_ADDON_CLASS = 'tw-plugin-append';

function getArgsWithClass(args) {
  args.class = {
    [PLUGIN_ADDON_CLASS]: true,
    ...args.class,
  };
  return args;
}

export default {
  install(Vue) {
    Vue.prototype.$append = (ComponentConstructor, args = {}) => {
      const wrapper = new Vue({
        render: h => h(ComponentConstructor, getArgsWithClass(args)),
      });

      return {
        open() {
          setTimeout(() => {
            const div = document.createElement('div');
            document.body.append(div);
            wrapper.$mount(div);
          });
        },
        close() {
          const grandChildVm = wrapper?.$children[0]?.$children[0];
          if (grandChildVm) { grandChildVm.close(); }
        },
      };
    };
  },
};
