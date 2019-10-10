<template>
  <div class="form-group">
    <label :for="`input-text-${_uid}`">
      {{label}}
      <span v-if="required" class="required-star">*</span>
    </label>
    <input
      type="text"
      :id="`input-text-${_uid}`"
      class="form-control form-control-lg"
      :class="{'form-control-invalid': !inputValidation.isValid}"
      :value="value"
      :maxlength="maxLength"
      @input="twoWayBinding($event)"
      @keyup="onKeyUp(value, $event)" />
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
    label: {
      type: String,
      default: '',
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
      this.validationHandler(value, event);
    },
    validationHandler(value, event) {
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
    }
  },
  mounted() {
    this.validationHandler(this.value, {});
  }
};
</script>

<style scoped>
.required-star {
  color: #e24040;
}
</style>
