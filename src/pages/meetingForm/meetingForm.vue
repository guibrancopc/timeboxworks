<template>
  <tw-container>
    <tw-row>
      <tw-col>
        <tw-heading>Meeting Setup</tw-heading>
      </tw-col>
    </tw-row>
    <tw-page>
      <tw-form @submit="onSubmit">
        <tw-row>
          <tw-col>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Meeting name">
                  <tw-form-input
                    name="meeting-name"
                    required/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Start time">
                  <tw-form-datetime-picker
                    name="meeting-start"
                    type="time"
                    :customValidation="timeGapCustomValidation"
                    v-model="startTime"
                    required/>
                </tw-form-field>
              </tw-col>
              <tw-col>
                <tw-form-field
                  label="End time">
                  <tw-form-datetime-picker
                    name="meeting-end"
                    type="time"
                    v-model="endTime"
                    :customValidation="timeGapCustomValidation"
                    required/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-inputs-list
                  label="Goal"
                  inputName="meeting-goal"
                  inputsGroupKey="meeting-goals"
                  required/>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Description">
                  <tw-form-textarea
                    name="meeting-description"
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
      startTime: null,
      endTime: null,
    };
  },
  methods: {
    onSubmit(result) {
      console.log('Form result: ', result);
    },
    timeGapCustomValidation() {
      const startDateTime = new Date(this.startTime);
      const endDateTime = new Date(this.endTime);
      if (!(this.startTime && this.endTime) || startDateTime < endDateTime) {
        return true;
      }
      return 'Start time should be before End time';
    },
  },
};
</script>
