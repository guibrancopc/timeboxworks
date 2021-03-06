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
      return !this.formFields.some(formField => !formField.input.isValid);
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
      if (this.isValid) {
        this.$emit('submit', this.buildOutput());
      }
    },
    buildOutput() {
      return this.formFields.reduce((acumulator, formField) => {
        const { inputsGroupKey, name, value } = formField.input;
        if (inputsGroupKey) {
          initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey);
          pushHandler(acumulator[inputsGroupKey], formField);
        } else {
          acumulator[name] = value;
        }
        return acumulator;
      }, {});
    },
    onReset(event) {
      event.preventDefault();
      this.$twDialog.confirm({
        text: 'Are you sure you want to reset it at all?',
        confirmButtonTheme: 'danger',
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'Not anymore',
        callback: isConfirmed => {
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

function pushHandler(group = [], formField) {
  const { inputsSubGroupKey, name, value } = formField.input;
  const subGroupModel = findSubGroupModel(group, inputsSubGroupKey);

  if (subGroupModel) {
    subGroupModel[name] = value;
  } else {
    group.push({
      id: inputsSubGroupKey,
      [name]: value,
    });
  }
}

function findSubGroupModel(group, id) {
  return group.find(item => {
    if (item.id === id) { return item; }
    return false;
  });
}

function initInputGroupArrayWhenNeeded(acumulator, inputsGroupKey) {
  if (!Array.isArray(acumulator[inputsGroupKey])) {
    acumulator[inputsGroupKey] = [];
  }
}
</script>

<style lang="scss">
@import './Form.scss';
</style>
