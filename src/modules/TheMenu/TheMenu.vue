<template>
  <nav>
    <router-link to="/">Meeting Form</router-link>
    <span>|</span>
    <router-link to="/meeting/dashboard">Meeting Dashboard</router-link>
    <span>|</span>
    <router-link to="/meeting/report">Meeting Report</router-link>
  </nav>
</template>

<script>
export default {
  name: 'TwTheMenu',
};
</script>
