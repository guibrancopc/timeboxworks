<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Meeting Form</router-link> |
      <router-link to="/meeting/dashboard">Meeting Dashboard</router-link> |
      <router-link to="/meeting/report">Meeting Report</router-link>
    </div>
    <router-view/>
  </div>
</template>
