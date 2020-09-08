import { getUid } from '../uidGenerator/uidGenerator';

const ERROR_MESSAGES = {
  INVALID_VALUE: 'Invalid value',
  REQUIRED_FIELD: 'Required field',
  MIN_LENGTH: 'Min of %s digits',
};

const setupErrorMessage = (shouldShow, message, vm) => {
  if (shouldShow) { vm.formFieldVm.errorMessage = message; }
};

const isRequiredValidationValid = (value, vm) => {
  const isValid = !vm.required || !!value;
  setupErrorMessage(!isValid, ERROR_MESSAGES.REQUIRED_FIELD, vm);
  return isValid;
};

const buildCustomErrorMessage = income => {
  const customErrorMessage = typeof income === 'string' ? income : null;
  return customErrorMessage || ERROR_MESSAGES.INVALID_VALUE;
};

const isCustomValidationValid = (value, vm, event) => {
  if (!vm.customValidation) { return true; }
  const income = vm.customValidation(value, event);
  const isValid = income === true;
  setupErrorMessage(!isValid, buildCustomErrorMessage(income), vm);
  return isValid;
};

const replaceParam = (string, param) => string.replace('%s', param);

const isMinLengthValid = (value, vm) => {
  if (!vm.minLength || !value) { return true; }
  const isValid = value.length >= vm.minLength;
  setupErrorMessage(!isValid, replaceParam(ERROR_MESSAGES.MIN_LENGTH, vm.minLength), vm);
  return isValid;
};

const cleanInputErrorMessage = vm => {
  vm.formFieldVm.errorMessage = '';
};

const applyRules = (value, vm, event) => isMinLengthValid(value, vm)
&& isCustomValidationValid(value, vm, event)
&& isRequiredValidationValid(value, vm);

const bindInputValue = (value, vm) => {
  vm.formFieldVm.setInputValue(value && vm.type === 'number' ? Number(value) : value);
};

function getEventValue(event) {
  const { value, checked, type } = event.target;
  if (type === 'checkbox') { return checked; }
  return value;
}

export const runValidation = (event, vm) => {
  if (!vm.formVm || !vm.formFieldVm) { return; }
  const value = getEventValue(event);
  const isInputValid = applyRules(value, vm, event);
  vm.formFieldVm.input.isValid = isInputValid;
  bindInputValue(value, vm);
  if (isInputValid) {
    cleanInputErrorMessage(vm);
  }
};

const bindRequiredValidation = vm => {
  vm.formFieldVm.input.isRequired = !!vm.required;
};

const bindInputName = vm => {
  vm.formFieldVm.input.name = vm.name;
};

const bindInputsGroupKey = vm => {
  vm.formFieldVm.input.inputsGroupKey = vm.inputsGroupKey;
};

const bindInputsSubGroupKey = vm => {
  vm.formFieldVm.input.inputsSubGroupKey = vm.inputsSubGroupKey;
};

const bindInputInFormList = vm => {
  vm.formVm.formFields.push(vm.formFieldVm);
};

const bindInputId = vm => {
  vm.formFieldVm.input.id = vm.id || getUid();
};

export const deleteItemFromListByIndex = ({ list, itemIndex }) => {
  list.splice(itemIndex, 1);
};

const installSelfUnbindFormModel = vm => {
  vm.$on('hook:beforeDestroy', () => {
    if (!vm.formVm || !vm.formFieldVm) { return; }

    const indexToBeRemoved = vm
      .formVm
      .formFields
      .findIndex(formField => formField === vm.formFieldVm);

    deleteItemFromListByIndex({
      list: vm.formVm.formFields,
      itemIndex: indexToBeRemoved,
    });
  });
};

export const initForm = (initialValue, vm) => {
  if (!vm.formVm || !vm.formFieldVm) { return; }
  const event = { target: { value: initialValue } };
  bindRequiredValidation(vm);
  bindInputName(vm);
  bindInputsGroupKey(vm);
  bindInputsSubGroupKey(vm);
  bindInputInFormList(vm);
  bindInputId(vm);
  installSelfUnbindFormModel(vm);
  runValidation(event, vm);
};

export const setIsBlurred = vm => {
  if (!vm.formFieldVm) { return; }
  vm.formFieldVm.input.isBlurred = true;
};

const getComponentName = vm => vm.$vnode.tag.split('-').pop();

function getInputId(vm) {
  const id = vm.id || vm.formFieldVm.input.id || getUid();
  if (id) { return id; }
  console.error(`${getComponentName(vm)} component received invalid id: ${id}`);
  return 'ID_ERROR';
}

export const setupInputHtmlId = vm => {
  const inputHtmlId = `input-${getInputId(vm)}`;
  if (vm.formFieldVm) { vm.formFieldVm.input.htmlId = inputHtmlId; }
  return inputHtmlId;
};

export const setInputAndFormDirty = vm => {
  if (!vm.formVm || !vm.formFieldVm) { return; }
  vm.formVm.isDirty = true;
  vm.formFieldVm.input.isDirty = true;
};
