<template>
  <component
    class="tw-heading"
    :is="headingKey()">
    <slot/>
  </component>
</template>

<script>
const validSizes = ['xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

export default {
  name: 'TwHeading',
  props: {
    size: {
      type: String,
      default: 'xl',
      validator: value => validSizes.includes(value),
    },
  },
  methods: {
    headingKey() {
      const headingNumber = this.getHeadingNumber();
      if (headingNumber === 0) { return 'h1'; }
      return `h${headingNumber}`;
    },
    getHeadingNumber() {
      return validSizes.indexOf(this.size) + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Heading.scss';
</style>
