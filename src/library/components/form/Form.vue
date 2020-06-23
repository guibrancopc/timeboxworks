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
    enableSubmitButtonWhenInvalid: Boolean,
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
      this.isSubmitted = !!(this.enableSubmitButtonWhenInvalid || this.isValid);
    },
    emitSubmitEventWhenFormIsValid() {
      if (this.isValid) { this.$emit('submit', this.buildOutput()); }
    },
    buildOutput() {
      return this.formFields.reduce((acumulator, formField) => {
        const { inputsGroupKey, name, value } = formField.input;
        if (inputsGroupKey) {
          this.initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey);
          // acumulator[inputsGroupKey].push({ name, value });
          this.manageListItems(acumulator, formField);
        } else {
          acumulator[name] = value;
        }
        return acumulator;
      }, {});
    },
    initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey) {
      if (!Array.isArray(acumulator[inputsGroupKey])) {
        acumulator[inputsGroupKey] = [];
      }
    },
    manageListItems(acumulator, formField) {
      const {
        inputsGroupKey, inputsGroupId, name, value,
      } = formField.input;

      const inputsGroupList = acumulator[inputsGroupKey];

      const inputsGroupFound = inputsGroupList
        .find(inputsGroup => inputsGroup.id === inputsGroupId);

      if (inputsGroupFound) {
        inputsGroupFound[name] = value;
      } else {
        inputsGroupList.push({
          id: inputsGroupId,
          [name]: value,
        });
      }
    },
    onReset(event) {
      event.preventDefault();
      this.$twDialog.confirm({
        text: 'Are you sure you want to reset it at all?',
        confirmButtonTheme: 'danger',
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'Not anymore',
        callback: isConfirmed => {
          console.log('formFields', this.formFields);
          if (isConfirmed) {
            this.cleanFormUp();
            this.runResetCallbacks();
            this.$emit('reset');
          }
        },
      });
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
