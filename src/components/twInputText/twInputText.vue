<template>
  <div class="form-group">
    <label :for="`input-text-${_uid}`">
      {{label}}
      <span v-if="required" class="form-control__required-star">*</span>
    </label>
    <component :is="currentNativeElement"
      :type="currentInputType"
      :rows="rows"
      :placeholder="placeholder"
      :name="`input-text-${_uid}`"
      :id="`input-text-${_uid}`"
      class="form-control form-control-lg"
      :class="{'form-control-invalid': !inputValidation.isValid}"
      :value="value"
      :maxlength="maxLength"
      @input="twoWayBinding($event)"
      @keyup="onKeyUp(value, $event)">{{textareaInitialValue}}</component>
    <small v-if="!inputValidation.isValid">{{currentErrorMessage}}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValidation: {
        isValid: true,
        isDirty: false,
      },
      textareaInitialValue: '',
      currentNativeElement: 'input',
      currentInputType: 'text',
      currentErrorMessage: '',
      errorMessages: {
        invalidValue: 'Valor inválido',
        requiredField: 'Campo obrigatório',
        minLength: `Mínimo de ${this.minLength} dígitos`,
      }
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 8,
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: -1
    },
    minLength: {
      type: Number,
      default: 0,
    },
    customValidation: Function,
  },
  methods: {
    twoWayBinding(event) {
      this.$emit('input', event.target.value);
    },
    onKeyUp(value, event) {
      this.setupIsInputDirty();
      this.formValidationHandler(value, event);
    },
    formValidationHandler(value, event) {
      this.runValidation(value, event);
      this.sendValidationForParent();
    },
    setupIsInputDirty() {
      this.inputValidation.isDirty = true;
    },
    runValidation(value, event) {
      this.inputValidation.isValid = this.requiredResult(value) &&
        this.customValidationResult(value, event) &&
        this.minLengthResult(value);
      this.cleanErrorMessageWhenInputIsValid();
    },
    cleanErrorMessageWhenInputIsValid() {
      if (this.inputValidation.isValid) { this.currentErrorMessage = ''; };
    },
    customValidationResult(value, event) {
      const customValidation = this.customValidation ? this.customValidation(value, event) : true;
      this.customValidationErrorMessage(customValidation)
      return customValidation;
    },
    customValidationErrorMessage(customValidation) {
      if (!customValidation) {
        this.currentErrorMessage = this.errorMessages.invalidValue;
      }
    },
    requiredResult(value) {
      const requiredResult = !this.required || value != '';
      this.requiredResultErrorMessage(requiredResult);
      return requiredResult;
    },
    requiredResultErrorMessage(requiredResult) {
      if (!requiredResult) {
        this.currentErrorMessage = this.errorMessages.requiredField;
      }
    },
    minLengthResult(value) {
      const minLengthResult = value.length >= this.minLength;
      this.minLengthErrorMessage(minLengthResult)
      return minLengthResult;
    },
    minLengthErrorMessage(minLengthResult) {
      if (!minLengthResult) {
        this.currentErrorMessage = this.errorMessages.minLength;
      }
    },
    sendValidationForParent() {
      this.$emit('input-validation', this.inputValidation);
    },
    typeValidationHandler() {
      const validTypes = ['text', 'email', 'password', 'number', 'textarea'];
      if (validTypes.includes(this.type)) {
        this.currentInputType = this.type;
      } else {
        throw new Error('TW Error: Wrong type passed as prop to input text!');
      }
    },
    currentNativeElementValidationHandler() {
      if (this.type === 'textarea') {
        this.currentNativeElement = 'textarea';
        this.textareaInitialValue = this.value;
      }
    }
  },
  mounted() {
    this.typeValidationHandler();
    this.currentNativeElementValidationHandler()
    this.formValidationHandler(this.value, {});
  }
};
</script>

