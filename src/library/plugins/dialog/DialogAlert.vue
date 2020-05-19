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
    callback: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
      this.callback();
      this.$refs.modal.close();
    },
  },
};
</script>
