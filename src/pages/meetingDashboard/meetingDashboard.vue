<template>
  <tw-container full-width>
    <tw-page>
      <tw-form>
        <tw-meeting-dashboard-header :name="name" :description="description" />
        <tw-row>
          <tw-col>
            <tw-row>
              <tw-col>
                <tw-box>
                  <tw-time-countdown
                    size="lg"
                    :time-from="expectedStartTime"
                    :time-target="expectedEndTime"
                    :disabled="!isMeetingActive" />
                </tw-box>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-box>
                  <tw-burndown-chart
                    :start-time="expectedStartTime"
                    :end-time="expectedEndTime"
                    :dataset="burndownDataset"
                    :show-projection="isMeetingActive" />
                </tw-box>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-meeting-dashboard-side-topics :items="sideTopics" />
              </tw-col>
            </tw-row>
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
import TwMeetingDashboardSideTopics from './meetindDashboardSideTopics.vue';

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
    sideTopics() {
      return this.$store.getters.currentMeeting.sideTopics;
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
      return !!this.realStartTime;
    },
    isMeetingFinished() {
      return !!this.$store.getters.currentMeeting.realEndTime;
    },
    burndownDataset() {
      return this.goals.map(goal => ({
        id: goal.id,
        title: goal.name,
        weight: goal.weight,
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
    this.initDashboardSetup();
    this.setupAutomaticBehavior();
  },
  methods: {
    startModal() {
      this.$twDialog.confirm({
        text: 'Are you ready to start?',
        confirmButtonTheme: 'success',
        confirmButtonText: 'Yes, let\'s go!',
        cancelButtonText: 'Not yet',
        disableCloseButton: true,
        callback: isConfirmed => {
          if (isConfirmed) { this.onStartMeeting(); } else { this.onGoToMeetingForm(); }
        },
      });
    },
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
      this.$twDialog.confirm({
        text: 'Are you sure to cancel it?',
        confirmButtonTheme: 'danger',
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'Not anymore',
        callback: isConfirmed => {
          if (isConfirmed) {
            this.$store.dispatch('asyncUpdateRealStartTime', '');
            this.onGoToMeetingForm();
          }
        },
      });
    },
    onFinishMeeting() {
      this.$store.dispatch('asyncUpdateRealEndTime', this.getNowISOString());
      this.onGoToMeetingReport();
    },
    getNowISOString() {
      return this.$twServices.time.getNowISOString();
    },
    onUpdateDecisionsAutomaticBehavior(value) {
      this.decisionsAutomaticBehaviorIsEnabled = value;
    },
    initDashboardSetup() {
      if (!this.name) {
        this.$twDialog.alert('You must setup your event before open your dashboard.');
        this.onGoToMeetingForm();
      } else if (this.isMeetingFinished) {
        this.$twDialog.alert('Your event is already completed.');
        this.onGoToMeetingReport();
      } else if (!this.isMeetingActive) {
        this.startModal();
      }
    },
    setupAutomaticBehavior() {
      const storedValue = this.localStorageSetup.getProp('decisionsAutomaticBehavior');
      this.decisionsAutomaticBehaviorIsEnabled = storedValue === null ? true : storedValue;
    },
  },
  components: {
    TwMeetingDashboardHeader,
    TwMeetingDashboardFooter,
    TwMeetingDashboardSideTopics,
  },
};
</script>
