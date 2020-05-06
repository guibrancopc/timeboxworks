<template>
  <tw-modal title="Email template preview" ref="modal">
    <tw-heading size="md">Here goes the content</tw-heading>
    <tw-button slot="footer" theme="secondary" outline @click="onClose">Done</tw-button>
    <tw-button slot="footerRight" theme="success">Copy to clipboard</tw-button>
  </tw-modal>
</template>

<script>
export default {
  name: 'TwTemplatePreviewModal',
  methods: {
    onClose() {
      this.$refs.modal.close();
    },
  },
};
</script>
