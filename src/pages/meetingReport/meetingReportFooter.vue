<template>
  <tw-footer justify-content="space-between">
    <div>
      <tw-gutter right bottom inline-block>
        <tw-button
          theme="secondary"
          @click="$emit('backToDashboard')"
          outline>Reopen event</tw-button>
      </tw-gutter>
      <tw-gutter right bottom inline-block>
        <tw-button
          outline
          theme="primary"
          @click="$emit('startNewMeeting')">Start new event</tw-button>
      </tw-gutter>
    </div>
    <tw-gutter left bottom inline-block>
      <tw-button
        theme="success"
        @click="$emit('copyReportToClipboard')">Preview email</tw-button>
    </tw-gutter>
  </tw-footer>
</template>

<script>
export default {
  name: 'TwReportMeetingFooter',
};
</script>
