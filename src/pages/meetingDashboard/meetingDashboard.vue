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
                :dataset="burndownDataset"
                :disable-projection="!isMeetingActive" />
            </tw-box>
          </tw-col>
          <tw-col>
            <tw-the-goals-decision-collector
              :goals="goals"
              :disabled="!isMeetingActive"
              :automatic-behavior="decisionsAutomaticBehaviorIsEnabled"
              @update-automatic-behavior="onUpdateDecisionsAutomaticBehavior"/>
          </tw-col>
        </tw-row>
        <tw-meeting-dashboard-footer
          :isMeetingActive="isMeetingActive"
          @go-step-back="onGoToMeetingForm"
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

export default {
  name: 'TwMeetingDashboard',
  data() {
    return {
      localStorageSetup: new this.$BrowserStorage('meeting-dashboard-setup'),
      decisionsAutomaticBehaviorIsEnabled: true,
    };
  },
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
    isMeetingFinished() {
      return !!this.$store.getters.currentMeeting.realEndTime;
    },
    burndownDataset() {
      return this.goals.map(goal => ({
        id: goal.name,
        title: goal.value,
        finishedAt: goal.finishedAt || null,
      }));
    },
  },
  watch: {
    decisionsAutomaticBehaviorIsEnabled(value) {
      this.localStorageSetup.setProp('decisionsAutomaticBehavior', value);
    },
  },
  beforeMount() {
    this.verifyRequiredDataInStore();
    this.verifyIfMeetingIsFinishedAlready();
    this.initDashboardSetup();
  },
  methods: {
    onGoToMeetingForm() {
      this.$router.push({ name: 'meetingForm' });
    },
    onGoToMeetingReport() {
      this.$router.push({ name: 'meetingReport' });
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
      this.onGoToMeetingReport();
    },
    verifyRequiredDataInStore() {
      if (!this.name) {
        this.$twDialog.alert('You must setup your event before open your dashboard. :)');
        this.onGoToMeetingForm();
      }
    },
    verifyIfMeetingIsFinishedAlready() {
      if (this.isMeetingFinished) {
        this.onGoToMeetingReport();
      }
    },
    getNowISOString() {
      return this.$twTime.getNowISOString();
    },
    onUpdateDecisionsAutomaticBehavior(value) {
      this.decisionsAutomaticBehaviorIsEnabled = value;
    },
    initDashboardSetup() {
      const storedValue = this.localStorageSetup.getProp('decisionsAutomaticBehavior');
      this.decisionsAutomaticBehaviorIsEnabled = storedValue === null ? true : storedValue;
    },
  },
  components: {
    TwMeetingDashboardHeader,
    TwMeetingDashboardFooter,
  },
};
</script>
