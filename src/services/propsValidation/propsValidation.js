const propValidation = (scope, validProps, propKey, componentName) => {
  const value = scope.$props[propKey];
  const validValues = validProps[propKey];
  if (value && validValues && !validValues.includes(value)) {
    throw new Error(`TW ERROR! Unexpected value received by prop "${propKey}" from "${componentName}" component.`);
  }
};

export default ({ scope = { $props: {} }, validProps = {}, componentName = 'some' } = {}) => {
  Object
    .keys(scope.$props)
    .forEach(propKey => {
      propValidation(scope, validProps, propKey, componentName);
    });
};
