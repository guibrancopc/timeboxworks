<template>
  <input
    :type="type"
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
import { getUid } from '../../services/uidGenerator/uidGenerator';

export default {
  name: 'TwFormInput',
  inject: ['formVm', 'formFieldVm'],
  props: {
    id: {
      value: Number,
      default: -1,
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
      validator(value) {
        return ['text', 'email', 'password', 'number']
          .includes(value);
      },
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
      return this.formFieldVm.input.value;
    },
    computedId() {
      return this.id > 0 ? this.id : getUid();
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
