<template>
  <div class="tw-form-inputs-list__container">
    <tw-form-field
      v-for="(item, index) in inputsList"
      :key="item.id"
      :label="`${label} ${index + 1}`">
      <div class="tw-form-inputs-list__input-wrapper">
        <tw-form-input
          :name="`${inputName}-${index}`"
          :value="item.value"
          :type="type"
          :maxLength="maxLength"
          :minLength="minLength"
          :placeholder="placeholder"
          :required="true"
          :inputsGroupKey="inputsGroupKey"
          :id="item.id"
          @input="onInput($event, index)"/>
          <tw-button
            size="lg"
            class="tw-form-inputs-list__delete-button"
            template="link"
            v-if="shouldShowDeleteButton(index)"
            @click="deleteInput(index)">&times;</tw-button>
        </div>
    </tw-form-field>
    <tw-gutter :top="false" :left="false" :right="false">
      <tw-button
        @click="addNewGoalInput"
        :block="true"
        :outline="true">+ Add {{label}}</tw-button>
    </tw-gutter>
  </div>
</template>

<script>
import {
  initForm,
  runValidation,
  setIsBlurred,
  setupInputHtmlId,
  setInputAndFormDirty,
} from '../../services/formHelpers/formHelpers';
import getUid from '../../services/uidGenerator/uidGenerator';
import twFormInput from '../formInput/formInput.vue';
import twButton from '../button/button.vue';

export default {
  name: 'tw-form-inputs-list',
  data() {
    return {
      id: getUid(),
      inputsList: [],
    };
  },
  inject: ['formVm'],
  mounted() {
    this.initFieldModel();
  },
  props: {
    inputName: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
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
    inputsGroupKey: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(value, index) {
      this.inputsList[index].value = value;
      this.$emit('input', this.inputsList);
    },
    initFieldModel() {
      if (this.value.length > 0) {
        this.inputsList = this.value;
        this.addIdWhenNoIdIsFound();
      } else {
        this.addNewGoalInput();
      }
    },
    addIdWhenNoIdIsFound() {
      this.inputsList.forEach(input => {
        if (!input.id) { input.id = getUid(); }
      });
    },
    addNewGoalInput() {
      this.inputsList.push(this.goalInputFactory());
    },
    goalInputFactory() {
      return {
        id: getUid(),
        value: '',
      };
    },
    deleteInput(index) {
      this.deleteInputModelFromFormVm(index);
      this.deleteInputFromLocalList(index);
    },
    deleteInputFromLocalList(index) {
      this.deleteItemFromList(this.inputsList, index);
    },
    deleteInputModelFromFormVm(index) {
      const idToBeRemoved = this.inputsList[index].id;
      const indexFormFieldToBeRemoved = this.getFormFieldIndexById(idToBeRemoved);
      this.deleteItemFromList(this.formVm.formFields, indexFormFieldToBeRemoved);
    },
    deleteItemFromList(list, itemIndex) {
      list.splice(itemIndex, 1);
    },
    getFormFieldIndexById(idToBeRemoved) {
      return this.formVm.formFields.findIndex(value => {
        value.input.id === idToBeRemoved;
      });
    },
    shouldShowDeleteButton(index) {
      return index !== 0;
    },
  },
  components: {
    twFormInput,
    twButton,
  },
};
</script>

<style lang="scss">
.tw-form-inputs-list__container {
  border-left: 5px solid #ced4da;
  padding-left: 15px;
}

.tw-form-inputs-list__input-wrapper {
  position: relative;
}

.tw-form-inputs-list__delete-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>