<template>
  <span class="tw-time-formatmoment">
    {{ formatedMoment }}
  </span>
</template>

<script>
import {
  momentFactory, getFormattedTime,
} from '../../services/timeService/timeService';

export default {
  name: 'TwTimeFormatMoment',
  props: {
    time: [String, Number, Object],
    // TODO: Implement showOnlyMomentDiff
    showOnlyMomentDiff: Boolean,
    precision: {
      type: String,
      default: 'year',
      validator(value) {
        return ['full', 'year', 'month', 'day', 'hour', 'min', 'sec']
          .includes(value);
      },
    },
  },
  computed: {
    momentModel() {
      return momentFactory(this.time);
    },
    isTimeValid() {
      return !isInvalidDate(this.time);
    },
    formatedMoment() {
      return getFormattedTime(this.time, this.getFormatMoment(this.precision));
    },
  },
  methods: {
    getFormatMoment(requestedFormat) {
      return {
        full: `dddd, MMMM Do YYYY, h:mm${getSecondsFormat(this.shouldShowSeconds)} a`,
        year: `MMMM Do YYYY, h:mm${getSecondsFormat(this.shouldShowSeconds)} a`,
        month: `MMMM Do, h:mm${getSecondsFormat(this.shouldShowSeconds)} a`,
        day: `Do, h:mm${getSecondsFormat(this.shouldShowSeconds)} a`,
        hour: `h:mm${getSecondsFormat(this.shouldShowSeconds)} a`,
        min: `mm${getSecondsFormat(this.shouldShowSeconds)}`,
        sec: 'ss',
      }[requestedFormat];
    },
  },
};

function getSecondsFormat(shouldShowSeconds) {
  return shouldShowSeconds ? ':ss' : '';
}

function isInvalidDate(time) {
  return getFormattedTime(time) === 'Invalid date';
}
</script>
