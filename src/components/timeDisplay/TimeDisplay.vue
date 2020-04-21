<template>
  <div
    :class="classes"
    class="tw-time-display">
    <tw-gutter full inner>
      <div class="tw-time-display__header">
        <slot name="header" />
      </div>
      <div class="tw-time-display__time">
        <tw-time-format
          v-bind="$attrs"
          v-on="$listeners" />
      </div>
      <div class="tw-time-display__footer">
        <slot name="footer" />
      </div>
    </tw-gutter>
  </div>
</template>

<script>
import TwTimeFormat from '../timeFormat/TimeFormat.vue';

export default {
  name: 'TwTimeDisplay',
  inheritAttrs: false,
  components: {
    TwTimeFormat,
  },
  props: {
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
  },
  computed: {
    classes() {
      return {
        [`tw-alert--${this.theme}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.tw-time-display {
  text-align: center;
  border-radius: var(--border-radius);
}
</style>
