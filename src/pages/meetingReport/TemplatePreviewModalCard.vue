<template>
  <div
    style="text-align: center; border-radius: 3px; padding: 15px; width: 100%; height: 100%;"
    :style="styles">
    <div>
      <slot name="header" />
    </div>
    <div style="margin: 30px 0;">
      <slot />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwMeetingReportCards',
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
    styles() {
      return {
        primary: {
          color: '#004085',
          backgroundColor: '#cce5ff',
          border: '1px solid #b8daff',
        },
        secondary: {
          color: '#383d41',
          backgroundColor: '#f9f9f9',
          border: '1px solid #d6d8db',
        },
        success: {
          color: '#155724',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
        },
        danger: {
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
        },
        warning: {
          color: '#856404',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
        },
        info: {
          color: '#0c5460',
          backgroundColor: '#d1ecf1',
          border: '1px solid #bee5eb',
        },
      }[this.theme];
    },
  },
};
</script>
