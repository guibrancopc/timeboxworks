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

<style lang="scss" scoped>
@import '../../styles/responsiveTokens.scss';

@media screen and (max-width: $tw-mobile-breakpoint) {
  .tw-footer__container {
    flex-wrap: wrap;
    flex-direction: column-reverse;

    & > * {
      flex-basis: 100%;

      &:not(:first-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
