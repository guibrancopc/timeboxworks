<template>
  <tw-footer justify-content="space-between">
    <div>
      <div class="tw-u-margin--bottom tw-u-margin--right tw-u-display--inline-block">
        <tw-button
          theme="secondary"
          @click="$emit('backToDashboard')"
          outline>Reopen event</tw-button>
      </div>
      <div class="tw-u-margin--bottom tw-u-margin--right tw-u-display--inline-block">
        <tw-button
          outline
          theme="primary"
          @click="$emit('startNewMeeting')">Start new event</tw-button>
      </div>
    </div>
    <div class="tw-u-margin--bottom tw-u-margin--left tw-u-display--inline-block">
      <tw-button
        theme="success"
        @click="$emit('copyReportToClipboard')">Preview email</tw-button>
    </div>
  </tw-footer>
</template>

<script>
export default {
  name: 'TwReportMeetingFooter',
};
</script>
