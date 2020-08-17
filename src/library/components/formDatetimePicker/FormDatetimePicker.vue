<template>
  <Datetime
    :name="name"
    :type="type"
    class="tw-form-datetime-picker"
    input-class="form-control form-control-lg"
    :placeholder="placeholder"
    :minute-step="5"
    :input-id="getInputHtmlId(this)"
    :use12-hour="false"
    :format="format"
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
import { getISOStringOf } from '../../services/timeService/timeService';

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
    format: String,
    required: Boolean,
    customValidation: Function,
  },
  computed: {
    valueModel() {
      const { value, formFieldVm } = this;
      return value || formFieldVm.input.value;
    },
  },
  methods: {
    onInput(rawValue) {
      const value = getValidData(rawValue);
      this.$emit('input', value);
      setInputAndFormDirty(this);
      this.runValidation(value);
    },
    runValidation(value) {
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

function getValidData(data) {
  return data ? getISOFormatWithOffset(data) : null;
}

function getISOFormatWithOffset(value) {
  return getISOStringOf(value);
}

function convertToEventFormat(value) {
  return { target: { value } };
}
</script>

<style lang="scss" scoped>
  @import "../../../../node_modules/vue-datetime/dist/vue-datetime.css";

  .tw-form-datetime-picker {
    /deep/ .vdatetime-popup__header {
      background-color: var(--blue);
    }

    /deep/ .vdatetime-calendar__month__day--selected > span > span,
    /deep/ .vdatetime-calendar__month__day--selected:hover > span > span {
      background-color: var(--blue);
    }

    /deep/ .vdatetime-popup__actions__button,
    /deep/ .vdatetime-time-picker__item--selected {
      color: var(--blue);
    }
  }
</style>
