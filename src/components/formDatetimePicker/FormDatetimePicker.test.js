import { mount } from '@vue/test-utils';
import { Datetime } from 'vue-datetime';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormDatetimePicker from './FormDatetimePicker.vue';

async function mountComponent(template, props = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormDatetimePicker,
    },
  }, { sync: false });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props) {
  return mountComponent(`
    <tw-form>
      <tw-form-field>
        <tw-form-datetime-picker
          name="sample-name"
          v-bind="$data" />
      </tw-form-field>
    </tw-form>
  `, props);
}

describe('Tw Form Datetime Picker component', () => {
  it('should receive a object formVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formDatetimePicker = wrapper.find(TwFormDatetimePicker);
    expect(typeof formDatetimePicker.vm.formVm).toBe('object');
  });

  it('should receive a object formFieldVm through injection', async () => {
    const wrapper = await mountFullForm();
    const formDatetimePicker = wrapper.find(TwFormDatetimePicker);
    expect(typeof formDatetimePicker.vm.formFieldVm).toBe('object');
  });

  it('should console error when name prop is not provided', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent(`
      <tw-form>
        <tw-form-field>
          <tw-form-datetimePicker />
        </tw-form-field>
      </tw-form>
    `);
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should throw error when wrong type is received by prop', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await mountFullForm({ type: 'wrong-value' });
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should emit value inserted', async () => {
    const wrapper = await mountFullForm();
    wrapper.find(Datetime).vm.$emit('input', '2020-02-16T23:10:00.000Z');
    const formDatetimePicker = wrapper.find(TwFormDatetimePicker);
    expect(formDatetimePicker.emitted().input[1][0]).toBe('2020-02-16T23:10:00.000Z');
  });

  it('should flag dirty as true when first value is inserted at datetimePicker', async () => {
    const wrapper = await mountFullForm();
    wrapper.find(Datetime).vm.$emit('input', 'Sample value');
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.input.isDirty).toBe(true);
  });

  it('should render a value on datetimePicker when it has been passed by prop', async () => {
    const wrapper = await mountFullForm({ value: '2020-02-16T23:10:00.000Z' });
    expect(wrapper.find(Datetime).vm.value).toBe('2020-02-16T23:10:00.000Z');
  });

  it('should flag isBlurred state when modal is closed', async () => {
    const wrapper = await mountFullForm();
    wrapper.find(Datetime).vm.$emit('close');
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.input.isBlurred).toBe(true);
  });

  it('should set placeholder', async () => {
    const wrapper = await mountFullForm({ placeholder: 'sample-placeholder' });
    expect(wrapper.find('[placeholder=sample-placeholder]').exists()).toBe(true);
  });

  it('should run custom validation', async () => {
    const customValidation = jest.fn();
    const wrapper = await mountFullForm({ customValidation });
    wrapper.find(Datetime).vm.$emit('input', 'Sample value');
    expect(customValidation).toHaveBeenCalled();
  });

  it('should computedId be equal prop id when it has been received', async () => {
    const wrapper = await mountFullForm({ id: 458 });
    expect(wrapper.find(TwFormDatetimePicker).vm.computedId).toBe(458);
  });
});
