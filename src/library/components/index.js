export default Vue => {
  const requireComponent = require.context('.', true, /\w+\/index\.js$/);
  requireComponent.keys().forEach(fileName => {
    const componentConfigWrapper = requireComponent(fileName);
    const componentConfig = componentConfigWrapper.default || componentConfigWrapper;
    Vue.component(componentConfig.name, componentConfig);
  });
};
