<template>
  <tw-list class="tw-meeting-report-goals">
    <tw-list-item
      v-for="(goal, index) in goals"
      :key="goal.name"
      class="tw-meeting-report__decision">
      <tw-gutter bottom>
        <tw-heading size="md">{{ index + 1 }}. {{ goal.value }}</tw-heading>
        <tw-heading size="xxs">
          <span v-if="goal.finishedAt">&#9989; Done at </span>
          <tw-time-format
            v-if="goal.finishedAt"
            :time="goal.finishedAt" />
          <span v-else>&#9888; Item has not been completed</span>
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
