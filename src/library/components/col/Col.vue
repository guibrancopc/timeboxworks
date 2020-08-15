<template>
  <div class="tw-col" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwCol',
  props: {
    grow: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    styles() {
      return {
        'flex-grow': this.grow,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Col.scss';
</style>
