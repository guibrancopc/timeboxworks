<template>
  <table :style="styles.table" cellpadding="15">
    <tr :style="styles.row">
      <td :style="styles.col">
          <tw-template-preview-modal-time-card>
            <span slot="header">Expected Start Time</span>
            <tw-time-format :time="expectedStartTime" :diffTime="realStartTime" />
          </tw-template-preview-modal-time-card>
      </td>
      <td :style="styles.col">
          <tw-template-preview-modal-time-card :theme="startDiffFeedback.theme">
            <span slot="header">Real Start Time</span>
            <tw-time-format :time="realStartTime" :diffTime="expectedStartTime" />
            <span slot="footer">{{ startDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedStartTime"
              :diffTime="realStartTime"
              @diffUpdated="onStartDiffUpdated"/>
            </span>
          </tw-template-preview-modal-time-card>
      </td>
    </tr>
    <tr :style="styles.row">
      <td :style="styles.col">
          <tw-template-preview-modal-time-card>
            <span slot="header">Expected End Time</span>
            <tw-time-format :time="expectedEndTime" :diffTime="realEndTime" />
          </tw-template-preview-modal-time-card>
      </td>
      <td :style="styles.col">
          <tw-template-preview-modal-time-card :theme="endDiffFeedback.theme">
            <span slot="header">Real End Time</span>
            <tw-time-format :time="realEndTime" :diffTime="expectedEndTime" />
            <span slot="footer">{{ endDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedEndTime"
              :diffTime="realEndTime"
              @diffUpdated="onEndDiffUpdated" />
            </span>
          </tw-template-preview-modal-time-card>
      </td>
    </tr>
    <tr :style="styles.row">
      <td :style="styles.col">
          <tw-template-preview-modal-time-card>
            <span slot="header">Expected Total Duration</span>
            <tw-time-format
              type="duration"
              :time="expectedEndTime"
              :diffTime="expectedStartTime"
              @diffUpdated="onExpectedDiffUpdated" />
          </tw-template-preview-modal-time-card>
      </td>
      <td :style="styles.col">
          <tw-template-preview-modal-time-card :theme="durationDiffFeedback.theme">
            <span slot="header">Real Total Duration</span>
            <tw-time-format
              type="duration"
              :time="realEndTime"
              :diffTime="realStartTime"
              @diffUpdated="onRealDiffUpdated" />
            <span slot="footer">{{ durationDiffFeedback.durationMessage }} <tw-time-format
              type="duration"
              :time="expectedDiff"
              :diffTime="realDiff" />
            </span>
          </tw-template-preview-modal-time-card>
      </td>
    </tr>
  </table>
</template>

<script>
import {
  getTimeDisplayFeedbackByDiff,
} from '../../servicesApp/timeDisplayFeedbackRules/timeDisplayFeedbackRules';
import TwTemplatePreviewModalTimeCard from './TemplatePreviewModalTimeCard.vue';

export default {
  name: 'TwMeetingReportCards',
  data() {
    return {
      startDiff: 1,
      endDiff: 1,
      expectedDiff: 1,
      realDiff: 1,
    };
  },
  props: {
    currentMeeting: Object,
  },
  computed: {
    expectedStartTime() {
      return this.currentMeeting.expectedStartTime;
    },
    expectedEndTime() {
      return this.currentMeeting.expectedEndTime;
    },
    realStartTime() {
      return this.currentMeeting.realStartTime;
    },
    realEndTime() {
      return this.currentMeeting.realEndTime;
    },
    durationDiff() {
      return this.expectedDiff - this.realDiff;
    },
    startDiffFeedback() {
      return getTimeDisplayFeedbackByDiff(this.startDiff);
    },
    endDiffFeedback() {
      return getTimeDisplayFeedbackByDiff(this.endDiff);
    },
    durationDiffFeedback() {
      return getTimeDisplayFeedbackByDiff(this.durationDiff);
    },
    styles() {
      return {
        table: 'margin: 15px 0; width: 100%;',
        row: 'width: 50%;',
        col: 'margin: 15px; box-sizing: border-box;',
      };
    },
  },
  methods: {
    onStartDiffUpdated(diff) {
      this.startDiff = diff;
    },
    onEndDiffUpdated(diff) {
      this.endDiff = diff;
    },
    onExpectedDiffUpdated(diff) {
      this.expectedDiff = diff;
    },
    onRealDiffUpdated(diff) {
      this.realDiff = diff;
    },
  },
  components: {
    TwTemplatePreviewModalTimeCard,
  },
};
</script>
