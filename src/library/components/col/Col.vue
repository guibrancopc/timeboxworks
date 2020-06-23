<template>
  <div
    :style="styles"
    class="tw-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwCol',
  props: {
    size: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    styles() {
      return {
        'flex-grow': this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Col.scss';
</style>
