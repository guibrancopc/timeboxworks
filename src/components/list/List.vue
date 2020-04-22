<template>
  <component
    :is="wrapperElement"
    :class="classes"
    class="tw-list">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'TwList',
  props: {
    type: {
      type: String,
      default: 'clean',
      validator(value) {
        return ['clean', 'ordered', 'bullet'].includes(value);
      },
    },
    showMarks: Boolean,
  },
  computed: {
    wrapperElement() {
      return this.type === 'ordered' ? 'ol' : 'ul';
    },
    shouldHideMarks() {
      return !(this.showMarks || this.type === 'ordered');
    },
    classes() {
      return {
        'tw-list--no-marks': this.shouldHideMarks,
      };
    },
  },
};
</script>

<style scoped>
.tw-list {
  padding-left: 20px;
}

.tw-list--no-marks {
  list-style-type: none;
}
</style>
