<template>
  <tw-modal
    :title="title"
    width="xs"
    ref="modal"
    :disable-close-button="disableCloseButton"
    @closed="onClose">
    {{ text }}
    <tw-button
      slot="footer"
      @click="onCloseInternal"
      :theme="buttonTheme">
      {{ buttonText }}
    </tw-button>
  </tw-modal>
</template>

<script>
export default {
  name: 'TwDialogAlert',
  props: {
    title: String,
    text: String,
    buttonTheme: String,
    buttonText: {
      type: String,
      default: 'Ok',
    },
    disableCloseButton: Boolean,
    callback: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onClose() {
      this.$emit('closed');
      this.callback();
    },
    onCloseInternal() {
      this.$refs.modal.public().close();
    },
  },
};
</script>
