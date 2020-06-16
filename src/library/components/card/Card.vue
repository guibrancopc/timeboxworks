<template>
  <div
    :style="styles"
    class="tw-card tw-u-padding"
    :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TwCard',
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
    width: {
      type: String,
    },
  },
  computed: {
    styles() {
      return this.width ? {
        width: this.width,
      } : {};
    },
    classes() {
      return {
        [`tw-card--${this.theme}`]: true,
      };
    },
  },
};
</script>

<style scoped>
.tw-card {
  border-radius: var(--border-radius);
  overflow-wrap: break-word;
  width: 100%;
}

/* TODO: Organize it with color palette */
.tw-card--primary {
  color: #004085;
  background-color: #cce5ff;
  border: 1px solid #b8daff;
}

.tw-card--secondary {
  color: #383d41;
  background-color: #f9f9f9;
  border: 1px solid #d6d8db;
}

.tw-card--success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.tw-card--danger {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.tw-card--warning {
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
}

.tw-card--info {
  color: #0c5460;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
}
</style>
