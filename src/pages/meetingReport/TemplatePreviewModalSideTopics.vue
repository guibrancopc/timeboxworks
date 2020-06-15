<template>
  <div>
    <h2 :style="styles.h2">Side Topics</h2>
    <div>
      <div
        :style="cardStyle"
        theme="info"
        v-for="(item, index) in items"
        :key="item.id"
        :value="item.value">{{ index + 1 }}. {{ item.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwMeetingReportSideTopics',
  props: {
    items: {
      type: Array,
      required: true,
    },
    styles: Object,
  },
  computed: {
    cardStyle() {
      return {
        width: '190px',
        color: '#0c5460',
        border: '1px solid #bee5eb',
        margin: '0 15px 15px 0',
        padding: '15px',
        display: 'inline-block',
        'box-sizing': 'border-box',
        'min-height': '160px',
        'vertical-align': 'top',
        'background-color': '#d1ecf1',
        'overflow-wrap': 'break-word',
        'border-radius': '3px',
      };
    },
  },
};
</script>
