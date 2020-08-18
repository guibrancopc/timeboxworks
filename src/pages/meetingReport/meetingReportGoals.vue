<template>
  <tw-list class="tw-meeting-report-goals">
    <tw-list-item
      v-for="(goal, index) in goals"
      :key="goal.id"
      class="tw-meeting-report__decision">
      <div class="tw-u-margin--bottom">
        <tw-heading size="md">{{ index + 1 }}. {{ goal.name }}</tw-heading>
        <tw-heading size="xxs">
          <template v-if="goal.finishedAt">
            <span>&#9989; Done at </span>
            <tw-time-format
              v-if="shouldShowFullDate"
              :time="goal.finishedAt" />
            <span v-else>{{ getTimeFormatted(goal.finishedAt) }}</span>
          </template>
          <span v-else>&#9888; Item has not been completed</span>
          <p v-if="shouldShowWeight">
            <small>Weight: {{ goal.weight || 1 }}</small>
          </p>
        </tw-heading>
        <div v-if="goal.decisions">
          <tw-heading v-if="goal.decisions" size="xs">Notes</tw-heading>
          <tw-article v-if="goal.decisions" :text="goal.decisions" />
        </div>
      </div>
    </tw-list-item>
  </tw-list>
</template>

<script>
export default {
  name: 'TwMeetingReportGoals',
  props: {
    goals: Array,
    shouldShowFullDate: Boolean,
  },
  computed: {
    shouldShowWeight() {
      return this.goals.some(item => item.weight !== 1);
    },
  },
  methods: {
    getTimeFormatted(time) {
      return this.$twServices.time.getTimeFormatOf(time);
    },
  },
};
</script>
