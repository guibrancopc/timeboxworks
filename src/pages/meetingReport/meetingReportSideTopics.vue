<template>
  <div class="tw-meeting-report-side-topics tw-u-display--flex tw-u-flex-wrap--wrap">
    <tw-card
      class="tw-u-margin--bottom tw-u-margin--right"
      theme="info"
      width="200px"
      v-for="(item, index) in items"
      :key="item.id"
      :value="item.value">{{ index + 1 }}. {{ item.value}}</tw-card>
  </div>
</template>

<script>
export default {
  name: 'TwMeetingReportSideTopics',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
