import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormTextarea from './FormTextarea.vue';

async function mountComponent(template, props = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormTextarea,
    },
  }, { sync: false });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props) {
  return mountComponent(`
    <tw-form>
      <tw-form-field>
        <tw-form-textarea name="sample-name" v-bind="$data" />
      </tw-form-field>
    </tw-form>
  `, props);
}

describe('Tw Form Textarea component', () => {
  it('should receive a object formVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formTextarea = wrapper.find(TwFormTextarea);
    expect(typeof formTextarea.vm.formVm).toBe('object');
  });

  it('should receive a object formFieldVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formTextarea = wrapper.find(TwFormTextarea);
    expect(typeof formTextarea.vm.formFieldVm).toBe('object');
  });

  it('should console error when name prop is not provided', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent(`
      <tw-form>
        <tw-form-field>
          <tw-form-textarea />
        </tw-form-field>
      </tw-form>
    `);
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should emit value inserted', async () => {
    const wrapper = await mountFullForm();
    wrapper.find('textarea').setValue('Sample value');
    const formTextarea = wrapper.find(TwFormTextarea);
    expect(formTextarea.emitted().input[0][0]).toBe('Sample value');
  });

  it('should not emit value when no event parameter is received', async () => {
    const wrapper = await mountFullForm();
    const formTextarea = wrapper.find(TwFormTextarea);
    formTextarea.vm.onInput(undefined);
    expect(formTextarea.emitted().input).toBeFalsy();
  });

  it('should not emit value when event object has no target propertie', async () => {
    const wrapper = await mountFullForm();
    const formTextarea = wrapper.find(TwFormTextarea);
    formTextarea.vm.onInput({});
    expect(formTextarea.emitted().input).toBeFalsy();
  });

  it('should flag dirty as true when first value is inserted at textarea', async () => {
    const wrapper = await mountFullForm();
    wrapper.find('textarea').setValue('Sample value');
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.input.isDirty).toBe(true);
  });

  it('should render a value on textarea when it has been passed by prop', async () => {
    const wrapper = await mountFullForm({ value: 'Sample value' });
    expect(wrapper.find('textarea').element.value).toBe('Sample value');
  });

  it('should flag isBlurred state on blur event', async () => {
    const wrapper = await mountFullForm();
    const textarea = wrapper.find('textarea');
    textarea.trigger('blur');
    const field = wrapper.find(TwFormField);
    expect(field.vm.input.isBlurred).toBe(true);
  });

  it('should emit keydown event when some key is pressed in keyboard', async () => {
    const wrapper = await mountFullForm();
    const textarea = wrapper.find('textarea');
    textarea.trigger('keydown', {
      key: 'a',
    });
    const formTextarea = wrapper.find(TwFormTextarea);
    expect(formTextarea.emitted().keydown).toBeTruthy();
  });

  it('should set placeholder on textarea element attribute', async () => {
    const wrapper = await mountFullForm({ placeholder: 'Sample placeholder' });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe('Sample placeholder');
  });

  it('should set max length in textarea', async () => {
    const wrapper = await mountFullForm({ maxLength: 10 });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toBe('10');
  });

  it('should run custom validation', async () => {
    const customValidation = jest.fn();
    const wrapper = await mountFullForm({ customValidation });
    wrapper.find('textarea').setValue('Sample value');
    expect(customValidation).toHaveBeenCalled();
  });

  it('should set min height in textarea', async () => {
    const wrapper = await mountFullForm({ minHeight: 150 });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.style['min-height']).toBe('150px');
  });

  it('should have dynamic height by default', async () => {
    const wrapper = await mountFullForm();
    const formTextarea = wrapper.find(TwFormTextarea);
    expect(formTextarea.vm.vDynamicHeightSetup().disabled).toBe(false);
  });

  it('should computedId be equal prop id when it has been received', async () => {
    const wrapper = await mountFullForm({ id: 458 });
    expect(wrapper.find(TwFormTextarea).vm.computedId).toBe(458);
  });
});
