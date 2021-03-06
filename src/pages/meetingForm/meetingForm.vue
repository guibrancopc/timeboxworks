<template>
  <tw-container>
    <tw-page>
      <tw-form
        @submit="onSubmit"
        @reset="onReset">
        <tw-row>
          <tw-col>
            <tw-heading>Event Setup</tw-heading>
          </tw-col>
        </tw-row>
        <tw-row>
          <tw-col>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Event name">
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
                    :format="dateTimeFormat"
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
                    :format="dateTimeFormat"
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
            <tw-footer justify-content="space-between">
              <div>
                <tw-p v-if="shouldShowTotalWeight">Total weight: {{ totalWeight }}</tw-p>
              </div>
              <div>
                <tw-form-reset-button>Clean Form</tw-form-reset-button>
                <tw-form-submit-button
                  class="tw-u-margin--left">Open Dashboard</tw-form-submit-button>
              </div>
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
    shouldShowTotalWeight() {
      return !this.goals.every(goal => !goal.weight);
    },
    totalWeight() {
      return this.shouldShowTotalWeight
        && this.goals.reduce((acc, goal) => acc + (goal.weight || 1), 0);
    },
    dateTimeFormat() {
      if (this.isStartAndEndTimeDuringSameDay) {
        return 'HH:mm';
      }
      return 'cccc, d LLL yyyy, HH:mm';
    },
    isStartAndEndTimeDuringSameDay() {
      return this.$twServices.time.isSameDay(this.realStartTime, this.realEndTime);
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
      fillWeightValuesWhenSomeIsFilled(formData);
      this.$store.dispatch('asyncUpdateCurrentMeeting', { ...formData });
      this.goForDashboard();
    },
    goForDashboard() {
      this.$router.push({ name: 'meetingDashboard' });
    },
    onReset() {
      this.$store.dispatch('asyncCleanCurrentMeeting');
      this.name = '';
      this.expectedStartTime = null;
      this.expectedEndTime = null;
      this.goals = [];
      this.description = '';
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
      return this.$twServices.time.getNowISOString();
    },
    getNowISOStringOffsetHour(offset = 0) {
      const time = new Date();
      const hours = time.getHours();
      time.setHours(hours + offset);
      return this.$twServices.time.getISOStringOf(time);
    },
    getTimestampOf(time) {
      return this.$twServices.time.getTimestampOf(time);
    },
  },
};

function fillWeightValuesWhenSomeIsFilled({ goals }) {
  if (goals.some(item => !item.weight)) {
    goals
      .filter(item => !item.weight)
      .forEach(item => {
        item.weight = 1;
      });
  }
}
</script>
