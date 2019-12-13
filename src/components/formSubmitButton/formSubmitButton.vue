<template>
  <tw-button template="success" type="submit" size="lg">
    <slot />
  </tw-button>
</template>

<script>
import twButton from '../button/button.vue';

export default {
  name: 'tw-form-submit-button',
  components: {
    twButton,
  },
};
</script>