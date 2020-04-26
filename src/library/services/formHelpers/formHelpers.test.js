import {
  runValidation,
  initForm,
  setIsBlurred,
  setInputAndFormDirty,
  setupInputHtmlId,
  deleteItemFromListByIndex,
  removeFormFieldByInputId,

} from './formHelpers';

jest.mock('../uidGenerator/uidGenerator', () => ({ getUid: jest.fn(() => 98) }));

function scopeMockFactory() {
  return {
    id: 1,
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
    $vnode: {
      tag: 'vue-component-00-SampleTag',
    },
  };
}

describe('Form Helpers Service', () => {
  describe('on Run Validation', () => {
    it('should bind input value when it is a checkbox input', () => {
      const scope = scopeMockFactory();
      const event = { target: { type: 'checkbox', checked: true, value: 'sample-value' } };
      runValidation(event, scope);
      expect(scope.formFieldVm.input.value).toBe(true);
    });

    it('should bind input value when it is not a checkbox input', () => {
      const scope = scopeMockFactory();
      const event = { target: { type: 'textarea', checked: true, value: 'sample-value' } };
      runValidation(event, scope);
      expect(scope.formFieldVm.input.value).toBe('sample-value');
    });

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

    it('should setup custom error message when min length is required and not attended', () => {
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

    it('should bind input id prop when its defined', () => {
      const scope = scopeMockFactory();
      scope.id = 675;
      initForm('', scope);
      expect(scope.formFieldVm.input.id).toBe(675);
    });

    it('should generate new id when id prop is not defined', () => {
      const scope = scopeMockFactory();
      scope.id = undefined;
      initForm('', scope);
      expect(scope.formFieldVm.input.id).toBeGreaterThan(0);
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

    it('should update form field VM about it when there is a id defined in formField model', () => {
      const scope = scopeMockFactory();
      scope.id = undefined;
      scope.formFieldVm.input.id = 23;
      setupInputHtmlId(scope);
      expect(scope.formFieldVm.input.htmlId).toBe('input-23');
    });

    it('should update form field VM about it when there is NO scoped id defined', () => {
      const scope = scopeMockFactory();
      scope.id = undefined;
      setupInputHtmlId(scope);
      expect(scope.formFieldVm.input.htmlId).toBe('input-98');
    });

    it('should update form field with error string when id received is invalid', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const scope = scopeMockFactory();
      scope.id = -23;
      setupInputHtmlId(scope);
      expect(scope.formFieldVm.input.htmlId).toBe('input-ID_ERROR');
      expect(console.error).toHaveBeenCalledTimes(1);
      console.error.mockRestore();
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

  describe('on Delete Item From List By Index', () => {
    it('should just do it', () => {
      const list = ['a', 'b', 'c', 'd'];
      deleteItemFromListByIndex({
        list,
        itemIndex: 2,
      });
      expect(list).toEqual(['a', 'b', 'd']);
    });
  });

  describe('on Remove Form Field By Input Id', () => {
    it('should remove when id is found', () => {
      const scope = scopeMockFactory();
      scope.formVm.formFields.push({ input: { id: 35 } });
      scope.formVm.formFields.push({ input: { id: 36 } });
      scope.formVm.formFields.push({ input: { id: 37 } });
      removeFormFieldByInputId({ scope, inputIdToBeRemoved: 35 });
      expect(scope.formVm.formFields).toEqual([
        { input: { id: 36 } },
        { input: { id: 37 } },
      ]);
    });

    it('should not remove any item when id is not found', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const scope = scopeMockFactory();
      scope.formVm.formFields.push({ input: { id: 35 } });
      scope.formVm.formFields.push({ input: { id: 36 } });
      scope.formVm.formFields.push({ input: { id: 37 } });
      removeFormFieldByInputId({ scope, inputIdToBeRemoved: 63 });
      expect(scope.formVm.formFields).toEqual([
        { input: { id: 35 } },
        { input: { id: 36 } },
        { input: { id: 37 } },
      ]);
      console.error.mockRestore();
    });

    it('should console error when id is not found', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const scope = scopeMockFactory();
      scope.formVm.formFields.push({ input: { id: 35 } });
      removeFormFieldByInputId({ scope, inputIdToBeRemoved: 63 });
      expect(console.error).toHaveBeenCalledTimes(1);
      console.error.mockRestore();
    });
  });
});
