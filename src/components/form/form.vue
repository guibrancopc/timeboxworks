<template>
  <form
    @submit.prevent="onSubmit"
    @reset="onReset"
    novalidate="true">
    <slot></slot>
  </form>
</template>

<script>
import { initForm } from '../../services/formHelpers/formHelpers';

export default {
  name: 'tw-form',
  data() {
    return {
      isDirty: false,
      isSubmitted: false,
      formFields: [],
    };
  },
  provide() {
    return {
      formVm: this,
    };
  },
  computed: {
    shouldShowAllValidations() {
      return this.isSubmitted && !this.isValid;
    },
  },
  methods: {
    onSubmit() {
      this.isSubmitted = true;
      if (this.isFormValid()) {
        this.$emit('submit', this.buildOutput()); 
      }
    },
    isFormValid() {
      return !this.formFields.some(formField => !formField.input.isValid );
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
      const confirmMessage = "Are you sure about reset form?";
      if (confirm(confirmMessage)) {
        this.resetForm();
      } else {
        event.preventDefault();
      }
    },
    resetForm() {
      this.isDirty = false;
      this.isSubmitted = false;
      this.formFields.forEach((formField) => {
        initForm(null, formField.$children[0]);
        formField.input.value = null;
        formField.input.isBlurred = false;
        formField.input.dirty = false;
      });
    }
  },
};
</script>

<style>
  .form-control {
    display: block;
    width: 100%;
    min-height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .form-control-invalid .form-control {
    border: solid 1px #e24040;
  }

  .form-control-invalid .form-control:focus {
    border-color: #e24040;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(253, 13, 13, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(253, 13, 13, 0.25);
  }

  .form-control__color--danger {
    color: #e24040;
  }

  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
  }

  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }

  .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }

  .form-control::-webkit-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-control::-moz-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-control:-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-control::-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-control::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-control:disabled, .form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
  }

  .form-control-plaintext {
    display: block;
    width: 100%;
    padding: 0.375rem 0;
    margin-bottom: 0;
    line-height: 1.5;
    color: #212529;
    background-color: transparent;
    border: solid transparent;
    border-width: 1px 0;
  }

  .form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {
    padding-right: 0;
    padding-left: 0;
  }

  .form-control-sm {
    min-height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
  }

  .form-control-lg {
    min-height: calc(1.5em + 1rem + 2px);
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
  }

  textarea.form-control {
    resize: none;
  }
</style>
