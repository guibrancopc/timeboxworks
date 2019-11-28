<template>
  <Datetime
    :type="validatedType"
    :input-class="inputClasses()"
    :placeholder="placeholder"
    :minute-step="5"
    :input-id="`input-datetime-${_uid}`"
    :use12-hour="true"
    @input="onChangeEvent(scopedValue)"
    @close="onCloseEvent()"
    v-model="scopedValue">
      <template slot="button-confirm" slot-scope="scope">
        <span v-if='scope.step === "date"'>Next <span>&#8227;</span></span>
        <span v-else>Ok</span>
      </template>
  </Datetime>
</template>

<script>
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon';

Settings.defaultLocale = 'en';

export default {
  name: 'tw-input-datetime-picker',
  data() {
    return {
      inputValidation: {
        isValid: true,
        isDirty: false,
        shouldShowErrorMessages: false,
      },
      errorMessages: {
        requiredField: 'Campo obrigatório',
        invalidValue: 'Valor inválido',
      },
    };
  },
  props: {
    type: {
      type: String,
      default: 'date',
    },
    value: {
      type: String,
      default: new Date().toISOString(),
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    customValidation: Function,
  },
  computed: {
    validatedType() {
      const validTypes = ['datetime', 'date', 'time'];
      if (validTypes.includes(this.type)) { return this.type; }
      throw new Error('TW Error: Wrong type passed as prop to datetime input!');
    },
    scopedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  mounted() {
    this.formValidationHandler(this.scopedValue);
  },
  methods: {
    onChangeEvent(scopedValue) {
      this.formValidationHandler(scopedValue);
    },
    onCloseEvent() {
      this.setupIsInputDirty();
    },
    setupIsInputDirty() {
      this.inputValidation.isDirty = true;
    },
    formValidationHandler(scopedValue) {
      this.runValidation(scopedValue);
      this.sendValidationForParent();
    },
    runValidation(scopedValue) {
      this.inputValidation.isValid = this.requiredResult(scopedValue)
        && this.customValidationResult(scopedValue);
      this.setupErrorMessages();
      this.cleanErrorMessageWhenInputIsValid();
    },
    setupErrorMessages() {
      this.inputValidation.shouldShowErrorMessages = !this.inputValidation.isValid
        && this.inputValidation.isDirty;
    },
    cleanErrorMessageWhenInputIsValid() {
      if (this.inputValidation.isValid) { this.currentErrorMessage = ''; }
    },
    requiredResult(scopedValue) {
      const requiredResult = !this.required || scopedValue !== '';
      this.requiredResultErrorMessageSetup(requiredResult);
      return requiredResult;
    },
    requiredResultErrorMessageSetup(requiredResult) {
      if (!requiredResult) {
        this.currentErrorMessage = this.errorMessages.requiredField;
      }
    },
    customValidationResult(scopedValue) {
      const customValidation = this.customValidation ? this.customValidation(scopedValue) : true;
      this.customValidationErrorMessageSetup(customValidation);
      return customValidation;
    },
    customValidationErrorMessageSetup(customValidation) {
      if (!customValidation) {
        this.currentErrorMessage = this.errorMessages.invalidValue;
      }
    },
    sendValidationForParent() {
      this.$emit('input-validation', this.inputValidation);
    },
    inputClasses() {
      return {
        'form-control': true,
        'form-control-lg': true,
      };
    },
  },
  components: {
    Datetime,
  },
};
</script>

<style lang="scss">
  @import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
