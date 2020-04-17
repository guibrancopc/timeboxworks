<template>
  <tw-container>
    <tw-row>
      <tw-col>
        <tw-heading>Meeting Setup</tw-heading>
      </tw-col>
    </tw-row>
    <tw-page>
      <tw-form
        @submit="onSubmit"
        @reset="onReset">
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
      this.name = this.storeCurrentMeeting.name;
      this.expectedStartTime = this.storeCurrentMeeting.expectedStartTime;
      this.expectedEndTime = this.storeCurrentMeeting.expectedEndTime;
      this.goals = [...this.storeCurrentMeeting.goals];
      this.description = this.storeCurrentMeeting.description;
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
      const startDateTime = getTimestamp(this.expectedStartTime);
      const endDateTime = getTimestamp(this.expectedEndTime);
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
  },
};

function getTimestamp(time) {
  return new Date(time).getTime();
}
</script>
