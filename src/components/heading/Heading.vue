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

<style>
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  h1, .h1 {
    font-size: 2.5rem;
  }

  h2, .h2 {
    font-size: 2rem;
  }

  h3, .h3 {
    font-size: 1.75rem;
  }

  h4, .h4 {
    font-size: 1.5rem;
  }

  h5, .h5 {
    font-size: 1.25rem;
  }

  h6, .h6 {
    font-size: 1rem;
  }
</style>
