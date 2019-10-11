import { shallowMount, mount } from '@vue/test-utils';
import TwInputDatetimepicker from '../twInputDatetimepicker.vue';

describe('Tw Input Timepicker', () => {
  it('should emit value updated by input', () => {
    const wrapper = shallowMount(TwInputDatetimepicker);
    wrapper.vm.onChangeEvent('some_value');
    expect(wrapper.emitted().input[0][0]).toBe('some_value');
  });

  it('should flag dirty when user closes the dialog', () => {
    const wrapper = mount(TwInputDatetimepicker);
    wrapper.vm.onCloseEvent();
    wrapper.vm.onChangeEvent();
    expect(wrapper.emitted()['input-validation'][2][0].isDirty).toBe(true);
  });

  it('should emit input validation to parent component', () => {
    const wrapper = shallowMount(TwInputDatetimepicker);
    const inputValidation = {
      isValid: true,
      isDirty: false,
      shouldShowErrorMessages: false,
    };
    expect(wrapper.emitted()['input-validation'][0][0]).toEqual(inputValidation);
  });

  it('should pass value received ahead', () => {
    const wrapper = mount(TwInputDatetimepicker, {
      propsData: {
        value: '2019-10-10T23:30:00.000Z',
      },
    });
    expect(wrapper.vm.scopedValue).toBe('2019-10-10T23:30:00.000Z');
  });

  it('should render label when it has been passed by prop', () => {
    const wrapper = shallowMount(TwInputDatetimepicker, {
      propsData: {
        label: 'label_sample_value',
      },
    });
    const label = wrapper.find('label');
    expect(label.text()).toBe('label_sample_value');
  });

  it('should set placeholder on input element attribute', () => {
    const wrapper = mount(TwInputDatetimepicker, {
      propsData: {
        placeholder: 'sample_placeholder',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('sample_placeholder');
  });

  it('should set input as invalid when it is required and empty', () => {
    const wrapper = mount(TwInputDatetimepicker, {
      propsData: {
        required: true,
        value: '',
      },
    });
    expect(wrapper.vm.inputValidation.isValid).toBe(false);
    expect(wrapper.emitted()['input-validation'][1][0].isValid).toBe(false);
  });

  it('should set input as invalid when it does not resolve custom validation', () => {
    const wrapper = mount(TwInputDatetimepicker, {
      propsData: {
        value: 'forbidden_value',
        customValidation: value => value !== 'forbidden_value',
      },
    });
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });
});
