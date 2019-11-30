<template>
  <tw-button template="success" type="submit">
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