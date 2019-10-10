import { mount } from '@vue/test-utils';
import sinon from 'sinon';
import TwInputText from '../twInputText.vue';

describe('Tw Input Component', () => {
  it('should emit value inserted to parent component', () => {
    const wrapper = mount(TwInputText);
    const textInput = wrapper.find('input');
    textInput.setValue('some_value');
    expect(wrapper.emitted().input[0][0]).toBe('some_value');
  });

  it('should flag dirty as true when first value is inserted at input', () => {
    const wrapper = mount(TwInputText);
    const textInput = wrapper.find('input');
    textInput.setValue('some_value');
    textInput.trigger('keyup');
    expect(wrapper.emitted()['input-validation'][0][0].isDirty).toBe(true);
  });

  it('should emit validation result to parent component', () => {
    const wrapper = mount(TwInputText);
    expect(wrapper.emitted()['input-validation'][0][0].isDirty).toBe(false);
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(true);
  });

  it('should render a value on input when it has been passed by prop', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        value: 'sample_value',
      },
    });
    const textInput = wrapper.find('input');
    expect(textInput.element.value).toBe('sample_value');
  });

  it('should render label when it has been passed by prop', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        label: 'label_sample_value',
      },
    });
    const label = wrapper.find('label');
    expect(label.text()).toBe('label_sample_value');
  });

  it('should set input as invalid when it is required and empty', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        required: true,
      },
    });
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });

  it('should set input as invalid when it has been initialized with less than min length', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        minLength: 20,
        value: 'sample_short_text',
      },
    });
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });

  it('should set input as invalid when it receives less than min length', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        minLength: 20,
      },
    });
    const textInput = wrapper.find('input');
    textInput.setValue('sample_short_text');
    textInput.trigger('keyup');
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });

  it('should set input as invalid when it does not resolve custom validation', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        value: 'forbidden_value',
        customValidation: (value) => {
          console.log('value', value, value === '');
          return value !== 'forbidden_value';
        },
      },
    });
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });
});
