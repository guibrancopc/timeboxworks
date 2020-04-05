<template>
  <header>
    <tw-row v-if="description">
      <tw-col>
        <tw-gutter vertical>
          <tw-paragraph :text="description" />
        </tw-gutter>
      </tw-col>
    </tw-row>
  </header>
</template>

<script>
export default {
  name: 'TwMeetingDashboardHeader',
  props: {
    description: String,
  },
};
</script>
