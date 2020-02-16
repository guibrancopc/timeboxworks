import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormInput from '../formInput/FormInput.vue';
import TwFormResetButton from './FormResetButton.vue';
import dialogs from '../../services/dialogs/dialogs';

jest.mock('../../services/dialogs/dialogs');

async function mountComponent(template, props = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInput,
      TwFormResetButton,
    },
  }, { sync: false });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props = {}) {
  return mountComponent(`
    <tw-form v-bind="$data">
      <tw-form-field>
        <tw-form-input name="first-input" :min-length="35" required />
      </tw-form-field>
      <tw-form-reset-button />
    </tw-form>
  `, props);
}

describe('Tw Form Reset Button', () => {
  it('should inject the form VM as an object', async () => {
    const wrapper = await mountFullForm();
    const resetButton = wrapper.find(TwFormResetButton);
    expect(typeof resetButton.vm.formVm).toBe('object');
  });

  it('should render a reset button', async () => {
    const wrapper = await mountFullForm();
    expect(wrapper.find('button[type=reset]').exists()).toBe(true);
  });

  it('should dispatch form reset event when clicked', async () => {
    dialogs.customConfirm.mockReturnValue(true);
    const wrapper = await mountComponent(`
      <tw-form>
        <tw-form-field>
          <tw-form-input name="first-input" :min-length="35" required />
        </tw-form-field>
        <tw-form-reset-button />
      </tw-form>
    `);
    wrapper.find('input').setValue('Any Value');
    wrapper.find('[type=reset]').trigger('click');
    expect(wrapper.find(TwFormField).vm.input.value).toBe(null);
  });
});
