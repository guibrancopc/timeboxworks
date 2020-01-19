import uidGenerator from '../uidGenerator/uidGenerator';

const { getUid } = uidGenerator;

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

const isCustomValidationValid = (event, scope) => {
  if (!scope.customValidation) { return true; }
  const income = scope.customValidation(event.target.value, event);
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

const applyRules = (event, scope) => {
  const { value } = event.target;
  return isRequiredValidationValid(value, scope)
    && isCustomValidationValid(event, scope)
    && isMinLengthValid(value, scope);
};

const bindInputValue = (event, scope) => {
  const { value } = event.target;
  scope.formFieldVm.input.value = value;
};

export const runValidation = (event, scope) => {
  const isInputValid = applyRules(event, scope);
  scope.formFieldVm.input.isValid = isInputValid;
  if (isInputValid) {
    bindInputValue(event, scope);
    cleanInputErrorMessage(scope);
  }
};

const bindRequiredValidation = scope => {
  scope.formFieldVm.input.isRequired = !!scope.required;
};

const bindInputName = scope => {
  scope.formFieldVm.input.name = scope.name;
};

const bindInputsGroupKey = scope => {
  scope.formFieldVm.input.inputsGroupKey = scope.inputsGroupKey;
};

const bindInputInFormList = scope => {
  scope.formVm.formFields.push(scope.formFieldVm);
};

const bindInputId = scope => {
  scope.formFieldVm.input.id = scope.computedId;
};

export const initForm = (initialValue, scope) => {
  const event = { target: { value: initialValue } };
  bindRequiredValidation(scope);
  bindInputName(scope);
  bindInputsGroupKey(scope);
  bindInputInFormList(scope);
  bindInputId(scope);
  runValidation(event, scope);
};

export const setIsBlurred = scope => {
  scope.formFieldVm.input.isBlurred = true;
};

export const setupInputHtmlId = scope => {
  const inputHtmlId = `input-${scope.id || getUid()}`;
  scope.formFieldVm.input.htmlId = inputHtmlId;
  return inputHtmlId;
};

export const setInputAndFormDirty = scope => {
  scope.formVm.isDirty = true;
  scope.formFieldVm.input.isDirty = true;
};
