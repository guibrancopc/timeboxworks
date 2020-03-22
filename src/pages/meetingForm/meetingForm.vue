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
                    v-model="name"
                    required/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Start time">
                  <tw-form-datetime-picker
                    name="expectedStartTime"
                    v-model="expectedStartTime"
                    type="time"
                    :customValidation="timeGapCustomValidation"
                    required/>
                </tw-form-field>
              </tw-col>
              <tw-col>
                <tw-form-field
                  label="End time">
                  <tw-form-datetime-picker
                    name="expectedEndTime"
                    v-model="expectedEndTime"
                    type="time"
                    :customValidation="timeGapCustomValidation"
                    required/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-inputs-list
                  label="Goal"
                  inputName="goal"
                  v-model="goals"
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
                    v-model="description"
                    :minHeight="100"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col class="tw-u_text--right">
                <tw-gutter left bottom inline-block>
                  <tw-form-reset-button>Clean Form</tw-form-reset-button>
                </tw-gutter>
                <tw-gutter left bottom inline-block>
                  <tw-form-submit-button>Start Meeting</tw-form-submit-button>
                </tw-gutter>
              </tw-col>
            </tw-row>
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
  },
  computed: {
    storeCurrentMeeting() {
      return this.$store.getters.currentMeeting;
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
    onSubmit(formData) {
      this.$store.dispatch('asyncUpdateCurrentMeeting', { ...formData });
      this.$router.push({ name: 'meetingDashboard' });
    },
    onReset() {
      this.$store.dispatch('asyncCleanCurrentMeeting');
    },
    timeGapCustomValidation() {
      const startDateTime = new Date(this.expectedStartTime);
      const endDateTime = new Date(this.expectedEndTime);
      if (!(this.expectedStartTime && this.expectedEndTime) || startDateTime < endDateTime) {
        return true;
      }
      return 'Start time should be before End time';
    },
  },
};
</script>
