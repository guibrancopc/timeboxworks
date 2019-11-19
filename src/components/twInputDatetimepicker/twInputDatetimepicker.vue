<template>
  <Datetime
    type="datetime"
    class="form-group"
    :input-class="styleClasses"
    :placeholder="placeholder"
    :minute-step="5"
    :input-id="`input-datetime-${_uid}`"
    @input="onChangeEvent(scopedValue)"
    @close="onCloseEvent()"
    v-model="scopedValue">
      <label
        slot="before"
        :for="`input-datetime-${_uid}`">
        {{label}}
        <span v-if="required" class="form-control__color--danger">*</span>
      </label>
      <small
        slot="after"
        v-if="inputValidation.shouldShowErrorMessages"
        class="form-control__color--danger">
        {{currentErrorMessage}}
      </small>
      <template slot="button-confirm" slot-scope="scope">
        <span v-if='scope.step === "date"'>Next <span>&#8227;</span></span>
        <span v-else>Ok</span>
      </template>
  </Datetime>
</template>

<script>
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon';

Settings.defaultLocale = 'pt';

export default {
  name: 'twInputDatetimepicker',
  data() {
    return {
      scopedValue: '',
      currentErrorMessage: '',
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
    customValidation: {
      type: Function,
    },
  },
  computed: {
    styleClasses() {
      return {
        'form-control': true,
        'form-control-lg': true,
        'form-control-invalid': this.inputValidation.shouldShowErrorMessages,
      };
    },
  },
  mounted() {
    this.bindValueProp();
    this.formValidationHandler(this.scopedValue);
  },
  methods: {
    bindValueProp() {
      this.scopedValue = this.value;
    },
    onChangeEvent(scopedValue) {
      this.twoWayBinding(scopedValue);
      this.formValidationHandler(scopedValue);
    },
    onCloseEvent() {
      this.setupIsInputDirty();
    },
    twoWayBinding(scopedValue) {
      this.$emit('input', scopedValue);
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
  },
  components: {
    Datetime,
  },
};
</script>

<style lang="scss">
  @import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
