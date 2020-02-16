<template>
  <div
    class="tw-form-field form-group"
    :class="classes">
    <label :for="input.htmlId">
      {{ label }}
      <span
        v-if="input.isRequired"
        class="form-control__color--danger">*</span>
    </label>
    <slot />
    <div class="tw-form-field__error-message">
      <small
        v-if="shouldShowErrorMessage"
        class="form-control__color--danger">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwFormField',
  data() {
    return {
      errorMessage: '',
      input: {
        id: null,
        name: null,
        value: null,
        htmlId: null,
        isValid: false,
        isDirty: false,
        isRequired: false,
        isBlurred: false,
        inputsGroupKey: '',
      },
    };
  },
  inject: ['formVm'],
  provide() {
    return {
      formFieldVm: this,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    shouldShowIndividualValidation() {
      return ((this.formVm && this.formVm.isSubmitted && !this.formVm.isValid)
        || (this.input.isDirty && this.input.isBlurred))
        && !this.input.isValid;
    },
    shouldShowErrorMessage() {
      return !!(this.shouldShowIndividualValidation && this.errorMessage);
    },
    classes() {
      return { 'form-control-invalid': this.shouldShowIndividualValidation };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './FormField.scss';
</style>
