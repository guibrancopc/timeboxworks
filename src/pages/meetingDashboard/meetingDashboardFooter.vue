<template>
  <footer>
    <tw-divider />
    <tw-row v-if="isMeetingActive">
      <tw-col>
        <tw-button
          template="secondary"
          @click="onCancelMeeting"
          outline>Cancel it</tw-button>
        </tw-col>
        <tw-col class="tw-u_text--right">
          <tw-button
            template="success"
            @click="onFinishMeeting">Finish meeting</tw-button>
      </tw-col>
    </tw-row>
    <tw-row v-else>
      <tw-col>
        <tw-button
          template="secondary"
          @click="onGoStepBack"
          outline>Go back</tw-button>
        </tw-col>
        <tw-col class="tw-u_text--right">
          <tw-button
            template="success"
            @click="onStartMeeting">Start meeting</tw-button>
      </tw-col>
    </tw-row>
  </footer>
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
