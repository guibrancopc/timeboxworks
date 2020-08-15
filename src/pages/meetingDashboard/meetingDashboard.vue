<template>
  <tw-container full-width>
    <div class="tw-u-margin--vertical">
      <tw-card theme="info" v-if="!isMeetingActive">
        <strong>Ready to go!</strong>
        <span>
          Now you can start your event pressing the "Start event" button below this dashboard. :)
        </span>
      </tw-card>
    </div>
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
      return !!this.$store.getters.currentMeeting.realStartTime;
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
      this.$twDialog.confirm({
        text: 'Are you sure to cancel it?',
        confirmButtonTheme: 'danger',
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'Not anymore',
        callback: isConfirmed => {
          if (isConfirmed) { this.$store.dispatch('asyncUpdateRealStartTime', ''); }
        },
      });
    },
    onFinishMeeting() {
      this.$store.dispatch('asyncUpdateRealEndTime', this.getNowISOString());
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
      return this.$twServices.time.getNowISOString();
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
    TwMeetingDashboardSideTopics,
  },
};
</script>
