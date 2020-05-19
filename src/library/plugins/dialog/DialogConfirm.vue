<template>
  <tw-modal
    :title="title"
    width="xs"
    ref="modal"
    disable-close-button>
    {{ text }}
    <tw-button
      slot="footer"
      @click="onClose"
      outline
      :theme="cancelButtonTheme">
      {{ cancelButtonText }}
    </tw-button>
    <tw-button
      slot="footer"
      @click="onConfirm"
      :theme="confirmButtonTheme">
      {{ confirmButtonText }}
    </tw-button>
  </tw-modal>
</template>

<script>
export default {
  name: 'TwDialogConfirm',
  props: {
    text: String,
    title: String,
    callback: {
      type: Function,
      required: true,
    },
    cancelButtonTheme: {
      type: String,
      default: 'secondary',
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    confirmButtonTheme: {
      type: String,
      default: 'primary',
    },
    confirmButtonText: {
      type: String,
      default: 'Confirm',
    },
  },
  methods: {
    onClose() {
      this.$emit('is-confirmed', false);
      this.callback(false);
      this.$refs.modal.close();
    },
    onConfirm() {
      this.$emit('is-confirmed', true);
      this.callback(true);
      this.$refs.modal.close();
    },
  },
};
</script>
