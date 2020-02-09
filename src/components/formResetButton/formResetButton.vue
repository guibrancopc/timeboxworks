<template>
  <tw-button
    outline
    class="tw-form-reset-button"
    type="reset"
    size="lg">
    <slot />
  </tw-button>
</template>

<script>
import TwButton from '../button/Button.vue';

export default {
  name: 'TwFormResetButton',
  components: {
    TwButton,
  },
};
</script>
