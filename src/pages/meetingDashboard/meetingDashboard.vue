<template>
  <tw-container full-width>
    <tw-row>
      <tw-col>
        <tw-heading>{{ name }}</tw-heading>
      </tw-col>
    </tw-row>
    <tw-page>
      <tw-form>
        <tw-meeting-dashboard-header :description="description" />
        <tw-row>
          <tw-col>
            <tw-box>
              <tw-time-countdown
                precision="min"
                :time-target="expectedEndTime"
                :freeze="!isMeetingActive"
                theme="primary"/>
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
import dialogs from '../../services/dialogs/dialogs';
import Time from '../../services/timeService/timeService';
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
    isMeetingActive() {
      return !!this.$store.getters.currentMeeting.realStartTime;
    },
    realStartTime() {
      return this.$store.getters.currentMeeting.realStartTime;
    },
    expectedEndTime() {
      return this.$store.getters.currentMeeting.expectedEndTime;
    },
  },
  beforeMount() {
    this.verifyRequiredDataInStore();
  },
  methods: {
    onGoStepBack() {
      this.$router.push({ name: 'meetingForm' });
    },
    onStartMeeting() {
      this.$store.dispatch('asyncUpdateRealStartTime', Time.getNowISOString());
    },
    onCancelMeeting() {
      const confirmation = dialogs.confirm('Are you sure to cancel it?');
      if (confirmation) {
        this.$store.dispatch('asyncUpdateRealStartTime', '');
      }
    },
    onFinishMeeting() {
      this.$store.dispatch('asyncUpdateRealEndTime', Time.getNowISOString());
      console.log('End meeting model: ', this.$store.getters.currentMeeting);
      this.$router.push({ name: 'meetingReport' });
    },
    getNow() {
      return Time.getNowISOString();
    },
    verifyRequiredDataInStore() {
      const meetingModel = this.$store.getters.currentMeeting;
      if (!isMeetingModelValid(meetingModel)) {
        // but if I have the local storage with data????
        dialogs.alert('You must setup your event before open your dashboard. :)');
        this.onGoStepBack();
      }
    },
  },
  components: {
    TwMeetingDashboardHeader,
    TwMeetingDashboardFooter,
  },
};
</script>
