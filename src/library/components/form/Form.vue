<template>
  <form
    novalidate
    class="tw-form"
    @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'TwForm',
  props: {
    allowSubmitWhenInvalid: Boolean,
  },
  data() {
    return {
      isDirty: false,
      isSubmitted: false,
      formFields: [],
      resetCallbacks: [],
    };
  },
  provide() {
    return {
      formVm: this,
    };
  },
  computed: {
    isValid() {
      return !this.formFields.some(formField => formField.input.isRequired
        && !formField.input.isValid);
    },
  },
  methods: {
    onSubmit() {
      this.updateIsSubmittedFlagWhenAllowed();
      this.emitSubmitEventWhenFormIsValid();
    },
    updateIsSubmittedFlagWhenAllowed() {
      this.isSubmitted = !!(this.allowSubmitWhenInvalid || this.isValid);
    },
    emitSubmitEventWhenFormIsValid() {
      if (this.isValid) { this.$emit('submit', this.buildOutput()); }
    },
    buildOutput() {
      return this.formFields.reduce((acumulator, formField) => {
        const { inputsGroupKey, name, value } = formField.input;
        if (inputsGroupKey) {
          this.initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey);
          acumulator[inputsGroupKey].push({ name, value });
        } else {
          acumulator[formField.input.name] = formField.input.value;
        }
        return acumulator;
      }, {});
    },
    initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey) {
      if (!Array.isArray(acumulator[inputsGroupKey])) {
        acumulator[inputsGroupKey] = [];
      }
    },
    onReset(event) {
      const resetIsConfirmed = this.$twDialog.confirm('Are you sure you want to reset it at all?');
      if (resetIsConfirmed) {
        this.cleanFormUp();
        this.runResetCallbacks();
        this.$emit('reset');
      } else {
        event.preventDefault();
      }
    },
    cleanFormUp() {
      this.isDirty = false;
      this.isSubmitted = false;
      this.formFields.forEach(formField => {
        formField.resetInputState();
      });
    },
    runResetCallbacks() {
      this.resetCallbacks.forEach(resetCallback => {
        if (typeof resetCallback === 'function') {
          resetCallback();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import './Form.scss';
</style>