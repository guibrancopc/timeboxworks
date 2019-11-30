<template>
  <component :is="currentNativeElement"
    :type="currentInputType"
    :placeholder="placeholder"
    :name="name"
    :id="getInputHtmlId()"
    class="form-control form-control-lg"
    :value="formFieldVm.input.value"
    :maxlength="maxLength"
    @input="onInput"
    @blur="onBlur"
    v-dynamic-height="vDynamicHeightSetup()">{{textareaInitialValue}}</component>
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
  name: 'tw-input-text',
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
    dynamicMinHeight: {
      type: [Number, String],
      default: 100,
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
    currentNativeElement() {
      if (this.isTypeTextarea()) {
        return 'textarea';
      }
      return 'input';
    },
    currentInputType() {
      const validTypes = ['text', 'email', 'password', 'number', 'textarea'];
      if (validTypes.includes(this.type)) { return this.type; }
      throw new Error('TW Error: Wrong type passed as prop to input text!');
    },
    textareaInitialValue: {
      get() {
        if (this.isTypeTextarea()) { return this.formFieldVm.input.value; }
        return '';
      },
      set(newValue) {
        this.formFieldVm.input.value = newValue;
      }
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
    vDynamicHeightSetup() {
      return {
        minHeight: `${this.dynamicMinHeight}px`,
        disabled: !this.isTypeTextarea(),
      };
    },
    isTypeTextarea() {
      return this.type === 'textarea';
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
