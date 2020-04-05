<template>
  <div class="tw-time-countdown">
    <tw-time-display
      :precision="precision"
      :time="timeDisplay"
      :theme="displayTheme"
      :negative="shouldShowNegativeSymbol">
      <div slot="info">
        finishes at {{ endTime }}
      </div>
    </tw-time-display>
  </div>
</template>

<script>
import TwTimeDisplay from '../timeDisplay/TimeDisplay.vue';
import Time from '../../services/timeService/timeService';

const getInterval = precision => ({
  hour: 60 * 60 * 1000,
  min: 60 * 1000,
  sec: 1000,
}[precision]);

export default {
  name: 'TwTimeCountdown',
  props: {
    timeTarget: {
      type: String,
      required: true,
    },
    freeze: Boolean,
    precision: TwTimeDisplay.props.precision,
    theme: TwTimeDisplay.props.theme,
  },
  data() {
    return {
      timeDisplay: null,
      timeTargetModel: null,
      intervalId: null,
      isTimeLeftNegative: false,
    };
  },
  computed: {
    shouldShowNegativeSymbol() {
      return this.isTimeLeftNegative && !this.freeze;
    },
    displayTheme() {
      if (this.freeze) {
        return 'secondary';
      }
      if (this.shouldShowNegativeSymbol) {
        return 'danger';
      }
      return this.theme;
    },
    endTime() {
      return this.timeTargetModel.humanize();
    },
  },
  watch: {
    timeTarget(value) {
      this.setTimeTargetModel(value);
    },
    freeze(value) {
      if (value) {
        this.stopCounter();
      } else {
        this.startCounter();
      }
    },
  },
  beforeMount() {
    this.setTimeTargetModel(this.timeTarget);
    this.startCounter();
  },
  methods: {
    setTimeTargetModel(value) {
      this.timeTargetModel = new Time(value);
    },
    startCounter() {
      if (this.freeze) { return; }
      this.theTimeTick();
      this.intervalId = setInterval(this.theTimeTick, getInterval(this.precision));
    },
    theTimeTick() {
      this.updateDisplayWithTimeLeft();
      this.updateNegativeStatus();
    },
    updateDisplayWithTimeLeft() {
      this.timeDisplay = this.timeTargetModel.diffFromNow();
    },
    updateNegativeStatus() {
      this.isTimeLeftNegative = !this.timeTargetModel.isAheadFromNow();
    },
    stopCounter() {
      clearInterval(this.intervalId);
      this.timeDisplay = null;
    },
  },
};
</script>
