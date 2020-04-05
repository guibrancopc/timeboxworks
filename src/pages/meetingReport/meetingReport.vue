<template>
  <div>
    <h1>Meeting Report</h1>
    <p>Check your console to to see the data coming.</p>
    <tw-button @click="backToDashboard" >Go back</tw-button>
  </div>
</template>

<script>
export default {
  name: 'TwMeetingReport',
  methods: {
    backToDashboard() {
      this.$router.push({ name: 'meetingDashboard' });
    },
  },
};
</script>
