<template>
  <tw-alert
    :theme="theme"
    class="tw-time-display">
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
  </tw-alert>
</template>

<script>
import TwAlert from '../alert/Alert.vue';
import TwTimeFormat from '../timeFormat/TimeFormat.vue';

export default {
  name: 'TwTimeDisplay',
  inheritAttrs: false,
  components: {
    TwTimeFormat,
  },
  props: {
    theme: TwAlert.props.theme,
  },
};
</script>

<style lang="scss" scoped>
.tw-time-display {
  text-align: center;
  border-radius: var(--border-radius);
}

.tw-time-display__time {
  padding: 30px 0;
}
</style>
