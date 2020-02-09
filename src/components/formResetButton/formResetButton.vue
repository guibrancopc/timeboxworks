<template>
  <tw-button outline type="reset" size="lg">
    <slot />
  </tw-button>
</template>

<script>
import twButton from '../button/Button.vue';

export default {
  name: 'tw-form-reset-button',
  components: {
    twButton,
  },
};
</script>
