<template>
  <div :style="styles.container">
    <div :style="styles.row">
      <div :style="styles.col">
          <tw-template-preview-modal-card>
            <span slot="header">Expected Start Time</span>
            <tw-time-format size="sm" :time="expectedStartTime" :diffTime="realStartTime" />
          </tw-template-preview-modal-card>
      </div>
      <div :style="styles.col">
          <tw-template-preview-modal-card :theme="startDiffFeedback.theme">
            <span slot="header">Real Start Time</span>
            <tw-time-format size="sm" :time="realStartTime" :diffTime="expectedStartTime" />
            <span slot="footer">{{ startDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedStartTime"
              :diffTime="realStartTime"
              @diffUpdated="onStartDiffUpdated"/>
            </span>
          </tw-template-preview-modal-card>
      </div>
    </div>
    <div :style="styles.row">
      <div :style="styles.col">
          <tw-template-preview-modal-card>
            <span slot="header">Epected End Time</span>
            <tw-time-format size="sm" :time="expectedEndTime" :diffTime="realEndTime" />
          </tw-template-preview-modal-card>
      </div>
      <div :style="styles.col">
          <tw-template-preview-modal-card :theme="endDiffFeedback.theme">
            <span slot="header">Real End Time</span>
            <tw-time-format size="sm" :time="realEndTime" :diffTime="expectedEndTime" />
            <span slot="footer">{{ endDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedEndTime"
              :diffTime="realEndTime"
              @diffUpdated="onEndDiffUpdated" />
            </span>
          </tw-template-preview-modal-card>
      </div>
    </div>
    <div :style="styles.row">
      <div :style="styles.col">
          <tw-template-preview-modal-card>
            <span slot="header">Expected Total Duration</span>
            <tw-time-format
              size="sm"
              type="duration"
              :time="expectedEndTime"
              :diffTime="expectedStartTime"
              @diffUpdated="onExpectedDiffUpdated" />
          </tw-template-preview-modal-card>
      </div>
      <div :style="styles.col">
          <tw-template-preview-modal-card :theme="durationDiffFeedback.theme">
            <span slot="header">Real Total Duration</span>
            <tw-time-format
              size="sm"
              type="duration"
              :time="realEndTime"
              :diffTime="realStartTime"
              @diffUpdated="onRealDiffUpdated" />
            <span slot="footer">{{ durationDiffFeedback.durationMessage }} <tw-time-format
              type="duration"
              :time="expectedDiff"
              :diffTime="realDiff" />
            </span>
          </tw-template-preview-modal-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTimeDisplayFeedbackByDiff,
} from '../../servicesApp/timeDisplayFeedbackRules/timeDisplayFeedbackRules';
import TwTemplatePreviewModalCard from './TemplatePreviewModalCard.vue';

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
        container: 'margin: 15px 0',
        row: 'display: flex; justify-content: space-around;',
        col: 'width: 100%; margin: 15px;',
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
    TwTemplatePreviewModalCard,
  },
};
</script>
