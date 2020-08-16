<template>
  <tw-footer justify-content="space-between">
    <tw-button
      v-if="isMeetingActive"
      theme="secondary"
      @click="onCancelMeeting"
      outline>Cancel event</tw-button>
    <tw-button
      v-else
      theme="secondary"
      @click="onGoStepBack"
      outline>Go back</tw-button>
    <tw-button
      :disabled="!isMeetingActive"
      theme="success"
      @click="onFinishMeeting">Finish event</tw-button>
  </tw-footer>
</template>

<script>
export default {
  name: 'tw-meeting-form-footer',
  props: {
    isMeetingActive: Boolean,
  },
  methods: {
    onGoStepBack() {
      this.$emit('go-step-back');
    },
    onCancelMeeting() {
      this.$emit('cancel-meeting');
    },
    onFinishMeeting() {
      this.$emit('finish-meeting');
    },
  },
};
</script>
