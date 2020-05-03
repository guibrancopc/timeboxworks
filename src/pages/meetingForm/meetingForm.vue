<template>
  <tw-container>
    <tw-page>
      <tw-form
        @submit="onSubmit"
        @reset="onReset">
        <tw-row>
          <tw-col>
            <tw-heading>Meeting Setup</tw-heading>
          </tw-col>
        </tw-row>
        <tw-row>
          <tw-col>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Meeting name">
                  <tw-form-input
                    name="name"
                    :value="name"
                    required/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Start time">
                  <tw-form-datetime-picker
                    required
                    ref="expectedStartTime"
                    name="expectedStartTime"
                    v-model="expectedStartTime"
                    type="datetime"
                    :customValidation="timeGapCustomValidation"
                    @input="syncStartAndEndTimeValidation('expectedEndTime')"/>
                </tw-form-field>
              </tw-col>
              <tw-col>
                <tw-form-field
                  label="End time">
                  <tw-form-datetime-picker
                    required
                    ref="expectedEndTime"
                    name="expectedEndTime"
                    v-model="expectedEndTime"
                    type="datetime"
                    :customValidation="timeGapCustomValidation"
                    @input="syncStartAndEndTimeValidation('expectedStartTime')"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-inputs-list
                  label="Goal"
                  inputName="goal"
                  :value="goals"
                  inputsGroupKey="goals"
                  required/>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Description">
                  <tw-form-textarea
                    name="description"
                    :value="description"
                    :minHeight="100"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-footer>
              <tw-gutter slot="right" left bottom inline-block>
                <tw-form-reset-button>Clean Form</tw-form-reset-button>
              </tw-gutter>
              <tw-gutter slot="right" left bottom inline-block>
                <tw-form-submit-button>Start Meeting</tw-form-submit-button>
              </tw-gutter>
            </tw-footer>
          </tw-col>
        </tw-row>
      </tw-form>
    </tw-page>
  </tw-container>
</template>

<script>
export default {
  name: 'TwMeetingForm',
  data() {
    return {
      name: '',
      expectedStartTime: '',
      expectedEndTime: '',
      goals: [],
      description: '',
    };
  },
  beforeMount() {
    this.syncFormWithStore();
    this.verifyIfActiveMeetingExists();
  },
  computed: {
    storeCurrentMeeting() {
      return this.$store.getters.currentMeeting;
    },
    isMeetingActive() {
      return !!this.$store.getters.currentMeeting.realStartTime;
    },
  },
  methods: {
    syncFormWithStore() {
      const {
        name, expectedStartTime, expectedEndTime, goals, description,
      } = this.storeCurrentMeeting;
      this.name = name;
      this.expectedStartTime = expectedStartTime || this.getNowISOString();
      this.expectedEndTime = expectedEndTime || this.getNowISOStringOffsetHour(1);
      this.goals = [...goals];
      this.description = description;
    },
    verifyIfActiveMeetingExists() {
      if (this.isMeetingActive) {
        this.goForDashboard();
      }
    },
    onSubmit(formData) {
      this.$store.dispatch('asyncUpdateCurrentMeeting', { ...formData });
      this.goForDashboard();
    },
    goForDashboard() {
      this.$router.push({ name: 'meetingDashboard' });
    },
    onReset() {
      this.$store.dispatch('asyncCleanCurrentMeeting');
    },
    timeGapCustomValidation() {
      const startDateTime = this.getTimestampOf(this.expectedStartTime);
      const endDateTime = this.getTimestampOf(this.expectedEndTime);
      if (!(this.expectedStartTime && this.expectedEndTime) || startDateTime < endDateTime) {
        return true;
      }
      return 'Start time should be before End time';
    },
    syncStartAndEndTimeValidation(theOtherTimeName) {
      // TODO: eslint is not supporting optional chainning
      // eslint-disable-next-line no-unused-expressions
      this.$refs[theOtherTimeName]?.runValidation(this[theOtherTimeName]);
    },
    getNowISOString() {
      return this.$twTime.getNowISOString();
    },
    getNowISOStringOffsetHour(offset = 0) {
      const time = new Date();
      const hours = time.getHours();
      time.setHours(hours + offset);
      return this.$twTime.getISOStringOf(time);
    },
    getTimestampOf(time) {
      return this.$twTime.getTimestampOf(time);
    },
  },
};
</script>
