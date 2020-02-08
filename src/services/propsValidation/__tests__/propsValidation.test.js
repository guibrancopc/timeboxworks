import propsValidation from '../propsValidation';

describe('Props Validation Service', () => {
  it('should throw error when valid props list exists and when value is invalid', () => {
    const scope = { $props: { sampleProp: 'sampleValue' } };
    const validProps = { sampleProp: ['value-1', 'value-2'] };
    const wrapper = () => {
      propsValidation({ scope, validProps });
    };
    expect(wrapper).toThrow();
  });

  it('should not throw error when valid props list exists and when value is valid', () => {
    const scope = { $props: { sampleProp: 'value-1' } };
    const validProps = { sampleProp: ['value-1', 'value-2'] };
    const wrapper = () => {
      propsValidation({ scope, validProps });
    };
    expect(wrapper).not.toThrow();
  });

  it('should not throw error when prop does not have validation list', () => {
    const scope = { $props: { sampleProp: 'sampleValue' } };
    const validProps = { anotherProp: ['value-1', 'value-2'] };
    const wrapper = () => {
      propsValidation({ scope, validProps });
    };
    expect(wrapper).not.toThrow();
  });

  it('should not throw error when no parameter is passed to public method', () => {
    const wrapper = () => { propsValidation(); };
    expect(wrapper).not.toThrow();
  });

  it('should throw error with N/A instead of prop name when it is not found', () => {
    const scope = { $props: { sampleProp: 'sampleValue' } };
    const validProps = { sampleProp: ['value-1', 'value-2'] };
    const wrapper = () => {
      propsValidation({ scope, validProps });
    };
    expect(wrapper).toThrow('APP ERROR! Unexpected value received by prop "sampleProp" from "N/A" component.');
  });

  it('should throw error with prop name when it is provided', () => {
    const scope = {
      $props: { sampleProp: 'sampleValue' },
      $vnode: { componentOptions: { tag: 'unique-componant-key' } },
    };
    const validProps = { sampleProp: ['value-1', 'value-2'] };
    const wrapper = () => {
      propsValidation({ scope, validProps });
    };
    expect(wrapper).toThrow('APP ERROR! Unexpected value received by prop "sampleProp" from "unique-componant-key" component.');
  });
});
