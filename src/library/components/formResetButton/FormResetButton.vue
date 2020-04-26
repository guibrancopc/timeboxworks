<template>
  <tw-button
    outline
    class="tw-form-reset-button"
    type="reset"
    size="lg"
    @click="formVm.onReset">
    <slot>Reset</slot>
  </tw-button>
</template>

<script>
import TwButton from '../button/Button.vue';

export default {
  name: 'TwFormResetButton',
  inject: ['formVm'],
  components: {
    TwButton,
  },
};
</script>
