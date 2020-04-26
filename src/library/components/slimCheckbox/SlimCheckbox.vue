<template>
  <button
    class="tw-slim-checkbox"
    :class="classes"
    @click="onClick">
    <tw-checkbox
      ref="checkbox"
      :disabled="disabled"
      :label="label"
      :value="value"
      @input="onInput" />
  </button>
</template>

<script>
import TwCheckbox from '../checkbox/Checkbox.vue';

export default {
  name: 'TwSlimCheckbox',
  components: {
    TwCheckbox,
  },
  beforeMount() {
    this.isCheckboxActive = this.value;
  },
  data() {
    return {
      isCheckboxActive: false,
    };
  },
  props: {
    label: String,
    value: Boolean,
    disabled: Boolean,
  },
  computed: {
    classes() {
      return {
        'tw-slim-checkbox--active': this.isCheckboxActive,
        'tw-slim-checkbox--disabled': this.disabled,
      };
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
      this.isCheckboxActive = value;
    },
    onClick(event) {
      event.stopPropagation();
      this.$refs.checkbox.onLabelClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.tw-slim-checkbox {
  font-size: inherit;
  outline: none;
  border: var(--border);
  background-color: var(--white);
  border-radius: var(--border-radius);
  line-height: initial;
  padding: 5px;

  &, & /deep/ * {
    cursor: pointer;
  }
  &.tw-slim-checkbox--active {
    background-color: var(--gray-light);
  }
  &.tw-slim-checkbox--disabled {
    &, & /deep/ * {
      cursor: not-allowed;
    }
  }
}
</style>
