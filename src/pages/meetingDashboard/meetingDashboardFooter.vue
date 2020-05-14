<template>
  <tw-footer>
    <tw-button
      slot="left"
      v-if="isMeetingActive"
      theme="secondary"
      @click="onCancelMeeting"
      outline>Cancel it</tw-button>
    <tw-button
      slot="left"
      v-else
      theme="secondary"
      @click="onGoStepBack"
      outline>Go back</tw-button>
    <tw-button
      slot="right"
      v-if="isMeetingActive"
      theme="success"
      @click="onFinishMeeting">Finish event</tw-button>
    <tw-button
      slot="right"
      v-else
      theme="success"
      @click="onStartMeeting">Start event</tw-button>
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
    onStartMeeting() {
      this.$emit('start-meeting');
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
