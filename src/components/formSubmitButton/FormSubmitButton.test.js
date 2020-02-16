import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormInput from '../formInput/FormInput.vue';
import TwFormSubmitButton from './FormSubmitButton.vue';
import TwButton from '../button/Button.vue';

async function mountComponent(template, props = {}, { attachToDocument = false } = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInput,
      TwFormSubmitButton,
    },
  }, { sync: false, attachToDocument });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props = {}, { attachToDocument = false } = {}) {
  return mountComponent(`
    <tw-form v-bind="$data">
      <tw-form-field>
        <tw-form-input name="first-input" :min-length="35" required />
      </tw-form-field>
      <tw-form-submit-button />
    </tw-form>
  `, props, { attachToDocument });
}

describe('Tw Form Submit Button', () => {
  it('should render a submit button', async () => {
    const wrapper = await mountFullForm();
    expect(wrapper.find('button[type=submit]').exists()).toBe(true);
  });

  it('should be enabled when form is invalid and configured to allow it', async () => {
    const wrapper = await mountFullForm({ allowSubmitWhenInvalid: true });
    const form = wrapper.find(TwForm);
    const button = wrapper.find(TwButton);
    expect(button.props('disabled')).toBe(false);
    expect(form.vm.isValid).toBe(false);
  });

  it('should be disabled when form is invalid and not configured to allow it', async () => {
    const wrapper = await mountFullForm({ allowSubmitWhenInvalid: false });
    const form = wrapper.find(TwForm);
    const button = wrapper.find(TwButton);
    expect(button.props('disabled')).toBe(true);
    expect(form.vm.isValid).toBe(false);
  });

  it('should be enabled when form is valid', async () => {
    const wrapper = await mountFullForm();
    const form = wrapper.find(TwForm);
    const button = wrapper.find(TwButton);
    wrapper.find('input').setValue('This value is greater than minimal length');
    await wrapper.vm.$nextTick();
    expect(button.props('disabled')).toBe(false);
    expect(form.vm.isValid).toBe(true);
  });

  it('should dispatch form submit event when clicked', async () => {
    const onSubmit = jest.fn();
    const wrapper = await mountComponent(`
      <tw-form @submit="onSubmit">
        <tw-form-field>
          <tw-form-input name="first-input" :min-length="35" required />
        </tw-form-field>
        <tw-form-submit-button />
      </tw-form>
    `, { onSubmit }, { attachToDocument: true });
    wrapper.find('input').setValue('This value is greater than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    wrapper.vm.$nextTick();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });
});
