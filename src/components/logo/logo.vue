<template>
  <img
    :src="currentLogo"
    :style="currentStyle"
    alt="Timebox Works Logo"
    class="tw-logo">
</template>

<script>
import defaultLogo from '../../assets/images/logos/timebox-works_logo-default.png';
import roundedLogo from '../../assets/images/logos/timebox-works_logo-rounded.png';
import hourglassLogo from '../../assets/images/logos/timebox-works_logo-hourglass.png';

const logos = {
  default: defaultLogo,
  rounded: roundedLogo,
  hourglass: hourglassLogo,
};

export default {
  name: 'TwLogo',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => !!logos[value],
    },
    width: Number,
  },
  computed: {
    currentLogo() {
      return logos[this.type];
    },
    currentStyle() {
      return this.width ? { width: `${this.width}px` } : {};
    },
  },
};
</script>

<style>
  .tw-logo {
    vertical-align: middle;
  }
</style>
