<template>
  <tw-gutter
    inner
    full
    class="tw-alert"
    :class="classes">
    <slot />
  </tw-gutter>
</template>

<script>
export default {
  name: 'TwAlert',
  props: {
    theme: {
      type: String,
      default: 'secondary',
      validator(value) {
        return [
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'info',
        ].includes(value);
      },
    },
  },
  computed: {
    classes() {
      return {
        [`tw-alert--${this.theme}`]: true,
      };
    },
  },
};
</script>

<style scoped>
.tw-alert--primary {
  color: #004085;
  background-color: #cce5ff;
  border: 1px solid #b8daff;
}

.tw-alert--secondary {
  color: #383d41;
  background-color: #e2e3e5;
  border: 1px solid #d6d8db;
}

.tw-alert--success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.tw-alert--danger {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.tw-alert--warning {
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
}

.tw-alert--info {
  color: #0c5460;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
}
</style>
