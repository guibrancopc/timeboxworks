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
    inlineBlock: Boolean,
  },
  methods: {
    classes() {
      return {
        'tw-u_margin--top': this.marginTop(),
        'tw-u_margin--bottom': this.marginBottom(),
        'tw-u_margin--left': this.marginLeft(),
        'tw-u_margin--right': this.marginRight(),
        'tw-u_display--inline-block': this.inlineBlock,
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
