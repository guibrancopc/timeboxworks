<template>
  <span class="tw-time-moment-format">
    {{ formatedMoment }}
  </span>
</template>

<script>
import {
  momentFactory, getFormattedTime,
} from '../../services/timeService/timeService';

export default {
  name: 'TwTimeMomentFormat',
  props: {
    time: [String, Number, Object],
    precision: {
      type: String,
      default: 'min',
      validator(value) {
        return ['year', 'month', 'day', 'hour', 'min', 'sec']
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
      return this.format(this.getFormatMoment(this.precision));
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
