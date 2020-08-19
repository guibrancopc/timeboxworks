<template>
  <tw-modal
    :title="title"
    width="xs"
    ref="modal"
    :close-on-overlay-click="closeOnOverlayClick"
    :disable-close-button="disableCloseButton">
    {{ text }}
    <tw-button
      slot="footer"
      @click="onDismiss"
      outline
      :theme="cancelButtonTheme">
      {{ cancelButtonText }}
    </tw-button>
    <tw-button
      slot="footer"
      ref="confirmButton"
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
    disableCloseButton: Boolean,
    closeOnOverlayClick: Boolean,
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
    onDismiss() {
      this.$emit('confirmed', false);
      this.callback(false);
      this.$refs.modal.public().close();
    },
    onConfirm() {
      this.$emit('confirmed', true);
      this.callback(true);
      this.$refs.modal.public().close();
    },
    focusOnConfirmButton() {
      setTimeout(() => {
        this.$refs.confirmButton.$el.focus();
      }, 200);
    },
  },
  mounted() {
    this.focusOnConfirmButton();
  },
};
</script>
