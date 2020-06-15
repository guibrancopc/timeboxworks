<template>
  <tw-modal
    :title="title"
    width="xs"
    ref="modal"
    footer-justify-content="flex-end"
    :disable-close-button="disableCloseButton"
    @closed="onClose">
    {{ text }}
    <tw-button
      slot="footer"
      ref="okButton"
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
    focusOnOkButton() {
      setTimeout(() => {
        this.$refs.okButton.$el.focus();
      }, 200);
    },
  },
  mounted() {
    this.focusOnOkButton();
  },
};
</script>
