<template>
  <div
    class="tw-form-field"
    :class="classes">
    <tw-label
      v-if="prependLabel"
      :for="input.htmlId"
      :text="label"
      :required="input.isRequired" />
    <slot />
    <tw-label
      v-if="appendLabel"
      :for="input.htmlId"
      :text="label"
      :required="input.isRequired" />
    <div class="tw-form-field__error-message">
      <small
        v-if="shouldShowErrorMessage"
        class="form-control__color--danger">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script>
import TwLabel from '../label/Label.vue';

export default {
  name: 'TwFormField',
  data() {
    return {
      isCheckInput: false,
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
      return {
        'form-control-invalid': this.shouldShowIndividualValidation,
      };
    },
    prependLabel() {
      return !this.isCheckInput;
    },
    appendLabel() {
      return this.isCheckInput;
    },
  },
  methods: {
    getInputValue() {
      return this.input.value;
    },
    setInputValue(value) {
      this.input.value = value;
    },
  },
  components: {
    TwLabel,
  },
};
</script>

<style lang="scss" scoped>
@import './FormField.scss';
</style>
