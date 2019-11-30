<template>
  <tw-container>
    <tw-row>
      <tw-col>
        <tw-title :size="1">Meeting Form</tw-title>
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
                  <tw-input-text
                    name="meeting-name"
                    :required="true"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Start time">
                  <tw-input-datetime-picker
                    name="meeting-start"
                    type="time"
                    :customValidation="timeGapCustomValidation"
                    v-model="startTime"
                    :required="true"/>
                </tw-form-field>
              </tw-col>
              <tw-col>
                <tw-form-field
                  label="End time">
                  <tw-input-datetime-picker
                    name="meeting-end"
                    type="time"
                    v-model="endTime"
                    :customValidation="timeGapCustomValidation"
                    :required="true"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Description">
                  <tw-input-text
                    name="meeting-description"
                    type="textarea"
                    dynamicMinHeight="100"
                    :required="false"/>
                </tw-form-field>
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col class="tw-utils-text-right">
                <tw-gutter :right="false">
                  <tw-form-reset-button>Clean Form</tw-form-reset-button>
                </tw-gutter>
                <tw-gutter :right="false">
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
  name: 'tw-meeting-form',
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
    timeGapCustomValidation(value) {
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
