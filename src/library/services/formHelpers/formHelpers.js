import { getUid } from '../uidGenerator/uidGenerator';

const errorMessages = {
  invalidValue: 'Invalid value',
  requiredField: 'Required field',
  minLength: 'Min of %s digits',
};

const setupErrorMessage = (shouldShow, message, scope) => {
  if (shouldShow) { scope.formFieldVm.errorMessage = message; }
};

const isRequiredValidationValid = (value, scope) => {
  const isValid = !scope.required || !!value;
  setupErrorMessage(!isValid, errorMessages.requiredField, scope);
  return isValid;
};

const buildCustomErrorMessage = income => {
  const customErrorMessage = typeof income === 'string' ? income : null;
  return customErrorMessage || errorMessages.invalidValue;
};

const isCustomValidationValid = (value, scope, event) => {
  if (!scope.customValidation) { return true; }
  const income = scope.customValidation(value, event);
  const isValid = income === true;
  setupErrorMessage(!isValid, buildCustomErrorMessage(income), scope);
  return isValid;
};

const replaceParam = (string, param) => string.replace('%s', param);

const isMinLengthValid = (value, scope) => {
  if (!scope.minLength || !value) { return true; }
  const isValid = value.length >= scope.minLength;
  setupErrorMessage(!isValid, replaceParam(errorMessages.minLength, scope.minLength), scope);
  return isValid;
};

const cleanInputErrorMessage = scope => {
  scope.formFieldVm.errorMessage = '';
};

const applyRules = (value, scope, event) => isMinLengthValid(value, scope)
&& isCustomValidationValid(value, scope, event)
&& isRequiredValidationValid(value, scope);

const bindInputValue = (value, scope) => {
  scope.formFieldVm.setInputValue(value);
};

function getEventValue(event) {
  const { value, checked, type } = event.target;
  if (type === 'checkbox') { return checked; }
  return value;
}

export const runValidation = (event, scope) => {
  if (!scope.formVm || !scope.formFieldVm) { return; }
  const value = getEventValue(event);
  const isInputValid = applyRules(value, scope, event);
  scope.formFieldVm.input.isValid = isInputValid;
  bindInputValue(value, scope);
  if (isInputValid) {
    cleanInputErrorMessage(scope);
  }
};

const bindRequiredValidation = scope => {
  scope.formFieldVm.input.isRequired = !!scope.required;
};

const bindInputName = scope => {
  scope.formFieldVm.input.name = scope.name;
};

const bindinputsGroupId = scope => {
  scope.formFieldVm.input.inputsGroupId = scope.inputsGroupId;
};

const bindInputsGroupKey = scope => {
  scope.formFieldVm.input.inputsGroupKey = scope.inputsGroupKey;
};

const bindInputInFormList = scope => {
  scope.formVm.formFields.push(scope.formFieldVm);
};

const bindInputId = scope => {
  scope.formFieldVm.input.id = scope.id || getUid();
};

export const initForm = (initialValue, scope) => {
  if (!scope.formVm || !scope.formFieldVm) { return; }
  const event = { target: { value: initialValue } };
  bindRequiredValidation(scope);
  bindInputName(scope);
  bindInputsGroupKey(scope);
  bindinputsGroupId(scope);
  bindInputInFormList(scope);
  bindInputId(scope);
  runValidation(event, scope);
};

export const setIsBlurred = scope => {
  if (!scope.formFieldVm) { return; }
  scope.formFieldVm.input.isBlurred = true;
};

const getComponentName = scope => scope.$vnode.tag.split('-').pop();

function getInputId(scope) {
  const id = scope.id || scope.formFieldVm.input.id || getUid();
  if (id) { return id; }
  console.error(`${getComponentName(scope)} component received invalid id: ${id}`);
  return 'ID_ERROR';
}

export const setupInputHtmlId = scope => {
  const inputHtmlId = `input-${getInputId(scope)}`;
  if (scope.formFieldVm) { scope.formFieldVm.input.htmlId = inputHtmlId; }
  return inputHtmlId;
};

export const setInputAndFormDirty = scope => {
  if (!scope.formVm || !scope.formFieldVm) { return; }
  scope.formVm.isDirty = true;
  scope.formFieldVm.input.isDirty = true;
};

function getFormFieldIndexById(scope, inputIdToBeRemoved) {
  return scope.formVm.formFields.findIndex(value => value.input.id === inputIdToBeRemoved);
}

export const deleteItemFromListByIndex = ({ list, itemIndex }) => {
  list.splice(itemIndex, 1);
};

export const removeFormFieldByInputId = ({ scope, inputIdToBeRemoved }) => {
  if (!scope.formVm || !scope.formFieldVm) { return; }
  const indexFormFieldToBeRemoved = getFormFieldIndexById(scope, inputIdToBeRemoved);
  if (indexFormFieldToBeRemoved > -1) {
    deleteItemFromListByIndex({
      list: scope.formVm.formFields,
      itemIndex: indexFormFieldToBeRemoved,
    });
  } else {
    console.error(`Dynamic input could not be deleted from form model list from ${getComponentName(scope)} component!`);
  }
};
