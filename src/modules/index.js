import Vue from 'vue';

const requireComponent = require.context('.', true, /.vue$/);

requireComponent.keys().forEach(fileName => {
  const componentConfigWrapper = requireComponent(fileName);
  const componentConfig = componentConfigWrapper.default || componentConfigWrapper;
  Vue.component(componentConfig.name, componentConfig);
});
