<template>
  <tw-footer>
    <tw-gutter slot="left" right bottom inline-block>
      <tw-button
        theme="secondary"
        @click="$emit('backToDashboard')"
        outline>Back to dashboard</tw-button>
    </tw-gutter>
    <tw-gutter slot="left" right bottom inline-block>
      <tw-button
        outline
        theme="primary"
        @click="$emit('startNewMeeting')">Start new meeting</tw-button>
    </tw-gutter>
    <tw-gutter slot="right" left bottom inline-block>
      <tw-button
        theme="success"
        @click="$emit('copyReportToClipboard')">Copy to clipboard</tw-button>
    </tw-gutter>
  </tw-footer>
</template>

<script>
export default {
  name: 'TwReportMeetingFooter',
};
</script>
