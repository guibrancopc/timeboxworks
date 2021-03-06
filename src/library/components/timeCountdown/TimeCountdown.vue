<template>
  <div class="tw-time-countdown">
    <tw-time-display
      v-bind="$attrs"
      type="duration"
      :disabled="disabled"
      :theme="displayTheme"
      :time="timeTarget"
      :diffTime="currentTime"
      @diffUpdated="diffUpdate" >
      <div slot="header">
        {{ isNegative ? 'overdue time' : 'time left'}}
      </div>
      <div slot="footer">
        <small>should be finished at {{ endTimeFormatted }}</small>
      </div>
    </tw-time-display>
  </div>
</template>

<script>
import TwTimeDisplay from '../timeDisplay/TimeDisplay.vue';
import {
  momentFactory,
  getFullFormatOf,
  getTimeFormatOf,
  isSameDay,
} from '../../services/timeService/timeService';

function getIntervalInMiliseconds(precision) {
  return {
    hour: 60 * 60 * 1000,
    min: 60 * 1000,
    sec: 1000,
  }[precision];
}

export default {
  name: 'TwTimeCountdown',
  props: {
    timeFrom: {
      type: [String, Object, Number],
    },
    timeTarget: {
      type: [String, Object, Number],
      required: true,
    },
    disabled: Boolean,
  },
  data() {
    return {
      diffTimeDisplay: null,
      intervalId: null,
      isNegative: false,
      currentTime: momentFactory('now'),
    };
  },
  computed: {
    shouldShowNegativeTheme() {
      return this.isNegative && !this.disabled;
    },
    displayTheme() {
      if (this.disabled) {
        return 'secondary';
      }
      if (this.shouldShowNegativeTheme) {
        return 'danger';
      }
      return 'primary';
    },
    endTimeFormatted() {
      return this.shouldShowFullDate
        ? getTimeFormatOf(this.timeTarget)
        : getFullFormatOf(this.timeTarget);
    },
    shouldShowFullDate() {
      return !this.timeFrom || isSameDay(this.timeFrom, this.timeTarget);
    },
  },
  watch: {
    disabled(value) {
      if (value) {
        this.stopCounter();
      } else {
        this.startCounter();
      }
    },
  },
  beforeMount() {
    if (!this.disabled) {
      this.startCounter();
    }
  },
  beforeDestroy() {
    this.stopCounter();
  },
  methods: {
    startCounter() {
      this.runTimeTick();
      const intervalInMiliseconds = getIntervalInMiliseconds(this.precision);
      this.intervalId = setInterval(this.runTimeTick, intervalInMiliseconds);
    },
    runTimeTick() {
      this.currentTime = momentFactory('now');
    },
    stopCounter() {
      clearInterval(this.intervalId);
      this.timeDisplay = null;
    },
    diffUpdate(value) {
      this.isNegative = value < 0;
    },
  },
  components: {
    TwTimeDisplay,
  },
};
</script>
