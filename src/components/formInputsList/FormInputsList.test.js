import { mount } from '@vue/test-utils';
import TwForm from '../form/Form.vue';
import TwFormField from '../formField/FormField.vue';
import TwFormInput from '../formInput/FormInput.vue';
import TwFormInputsList from './FormInputsList.vue';

async function mountComponent(template, props = {}) {
  const wrapper = mount({
    template,
    data: () => props,
    components: {
      TwForm,
      TwFormField,
      TwFormInputsList,
    },
  }, { sync: false });
  await wrapper.vm.$nextTick();
  return wrapper;
}

function mountFullForm(props) {
  return mountComponent(`
    <tw-form>
      <tw-form-inputs-list
        inputName="sample-name"
        inputsGroupKey="sample-inputs-group-key"
        label="Sample label"
        v-bind="$data" />
    </tw-form>
  `, props);
}

describe('Tw Form Input component', () => {
  it('should receive a object formVm through injection', async () => {
    const wrapper = await mountFullForm();

    const formInput = wrapper.find(TwFormInputsList);
    expect(typeof formInput.vm.formVm).toBe('object');
  });

  it('should console error when inputName prop is not provided', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mountComponent(`
      <tw-form>
        <tw-form-inputs-list
          inputsGroupKey="sample-inputs-group-key"
          label="sample-label"
          v-bind="$data" />
      </tw-form>
    `);

    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should emit value inserted', async () => {
    const wrapper = await mountFullForm();

    wrapper.find('input').setValue('Sample value');
    const formInput = wrapper.find(TwFormInputsList);
    expect(formInput.emitted().input[0][0][0].value).toBe('Sample value');
  });

  it('should render field with enumerated label starting from 1', async () => {
    const wrapper = await mountFullForm();

    const formField = wrapper.find(TwFormField);
    expect(formField.props().label).toBe('Sample label 1');
  });

  it('should name input with enumerated input name received starting from 0', async () => {
    const wrapper = await mountFullForm();

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().name).toBe('sample-name-0');
  });

  it('should render input with defined type', async () => {
    const wrapper = await mountFullForm({ type: 'password' });

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().type).toBe('password');
  });

  it('should throw error when wrong type is received by prop', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await mountFullForm({ type: 'wrong-value' });

    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should render input with defined max length', async () => {
    const wrapper = await mountFullForm({ maxLength: 23 });

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().maxLength).toBe(23);
  });

  it('should render input with defined min length', async () => {
    const wrapper = await mountFullForm({ minLength: 18 });

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().minLength).toBe(18);
  });

  it('should render input with defined placeholder', async () => {
    const wrapper = await mountFullForm({ placeholder: 'Sample placeholder' });

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().placeholder).toBe('Sample placeholder');
  });

  it('should render input with defined inputs group key', async () => {
    const wrapper = await mountFullForm();

    const formInput = wrapper.find(TwFormInput);
    expect(formInput.props().inputsGroupKey).toBe('sample-inputs-group-key');
  });

  it('should initialize component with one input visible', async () => {
    const wrapper = await mountFullForm();

    const formInputs = wrapper.findAll(TwFormInput);
    expect(formInputs.at(0).exists()).toBe(true);
    expect(formInputs.length).toBe(1);
  });

  it('on Add Item button clicked should add new item at end of list', async () => {
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('button.tw-form-inputs-list__add-button');

    addButton.trigger('click');
    addButton.trigger('click');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(TwFormInput).length).toBe(4);
  });

  it('on Enter key down should add a new item on list next to focused item', async () => {
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    addButton.trigger('click');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialInputsList = wrapper.findAll('input');
    initialInputsList.at(0).setValue('Input 0');
    initialInputsList.at(1).setValue('Input 1');
    initialInputsList.at(2).setValue('Input 2');
    initialInputsList.at(3).setValue('Input 3');

    initialInputsList.at(1).trigger('keydown', { key: 'Enter' });
    await wrapper.vm.$nextTick();

    const finalInputsList = wrapper.findAll('input');
    expect(finalInputsList.at(0).element.value).toBe('Input 0');
    expect(finalInputsList.at(1).element.value).toBe('Input 1');
    expect(finalInputsList.at(2).element.value).toBe('');
    expect(finalInputsList.at(3).element.value).toBe('Input 2');
    expect(finalInputsList.at(4).element.value).toBe('Input 3');
  });

  it('should not show delete only when list has only one item', async () => {
    const wrapper = await mountFullForm();

    const formFields = wrapper.findAll(TwFormField);
    expect(formFields.length).toBe(1);
    expect(formFields.at(0).find('.tw-form-inputs-list__delete-button').exists()).toBe(false);
  });

  it('should show delete only when list has more than one item', async () => {
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');

    addButton.trigger('click');
    addButton.trigger('click');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();

    const formFields = wrapper.findAll(TwFormField);
    expect(formFields.at(0).find('.tw-form-inputs-list__delete-button').exists()).toBe(true);
    expect(formFields.at(1).find('.tw-form-inputs-list__delete-button').exists()).toBe(true);
    expect(formFields.at(2).find('.tw-form-inputs-list__delete-button').exists()).toBe(true);
    expect(formFields.at(3).find('.tw-form-inputs-list__delete-button').exists()).toBe(true);
  });

  it('on Delete button clicked should delete the item from local list', async () => {
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    initialFormFieldsList.at(0).find('input').setValue('Input 0');
    expect(initialFormFieldsList.length).toBe(2);

    initialFormFieldsList.at(1).find('.tw-form-inputs-list__delete-button').trigger('click');
    await wrapper.vm.$nextTick();

    const finalFormFieldsList = wrapper.findAll(TwFormField);
    expect(finalFormFieldsList.length).toBe(1);
    expect(finalFormFieldsList.at(0).find('input').element.value).toBe('Input 0');
  });

  it('on Delete button clicked should delete the item from form model list', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    initialFormFieldsList.at(0).find('input').setValue('Input 0');
    expect(initialFormFieldsList.length).toBe(2);

    const itemToBeDeleted = initialFormFieldsList.at(1);
    const deletedItemId = itemToBeDeleted.vm.input.id;
    itemToBeDeleted.find('.tw-form-inputs-list__delete-button').trigger('click');
    await wrapper.vm.$nextTick();

    const form = wrapper.find(TwForm);
    const formFieldsList = form.vm.formFields
      .filter(field => field.input.inputsGroupKey === 'sample-inputs-group-key');
    expect(formFieldsList.length).toBe(1);
    expect(formFieldsList
      .filter(formField => formField.input.id === deletedItemId)
      .length).toBe(0);
    expect(console.error).not.toHaveBeenCalled();
    console.error.mockRestore();
  });

  it('on Backspace key down should delete the item from list', async () => {
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    initialFormFieldsList.at(0).find('input').setValue('Input 0');
    expect(initialFormFieldsList.length).toBe(2);
    expect(initialFormFieldsList.at(1).find('input').element.value).toBe('');

    initialFormFieldsList.at(1).find(TwFormInput).trigger('keydown', { key: 'Backspace' });
    await wrapper.vm.$nextTick();

    const finalFormFieldsList = wrapper.findAll(TwFormField);
    expect(finalFormFieldsList.length).toBe(1);
    expect(finalFormFieldsList.at(0).find('input').element.value).toBe('Input 0');
  });

  it('on Backspace key down should not delete the first item from list', async () => {
    const wrapper = await mountFullForm();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    expect(initialFormFieldsList.length).toBe(1);

    initialFormFieldsList.at(0).find(TwFormInput).trigger('keydown', { key: 'Backspace' });
    await wrapper.vm.$nextTick();

    const finalFormFieldsList = wrapper.findAll(TwFormField);
    expect(finalFormFieldsList.length).toBe(1);
  });

  it('on delete item except the first one should focus previous item', async () => {
    jest.useFakeTimers();
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    initialFormFieldsList.at(0).find('input').setValue('Input 0');
    expect(initialFormFieldsList.length).toBe(2);

    const secondItemDeleteButton = initialFormFieldsList.at(1).find('.tw-form-inputs-list__delete-button');
    const focus = jest.fn();
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ focus }));
    secondItemDeleteButton.trigger('click');
    await wrapper.vm.$nextTick();

    const formInputsList = wrapper.find(TwFormInputsList);
    await wrapper.vm.$nextTick();
    jest.runAllTimers();
    expect(document.querySelector).toHaveBeenCalledWith(`#input-${formInputsList.vm.inputsList[0].id}`);
    expect(focus).toHaveBeenCalledTimes(2);
    document.querySelector.mockRestore();
  });

  it('on delete first item of list should focus foward item (that becomes the first one after exclusion)', async () => {
    jest.useFakeTimers();
    const wrapper = await mountFullForm();
    const addButton = wrapper.find('.tw-form-inputs-list__add-button');
    addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const initialFormFieldsList = wrapper.findAll(TwFormField);
    initialFormFieldsList.at(0).find('input').setValue('Input 0');
    expect(initialFormFieldsList.length).toBe(2);

    const secondItemDeleteButton = initialFormFieldsList.at(0).find('.tw-form-inputs-list__delete-button');
    const focus = jest.fn();
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ focus }));
    secondItemDeleteButton.trigger('click');
    await wrapper.vm.$nextTick();

    const formInputsList = wrapper.find(TwFormInputsList);
    await wrapper.vm.$nextTick();
    jest.runAllTimers();
    expect(document.querySelector).toHaveBeenCalledWith(`#input-${formInputsList.vm.inputsList[0].id}`);
    expect(focus).toHaveBeenCalledTimes(2);
    document.querySelector.mockRestore();
  });

  it('should render list values on inputs when it has been received by "value" prop', async () => {
    const wrapper = await mountFullForm({
      value: [
        { value: 'Input 0' },
        { value: 'Input 1' },
        { value: 'Input 2' },
      ],
    });

    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(3);
    expect(inputs.at(0).element.value).toBe('Input 0');
    expect(inputs.at(1).element.value).toBe('Input 1');
    expect(inputs.at(2).element.value).toBe('Input 2');
  });

  it('should fill inputsList data model when it has been received by "value" prop', async () => {
    const wrapper = await mountFullForm({
      value: [
        { value: 'Input 0' },
        { value: 'Input 1' },
        { value: 'Input 2' },
      ],
    });

    const formInputsListComponent = wrapper.find(TwFormInputsList);
    expect(formInputsListComponent.vm.inputsList.length).toBe(3);
    expect(formInputsListComponent.vm.inputsList[0].value).toBe('Input 0');
    expect(formInputsListComponent.vm.inputsList[1].value).toBe('Input 1');
    expect(formInputsListComponent.vm.inputsList[2].value).toBe('Input 2');
  });

  it('should generate numeric id for item received by "value" prop', async () => {
    const wrapper = await mountFullForm({
      value: [
        { value: 'Input 0' },
      ],
    });

    const formInputsListComponent = wrapper.find(TwFormInputsList);
    const firstItemId = formInputsListComponent.vm.inputsList[0].id;
    expect(firstItemId).toBeGreaterThan(0);
    expect(typeof firstItemId).toBe('number');
  });

  it('should not generate new id for item received by "value" prop has id already', async () => {
    const wrapper = await mountFullForm({
      value: [
        { value: 'Input 0', id: 79 },
      ],
    });

    const formInputsListComponent = wrapper.find(TwFormInputsList);
    const firstItemId = formInputsListComponent.vm.inputsList[0].id;
    expect(firstItemId).toBe(79);
  });
});
