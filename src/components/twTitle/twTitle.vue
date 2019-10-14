<template>
  <component
    :is="currentValidTag">
    <slot/>
  </component>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    isSizeValid(size) {
      return size >= 1 && size <= 6;
    },
  },
  computed: {
    currentValidTag() {
      if (this.isSizeValid(this.size)) {
        return `h${this.size}`;
      }
      console.error('TW: Wrong size was passed as prop for Tw Title component.');
      return 'h1';
    }
  }
}
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