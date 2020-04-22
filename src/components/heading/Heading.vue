<template>
  <component
    class="tw-heading"
    :class="classes"
    :is="headingKey">
    <slot>
      {{ title }}
    </slot>
  </component>
</template>

<script>
const validSizes = ['xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

export default {
  name: 'TwHeading',
  props: {
    title: String,
    size: {
      type: String,
      default: 'xl',
      validator: value => validSizes.includes(value),
    },
  },
  computed: {
    classes() {
      return {
        'tw-heading--divider': ['lg'].includes(this.size),
      };
    },
    headingKey() {
      return `h${this.getHeadingNumber()}`;
    },
  },
  methods: {
    getHeadingNumber() {
      return validSizes.indexOf(this.size) + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Heading.scss';
</style>
