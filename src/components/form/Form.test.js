import { mount } from '@vue/test-utils';
import TwForm from './Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormInput from '../formInput/FormInput.vue';
import TwFormSubmitButton from '../formSubmitButton/FormSubmitButton.vue';
import TwFormResetButton from '../formResetButton/FormResetButton.vue';
import TwButton from '../button/Button.vue';
import dialogs from '../../services/dialogs/dialogs';

jest.mock('../../services/dialogs/dialogs');

async function mountComponent(template, props = {}, { attachToDocument = false } = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInput,
      TwFormSubmitButton,
      TwFormResetButton,
    },
  }, { sync: false, attachToDocument });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountDefaultTwForm(props) {
  return mountComponent('<tw-form v-bind="$data" />', props);
}

describe('Tw Form', () => {
  it('should be initialized with default data', async () => {
    const wrapper = await mountDefaultTwForm();
    const formComponent = wrapper.find(TwForm);
    expect(formComponent.vm.isDirty).toBe(false);
    expect(formComponent.vm.isSubmitted).toBe(false);
    expect(formComponent.vm.formFields).toStrictEqual([]);
  });

  it('should have default class', async () => {
    const wrapper = await mountDefaultTwForm();
    const formComponent = wrapper.find(TwForm);
    expect(formComponent.classes()).toContain('tw-form');
  });

  describe('On Submit', () => {
    function mountFormWithSubmitButton(props) {
      return mountComponent(`
        <tw-form @submit="onSubmit" v-bind="$data">
          <tw-form-field>
            <tw-form-input name="first-input" required />
          </tw-form-field>
          <tw-form-field>
            <tw-form-input name="second-input" />
          </tw-form-field>
          <tw-form-submit-button />
        </tw-form>
    `, props, { attachToDocument: true });
    }

    it('by default should block submit buttom when form is invalid and it is not allowed', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({
        onSubmit,
      });
      const form = wrapper.find(TwForm);
      const button = wrapper.find(TwButton);
      expect(button.props('disabled')).toBe(true);
      expect(form.isValid).toBeFalsy();
      wrapper.destroy();
    });

    it('should not block submit buttom when form is invalid and it is allowed', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({
        onSubmit,
        allowSubmitWhenInvalid: true,
      });
      const form = wrapper.find(TwForm);
      const button = wrapper.find(TwButton);
      expect(button.props('disabled')).toBe(false);
      expect(form.isValid).toBeFalsy();
      wrapper.destroy();
    });

    it('should update isSubmitted state to true when it is allowed', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({
        onSubmit,
        allowSubmitWhenInvalid: true,
      });
      const form = wrapper.find(TwForm);
      wrapper.find('[type=submit]').trigger('click');
      expect(form.vm.isSubmitted).toBe(true);
      wrapper.destroy();
    });

    it('should update isSubmitted state to true when form is valid', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({ onSubmit });
      wrapper.find('[name=first-input]').setValue('Any value');
      const form = wrapper.find(TwForm);
      wrapper.find('[type=submit]').trigger('click');
      expect(form.vm.isSubmitted).toBe(true);
      expect(form.vm.isValid).toBe(true);
      wrapper.destroy();
    });

    it('should not update isSubmitted state to true when it is not allowed and form is not valid', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({
        onSubmit,
        allowSubmitWhenInvalid: false,
      });
      const form = wrapper.find(TwForm);
      wrapper.find('[type=submit]').trigger('click');
      expect(form.vm.isSubmitted).toBe(false);
      expect(form.vm.isValid).toBe(false);
      wrapper.destroy();
    });

    it('should emit a submit event with all form data when form is valid', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({ onSubmit });
      const form = wrapper.find(TwForm);
      wrapper.find('[name=first-input]').setValue('First Value');
      wrapper.find('[name=second-input]').setValue('Second Value');
      wrapper.find('[type=submit]').trigger('click');
      expect(form.vm.isValid).toBe(true);
      expect(onSubmit).toHaveBeenCalledWith({
        'first-input': 'First Value',
        'second-input': 'Second Value',
      });
      wrapper.destroy();
    });

    it('should NOT emit a submit event with all form data when form is NOT valid', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountFormWithSubmitButton({ onSubmit });
      const form = wrapper.find(TwForm);
      wrapper.find('[type=submit]').trigger('click');
      expect(form.vm.isValid).toBe(false);
      expect(onSubmit).not.toHaveBeenCalled();
      wrapper.destroy();
    });

    it('should build output with input group key', async () => {
      const onSubmit = jest.fn();
      const wrapper = await mountComponent(`
        <tw-form @submit="onSubmit">
          <tw-form-field>
            <tw-form-input
              name="first-input"
              inputsGroupKey="first-group" />
          </tw-form-field>
          <tw-form-field>
            <tw-form-input
              name="second-input"
              inputsGroupKey="first-group" />
          </tw-form-field>
          <tw-form-submit-button />
        </tw-form>
      `, { onSubmit }, { attachToDocument: true });
      wrapper.find('[name=first-input]').setValue('First Value');
      wrapper.find('[name=second-input]').setValue('Second Value');
      wrapper.find('[type=submit]').trigger('click');
      expect(onSubmit).toHaveBeenCalledWith({
        'first-group': [
          {
            name: 'first-input',
            value: 'First Value',
          },
          {
            name: 'second-input',
            value: 'Second Value',
          },
        ],
      });
      wrapper.destroy();
    });
  });

  describe('On Reset', () => {
    function mountFormWithResetButton({ attachToDocument = false } = {}) {
      return mountComponent(`
        <tw-form>
          <tw-form-field>
            <tw-form-input name="first-input" />
          </tw-form-field>
          <tw-form-field>
            <tw-form-input name="second-input" />
          </tw-form-field>
          <tw-form-field>
            <tw-form-input name="third-input" />
          </tw-form-field>
          <tw-form-submit-button />
          <tw-form-reset-button />
        </tw-form>
      `, {}, { attachToDocument });
    }

    function fillAllInputValues(wrapper) {
      const firstInput = wrapper.find('[name=first-input]');
      const secondInput = wrapper.find('[name=second-input]');
      const thirdInput = wrapper.find('[name=third-input]');
      firstInput.setValue('First Value');
      secondInput.setValue('Second Value');
      thirdInput.setValue('Third Value');
    }

    it('should emit "reset" event', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton();
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('[type=reset]').trigger('click');
      expect(form.emitted().reset).toBeTruthy();
    });

    it('should reset isDirty form model', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton();
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('[type=reset]').trigger('click');
      expect(form.vm.isDirty).toBe(false);
    });

    it('should reset isSubmitted form model', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton({ attachToDocument: true });
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('[type=submit]').trigger('click');
      wrapper.find('[type=reset]').trigger('click');
      expect(form.vm.isSubmitted).toBe(false);
      wrapper.destroy();
    });

    it('should set each input value to null', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton();
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('[type=reset]').trigger('click');
      form.vm.formFields.forEach(formField => {
        expect(formField.input.value).toBe(null);
      });
    });

    it('should set each input isBlurred to false', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton();
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('input').trigger('blur');
      wrapper.find('[type=reset]').trigger('click');
      form.vm.formFields.forEach(formField => {
        expect(formField.input.isBlurred).toBe(false);
      });
    });

    it('should set each input isDirty to false', async () => {
      dialogs.customConfirm.mockReturnValue(true);
      const wrapper = await mountFormWithResetButton();
      const form = wrapper.find(TwForm);
      fillAllInputValues(wrapper);
      wrapper.find('[type=reset]').trigger('click');
      form.vm.formFields.forEach(formField => {
        expect(formField.input.isDirty).toBe(false);
      });
    });

    it('should default behavior be prevented when dialogs returns false', async () => {
      const wrapper = await mountDefaultTwForm();
      const form = wrapper.find(TwForm);
      const mockEvent = { preventDefault: jest.fn() };
      dialogs.customConfirm.mockReturnValue(false);
      form.vm.onReset(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should default behavior be NOT prevented when dialogs returns true', async () => {
      const wrapper = await mountDefaultTwForm();
      const form = wrapper.find(TwForm);
      const mockEvent = { preventDefault: jest.fn() };
      dialogs.customConfirm.mockReturnValue(true);
      form.vm.onReset(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });
});
