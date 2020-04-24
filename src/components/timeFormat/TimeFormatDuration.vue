<template>
  <span class="tw-time-format-duration">
    <span v-if="shouldShowYears">{{ years }}<small>y</small></span>
    <span v-if="shouldShowMonths">{{ months }}<small>m</small></span>
    <span v-if="shouldShowDays">{{ days }}<small>d</small></span>
    <span v-if="shouldShowHours">{{ hours }}<small>h</small></span>
    <span v-if="shouldShowMinutes">{{ minutes }}<small>m</small></span>
    <span v-if="shouldShowSeconds">{{ seconds }}<small>s</small></span>
  </span>
</template>

<script>
import {
  durationFactory, momentFactory,
} from '../../services/timeService/timeService';

export default {
  name: 'TwTimeFormatDuration',
  props: {
    time: [String, Number, Object],
    diffTime: [String, Number, Object],
    showNegative: Boolean,
    precision: String,
  },
  computed: {
    timestampDiff() {
      const timeMoment = momentFactory(this.time);
      const timeDiffMoment = momentFactory(this.diffTime);
      return timeMoment.diff(timeDiffMoment);
    },
    getFinalDiff() {
      const rawDiff = this.timestampDiff;
      return this.showNegative ? rawDiff : Math.abs(rawDiff);
    },
    durationModel() {
      const durationTime = this.diffTime ? this.getFinalDiff : this.time;
      return durationFactory(durationTime);
    },
    years() {
      return this.getDuration('years');
    },
    months() {
      return this.getDuration('months');
    },
    days() {
      return this.getDuration('days');
    },
    hours() {
      return this.getDuration('hours');
    },
    minutes() {
      return this.getDuration('minutes');
    },
    seconds() {
      return this.getDuration('seconds');
    },
    shouldShowYears() {
      return Number(this.years) || this.precision === 'year';
    },
    shouldShowMonths() {
      return (this.shouldShowYears || Number(this.months) || this.precision === 'month')
        && ['month', 'day', 'hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowDays() {
      return (this.shouldShowMonths || Number(this.days) || this.precision === 'day')
        && ['day', 'hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowHours() {
      return (this.shouldShowDays || Number(this.hours) || this.precision === 'hour')
        && ['hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowMinutes() {
      return (this.shouldShowHours || Number(this.minutes) || this.precision === 'min')
        && ['min', 'sec'].includes(this.precision);
    },
    shouldShowSeconds() {
      return this.precision === 'sec' || this.diffAbsLessThanAMinute();
    },
  },
  watch: {
    timestampDiff: {
      immediate: true,
      handler(value) {
        this.$emit('diffUpdated', value);
      },
    },
  },
  methods: {
    getDuration(format) {
      return this.durationModel.get(format);
    },
    diffAbsLessThanAMinute() {
      return Math.abs(this.timestampDiff) < 60 * 1000;
    },
  },
};
</script>
