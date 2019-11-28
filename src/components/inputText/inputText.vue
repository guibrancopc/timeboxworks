<template>
  <component :is="currentNativeElement"
    :type="currentInputType"
    :placeholder="placeholder"
    :name="`input-text-${_uid}`"
    :id="setupInputHtmlId(_uid)"
    class="form-control form-control-lg"
    :value="value"
    :maxlength="maxLength"
    @input="onInput($event)"
    @blur="onBlur()"
    v-dynamic-height="vDynamicHeightSetup()">{{textareaInitialValue}}</component>
</template>

<script>
import dynamicHeight from '../../directives/dynamicHeight/dynamicHeight';

export default {
  name: 'tw-input-text',
  data() {
    return {
      // isValid: true,
      textareaInitialValue: '',
      errorMessages: {
        invalidValue: 'Invalid value',
        requiredField: 'Required field',
        minLength: `Min of ${this.minLength} digits`,
      },
    };
  },
  inject: ['formVm', 'formFieldVm'],
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    dynamicMinHeight: {
      type: [Number, String],
      default: 100,
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: -1,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    customValidation: Function,
  },
  computed: {
    currentNativeElement() {
      if (this.isTypeTextarea()) {
        this.setupTextAreaInitialValue();
        return 'textarea';
      }
      return 'input';
    },
    currentInputType() {
      const validTypes = ['text', 'email', 'password', 'number', 'textarea'];
      if (validTypes.includes(this.type)) {
        return this.type;
      }
      throw new Error('TW Error: Wrong type passed as prop to input text!');
    },
  },
  methods: {
    onInput(event) {
      if (event && event.target) {
        this.$emit('input', event.target.value);
        this.setInputAndFormDirty();
        this.runValidation(event.target.value, event);
      }
    },
    onBlur() {
      this.formFieldVm.input.isBlurred = true;
    },
    setupTextAreaInitialValue() {
      this.textareaInitialValue = this.value;
    },
    setInputAndFormDirty() {
      this.formVm.isDirty = true;
      this.formFieldVm.input.isDirty = true;
    },
    runValidation(value, event) {
      this.formFieldVm.input.isValid = this.isRequiredValidationValid(value)
        && this.isCustomValidationValid(value, event)
        && this.isMinLengthValid(value);
      this.cleanErrorMessageWhenInputIsValid();
    },
    isRequiredValidationValid(value) {
      const isRequiredValidationValid = !this.required || value !== '';
      this.setupErrorMessage(!isRequiredValidationValid, this.errorMessages.requiredField);
      return isRequiredValidationValid;
    },
    isCustomValidationValid(value, event) {
      const customValidation = this.customValidation ? this.customValidation(value, event) : true;
      this.setupErrorMessage(!customValidation, this.errorMessages.invalidValue);
      return customValidation;
    },
    isMinLengthValid(value) {
      const isMinLengthValid = value.length >= this.minLength;
      this.setupErrorMessage(!isMinLengthValid, this.errorMessages.minLength);
      return isMinLengthValid;
    },
    cleanErrorMessageWhenInputIsValid() {
      if (this.formFieldVm.input.isValid) { this.formFieldVm.errorMessage = ''; }
    },
    setupErrorMessage(shouldShow, message) {
      if (shouldShow) {
        this.formFieldVm.errorMessage = message;
      }
    },
    vDynamicHeightSetup() {
      return {
        minHeight: `${this.dynamicMinHeight}px`,
        disabled: !this.isTypeTextarea(),
      };
    },
    isTypeTextarea() {
      return this.type === 'textarea';
    },
    setupInputHtmlId(inputId) {
      const inputHtmlId = `input-${inputId}`;
      this.formFieldVm.inputHtmlId = inputHtmlId;
      return inputHtmlId;
    },
    updateFormField() {
      this.formFieldVm.input.isRequired = this.required;
    },
  },
  mounted() {
    this.updateFormField();
    this.runValidation(this.value, {});
  },
  directives: {
    dynamicHeight,
  },
};
</script>
