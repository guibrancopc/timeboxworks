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
              ref="burndown"
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
    validateRequiredData() {
      if (!this.name) {
        this.redirectAlert('Event Form', 'meetingForm');
      } else if (!this.realEndTime) {
        this.redirectAlert('Event Dashboard', 'meetingDashboard');
      }
    },
    redirectAlert(pageTitle, pageName) {
      const scope = this;
      this.$twDialog.alert({
        title: 'Oops!',
        text: `You have not completed this event yet to see a report. We will redirect to the ${pageTitle}  page.`,
        buttonTheme: 'info',
        buttonText: 'Understood',
        callback() {
          scope.$router.push({ name: pageName });
        },
      });
    },
    backToDashboard() {
      this.realEndTime = undefined;
      this.$router.push({ name: 'meetingDashboard' });
    },
    startNewMeeting() {
      this.$twDialog.confirm({
        text: 'This action will lose this report. Are you sure to start a new event?',
        confirmButtonTheme: 'primary',
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'Not anymore',
        callback: isConfirmed => {
          if (isConfirmed) {
            this.$store.dispatch('asyncCleanCurrentMeeting', '');
            this.$router.push({ name: 'meetingForm' });
          }
        },
      });
    },
    getChartImageSrc() {
      return this.$refs.burndown.$children[0].public().getBase64Image();
    },
    copyReportToClipboard() {
      this.$twAppend(TemplatePreviewModal, {
        props: {
          currentMeeting: this.currentMeeting,
          chartImageSrc: this.getChartImageSrc(),
        },
      }).open();
    },
  },
  mounted() {
    this.validateRequiredData();
  },
};
</script>
