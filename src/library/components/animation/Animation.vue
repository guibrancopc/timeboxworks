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
    enterActiveClass: {
      type: String,
      validator: animationValidator,
    },
    leaveActiveClass: {
      type: String,
      validator: animationValidator,
    },
  },
  methods: {
    add(className) {
      return `animated ${className}`;
    },
  },
};

function animationValidator(value) {
  return ['fadeIn', 'fadeOut', 'bounceInDown', 'bounceOutUp'].includes(value);
}
</script>

<style scoped>
@import 'Animation.scss';
</style>
