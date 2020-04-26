export default Vue => {
  const requireComponent = require.context('.', true, /\.plugin\.js$/);
  requireComponent.keys().forEach(fileName => {
    const componentConfigWrapper = requireComponent(fileName);
    const componentConfig = componentConfigWrapper.default || componentConfigWrapper;
    Vue.use(componentConfig);
  });
};
