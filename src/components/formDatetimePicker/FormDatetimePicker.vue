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
    :value="formFieldVm.input.value"
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
import {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
} from '../../services/formHelpers/formHelpers';
import uidGenerator from '../../services/uidGenerator/uidGenerator';

const { getUid } = uidGenerator;
Settings.defaultLocale = 'en';

export default {
  name: 'TwFormDatetimePicker',
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
  methods: {
    onInput(value) {
      this.$emit('input', value);
      setInputAndFormDirty(this);
      runValidation(this.convertToEventFormat(value), this);
    },
    onClose() {
      setIsBlurred(this);
    },
    getInputHtmlId() {
      return setupInputHtmlId(this);
    },
    convertToEventFormat(value) {
      return { target: { value } };
    },
  },
  mounted() {
    initForm(this.value, this);
  },
  components: {
    Datetime,
  },
};
</script>

<style scoped>
  @import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
