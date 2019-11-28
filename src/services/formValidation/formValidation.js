const errorMessages = {
  invalidValue: 'Invalid value',
  requiredField: 'Required field',
  minLength: 'Min of %s digits',
};

const setInputAndFormDirty = (scope) => {
  scope.formVm.isDirty = true;
  scope.formFieldVm.input.isDirty = true;
};

const setupErrorMessage = (shouldShow, message) => {
  if (shouldShow) { this.formFieldVm.errorMessage = message; }
};

const isRequiredValidationValid = (value, scope) => {
  const isValid = !scope.required || value !== '';
  setupErrorMessage(!isValid, errorMessages.requiredField);
  return isValid;
};

const isCustomValidationValid = (event, scope) => {
  const isValid = scope.customValidation ? scope.customValidation(event.target.value, event) : true;
  setupErrorMessage(!isValid, errorMessages.invalidValue);
  return isValid;
};

const replaceParam = (string, param) => {
  return string.replace('%s', param);
};

const isMinLengthValid = (value, scope) => {
  if (!scope.minLength) { return true; }
  const isValid = value.length >= scope.minLength;
  this.setupErrorMessage(!isValid, replaceParam(errorMessages.minLength, scope.minLength));
  return isValid;
};

const cleanErrorMessageWhenInputIsValid = (scope) => {
  if (scope.formFieldVm.input.isValid) { scope.formFieldVm.errorMessage = ''; }
};

const runValidation = (event, scope) => {
  const { value } = event.target;
  setInputAndFormDirty(scope);
  scope.formFieldVm.input.isValid = isRequiredValidationValid(value, scope)
    && isCustomValidationValid(event, scope)
    && isMinLengthValid(value);
  cleanErrorMessageWhenInputIsValid();
};

export default runValidation;
