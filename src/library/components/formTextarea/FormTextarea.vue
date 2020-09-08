<template>
  <textarea
    ref="textarea"
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="tw-form-textarea form-control form-control-lg"
    :value="value"
    :maxlength="maxLength"
    :style="style"
    @input="onInput"
    @blur="onBlur"
    @keydown="onKeydown"
    v-dynamic-height="vDynamicHeightSetup()"></textarea>
</template>

<script>
import DynamicHeight from 'vue-dynamic-height';

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
  inject: {
    formVm: {
      default: null,
    },
    formFieldVm: {
      default: null,
    },
  },
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
  watch: {
    value() {
      this.triggerEventToDynamicHeight();
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
    vDynamicHeightSetup() {
      return { disabled: this.disableDynamicHeight };
    },
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
    focus() {
      this.$el.focus();
    },
    triggerEventToDynamicHeight() {
      this.$nextTick(() => {
        this.$refs.textarea.dispatchEvent(new Event('input'));
      });
    },
  },
  mounted() {
    initForm(this.value, this);
  },
  directives: {
    DynamicHeight,
  },
};
</script>
