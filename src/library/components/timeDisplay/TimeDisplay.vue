<template>
  <tw-card
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
  </tw-card>
</template>

<script>
import TwCard from '../card';
import TwTimeFormat from '../timeFormat/TimeFormat.vue';

export default {
  name: 'TwTimeDisplay',
  inheritAttrs: false,
  components: {
    TwTimeFormat,
  },
  props: {
    theme: TwCard.props.theme,
  },
};
</script>

<style lang="scss" scoped>
.tw-time-display {
  text-align: center;
}

.tw-time-display__time {
  padding: 30px 0;
}
</style>
