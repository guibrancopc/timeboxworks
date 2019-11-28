<template>
  <tw-container>
    <tw-row>
      <tw-col>
        <tw-title :size="1">Meeting Form</tw-title>
      </tw-col>
    </tw-row>
    <tw-page>
      <tw-form>
        <tw-row>
          <tw-col>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Meeting name">
                  <tw-input-text
                    v-model="name"
                    :minLength="10"
                    :required="false"/>
                </tw-form-field>
                {{ name }}
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Start time">
                  <tw-input-datetime-picker
                    type="time"
                    v-model="startTime"
                    :required="true"/>
                </tw-form-field>
                {{ startTime }}
              </tw-col>
              <tw-col>
                <tw-form-field
                  label="End time">
                  <tw-input-datetime-picker
                    type="time"
                    v-model="endTime"
                    :required="true"/>
                </tw-form-field>
                {{ endTime }}
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col>
                <tw-form-field
                  label="Description">
                  <tw-input-text
                    label="Meeting Description"
                    type="textarea"
                    v-model="description"
                    dynamicMinHeight="100"
                    :required="true"/>
                </tw-form-field>
                {{ description }}
              </tw-col>
            </tw-row>
            <tw-row>
              <tw-col class="tw-utils-text-right">
                <tw-gutter :right="false">
                  <tw-button template="info" :outline="true">Clean Form</tw-button>
                </tw-gutter>
                <tw-gutter :right="false">
                  <tw-button type="submit">Start Meeting</tw-button>
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
      name: '',
      description: '',
      startTime: '',
      endTime: '',
    };
  },
};
</script>
