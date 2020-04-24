<template>
  <span
    :class="classes"
    class="tw-time-format">
      <span v-if="isTimeValid && !disabled && isDuration">
        <tw-time-format-duration
          :time="time"
          :diffTime="diffTime"
          :showNegative="showNegative"
          :precision="precision"
          @diffUpdated="onDiffUpdated" />
      </span>
      <span v-else-if="isTimeValid && !disabled">
        <tw-time-format-moment
          :time="time"
          :diffTime="diffTime"
          :precision="precision" />
      </span>
      <span v-else class="tw-time-format__fallback">
        <span>--:--</span>
      </span>
  </span>
</template>

<script>
import {
  isDuration, getFormattedTime,
} from '../../services/timeService/timeService';
import TwTimeFormatDuration from './TimeFormatDuration.vue';
import TwTimeFormatMoment from './TimeFormatMoment.vue';

export default {
  name: 'TwTimeFormat',
  props: {
    time: [String, Number, Object],
    diffTime: [String, Number, Object],
    disabled: Boolean,
    showNegative: Boolean,
    precision: {
      type: String,
      default: 'min',
      validator(value) {
        return ['year', 'month', 'day', 'hour', 'min', 'sec']
          .includes(value);
      },
    },
    type: {
      type: String,
      default: 'moment',
      validator(value) {
        return ['moment', 'duration'].includes(value);
      },
    },
    size: {
      type: String,
      default: 'inherit',
      validator(value) {
        return ['inherit', 'xs', 'sm', 'md', 'lg', 'xl']
          .includes(value);
      },
    },
  },
  computed: {
    isDuration() {
      return isDuration(this.time) || this.type === 'duration';
    },
    isTimeValid() {
      return !isInvalidDate(this.time);
    },
    classes() {
      return {
        [`tw-time-format--size-${this.size}`]: true,
      };
    },
  },
  methods: {
    onDiffUpdated(value) {
      this.$emit('diffUpdated', value);
    },
  },
  components: {
    TwTimeFormatDuration,
    TwTimeFormatMoment,
  },
};

function isInvalidDate(time) {
  return getFormattedTime(time) === 'Invalid date';
}
</script>

<style lang="scss" scoped>
.tw-time-format {
  /deep/ small {
    font-weight: 300;
  }
}

.tw-time-format--size-xl {
  font-size: 120px;
  /deep/ small {
    font-size: 60px;
  }
}

.tw-time-format--size-lg {
  font-size: 80px;
  /deep/ small {
    font-size: 50px;
  }
}

.tw-time-format--size-md {
  font-size: 50px;
  /deep/ small {
    font-size: 30px;
  }
}

.tw-time-format--size-sm {
  font-size: 25px;
  /deep/ small {
    font-size: 20px;
  }
}

.tw-time-format--size-xs {
  font-size: 16px;
  /deep/ small {
    font-size: 12px;
  }
}
</style>
