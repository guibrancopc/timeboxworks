<template>
  <div class="tw-meeting-report-time-cards-grid tw-u-margin--vertical">
    <tw-row>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            :time="expectedStartTime"
            :diffTime="realStartTime">
            <span slot="header">Expected Start Time</span>
          </tw-time-display>
      </tw-col>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            :time="realStartTime"
            :diffTime="expectedStartTime"
            :theme="startDiffFeedback.theme">
            <span slot="header">Real Start Time</span>
            <span slot="footer">{{ startDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedStartTime"
              :diffTime="realStartTime"
              @diffUpdated="onStartDiffUpdated"/>
            </span>
          </tw-time-display>
      </tw-col>
    </tw-row>
    <tw-row>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            :time="expectedEndTime"
            :diffTime="realEndTime">
            <span slot="header">Epected End Time</span>
          </tw-time-display>
      </tw-col>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            :time="realEndTime"
            :diffTime="expectedEndTime"
            :theme="endDiffFeedback.theme">
            <span slot="header">Real End Time</span>
            <span slot="footer">{{ endDiffFeedback.momentMessage }} <tw-time-format
              type="duration"
              :time="expectedEndTime"
              :diffTime="realEndTime"
              @diffUpdated="onEndDiffUpdated" />
            </span>
          </tw-time-display>
      </tw-col>
    </tw-row>
    <tw-row>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            type="duration"
            :time="expectedEndTime"
            :diffTime="expectedStartTime"
            @diffUpdated="onExpectedDiffUpdated" >
            <span slot="header">Expected Total Duration</span>
          </tw-time-display>
      </tw-col>
      <tw-col class="tw-u-display--flex">
          <tw-time-display
            size="md"
            class="tw-u-margin--vertical"
            type="duration"
            :theme="durationDiffFeedback.theme"
            :time="realEndTime"
            :diffTime="realStartTime"
            @diffUpdated="onRealDiffUpdated" >
            <span slot="header">Real Total Duration</span>
            <span slot="footer">{{ durationDiffFeedback.durationMessage }} <tw-time-format
              type="duration"
              :time="expectedDiff"
              :diffTime="realDiff" />
            </span>
          </tw-time-display>
      </tw-col>
    </tw-row>
  </div>
</template>

<script>
import {
  getTimeDisplayFeedbackByDiff,
} from '../../servicesApp/timeDisplayFeedbackRules/timeDisplayFeedbackRules';

export default {
  name: 'TwMeetingReportTimeCardsGrid',
  props: {
    expectedStartTime: String,
    expectedEndTime: String,
    realStartTime: String,
    realEndTime: String,
  },
  data() {
    return {
      startDiff: 1,
      endDiff: 1,
      expectedDiff: 1,
      realDiff: 1,
    };
  },
  computed: {
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
};
</script>
