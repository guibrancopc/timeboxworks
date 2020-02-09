<template>
  <input
    :type="currentInputType"
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="tw-form-input form-control form-control-lg"
    :value="inputValue"
    :maxlength="maxLength"
    @input="onInput"
    @blur="onBlur"
    @keydown="onKeydown"/>
</template>

<script>
import {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
} from '../../services/formHelpers/formHelpers';

export default {
  name: 'tw-form-input',
  inject: ['formVm', 'formFieldVm'],
  props: {
    id: {
      value: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
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
    maxLength: {
      type: Number,
      default: -1,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    inputsGroupKey: {
      type: String,
      default: '',
    },
    customValidation: Function,
    required: Boolean,
  },
  computed: {
    inputValue() {
      if (this.disableAutomaticValidationAndBinding) {
        return this.value;
      }
      return this.formFieldVm.input.value;
    },
    currentInputType() {
      const validTypes = ['text', 'email', 'password', 'number'];
      if (validTypes.includes(this.type)) { return this.type; }
      throw new Error('TW Error: Wrong type passed as prop to input text!');
    },
  },
  methods: {
    onInput(event) {
      if (event && event.target) {
        this.$emit('input', event.target.value);
        setInputAndFormDirty(this);
        runValidation(event, this);
      }
    },
    onBlur() {
      setIsBlurred(this);
    },
    onKeydown(event) {
      this.$emit('keydown', event);
    },
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
  },
  mounted() {
    initForm(this.value, this);
  },
};
</script>
