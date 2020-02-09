<template>
  <tw-button
    template="success"
    class="tw-form-submit-button"
    type="submit"
    size="lg">
    <slot />
  </tw-button>
</template>

<script>
import TwButton from '../button/Button.vue';

export default {
  name: 'TwFormSubmitButton',
  components: {
    TwButton,
  },
};
</script>
