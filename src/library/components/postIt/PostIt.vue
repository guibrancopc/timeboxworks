<template>
  <tw-card
    theme="info"
    class="tw-post-it tw-u-display--inline-block tw-u-position--relative">
    <tw-close-button
      v-if="!isEditionMode"
      @close="onDelete"/>
    <textarea
      ref="textarea"
      v-if="isEditionMode"
      class="tw-post-it__textarea form-control"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    ></textarea>
    <button
      v-else
      class="tw-post-it__read-mode tw-u-display--flex tw-u-justify-content--flex-start"
      @click="enableEdittionMode"
    >
      {{ finalValue }}
    </button>
  </tw-card>
</template>

<script>
import TwCloseButton from '../closeButton';

const MAX_SHOWN_VALUE_LENGTH = 70;

export default {
  name: 'TwPostIt',
  data() {
    return {
      isEditionMode: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    prefix: Boolean,
  },
  computed: {
    finalValue() {
      return `${this.prefix || ''}${this.truncatedValue}`;
    },
    truncatedValue() {
      if (this.value.length > MAX_SHOWN_VALUE_LENGTH) {
        return `${this.value.substring(0, 70)}...`;
      }
      return this.value;
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    onBlur(event) {
      this.$emit('textarea-blurred', event);
      this.disableEditionMode();
    },
    onDelete() {
      this.$emit('deleted');
    },
    disableEditionMode() {
      this.isEditionMode = false;
    },
    enableEdittionMode() {
      this.isEditionMode = true;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    enableEditionModeWhenTextareaIsEmpty() {
      this.isEditionMode = !this.value;
    },
  },
  beforeMount() {
    this.enableEditionModeWhenTextareaIsEmpty();
  },
  components: {
    TwCloseButton,
  },
};
</script>

<style lang="scss" scoped>
.tw-post-it {
  width: 200px;
  height: 150px;
  vertical-align: top;
  transition: 300ms;
  &:hover {
    border-bottom-right-radius: 15px;
    box-shadow: 3px 3px 10px #ddd;
  }
}

.tw-post-it__textarea {
  padding: 5px;
  height: 120px;
}

.tw-post-it__read-mode {
  background-color: transparent;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  text-align: left;
  margin: 0;
  padding: 5px;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 120px;
  line-height: 20px;
}
</style>
