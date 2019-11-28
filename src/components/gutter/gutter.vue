<template>
  <div :class="dynamicClasses()" class="tw-gutter__container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tw-gutter',
  props: {
    top: {
      value: Boolean,
      default: true,
    },
    bottom: {
      value: Boolean,
      default: true,
    },
    left: {
      value: Boolean,
      default: true,
    },
    right: {
      value: Boolean,
      default: true,
    },
  },
  methods: {
    dynamicClasses() {
      return {
        'tw-gutter__margin--top': this.top,
        'tw-gutter__margin--bottom': this.bottom,
        'tw-gutter__margin--left': this.left,
        'tw-gutter__margin--right': this.right,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$gutter: 15px;

.tw-gutter__margin--top {
  margin-top: $gutter;
}

.tw-gutter__margin--bottom {
  margin-bottom: $gutter;
}

.tw-gutter__margin--left {
  margin-left: $gutter;
}

.tw-gutter__margin--right {
  margin-right: $gutter;
}

.tw-gutter__container {
  display: inline-block;
}
</style>
