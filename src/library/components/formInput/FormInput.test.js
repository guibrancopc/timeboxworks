import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormInput from './FormInput.vue';

async function mountComponent(template, props = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInput,
    },
  }, { sync: false });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props) {
  return mountComponent(`
    <tw-form>
      <tw-form-field>
        <tw-form-input name="sample-name" v-bind="$data" />
      </tw-form-field>
    </tw-form>
  `, props);
}

describe('Tw Form Input component', () => {
  it('should receive a object formVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formInput = wrapper.find(TwFormInput);
    expect(typeof formInput.vm.formVm).toBe('object');
  });

  it('should receive a object formFieldVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formInput = wrapper.find(TwFormInput);
    expect(typeof formInput.vm.formFieldVm).toBe('object');
  });

  it('should console error when name prop is not provided', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent(`
      <tw-form>
        <tw-form-field>
          <tw-form-input />
        </tw-form-field>
      </tw-form>
    `);
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should emit value inserted', async () => {
    const wrapper = await mountFullForm();
    wrapper.find('input').setValue('Sample value');
    const formInput = wrapper.find(TwFormInput);
    expect(formInput.emitted().input[0][0]).toBe('Sample value');
  });

  it('should not emit value when no event parameter is received', async () => {
    const wrapper = await mountFullForm();
    const formInput = wrapper.find(TwFormInput);
    formInput.vm.onInput(undefined);
    expect(formInput.emitted().input).toBeFalsy();
  });

  it('should not emit value when event object has no target propertie', async () => {
    const wrapper = await mountFullForm();
    const formInput = wrapper.find(TwFormInput);
    formInput.vm.onInput({});
    expect(formInput.emitted().input).toBeFalsy();
  });

  it('should flag dirty as true when first value is inserted at input', async () => {
    const wrapper = await mountFullForm();
    wrapper.find('input').setValue('Sample value');
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.input.isDirty).toBe(true);
  });

  it('should render a value on input when it has been received by prop', async () => {
    const wrapper = await mountFullForm({ value: 'Sample value' });
    expect(wrapper.find('input').element.value).toBe('Sample value');
  });

  it('should throw error when wrong type is received by prop', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await mountFullForm({ type: 'wrong-value' });
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should flag isBlurred state on blur event', async () => {
    const wrapper = await mountFullForm();
    const input = wrapper.find('input');
    input.trigger('blur');
    const field = wrapper.find(TwFormField);
    expect(field.vm.input.isBlurred).toBe(true);
  });

  it('should emit keydown event when some key is pressed in keyboard', async () => {
    const wrapper = await mountFullForm();
    const input = wrapper.find('input');
    input.trigger('keydown', {
      key: 'a',
    });
    const formInput = wrapper.find(TwFormInput);
    expect(formInput.emitted().keydown).toBeTruthy();
  });

  it('should set placeholder on input element attribute', async () => {
    const wrapper = await mountFullForm({ placeholder: 'Sample placeholder' });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Sample placeholder');
  });

  it('should set max length in input', async () => {
    const wrapper = await mountFullForm({ maxLength: 10 });
    const input = wrapper.find('input');
    expect(input.attributes('maxlength')).toBe('10');
  });

  it('should run custom validation', async () => {
    const customValidation = jest.fn();
    const wrapper = await mountFullForm({ customValidation });
    wrapper.find('input').setValue('Sample value');
    expect(customValidation).toHaveBeenCalled();
  });
});
