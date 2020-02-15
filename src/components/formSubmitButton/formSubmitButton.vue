<template>
  <tw-button
    template="success"
    class="tw-form-submit-button"
    type="submit"
    :disabled="shouldDisable"
    size="lg">
    <slot>Submit</slot>
  </tw-button>
</template>

<script>
import TwButton from '../button/Button.vue';

export default {
  name: 'TwFormSubmitButton',
  components: {
    TwButton,
  },
  inject: ['formVm'],
  computed: {
    shouldDisable() {
      return !(this.formVm.isValid || this.formVm.allowSubmitWhenInvalid);
    },
  },
};
</script>
