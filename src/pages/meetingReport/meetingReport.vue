<template>
  <tw-container class="tw-meeting-report">
    <tw-page>
      <tw-header>
        <tw-heading size="xl" :title="name" />
        <tw-heading size="xxs">
          <tw-time-format :time="realStartTime" /> to <tw-time-format :time="realEndTime" />
        </tw-heading>
        <tw-article v-if="description" :text="description" />
      </tw-header>
      <main>
        <tw-row>
          <tw-col>
            <tw-heading size="lg" title="Goals" />
            <tw-meeting-report-goals :goals="goals" />
          </tw-col>
        </tw-row>
        <tw-row>
          <tw-col>
            <tw-heading size="lg" title="Performance" />
            <tw-burndown-chart
              :start-time="expectedStartTime"
              :end-time="expectedEndTime"
              :dataset="burndownDataset"/>
          </tw-col>
        </tw-row>
        <tw-row>
          <tw-col>
            <tw-meeting-report-cards-grid
              :expected-start-time="expectedStartTime"
              :expected-end-time="expectedEndTime"
              :real-start-time="realStartTime"
              :real-end-time="realEndTime" />
          </tw-col>
        </tw-row>
      </main>
      <tw-meeting-report-footer
        @backToDashboard="backToDashboard"
        @startNewMeeting="startNewMeeting"
        @copyReportToClipboard="copyReportToClipboard" />
    </tw-page>
  </tw-container>
</template>

<script>
import TwMeetingReportGoals from './meetingReportGoals.vue';
import TwMeetingReportCardsGrid from './meetingReportCardsGrid.vue';
import TwMeetingReportFooter from './meetingReportFooter.vue';
import TemplatePreviewModal from './TemplatePreviewModal.vue';

export default {
  name: 'TwMeetingReport',
  data() {
    return {
      testModal: false,
    };
  },
  components: {
    TwMeetingReportCardsGrid,
    TwMeetingReportGoals,
    TwMeetingReportFooter,
  },
  computed: {
    currentMeeting() {
      return this.$store.getters.currentMeeting;
    },
    name() {
      return this.currentMeeting.name;
    },
    description() {
      return this.currentMeeting.description;
    },
    goals() {
      return this.currentMeeting.goals;
    },
    expectedStartTime() {
      return this.currentMeeting.expectedStartTime;
    },
    expectedEndTime() {
      return this.currentMeeting.expectedEndTime;
    },
    realStartTime() {
      return this.currentMeeting.realStartTime;
    },
    realEndTime: {
      get() {
        return this.currentMeeting.realEndTime;
      },
      set(value) {
        this.currentMeeting.realEndTime = value;
      },
    },
    burndownDataset() {
      return this.goals.map(goal => ({
        id: goal.name,
        title: goal.value,
        finishedAt: goal.finishedAt || null,
      }));
    },
  },
  methods: {
    backToDashboard() {
      this.realEndTime = undefined;
      this.$router.push({ name: 'meetingDashboard' });
    },
    startNewMeeting() {
      console.log('TODO');
    },
    copyReportToClipboard() {
      this.$append(TemplatePreviewModal).open();
    },
  },
};
</script>
