<template>
  <span class="tw-time-format-moment">
    {{ formatedMoment }}
  </span>
</template>

<script>
import {
  getFormattedTime, momentFactory,
} from '../../services/timeService/timeService';

export default {
  name: 'TwTimeFormatMoment',
  props: {
    time: [String, Number, Object],
    diffTime: [String, Number, Object],
    precision: String,
  },
  computed: {
    momentModel() {
      return this.time && momentFactory(this.time);
    },
    diffModel() {
      return this.diffTime && momentFactory(this.diffTime);
    },
    formatedMoment() {
      return getFormattedTime(this.time, this.getFormatMoment(this.precision));
    },
    shouldShowYear() {
      return !this.diffTime || !this.hasSame('year') || this.precision === 'year';
    },
    shouldShowMonth() {
      return (this.shouldShowYear || !this.diffTime || !this.hasSame('month') || this.precision === 'month')
        && ['month', 'day', 'hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowDay() {
      return (this.shouldShowMonth || !this.diffTime || !this.hasSame('date') || this.precision === 'day')
        && ['day', 'hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowHour() {
      return ['hour', 'min', 'sec'].includes(this.precision);
    },
    shouldShowMin() {
      return ['min', 'sec'].includes(this.precision);
    },
    shouldShowSec() {
      return this.precision === 'sec';
    },
  },
  methods: {
    hasSame(part) {
      return this.momentModel && this.diffModel
        && this.momentModel[part]() === this.diffModel[part]();
    },
    getFormatMoment() {
      const year = this.shouldShowYear ? 'YYYY, ' : '';
      const month = this.shouldShowMonth ? 'MMMM ' : '';
      const weekDay = this.shouldShowDay ? 'ddd, ' : '';
      const day = this.shouldShowDay ? 'Do ' : '';
      const hour = this.shouldShowHour ? 'h' : '';
      const min = this.shouldShowMin ? ':mm' : '';
      const sec = this.shouldShowSec ? ':ss' : '';
      const ampm = this.shouldShowHour ? ' a' : '';

      return `${weekDay}${month}${day}${year}${hour}${min}${sec}${ampm}`;
    },
  },
};
</script>
