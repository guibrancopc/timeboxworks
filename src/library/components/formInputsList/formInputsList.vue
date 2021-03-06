<template>
  <div class="tw-form-inputs-list">
    <tw-row
      class="tw-form-inputs-list--item"
      v-for="(item, index) in inputsList"
      :key="item.id">
      <tw-col :grow="9">
        <tw-form-field
          :label="`${label} ${index + 1}`">
          <div class="tw-form-inputs-list__input-wrapper">
            <tw-form-input
              required
              name="name"
              :id="item.id"
              :value="item.name"
              :type="type"
              :maxLength="maxLength"
              :minLength="minLength"
              :placeholder="placeholder"
              :inputsGroupKey="inputsGroupKey"
              :inputsSubGroupKey="item.id"
              @input="onGoalInput($event, index)"
              @keydown="onFirstFieldKeydown($event, index)" />
            </div>
        </tw-form-field>
      </tw-col>
      <tw-col :grow="2">
        <tw-form-field
          label="Weight">
          <div class="tw-form-inputs-list__input-wrapper">
            <tw-form-input
              name="weight"
              :value="item.weight"
              type="number"
              placeholder="1"
              :customValidation="weightValidator"
              :inputsGroupKey="inputsGroupKey"
              :inputsSubGroupKey="item.id"
              @input="onWeightInput($event, index)"
              @keydown="onSecondFieldKeydown($event, index)"/>
            </div>
        </tw-form-field>
      </tw-col>
      <tw-col :grow="1">
        <tw-button
          size="lg"
          class="tw-form-inputs-list__delete-button"
          theme="link"
          :disabled="!inputsListHasMoreThanOneItem()"
          @click="deleteInputWithDelayedFocus(index)">&times;</tw-button>
      </tw-col>
    </tw-row>
    <div class="tw-u-margin--bottom">
      <tw-button
        class="tw-form-inputs-list__add-button"
        @click="addNewInput({ shouldFocus: true })"
        block outline>+ Add {{label}}</tw-button>
    </div>
  </div>
</template>

<script>
/**
 * This component need refactory to extract business logic and keep being generic
 * Issue #5
 */

import {
  deleteItemFromListByIndex,
} from '../../services/formHelpers/formHelpers';
import { getUid } from '../../services/uidGenerator/uidGenerator';
import TwFormInput from '../formInput/FormInput.vue';
import TwButton from '../button/Button.vue';
import TwFormField from '../formField/FormField.vue';

export default {
  name: 'TwFormInputsList',
  components: {
    TwFormInput,
    TwButton,
    TwFormField,
  },
  data() {
    return {
      id: getUid(),
    };
  },
  props: {
    inputName: {
      type: String,
      required: true,
    },
    inputsGroupKey: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      default: () => ([]),
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: Boolean,
    maxLength: {
      type: Number,
      default: -1,
    },
    minLength: {
      type: Number,
      default: 0,
    },
  },
  inject: ['formVm'],
  beforeMount() {
    this.setupResetCallback();
  },
  mounted() {
    this.initFieldModel();
  },
  computed: {
    inputsList() { return this.value; },
  },
  methods: {
    weightValidator(item) {
      return !item || item > 0 || 'Value must be positive';
    },
    onGoalInput(value, index) {
      this.inputsList[index].value = value;
      this.$emit('input', this.inputsList);
    },
    onWeightInput(weight, index) {
      this.$set(this.inputsList[index], 'weight', Number(weight));
      this.$emit('input', this.inputsList);
    },
    onFirstFieldKeydown(event, inputIndex) {
      this.backspaceHotkeyHandler(event, inputIndex);
      this.enterHotkeyHandler(event, inputIndex);
    },
    onSecondFieldKeydown(event, inputIndex) {
      this.enterHotkeyHandler(event, inputIndex);
    },
    backspaceHotkeyHandler(event, inputIndex) {
      if (event.key === 'Backspace' && !event.target.value) {
        this.deleteInputWithDelayedFocus(inputIndex);
      }
    },
    enterHotkeyHandler(event, inputIndex) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.addNewInput({ shouldFocus: true, inputEventIndex: inputIndex });
      }
    },
    deleteInputWithDelayedFocus(index) {
      if (this.deleteInput(index)) {
        this.setInputFocus(index);
      }
    },
    setInputFocus(index) {
      setInputFocus(getPreviousInputId(this.inputsList, index));
    },
    deleteInput(index) {
      if (!this.inputsListHasMoreThanOneItem()) { return false; }
      this.deleteInputFromLocalList(index);
      return true;
    },
    deleteInputFromLocalList(itemIndex) {
      deleteItemFromListByIndex({
        list: this.inputsList,
        itemIndex,
      });
    },
    inputsListHasMoreThanOneItem() {
      return this.inputsList.length > 1;
    },
    initFieldModel() {
      if (this.value.length > 0) {
        this.addIdWhenNoIdIsFound();
      } else {
        this.addNewInput();
      }
    },
    addIdWhenNoIdIsFound() {
      this.inputsList.forEach(input => {
        if (!input.id) { input.id = getUid(); }
      });
    },
    addNewInput({ shouldFocus, inputEventIndex } = {}) {
      if (inputEventIndex === undefined) {
        this.inputsList.push(inputFactory(shouldFocus));
      } else {
        this.inputsList.splice(inputEventIndex + 1, 0, inputFactory(shouldFocus));
      }
    },
    resetCallback() {
      while (this.inputsListHasMoreThanOneItem()) {
        this.deleteInput(0);
      }
      this.setInputFocus(0);
    },
    setupResetCallback() {
      this.formVm.resetCallbacks.push(this.resetCallback);
    },
  },
};

function setInputFocus(inputId) {
  setTimeout(() => {
    document.querySelector(`#input-${inputId}`).focus();
  }, 10);
}

function inputFactory(shouldFocus = false) {
  const inputId = getUid();
  if (shouldFocus) { setInputFocus(inputId); }
  return {
    id: inputId,
    value: '',
    weight: null,
  };
}

function getPreviousInputId(inputsList, index) {
  return inputsList[index - 1] ? inputsList[index - 1].id : inputsList[0].id;
}
</script>

<style lang="scss" scoped>
@import './FormInputsList.scss';
</style>
