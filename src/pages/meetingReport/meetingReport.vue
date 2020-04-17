<template>
  <tw-container>
    <tw-page>
      <tw-footer>
        <tw-button
          slot="left"
          theme="secondary"
          @click="backToDashboard"
          outline>Back to dashboard</tw-button>
        <tw-gutter slot="right" left bottom inline-block>
          <tw-button
            outline
            theme="primary"
            @click="startNewMeeting">Start new meeting</tw-button>
        </tw-gutter>
        <tw-gutter slot="right" left bottom inline-block>
          <tw-button
            theme="success"
            @click="copyReportToClipboard">Copy to clipboard</tw-button>
        </tw-gutter>
      </tw-footer>
    </tw-page>
  </tw-container>
</template>

<script>
export default {
  name: 'TwMeetingReport',
  methods: {
    backToDashboard() {
      this.$router.push({ name: 'meetingDashboard' });
    },
    startNewMeeting() {
      console.log('TODO');
    },
    copyReportToClipboard() {
      console.log('TODO');
    },
  },
};
</script>
