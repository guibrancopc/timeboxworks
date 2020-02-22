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
    v-dynamic-height="vDynamicHeightSetup()" />
</template>

<script>
import dynamicHeight from '../../directives/dynamicHeight/dynamicHeight';
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
    disableDynamicHeight: Boolean,
    required: Boolean,
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
  },
  mounted() {
    initForm(this.value, this);
  },
  directives: {
    dynamicHeight,
  },
};
</script>
