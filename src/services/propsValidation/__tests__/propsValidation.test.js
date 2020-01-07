import propsValidation from '../propsValidation';

describe('Props Validation Service', () => {
  it('should throw error when valid props list exists and when value is invalid', () => {
    const scope = {
      $props: {
        sampleProp: 'sampleValue',
      },
    };
    const validProps = {
      sampleProp: ['value-1', 'value-2'],
    };
    const wrapper = () => {
      propsValidation({ scope, validProps, componentName: 'unitTest' });
    };
    expect(wrapper).toThrow();
  });

  it('should not throw error when valid props list exists and when value is valid', () => {
    const scope = {
      $props: {
        sampleProp: 'value-1',
      },
    };
    const validProps = {
      sampleProp: ['value-1', 'value-2'],
    };
    const wrapper = () => {
      propsValidation({ scope, validProps, componentName: 'unitTest' });
    };
    expect(wrapper).not.toThrow();
  });

  it('should not throw error when prop does not have validation list', () => {
    const scope = {
      $props: {
        sampleProp: 'sampleValue',
      },
    };
    const validProps = {
      anotherProp: ['value-1', 'value-2'],
    };
    const wrapper = () => {
      propsValidation({ scope, validProps, componentName: 'unitTest' });
    };
    expect(wrapper).not.toThrow();
  });

  it('should not throw error when no parameter is passed to public method', () => {
    const wrapper = () => {
      propsValidation();
    };
    expect(wrapper).not.toThrow();
  });
});
