const getComponentName = scope => scope.$vnode?.componentOptions?.tag || 'N/A';

function propValidation(scope, validProps, propKey) {
  const value = scope.$props[propKey];
  const validValues = validProps[propKey];
  const componentName = getComponentName(scope);
  if (value && validValues && !validValues.includes(value)) {
    throw new Error(`APP ERROR! Unexpected value received by prop "${propKey}" from "${componentName}" component.`);
  }
}

export default ({ scope = { $props: {} }, validProps = {} } = {}) => {
  Object
    .keys(scope.$props)
    .forEach(propKey => {
      propValidation(scope, validProps, propKey);
    });
};
