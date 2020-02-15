<template>
  <div class="tw-form-inputs-list">
    <tw-form-field
      v-for="(item, index) in inputsList"
      :key="item.id"
      :label="`${label} ${index + 1}`">
      <div class="tw-form-inputs-list__input-wrapper">
        <tw-form-input
          required
          :name="`${inputName}-${index}`"
          :value="item.value"
          :type="type"
          :maxLength="maxLength"
          :minLength="minLength"
          :placeholder="placeholder"
          :inputsGroupKey="inputsGroupKey"
          :id="item.id"
          @input="onInput($event, index)"
          @keydown="onKeydown($event, index)"/>
          <tw-button
            size="lg"
            class="tw-form-inputs-list__delete-button"
            template="link"
            v-if="shouldShowDeleteButton(index)"
            @click="deleteInput(index)">&times;</tw-button>
        </div>
    </tw-form-field>
    <tw-gutter bottom>
      <tw-button
        @click="addNewInput({ shouldFocus: true })"
        block outline>+ Add {{label}}</tw-button>
    </tw-gutter>
  </div>
</template>

<script>
import uidGenerator from '../../services/uidGenerator/uidGenerator';
import TwFormInput from '../formInput/FormInput.vue';
import TwButton from '../button/Button.vue';

const { getUid } = uidGenerator;

export default {
  name: 'TwFormInputsList',
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
        this.deleteInput(inputIndex);
      }
    },
    enterHotkeyHandler(event, inputIndex) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.addNewInput({ shouldFocus: true, inputEventIndex: inputIndex });
      }
    },
    deleteInput(index) {
      if (this.inputsList.length === 1) { return; }
      setDelayedFocus(getPreviousInputId(this.inputsList, index));
      this.deleteInputModelFromFormVm(index);
      this.deleteInputFromLocalList(index);
    },
    deleteInputModelFromFormVm(index) {
      const idToBeRemoved = this.inputsList[index].id;
      const indexFormFieldToBeRemoved = this.getFormFieldIndexById(idToBeRemoved);
      deleteItemFromList(this.formVm.formFields, indexFormFieldToBeRemoved);
    },
    deleteInputFromLocalList(index) {
      deleteItemFromList(this.inputsList, index);
    },
    getFormFieldIndexById(idToBeRemoved) {
      return this.formVm.formFields.findIndex(value => value.input.id === idToBeRemoved);
    },
    shouldShowDeleteButton(index) {
      return index !== 0;
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
      if (inputEventIndex !== undefined) {
        this.inputsList.splice(inputEventIndex + 1, 0, inputFactory(shouldFocus));
      } else {
        this.inputsList.push(inputFactory(shouldFocus));
      }
    },
  },
  components: {
    TwFormInput,
    TwButton,
  },
};

function setDelayedFocus(inputId) {
  setTimeout(() => {
    document.querySelector(`#input-${inputId}`).focus();
  }, 10);
}

function inputFactory(shouldFocus = false) {
  const inputId = getUid();
  if (shouldFocus) { setDelayedFocus(inputId); }
  return {
    id: inputId,
    value: '',
  };
}

function getPreviousInputId(inputsList, index) {
  return inputsList[index - 1] ? inputsList[index - 1].id : inputsList[1].id;
}

function deleteItemFromList(list, itemIndex) {
  list.splice(itemIndex, 1);
}
</script>

<style lang="scss">
@import './FormInputsList.scss';
</style>
