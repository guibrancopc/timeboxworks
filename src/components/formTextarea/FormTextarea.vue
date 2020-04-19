<template>
  <textarea
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="tw-form-textarea form-control form-control-lg"
    :value="formFieldVm.input.value"
    :maxlength="maxLength"
    :style="style"
    @input="onInput"
    @blur="onBlur"
    @keydown="onKeydown"
    v-dynamic-height="vDynamicHeightSetup()"
    v-double-return="vDoubleReturnSetup()" />
</template>

<script>
import DynamicHeight from '../../directives/dynamicHeight/dynamicHeight';
import DoubleReturn from '../../directives/doubleReturn/doubleReturn';

import {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
} from '../../services/formHelpers/formHelpers';

export default {
  name: 'TwFormTextarea',
  computed: {
    style() {
      return { 'min-height': `${this.minHeight}px` };
    },
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
    placeholder: {
      type: String,
      default: '',
    },
    minHeight: {
      type: Number,
      default: 100,
    },
    maxLength: {
      type: Number,
      default: -1,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    required: Boolean,
    disableDynamicHeight: Boolean,
    disableDoubleReturn: Boolean,
    customValidation: Function,
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
    vDynamicHeightSetup() {
      return { disabled: this.disableDynamicHeight };
    },
    vDoubleReturnSetup() {
      return { disabled: this.disableDoubleReturn };
    },
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
    focus() {
      this.$el.focus();
    },
  },
  mounted() {
    initForm(this.value, this);
  },
  directives: {
    DynamicHeight,
    DoubleReturn,
  },
};
</script>
