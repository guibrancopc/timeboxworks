<template>
  <Datetime
    :name="name"
    :type="type"
    class="tw-form-datetime-picker"
    input-class="form-control form-control-lg"
    :placeholder="placeholder"
    :minute-step="5"
    :input-id="getInputHtmlId(this)"
    :use12-hour="true"
    :value="valueModel"
    @input="onInput"
    @close="onClose">
      <template slot="button-confirm" slot-scope="scope">
        <span v-if='scope.step === "date"'>Next <span>&#8227;</span></span>
        <span v-else>Ok</span>
      </template>
  </Datetime>
</template>

<script>
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon';
import Time from '../../services/timeService/timeService';

import {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
} from '../../services/formHelpers/formHelpers';

Settings.defaultLocale = 'en';

export default {
  name: 'TwFormDatetimePicker',
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
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['datetime', 'date', 'time']
          .includes(value);
      },
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: Boolean,
    customValidation: Function,
  },
  computed: {
    valueModel() {
      if (this.value) { return this.value; }
      return this.formFieldVm.input.value;
    },
  },
  methods: {
    onInput(rawValue) {
      const value = getISOFormatWithOffset(rawValue);
      this.$emit('input', value);
      setInputAndFormDirty(this);
      runValidation(convertToEventFormat(value), this);
    },
    onClose() {
      setIsBlurred(this);
    },
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
  },
  mounted() {
    initForm(this.value, this);
  },
  components: {
    Datetime,
  },
};

function getISOFormatWithOffset(value) {
  return Time.convertToISOString(value);
}

function convertToEventFormat(value) {
  return { target: { value } };
}
</script>

<style scoped>
  @import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
