<template>
  <img :src="`img/logos/${currentLogo}`" alt="Timebox Works Logo">
</template>

<script>
export default {
  name: 'twLogo',
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
  },
  computed: {
    currentLogo() {
      return this.logos[this.type];
    },
  },
};
</script>
