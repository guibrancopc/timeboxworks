<template>
  <div
    :class="classes"
    class="tw-time-display">
    <tw-gutter full inner>
      <label for="">time left</label>
      <div class="tw-time-display__time">
        <span v-if="negative">-</span>{{ display }}<small class="tw-time-display__time-h">h</small>
      </div>
      <div>
        <slot name="info" />
      </div>
    </tw-gutter>
  </div>
</template>

<script>
import Time from '../../services/timeService/timeService';

const precisionMap = {
  hour: 'HH',
  min: 'HH:mm',
  sec: 'HH:mm:ss',
};

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
    display() {
      return Time.formatString(getValidTime(this.time), precisionMap[this.precision]);
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
}

.tw-time-display__time-h {
  font-size: 60px;
  font-weight: 300;
}
</style>
