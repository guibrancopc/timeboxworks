<template>
  <tw-container full-width>
    <tw-page>
      <tw-form>
        <tw-meeting-dashboard-header :name="name" :description="description" />
        <tw-row>
          <tw-col>
            <tw-box>
              <tw-time-countdown
                size="lg"
                :time-target="expectedEndTime"
                :disabled="!isMeetingActive" />
            </tw-box>
            <tw-box>
              <tw-burndown-chart
                :start-time="expectedStartTime"
                :end-time="expectedEndTime"
                :dataset="burndownDataset" />
            </tw-box>
          </tw-col>
          <tw-col>
            <tw-the-goals-decision-collector
              :goals="goals"
              :disabled="!isMeetingActive" />
          </tw-col>
        </tw-row>
        <tw-meeting-dashboard-footer
          :isMeetingActive="isMeetingActive"
          @go-step-back="onGoStepBack"
          @start-meeting="onStartMeeting"
          @cancel-meeting="onCancelMeeting"
          @finish-meeting="onFinishMeeting" />
      </tw-form>
    </tw-page>
  </tw-container>
</template>

<script>
import TwMeetingDashboardHeader from './meetingDashboardHeader.vue';
import TwMeetingDashboardFooter from './meetingDashboardFooter.vue';
import { isMeetingModelValid } from '../../servicesApp/meetingValidator/meetingValidatorService';

export default {
  name: 'TwMeetingDashboard',
  computed: {
    name() {
      return this.$store.getters.currentMeeting.name;
    },
    description() {
      return this.$store.getters.currentMeeting.description;
    },
    goals() {
      return this.$store.getters.currentMeeting.goals;
    },
    expectedStartTime() {
      return this.$store.getters.currentMeeting.expectedStartTime;
    },
    expectedEndTime() {
      return this.$store.getters.currentMeeting.expectedEndTime;
    },
    realStartTime() {
      return this.$store.getters.currentMeeting.realStartTime;
    },
    isMeetingActive() {
      return !!this.$store.getters.currentMeeting.realStartTime;
    },
    burndownDataset() {
      return this.goals.map(goal => ({
        id: goal.name,
        title: goal.value,
        finishedAt: goal.finishedAt || null,
      }));
    },
  },
  beforeMount() {
    // Double check if this is the right place for this validation
    this.verifyRequiredDataInStore();
  },
  methods: {
    onGoStepBack() {
      this.$router.push({ name: 'meetingForm' });
    },
    onStartMeeting() {
      this.$store.dispatch('asyncUpdateRealStartTime', this.getNowISOString());
    },
    onCancelMeeting() {
      const confirmation = this.$twDialog.confirm('Are you sure to cancel it?');
      if (confirmation) {
        this.$store.dispatch('asyncUpdateRealStartTime', '');
      }
    },
    onFinishMeeting() {
      this.$store.dispatch('asyncUpdateRealEndTime', this.getNowISOString());
      console.log('End meeting model: ', this.$store.getters.currentMeeting);
      this.$router.push({ name: 'meetingReport' });
    },
    verifyRequiredDataInStore() {
      const meetingModel = this.$store.getters.currentMeeting;
      if (!isMeetingModelValid(meetingModel)) {
        // TODO: But if I have the local storage with data???? Try to catch a real fail case.
        this.$twDialog.alert('You must setup your event before open your dashboard. :)');
        this.onGoStepBack();
      }
    },
    getNowISOString() {
      return this.$TwTime.getNowISOString();
    },
  },
  components: {
    TwMeetingDashboardHeader,
    TwMeetingDashboardFooter,
  },
};
</script>
