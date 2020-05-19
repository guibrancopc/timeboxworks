<template>
  <footer class="tw-footer">
    <tw-divider />
    <div
      class="tw-footer__container tw-u-display--flex"
      :class="classes">
      <slot />
    </div>
  </footer>
</template>

<script>
import TwDivider from '../divider/Divider.vue';

export default {
  name: 'TwFooter',
  components: {
    TwDivider,
  },
  props: {
    justifyContent: {
      type: String,
      validator(value) {
        return [
          'flex-start',
          'flex-end',
          'center',
          'space-around',
          'space-between',
        ].includes(value);
      },
    },
  },
  computed: {
    classes() {
      return {
        [`tw-u-justify-content--${this.justifyContent}`]: this.justifyContent,
      };
    },
  },
};
</script>
