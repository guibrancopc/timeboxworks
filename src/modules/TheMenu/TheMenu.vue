<template>
  <nav class="tw-menu">
    <span :class="getActiveClass(isFormPage)">
    <span v-if="!isFormPage">&#10003;</span>
      Form
    </span>
    <span class="tw-menu__separator">>></span><span
      :class="getActiveClass(isDashboardPage)">
      <span v-if="isReportPage">&#10003;</span>
      Dashboard
    </span>
    <span class="tw-menu__separator">>></span><span
      :class="getActiveClass(isReportPage)">
      Report
    </span>
  </nav>
</template>

<script>
export default {
  name: 'TwTheMenu',
  data() {
    return {
      currentPage: '',
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.currentPage = to.name;
      },
      immediate: true,
    },
  },
  computed: {
    isFormPage() {
      return this.isPage('meetingForm');
    },
    isDashboardPage() {
      return this.isPage('meetingDashboard');
    },
    isReportPage() {
      return this.isPage('meetingReport');
    },
  },
  methods: {
    isPage(name) {
      return this.currentPage === name;
    },
    getActiveClass(shouldShow) {
      return {
        'tw-menu-item--active': shouldShow,
      };
    },
  },
};
</script>

<style scoped>
.tw-menu__separator {
  margin: 5px;
}

.tw-menu-item--active {
  padding: 3px 5px;
  display: inline-block;
  text-decoration: underline;
}
</style>
