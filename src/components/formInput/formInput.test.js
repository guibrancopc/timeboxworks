import { mount } from '@vue/test-utils';
import TwInputText from './formInput.vue';

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
        customValidation: value => value !== 'forbidden_value',
      },
    });
    expect(wrapper.emitted()['input-validation'][0][0].isValid).toBe(false);
  });

  it('should throw error when wrong type is passed by prop', () => {
    const consoleErrorTemp = global.console.error;
    const errorMessage = 'TW Error: Wrong type passed as prop to input text!';
    const wrapperSetup = {
      propsData: {
        type: 'any_wrong_type',
      },
    };
    expect(() => { mount(TwInputText, wrapperSetup); }).toThrowError(errorMessage);
    expect(global.console.error.called).toBe(true);
    global.console.error = consoleErrorTemp;
  });

  it('should set a right input type on element attribute', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        type: 'password',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('password');
  });

  it('should change input element to textarea when received type textarea', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        type: 'textarea',
      },
    });
    const textAreaElement = wrapper.find('textarea');
    expect(wrapper.vm.currentNativeElement).toBe('textarea');
    expect(textAreaElement.exists()).toBe(true);
  });

  it('should set placeholder on input element attribute', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        placeholder: 'sample_placeholder',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('sample_placeholder');
  });

  it('should set rows on input element attribute', () => {
    const wrapper = mount(TwInputText, {
      propsData: {
        type: 'textarea',
        rows: 5,
      },
    });
    const input = wrapper.find('textarea');
    expect(Number(input.attributes('rows'))).toBe(5);
  });
});
