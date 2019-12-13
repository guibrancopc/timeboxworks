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
import getUid from '../../services/uidGenerator/uidGenerator';

export default {
  name: 'tw-form-input',
  data() {
    return {
      localId: getUid(),
    };
  },
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
    inputsGroupKey: {
      type: String,
      default: '',
    },
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
    computedId() {
      return this.id ? this.id : this.localId;
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
