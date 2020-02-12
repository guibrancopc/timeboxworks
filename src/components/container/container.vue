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
    fullwidth: Boolean,
  },
  computed: {
    currentClasses() {
      return {
        container: !this.fullwidth,
        'container-fluid': this.fullwidth,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Container.scss';
</style>
