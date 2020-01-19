<template>
  <img
    :src="`${currentLogo}`"
    :style="currentStyle"
    alt="Timebox Works Logo"
    class="tw-logo">
</template>

<script>
import defaultLogo from '../../assets/images/logos/timebox-works_logo-default.png';
import roundedLogo from '../../assets/images/logos/timebox-works_logo-rounded.png';
import hourglassLogo from '../../assets/images/logos/timebox-works_logo-hourglass.png';

export default {
  name: 'tw-logo',
  data() {
    return {
      logos: {
        default: defaultLogo,
        rounded: roundedLogo,
        hourglass: hourglassLogo,
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
