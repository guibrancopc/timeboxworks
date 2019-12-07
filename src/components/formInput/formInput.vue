<template>
  <input
    :type="currentInputType"
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="form-control form-control-lg"
    :value="formFieldVm.input.value"
    :maxlength="maxLength"
    @input="onInput"
    @blur="onBlur"/>
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
  data() {
    return {
    };
  },
  inject: ['formVm', 'formFieldVm'],
  props: {
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
    required: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: -1,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    customValidation: Function,
  },
  computed: {
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
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
  },
  mounted() {
    initForm(this.value, this);
  },
};
</script>
