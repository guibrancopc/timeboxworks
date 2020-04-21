<template>
  <div class="tw-time-countdown">
    <tw-time-display
      v-bind="$attrs"
      :disabled="disabled"
      :theme="displayTheme"
      :time="timeTarget"
      :diffTime="currentTime"
      @diffUpdated="diffUpdate" >
      <div slot="header">
        {{ isNegative ? 'overtime' : 'time left'}}
      </div>
      <div slot="footer">
        should finish at {{ endTimeFormatted }}
      </div>
    </tw-time-display>
  </div>
</template>

<script>
import TwTimeDisplay from '../timeDisplay/TimeDisplay.vue';
import {
  momentFactory,
  getFullFormatOf,
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
      return getFullFormatOf(this.timeTarget);
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
