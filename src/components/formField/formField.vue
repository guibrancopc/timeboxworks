<template>
  <div
    class="tw-form-field__container form-group"
    :class="{'form-control-invalid': shouldShowIndividualValidation}">
    <label :for="input.htmlId">
      {{label}}
      <span
        v-if="input.isRequired"
        class="form-control__color--danger">*</span>
    </label>
    <slot />
    <div class="tw-form-field__error-message-container">
      <small
        v-if="shouldShowErrorMessage"
        class="form-control__color--danger">{{errorMessage}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-form-field',
  data() {
    return {
      errorMessage: '',
      input: {
        name: null,
        value: null,
        htmlId: null,
        isValid: false,
        isDirty: false,
        isRequired: false,
        isBlurred: false,
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
      return ((this.formVm && this.formVm.shouldShowAllValidations)
        || (this.input.isDirty && this.input.isBlurred))
        && !this.input.isValid;
    },
    shouldShowErrorMessage() {
      return this.shouldShowIndividualValidation && this.errorMessage;
    },
  },
};
</script>

<style lang="scss">
  .tw-form-field__container {
    margin: 0;
  }

  .tw-form-field__error-message-container {
    height: 25px;
  }
</style>
