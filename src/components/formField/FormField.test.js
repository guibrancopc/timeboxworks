import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from './FormField.vue';
import TwFormInput from '../formInput/FormInput.vue';
import TwFormCheckbox from '../formCheckbox/FormCheckbox.vue';
import TwFormSubmitButton from '../formSubmitButton/FormSubmitButton.vue';

async function mountComponent(template, props = {}, { attachToDocument = false } = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInput,
      TwFormCheckbox,
      TwFormSubmitButton,
    },
  }, { sync: false, attachToDocument });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountDefaultFormField(props) {
  return mountComponent(`
    <tw-form>
      <tw-form-field v-bind="$data" />
    </tw-form>
  `, props);
}

function mountFullForm({ attachToDocument = false } = {}) {
  return mountComponent(`
    <tw-form allow-submit-when-invalid>
      <tw-form-field>
        <tw-form-input name="first-input" :min-length="35" required />
      </tw-form-field>
      <tw-form-submit-button />
    </tw-form>
  `, {}, { attachToDocument });
}

describe('Tw Form Field', () => {
  it('should be initialized with default state', async () => {
    const wrapper = await mountDefaultFormField();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.errorMessage).toBe('');
    expect(formField.vm.input).toEqual({
      id: null,
      name: null,
      value: null,
      htmlId: null,
      isValid: false,
      isDirty: false,
      isRequired: false,
      isBlurred: false,
      inputsGroupKey: '',
    });
  });

  it('should receive a object formVm through injection', async () => {
    const wrapper = await mountDefaultFormField();
    const formField = wrapper.find(TwFormField);
    expect(typeof formField.vm.formVm).toBe('object');
  });

  it('should not show individual validation when input is not dirty', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.input.isDirty).toBe(false);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
  });

  it('should not show individual validation when input is dirty but not blurred', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    wrapper.find('input').setValue('Sample value');
    expect(formField.vm.input.isDirty).toBe(true);
    expect(formField.vm.input.isBlurred).toBe(false);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
  });

  it('should not show individual validation when input is dirty and blurred but is valid', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    const input = wrapper.find('input');
    input.setValue('This value is greater than minimal length');
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(formField.vm.input.isDirty).toBe(true);
    expect(formField.vm.input.isBlurred).toBe(true);
    expect(formField.vm.input.isValid).toBe(true);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
  });

  it('should show individual validation when input is dirty and blurred but is not valid', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    const input = wrapper.find('input');
    input.setValue('Value less than minimal length');
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(formField.vm.input.isDirty).toBe(true);
    expect(formField.vm.input.isBlurred).toBe(true);
    expect(formField.vm.input.isValid).toBe(false);
    expect(formField.vm.shouldShowIndividualValidation).toBe(true);
    expect(formField.find('.tw-form-field').classes()).toContain('form-control-invalid');
  });

  it('should not show individual validation when form is not submitted yet', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.formVm.isSubmitted).toBe(false);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
  });

  it('should not show individual validation when form is submitted and invalid but input is valid', async () => {
    const wrapper = await mountComponent(`
      <tw-form allow-submit-when-invalid>
        <tw-form-field>
          <tw-form-input name="first-input" :min-length="35" required />
        </tw-form-field>
        <tw-form-field>
          <tw-form-input name="second-input" required />
        </tw-form-field>
        <tw-form-submit-button />
      </tw-form>
    `, {}, { attachToDocument: true });
    wrapper.find('input').setValue('This value is greater than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    await wrapper.vm.$nextTick();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.formVm.isSubmitted).toBe(true);
    expect(formField.vm.formVm.isValid).toBe(false);
    expect(formField.vm.input.isValid).toBe(true);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
    wrapper.destroy();
  });

  it('should not show individual validation when form is submitted but is valid', async () => {
    const wrapper = await mountFullForm({ attachToDocument: true });
    wrapper.find('input').setValue('This value is greater than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    await wrapper.vm.$nextTick();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.formVm.isSubmitted).toBe(true);
    expect(formField.vm.formVm.isValid).toBe(true);
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.find('.tw-form-field').classes()).not.toContain('form-control-invalid');
    wrapper.destroy();
  });

  it('should show individual validation when form is submitted and form and input is not valid', async () => {
    const wrapper = await mountFullForm({ attachToDocument: true });
    wrapper.find('input').setValue('Value is less than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    await wrapper.vm.$nextTick();
    const formField = wrapper.find(TwFormField);
    expect(formField.vm.formVm.isSubmitted).toBe(true);
    expect(formField.vm.formVm.isValid).toBe(false);
    expect(formField.vm.shouldShowIndividualValidation).toBe(true);
    expect(formField.find('.tw-form-field').classes()).toContain('form-control-invalid');
    wrapper.destroy();
  });

  it('should not show error message when field should not show individual validation also', async () => {
    const wrapper = await mountFullForm({ attachToDocument: true });
    wrapper.find('input').setValue('This value is greater than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    await wrapper.vm.$nextTick();
    const formField = wrapper.find(TwFormField);
    formField.vm.errorMessage = 'Sample error message';
    expect(formField.vm.shouldShowIndividualValidation).toBe(false);
    expect(formField.vm.shouldShowErrorMessage).toBe(false);
    expect(formField.find('small.form-control__color--danger').exists()).toBe(false);
    wrapper.destroy();
  });

  it('should not show error message when field should show individual validation but no error message is provided', async () => {
    const wrapper = await mountFullForm({ attachToDocument: true });
    wrapper.find('input').setValue('Value is less than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    const formField = wrapper.find(TwFormField);
    formField.vm.errorMessage = '';
    await wrapper.vm.$nextTick();
    expect(formField.vm.shouldShowIndividualValidation).toBe(true);
    expect(formField.vm.shouldShowErrorMessage).toBe(false);
    expect(formField.find('small.form-control__color--danger').exists()).toBe(false);
    wrapper.destroy();
  });

  it('should show error message when field should show individual validation and error message is provided', async () => {
    const wrapper = await mountFullForm({ attachToDocument: true });
    wrapper.find('input').setValue('Value is less than minimal length');
    wrapper.find('[type=submit]').trigger('click');
    const formField = wrapper.find(TwFormField);
    formField.vm.errorMessage = 'Sample Error Message';
    await wrapper.vm.$nextTick();
    expect(formField.vm.shouldShowIndividualValidation).toBe(true);
    expect(formField.vm.shouldShowErrorMessage).toBe(true);
    expect(formField.find('small.form-control__color--danger').exists()).toBe(true);
    wrapper.destroy();
  });

  it('should prepend label when wrapping normal input', async () => {
    const wrapper = await mountFullForm();
    const formField = wrapper.find(TwFormField);
    const inputAfterLabel = formField.find('.tw-label+.tw-form-input');
    const labelAfterInput = formField.find('.tw-form-input+.tw-label');
    expect(inputAfterLabel.exists()).toBe(true);
    expect(labelAfterInput.exists()).toBe(false);
  });

  it('should append label when wrapping check input', async () => {
    const wrapper = await mountComponent(`
      <tw-form allow-submit-when-invalid>
        <tw-form-field>
          <tw-form-checkbox name="sample-checkbox" />
        </tw-form-field>
      </tw-form>
    `);
    const formField = wrapper.find(TwFormField);
    const inputAfterLabel = formField.find('.tw-label+.tw-form-checkbox');
    const labelAfterInput = formField.find('.tw-form-checkbox+.tw-label');
    expect(inputAfterLabel.exists()).toBe(false);
    expect(labelAfterInput.exists()).toBe(true);
  });
});
