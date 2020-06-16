<template>
  <div class="tw-form-inputs-list">
    <tw-form-field
      v-for="(item, index) in inputsList"
      :key="item.id"
      :label="`${label} ${index + 1}`">
      <div class="tw-form-inputs-list__input-wrapper">
        <tw-form-input
          required
          :ref="`formInput-${item.id}`"
          :id="item.id"
          :name="`${inputName}-${index}`"
          :value="item.value"
          :type="type"
          :maxLength="maxLength"
          :minLength="minLength"
          :placeholder="placeholder"
          :inputsGroupKey="inputsGroupKey"
          @input="onInput($event, index)"
          @keydown="onKeydown($event, index)"/>
          <tw-button
            size="lg"
            class="tw-form-inputs-list__delete-button"
            theme="link"
            v-if="inputsListHasMoreThanOneItem()"
            @click="deleteInputWithDelayedFocus(index)">&times;</tw-button>
        </div>
    </tw-form-field>
    <div class="tw-u-margin--bottom">
      <tw-button
        class="tw-form-inputs-list__add-button"
        @click="addNewInput({ shouldFocus: true })"
        block outline>+ Add {{label}}</tw-button>
    </div>
  </div>
</template>

<script>
import {
  removeFormFieldByInputId,
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
      inputsList: [],
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
  methods: {
    onInput(value, index) {
      this.inputsList[index].value = value;
      this.$emit('input', this.inputsList);
    },
    onKeydown(event, inputIndex) {
      this.backspaceHotkeyHandler(event, inputIndex);
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
      this.deleteInputModelFromFormVm(index);
      this.deleteInputFromLocalList(index);
      return true;
    },
    deleteInputModelFromFormVm(index) {
      const itemId = this.inputsList[index].id;
      removeFormFieldByInputId({
        scope: this.$refs[`formInput-${itemId}`][0],
        inputIdToBeRemoved: itemId,
      });
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
        this.inputsList = [...this.value];
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
  };
}

function getPreviousInputId(inputsList, index) {
  return inputsList[index - 1] ? inputsList[index - 1].id : inputsList[0].id;
}
</script>

<style lang="scss">
@import './FormInputsList.scss';
</style>
