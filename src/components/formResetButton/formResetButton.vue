<template>
  <tw-button :outline="true" type="reset" size="lg">
    <slot />
  </tw-button>
</template>

<script>
import twButton from '../button/button.vue';

export default {
  name: 'tw-form-reset-button',
  components: {
    twButton,
  },
};
</script>
