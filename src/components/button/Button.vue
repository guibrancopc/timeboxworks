<template>
  <button
    class="tw-button btn"
    :class="styleClasses"
    :type="type"
    @click="onClick($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TwButton',
  computed: {
    styleClasses() {
      return {
        disabled: this.disabled,
        'btn-block': this.block,
        [`btn-${this.size}`]: true,
        [this.templateClass]: true,
      };
    },
    templateClass() {
      return this.outlineTemplatePrefix + this.template;
    },
    outlineTemplatePrefix() {
      return this.outline ? 'btn-outline-' : 'btn-';
    },
  },
  props: {
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset']
          .includes(value);
      },
    },
    template: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
          'link',
        ].includes(value);
      },
    },
    size: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['sm', 'md', 'lg']
          .includes(value);
      },
    },
    outline: Boolean,
    block: Boolean,
    disabled: Boolean,
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
      this.shouldPreventDefault(event);
    },
    shouldPreventDefault(event) {
      const currentTypeUsesDefaultOption = ['submit', 'reset'].includes(this.type);
      if (this.disabled || !currentTypeUsesDefaultOption) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Button.scss';
</style>
