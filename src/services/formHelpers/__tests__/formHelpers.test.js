import {
  runValidation,
  initForm,
  setIsBlurred,
  setInputAndFormDirty,
  setupInputHtmlId,
} from '../formHelpers';

jest.mock('../../uidGenerator/uidGenerator', () => ({ getUid: jest.fn(() => 98) }));

function scopeMockFactory() {
  return {
    id: null,
    name: null,
    required: null,
    minLength: null,
    customValidation: null,
    inputsGroupKey: null,
    formVm: {
      isDirty: null,
      formFields: [],
    },
    formFieldVm: {
      input: {
        id: null,
        isValid: null,
        htmlId: null,
        isBlurred: null,
        isDirty: null,
        isRequired: null,
      },
      errorMessage: null,
    },
  };
}

describe('Form Helpers Service', () => {
  describe('on Run Validation', () => {
    it('should validate form as true when no rule is required', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      runValidation(event, scope);
      expect(scope.formFieldVm.input.isValid).toBe(true);
    });

    it('should setup no error message when no rule is required', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe('');
    });

    it('should validate form as true when all rule is required and attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: 'sample-value' } };
      scope.required = true;
      scope.minLength = 5;
      scope.customValidation = jest.fn(() => true);
      runValidation(event, scope);
      expect(scope.formFieldVm.input.isValid).toBe(true);
    });

    it('should setup no error message when all rule is required and attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: 'sample-value' } };
      scope.required = true;
      scope.minLength = 5;
      scope.customValidation = jest.fn(() => true);
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe('');
    });

    it('should validate form as false when field is required and empty', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      scope.required = true;
      runValidation(event, scope);
      expect(scope.formFieldVm.input.isValid).toBe(false);
    });

    it('should setup required error message when field is required and empty', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      scope.required = true;
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe('Required field');
    });

    it('should validate form as false when custom validation is required and not attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      scope.customValidation = jest.fn(() => false);
      runValidation(event, scope);
      expect(scope.formFieldVm.input.isValid).toBe(false);
    });

    it('should setup custom validation error default message when custom validation is required and not attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      scope.customValidation = jest.fn(() => false);
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe('Invalid value');
    });

    it('should setup custom validation error custom message when custom validation is required and not attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: '' } };
      scope.customValidation = jest.fn(() => 'Sample custom error message');
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe('Sample custom error message');
    });

    it('should validate form as false when min length is required and not attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: 'sample-value-less-than-min-length' } };
      scope.minLength = 40;
      runValidation(event, scope);
      expect(scope.formFieldVm.input.isValid).toBe(false);
    });

    it('should validate form as false when min length is required and not attended', () => {
      const scope = scopeMockFactory();
      const event = { target: { value: 'sample-value-less-than-min-length' } };
      const minLength = 40;
      scope.minLength = minLength;
      runValidation(event, scope);
      expect(scope.formFieldVm.errorMessage).toBe(`Min of ${minLength} digits`);
    });
  });

  describe('on Init Form', () => {
    it('should bind input required validation property', () => {
      const scope = scopeMockFactory();
      scope.required = true;
      initForm('', scope);
      expect(scope.formFieldVm.input.isRequired).toBe(true);
    });

    it('should bind input name property', () => {
      const scope = scopeMockFactory();
      scope.name = 'sample-name';
      initForm('', scope);
      expect(scope.formFieldVm.input.name).toBe('sample-name');
    });

    it('should bind input group key property', () => {
      const scope = scopeMockFactory();
      scope.inputsGroupKey = 'sample-group-key';
      initForm('', scope);
      expect(scope.formFieldVm.input.inputsGroupKey).toBe('sample-group-key');
    });

    it('should insert input field VM in form list', () => {
      const scope = scopeMockFactory();
      initForm('', scope);
      expect(scope.formVm.formFields).toContain(scope.formFieldVm);
    });

    it('should bind input id property', () => {
      const scope = scopeMockFactory();
      scope.computedId = 675;
      initForm('', scope);
      expect(scope.formFieldVm.input.id).toBe(675);
    });
  });

  it('on Set Is Blurred should update form field VM about it', () => {
    const scope = scopeMockFactory();
    setIsBlurred(scope);
    expect(scope.formFieldVm.input.isBlurred).toBe(true);
  });

  describe('on Setup Input HTML Id', () => {
    it('should update form field VM about it when there is a scoped id defined', () => {
      const scope = scopeMockFactory();
      scope.id = 54;
      setupInputHtmlId(scope);
      expect(scope.formFieldVm.input.htmlId).toBe('input-54');
    });

    it('should update form field VM about it when there is NO scoped id defined', () => {
      const scope = scopeMockFactory();
      scope.id = undefined;
      setupInputHtmlId(scope);
      expect(scope.formFieldVm.input.htmlId).toBe('input-98');
    });
  });

  describe('on Set Input And Form Dirty', () => {
    it('should update Form VM flag', () => {
      const scope = scopeMockFactory();
      setInputAndFormDirty(scope);
      expect(scope.formVm.isDirty).toBe(true);
    });

    it('should update Form Field VM flag', () => {
      const scope = scopeMockFactory();
      setInputAndFormDirty(scope);
      expect(scope.formFieldVm.input.isDirty).toBe(true);
    });
  });
});
