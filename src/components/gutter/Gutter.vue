<template>
  <div
    class="tw-gutter"
    :class="classes()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwGutter',
  props: {
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    vertical: Boolean,
    horizontal: Boolean,
    full: Boolean,
    inner: Boolean,
    inlineBlock: Boolean,
  },
  methods: {
    classes() {
      const type = this.inner ? 'padding' : 'margin';
      return {
        [`tw-u-${type}--top`]: this.marginTop(),
        [`tw-u-${type}--bottom`]: this.marginBottom(),
        [`tw-u-${type}--left`]: this.marginLeft(),
        [`tw-u-${type}--right`]: this.marginRight(),
        'tw-u-display--inline-block': this.inlineBlock,
      };
    },
    marginTop() {
      return this.top || this.vertical || this.full;
    },
    marginBottom() {
      return this.bottom || this.vertical || this.full;
    },
    marginLeft() {
      return this.left || this.horizontal || this.full;
    },
    marginRight() {
      return this.right || this.horizontal || this.full;
    },
  },
};
</script>
