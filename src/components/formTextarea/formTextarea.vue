<template>
  <textarea
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="form-control form-control-lg"
    :value="formFieldVm.input.value"
    :maxlength="maxLength"
    @input="onInput"
    @blur="onBlur"
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
import uidGenerator from '../../services/uidGenerator/uidGenerator';

const { getUid } = uidGenerator;

export default {
  name: 'tw-form-textarea',
  data() {
    return {
      id: getUid(),
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
    placeholder: {
      type: String,
      default: '',
    },
    dynamicMinHeight: {
      type: [Number, String],
      default: 100,
    },
    disableDynamicHeight: {
      type: Boolean,
      default: false,
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
    vDynamicHeightSetup() {
      return {
        minHeight: `${this.dynamicMinHeight}px`,
        disabled: this.disableDynamicHeight,
      };
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
