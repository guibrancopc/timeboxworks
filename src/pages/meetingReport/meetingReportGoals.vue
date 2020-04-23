<template>
  <tw-list type="ordered" class="tw-meeting-report-goals">
    <tw-list-item
      v-for="goal in goals"
      :key="goal.name"
      class="tw-meeting-report__decision">
      <tw-gutter bottom>
        <tw-heading size="md" :title="goal.value" />
        <tw-heading size="xxs">
          <span v-if="goal.finishedAt">Done at </span>
          <tw-time-format
            v-if="goal.finishedAt"
            :time="goal.finishedAt"
            precision="full" />
          <span v-else>Item has not been completed</span>
        </tw-heading>
        <tw-article v-if="goal.decisions" :text="goal.decisions" />
      </tw-gutter>
    </tw-list-item>
  </tw-list>
</template>

<script>
export default {
  name: 'TwMeetingReportGoals',
  props: {
    goals: Array,
  },
};
</script>
