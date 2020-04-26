<template>
  <div
    :class="currentClasses"
    class="tw-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwContainer',
  props: {
    fullWidth: Boolean,
  },
  computed: {
    currentClasses() {
      return {
        container: !this.fullWidth,
        'container-fluid': this.fullWidth,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Container.scss';
</style>
