<template>
  <div
    :class="classes"
    class="tw-time-display">
    <tw-gutter full inner>
      <div class="tw-time-display__header">
        <slot name="header" />
      </div>
      <div class="tw-time-display__time">
        <span v-if="negative">-</span><span
          v-if="days">{{ days }}<small
        >d </small></span><span
          v-if="shouldShowHours">{{ hours }}<small
        >h </small></span><span
          v-if="shouldShowMinutes">{{ minutes }}<small
        >m </small></span><span
          v-if="shouldShowSeconds">{{ seconds }}<small
        >s</small></span>
      </div>
      <div class="tw-time-display__footer">
        <slot name="footer" />
      </div>
    </tw-gutter>
  </div>
</template>

<script>
import Time from '../../services/timeService/timeService';

const FALLBACK_TIME = '0000-01-01T00:00:00.000';

export default {
  name: 'TwTimeDisplay',
  props: {
    time: [String, Object],
    negative: Boolean,
    theme: {
      type: String,
      default: 'secondary',
      validator(value) {
        return [
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'info',
        ].includes(value);
      },
    },
    precision: {
      type: String,
      default: 'min',
      validator(value) {
        return ['hour', 'min', 'sec'].includes(value);
      },
    },
  },
  computed: {
    days() {
      return Time.formatString(getValidTime(this.time), 'D');
    },
    hours() {
      return Time.formatString(getValidTime(this.time), 'H');
    },
    minutes() {
      return Time.formatString(getValidTime(this.time), 'm');
    },
    seconds() {
      return Time.formatString(getValidTime(this.time), 's');
    },
    shouldShowHours() {
      return Number(this.days) || Number(this.hours);
    },
    shouldShowMinutes() {
      return ['min', 'sec'].includes(this.precision);
    },
    shouldShowSeconds() {
      return ['sec'].includes(this.precision);
    },
    classes() {
      return `tw-alert--${this.theme}`;
    },
  },
};

function getValidTime(time) {
  return isInvalidDate(time) ? FALLBACK_TIME : time;
}

function isInvalidDate(time) {
  return Time.formatString(time) === 'Invalid date';
}
</script>

<style lang="scss" scoped>
.tw-time-display {
  text-align: center;
  border-radius: var(--border-radius);
}

.tw-time-display__time {
  font-size: 120px;
  padding: .75rem 1.25rem;
  border-radius: var(--border-radius);

  small {
    font-size: 60px;
    font-weight: 300;
  }
}
</style>
