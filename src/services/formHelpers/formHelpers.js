const errorMessages = {
  invalidValue: 'Invalid value',
  requiredField: 'Required field',
  minLength: 'Min of %s digits',
};

const setInputAndFormDirty = (scope) => {
  scope.formVm.isDirty = true;
  scope.formFieldVm.input.isDirty = true;
};

const setupErrorMessage = (shouldShow, message, scope) => {
  if (shouldShow) { scope.formFieldVm.errorMessage = message; }
};

const isRequiredValidationValid = (value, scope) => {
  const isValid = !scope.required || value;
  setupErrorMessage(!isValid, errorMessages.requiredField, scope);
  return isValid;
};

const buildCustomErrorMessage = (income) => {
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

const cleanInputErrorMessage = (scope) => {
  scope.formFieldVm.errorMessage = '';
};

const applyRules = (event, scope) => {
  const { value } = event.target;
  return isRequiredValidationValid(value, scope)
    && isCustomValidationValid(event, scope)
    && isMinLengthValid(value, scope);
};

const bindRequiredValidation = (scope) => {
  scope.formFieldVm.input.isRequired = !!scope.required;
};

const bindInputName = (scope) => {
  scope.formFieldVm.input.name = scope.name;
};

const bindInputValue = (event, scope) => {
  const { value } = event.target;
  scope.formFieldVm.input.value = value;
};

const bindInputInFormList = (scope) => {
  scope.formVm.formFields.push(scope.formFieldVm);
};

const runValidation = (event, scope) => {
  const isInputValid = applyRules(event, scope);
  scope.formFieldVm.input.isValid = isInputValid;
  if (isInputValid) {
    bindInputValue(event, scope);
    cleanInputErrorMessage(scope);
  }
};

const initForm = (initialValue, scope) => {
  const event = { target: { value: initialValue } };
  bindRequiredValidation(scope);
  bindInputName(scope);
  bindInputInFormList(scope);
  runValidation(event, scope);
};

const setIsBlurred = (scope) => {
  scope.formFieldVm.input.isBlurred = true;
};

const setupInputHtmlId = (scope) => {
  const inputId = scope._uid;
  const inputHtmlId = `input-${inputId}`;
  scope.formFieldVm.input.htmlId = inputHtmlId;
  return inputHtmlId;
};

export {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
};
