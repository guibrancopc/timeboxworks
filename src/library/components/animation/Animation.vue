<template>
  <transition
    v-bind="$attrs"
    v-on="$listeners"
    :enter-active-class="add(enterActiveClass)"
    :leave-active-class="add(leaveActiveClass)">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TwAnimation',
  props: {
    enterActiveClass: String,
    leaveActiveClass: String,
  },
  methods: {
    add(className) {
      return `animated ${className}`;
    },
  },
};
</script>

<style scoped>
@import 'Animation.scss';
</style>
