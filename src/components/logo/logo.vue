<template>
  <img
    :src="`img/logos/${currentLogo}`"
    :style="currentStyle"
    alt="Timebox Works Logo"
    class="tw__logo">
</template>

<script>
export default {
  name: 'tw-logo',
  data() {
    return {
      logos: {
        default: 'timebox-works_logo-default.png',
        rounded: 'timebox-works_logo-rounded.png',
        hourglass: 'timebox-works_logo-hourglass.png',
      },
    };
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    width: {
      type: String,
      default: '',
    },
  },
  computed: {
    currentLogo() {
      return this.logos[this.type];
    },
    currentStyle() {
      return this.width ? { width: this.width } : {};
    },
  },
};
</script>

<style lang="scss">
  .tw__logo {
    vertical-align: middle;
  }
</style>
