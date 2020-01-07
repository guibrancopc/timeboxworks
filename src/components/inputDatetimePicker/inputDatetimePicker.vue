<template>
  <Datetime
    :name="name"
    :type="validatedType"
    :input-class="inputClasses()"
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
  name: 'tw-input-datetime-picker',
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
    },
    value: {
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
    inputClasses() {
      return 'form-control form-control-lg';
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

<style lang="scss">
  @import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
