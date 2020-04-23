<template>
  <header>
    <tw-row>
      <tw-col>
        <tw-heading>{{ name }}</tw-heading>
        <tw-p v-if="description" :text="description" />
      </tw-col>
    </tw-row>
  </header>
</template>

<script>
export default {
  name: 'TwMeetingDashboardHeader',
  props: {
    description: String,
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
