<template>
  <div class="tw-meeting-report-cards-grid">
    <tw-row>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display size="sm" :time="expectedStartTime" :diffTime="realStartTime">
            <span slot="header">Expected Start Time</span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display
            size="sm"
            :time="realStartTime"
            :diffTime="expectedStartTime"
            :theme="startDiffDisplayTheme">
            <span slot="header">Real Start Time</span>
            <span slot="footer">{{ getDiffLabel(startDiff) }}: <tw-time-format
              type="duration"
              :time="expectedStartTime"
              :diffTime="realStartTime"
              @diffUpdated="onStartDiffUpdated"/>
            </span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
    </tw-row>
    <tw-row>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display size="sm" :time="expectedEndTime" :diffTime="realEndTime">
            <span slot="header">Epected End Time</span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display
          size="sm"
          :time="realEndTime"
          :diffTime="expectedEndTime"
          :theme="endDiffDisplayTheme">
            <span slot="header">Real End Time</span>
            <span slot="footer">{{ getDiffLabel(endDiff) }}: <tw-time-format
              type="duration"
              :time="expectedEndTime"
              :diffTime="realEndTime"
              @diffUpdated="onEndDiffUpdated" />
            </span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
    </tw-row>
    <tw-row>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display
          size="sm"
          type="duration"
          :time="expectedEndTime"
          :diffTime="expectedStartTime"
          @diffUpdated="onExpectedDiffUpdated" >
            <span slot="header">Expected Total Duration</span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
      <tw-col>
        <tw-gutter vertical>
          <tw-time-display
          size="sm"
          type="duration"
          :theme="durationDiffDisplayTheme"
          :time="realEndTime"
          :diffTime="realStartTime"
          @diffUpdated="onRealDiffUpdated" >
            <span slot="header">Real Total Duration</span>
            <span slot="footer">{{ getFinalDiffLabel(durationDiff) }}: <tw-time-format
              type="duration"
              :time="expectedDiff"
              :diffTime="realDiff" />
            </span>
          </tw-time-display>
        </tw-gutter>
      </tw-col>
    </tw-row>
  </div>
</template>

<script>
export default {
  name: 'TwMeetingReportCardsGrid',
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
    startDiffDisplayTheme() {
      return this.getDisplayThemeByDiff(this.startDiff);
    },
    endDiffDisplayTheme() {
      return this.getDisplayThemeByDiff(this.endDiff);
    },
    durationDiff() {
      return this.expectedDiff - this.realDiff;
    },
    durationDiffDisplayTheme() {
      return this.getDisplayThemeByDiff(this.durationDiff);
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
    getDiffLabel(diff) {
      return diff < 0 ? 'Late by' : 'In advance by';
    },
    getFinalDiffLabel(diff) {
      return diff < 0 ? 'Wasted time' : 'Saved time';
    },
    getDisplayThemeByDiff(diff) { // Business rule TODO extract to service
      if (diff < 60 * 1000) {
        return 'danger';
      }
      if (diff < 0) {
        return 'warning';
      }
      return 'success';
    },
  },
};
</script>

<style scoped lang="scss">
.tw-meeting-report-cards-grid {
  /deep/ .tw-gutter {
    height: calc(100% - 30px);
  }

  .tw-time-display {
    height: 100%;
  }
}
</style>
